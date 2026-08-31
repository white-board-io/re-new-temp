/*
 * The receipt the customer gets back after submitting an enquiry.
 *
 * Only sent when we actually have an address. Both forms ask for one, but the
 * field is not trusted to be there — the contract treats it as optional, so a
 * submission without it still reaches the sales team. Its job is to reassure,
 * to let the customer spot a typo in what they sent, and to give them a way to
 * reach a human before the callback lands.
 */

import { Section, Text, Link } from "@react-email/components";
import { SALES_EMAIL, SALES_PHONE, type Enquiry } from "@/lib/enquiry";
import { BRAND, DetailRow, EmailShell, INK } from "@/emails/shell";

/* "Priya Raghunathan" -> "Priya". A bare first name reads as written to a
   person; the full legal name reads as written by a database. */
function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || name;
}

export function EnquiryConfirmationEmail({ enquiry }: { enquiry: Enquiry }) {
  const { name, company, phone, state, requirement } = enquiry;

  return (
    <EmailShell
      preview="We've received your enquiry — our team will be in touch."
      eyebrow="Enquiry received"
      title={`Thanks, ${firstName(name)}.`}
      subtitle="We've got your details and our team will be in touch."
      /* Anyone can type anyone's address into a web form, so the mail has to
         tell an unintended recipient what to do about it. */
      footer={
        <>
          ReNew Solar Panels · You received this because this address was entered
          on an enquiry form on our website. If that wasn&apos;t you, please
          ignore this email — we will not contact you again.
        </>
      }
    >
      <Section style={{ padding: "24px 32px 8px" }}>
        <Text
          style={{ margin: 0, fontSize: "15px", lineHeight: "23px", color: INK }}
        >
          Here&apos;s what you sent us. If anything looks wrong, just reply to this
          email and we&apos;ll correct it.
        </Text>
      </Section>

      <Section style={{ padding: "0 32px 20px" }}>
        <DetailRow label="Name" value={name} />
        {company ? <DetailRow label="Company" value={company} /> : null}
        <DetailRow label="Phone" value={phone} />
        {state ? <DetailRow label="State" value={state} /> : null}
        <DetailRow label="Requirement" value={requirement} />
      </Section>

      <Section style={{ padding: "0 32px 24px" }}>
        <Text
          style={{ margin: 0, fontSize: "15px", lineHeight: "23px", color: INK }}
        >
          Would rather not wait? Call us on{" "}
          <Link
            href={`tel:${SALES_PHONE.replace(/\s+/g, "")}`}
            style={{ color: BRAND, fontWeight: 600, textDecoration: "none" }}
          >
            {SALES_PHONE}
          </Link>{" "}
          or write to{" "}
          <Link
            href={`mailto:${SALES_EMAIL}`}
            style={{ color: BRAND, fontWeight: 600, textDecoration: "none" }}
          >
            {SALES_EMAIL}
          </Link>
          .
        </Text>
      </Section>
    </EmailShell>
  );
}

/**
 * The plain-text alternative. Every mail ships both parts: text-only clients
 * and most spam filters want one, and a bare HTML mail scores worse.
 */
export function enquiryConfirmationEmailText(enquiry: Enquiry): string {
  const { name, company, phone, state, requirement } = enquiry;

  return [
    `Thanks, ${firstName(name)}.`,
    "",
    "We've received your enquiry and our team will be in touch.",
    "",
    "Here's what you sent us. If anything looks wrong, just reply to this email",
    "and we'll correct it.",
    "",
    `Name:        ${name}`,
    company ? `Company:     ${company}` : null,
    `Phone:       ${phone}`,
    state ? `State:       ${state}` : null,
    `Requirement: ${requirement}`,
    "",
    `Would rather not wait? Call ${SALES_PHONE} or write to ${SALES_EMAIL}.`,
    "",
    "--",
    "ReNew Solar Panels",
    "You received this because this address was entered on an enquiry form on",
    "our website. If that wasn't you, please ignore this email — we will not",
    "contact you again.",
  ]
    .filter((line) => line !== null)
    .join("\n");
}
