import { render } from "@react-email/render";
import { EnquiryEmail, enquiryEmailText } from "@/emails/enquiry-email";
import {
  EnquiryConfirmationEmail,
  enquiryConfirmationEmailText,
} from "@/emails/enquiry-confirmation-email";
import { parseEnquiry, SALES_EMAIL, type EnquiryErrors } from "@/lib/enquiry";
import { enquiryRecipient, enquirySender, getTransport } from "@/lib/mailer";

/*
 * POST /api/enquiry — mails one "Enquire now" submission to the sales inbox,
 * then sends the enquirer their own confirmation copy.
 *
 * Both forms (the homepage Contact section and the Enquire modal) post here.
 * Note this route is why the site can no longer be a pure static export; see
 * docs/adr/0002-full-static-export.md.
 */

// nodemailer opens real TCP sockets, so this cannot run on the edge runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* A public, unauthenticated endpoint that sends mail is a spam relay unless
   something throttles it. Per-IP counters in module memory are deliberately
   modest — they reset on redeploy and do not span instances, which is fine for
   swatting away a single noisy client but is not a substitute for a WAF. */
const RATE_LIMIT = { windowMs: 60_000, max: 5 };
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT.windowMs,
  );

  if (recent.length >= RATE_LIMIT.max) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // The map would otherwise grow forever behind a rotating-IP client.
  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time >= RATE_LIMIT.windowMs)) {
        hits.delete(key);
      }
    }
  }

  return false;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function fail(status: number, message: string, errors?: EnquiryErrors) {
  return Response.json({ ok: false, message, errors: errors ?? {} }, { status });
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return fail(429, "Too many submissions. Please try again in a minute.");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail(400, "Malformed request body.");
  }

  const { enquiry, errors } = parseEnquiry(body);
  if (!enquiry) {
    return fail(400, "Please check the highlighted fields.", errors);
  }

  // Rendered in the recipient's own locale/zone, not the browser's — the mail
  // is for the Indian sales team whichever timezone the enquirer sat in.
  const submittedAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  // Built outside the try: constructing the element does not render it, so an
  // error thrown during render would escape the catch anyway.
  const notification = (
    <EnquiryEmail enquiry={enquiry} submittedAt={`${submittedAt} IST`} />
  );
  const confirmation = <EnquiryConfirmationEmail enquiry={enquiry} />;
  const transport = getTransport();

  // The sales notification is the critical path: if it fails, the enquiry is
  // lost and the user has to be told to try again.
  try {
    await transport.sendMail({
      from: enquirySender(),
      to: enquiryRecipient(),
      // The From has to stay a verified SES sender, so the enquirer's address
      // rides on Reply-To instead: hitting reply then reaches the customer.
      replyTo: enquiry.email,
      subject: `New enquiry — ${enquiry.name} (${enquiry.requirement})`,
      html: await render(notification),
      text: enquiryEmailText(enquiry, `${submittedAt} IST`),
    });
  } catch (error) {
    // The enquirer must never see SMTP hosts or credentials in a failure.
    console.error("[enquiry] notification send failed", error);
    return fail(502, "We could not send your enquiry. Please try again shortly.");
  }

  // The customer's own copy is a courtesy, and the homepage form does not even
  // collect an address. Its failure must not tell someone their enquiry did not
  // go through when it reached the sales inbox perfectly well — so it is sent
  // best-effort, after the response is already assured, and only logged.
  if (enquiry.email) {
    try {
      await transport.sendMail({
        from: enquirySender(),
        to: enquiry.email,
        // A customer who replies should reach the team, not the noreply sender.
        replyTo: SALES_EMAIL,
        subject: "We've received your enquiry — ReNew Solar",
        html: await render(confirmation),
        text: enquiryConfirmationEmailText(enquiry),
      });
    } catch (error) {
      console.error("[enquiry] confirmation send failed", error);
    }
  }

  return Response.json({ ok: true });
}
