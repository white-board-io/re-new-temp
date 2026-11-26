import { render } from "@react-email/render";
import { EnquiryEmail, enquiryEmailText } from "@/emails/enquiry-email";
import {
  EnquiryConfirmationEmail,
  enquiryConfirmationEmailText,
} from "@/emails/enquiry-confirmation-email";
import {
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  parseEnquiry,
  SALES_EMAIL,
  type EnquiryErrors,
} from "@/lib/enquiry";
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

/* There is deliberately no per-visitor rate limit here. The app runs as
   several short-lived instances, so a counter in module memory is split
   between them and stops very little; and it has to guess the visitor's
   address from X-Forwarded-For, which goes wrong whenever a proxy is added in
   front. Throttling this endpoint is the job of the WAF in front of the site,
   which sees every request and the real client address. What stays below are
   the checks a WAF cannot make, because they are about this form. */

/* A browser always sends Origin on a fetch POST, and it cannot be overridden
   from page script. Requiring it to be this site stops other pages from
   submitting on a visitor's behalf and drops the laziest scripted clients. A
   determined bot can forge it — this is a filter, not a lock. */
const SITE_HOSTS = new Set(["renewsolarpanels.com", "www.renewsolarpanels.com"]);

function isSameSite(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    return false;
  }

  let host: string;
  try {
    host = new URL(origin).host;
  } catch {
    return false;
  }

  if (SITE_HOSTS.has(host)) {
    return true;
  }

  // Covers localhost, LAN dev and any staging hostname without listing them.
  return ["x-forwarded-host", "host"].some(
    (header) => request.headers.get(header)?.split(",")[0]?.trim() === host,
  );
}

/* The confirmation goes to an address the submitter typed, which may not be
   theirs. One per address per day keeps the form from being used to flood
   somebody else's inbox. It is held in module memory, so it is per instance
   and resets on redeploy — a brake, not a guarantee. */
const CONFIRMATION_COOLDOWN_MS = 24 * 60 * 60 * 1000;
const confirmedAt = new Map<string, number>();

function mayConfirm(email: string): boolean {
  const key = email.toLowerCase();
  const now = Date.now();
  const last = confirmedAt.get(key);

  if (last !== undefined && now - last < CONFIRMATION_COOLDOWN_MS) {
    return false;
  }

  confirmedAt.set(key, now);

  if (confirmedAt.size > 5_000) {
    for (const [address, time] of confirmedAt) {
      if (now - time >= CONFIRMATION_COOLDOWN_MS) {
        confirmedAt.delete(address);
      }
    }
  }

  return true;
}

function fail(status: number, message: string, errors?: EnquiryErrors) {
  return Response.json({ ok: false, message, errors: errors ?? {} }, { status });
}

export async function POST(request: Request) {
  if (!isSameSite(request)) {
    return fail(403, "This form can only be submitted from our website.");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail(400, "Malformed request body.");
  }

  const raw =
    typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)
      : {};

  // No person can see the honeypot, so anything in it was typed by a script.
  // Answer as if it worked: a bot told "ok" has no reason to try another way.
  if (typeof raw[HONEYPOT_FIELD] === "string" && raw[HONEYPOT_FIELD].trim()) {
    return Response.json({ ok: true });
  }

  // Scripts fill and submit in milliseconds. These are visible errors rather
  // than silent drops because a real visitor can hit them — a page cached from
  // before this check existed sends no timing at all — and must be able to
  // recover. The timing is client-reported, so again a filter, not a lock.
  const elapsedMs = raw.elapsedMs;
  if (typeof elapsedMs !== "number" || !Number.isFinite(elapsedMs)) {
    return fail(400, "Please refresh the page and try again.");
  }
  if (elapsedMs < MIN_FILL_MS) {
    return fail(400, "That was quick — please try again in a moment.");
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
  const confirmation = <EnquiryConfirmationEmail />;
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

  // The customer's own copy is a courtesy. Its failure must not tell someone
  // their enquiry did not go through when it reached the sales inbox perfectly
  // well — so it is sent best-effort, after the response is already assured,
  // and only logged. It carries nothing the submitter typed; see the template.
  if (enquiry.email && mayConfirm(enquiry.email)) {
    try {
      await transport.sendMail({
        from: enquirySender(),
        to: enquiry.email,
        // A customer who replies should reach the team, not the noreply sender.
        replyTo: SALES_EMAIL,
        subject: "We've received your enquiry — ReNew Solar",
        html: await render(confirmation),
        text: enquiryConfirmationEmailText(),
      });
    } catch (error) {
      console.error("[enquiry] confirmation send failed", error);
    }
  }

  return Response.json({ ok: true });
}
