/*
 * The mail the sales team receives for every "Enquire now" submission. The
 * customer's own copy is EnquiryConfirmationEmail; both sit on the same shell.
 */

import { Section } from "@react-email/components";
import { ENQUIRY_SOURCES, type Enquiry } from "@/lib/enquiry";
import { DetailRow, EmailShell } from "@/emails/shell";

export function EnquiryEmail({
  enquiry,
  submittedAt,
}: {
  enquiry: Enquiry;
  /** Passed in rather than read from the clock so the render stays pure. */
  submittedAt: string;
}) {
  const { name, company, phone, email, state, requirement, source } = enquiry;

  return (
    <EmailShell
      preview={`${name} — ${requirement}`}
      eyebrow="New enquiry"
      title={name}
      subtitle={requirement}
      footer={
        <>
          Sent by the ReNew Solar website.
          {email
            ? " Replying to this mail goes straight back to the enquirer."
            : " This enquiry left no email address — call the number above."}
        </>
      }
    >
      <Section style={{ padding: "8px 32px 24px" }}>
        <DetailRow label="Name" value={name} />
        {company ? <DetailRow label="Company" value={company} /> : null}
        <DetailRow label="Phone" value={phone} href={`tel:${phone.replace(/\s+/g, "")}`} />
        {email ? <DetailRow label="Email" value={email} href={`mailto:${email}`} /> : null}
        {state ? <DetailRow label="State" value={state} /> : null}
        <DetailRow label="Requirement" value={requirement} />
        <DetailRow label="Submitted" value={submittedAt} />
        <DetailRow label="Source" value={ENQUIRY_SOURCES[source]} />
      </Section>
    </EmailShell>
  );
}

/**
 * The plain-text alternative. Every mail ships both parts: text-only clients
 * and most spam filters want one, and a bare HTML mail scores worse.
 */
export function enquiryEmailText(enquiry: Enquiry, submittedAt: string): string {
  const { name, company, phone, email, state, requirement, source } = enquiry;

  return [
    "NEW ENQUIRY — ReNew Solar",
    "",
    `Name:        ${name}`,
    company ? `Company:     ${company}` : null,
    `Phone:       ${phone}`,
    email ? `Email:       ${email}` : null,
    state ? `State:       ${state}` : null,
    `Requirement: ${requirement}`,
    `Submitted:   ${submittedAt}`,
    `Source:      ${ENQUIRY_SOURCES[source]}`,
    "",
    "Sent by the ReNew Solar website.",
  ]
    .filter((line) => line !== null)
    .join("\n");
}
