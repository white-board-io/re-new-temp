/*
 * The receipt the customer gets back after submitting an enquiry.
 *
 * Only sent when we actually have an address. Its job is to reassure, and to
 * give the customer a way to reach a human before the callback lands.
 *
 * It deliberately contains nothing the submitter typed — no name, no company,
 * no echo of the details. Anyone can type anyone's address into a web form, so
 * a mail that repeated the form back would let a stranger put their own words
 * (and links) into a message sent from our domain to a third party. A fixed
 * text gives a spammer nothing to send.
 */

import { Section, Text, Link } from "@react-email/components";
import { SALES_EMAIL, SALES_PHONE } from "@/lib/enquiry";
import { BRAND, EmailShell, INK } from "@/emails/shell";

export function EnquiryConfirmationEmail() {
  return (
    <EmailShell
      preview="We've received your enquiry — our team will be in touch."
      eyebrow="Enquiry received"
      title="Thanks for your enquiry."
      subtitle="We've got your details and our team will be in touch."
      /* The mail has to tell an unintended recipient what to do about it. */
      footer={
        <>
          ReNew Solar Panels · You received this because this address was entered
          on an enquiry form on our website. If that wasn&apos;t you, please
          ignore this email — we will not contact you again.
        </>
      }
    >
      <Section style={{ padding: "24px 32px" }}>
        <Text
          style={{ margin: 0, fontSize: "15px", lineHeight: "23px", color: INK }}
        >
          Would rather not wait, or need to correct something you sent? Call us
          on{" "}
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
export function enquiryConfirmationEmailText(): string {
  return [
    "Thanks for your enquiry.",
    "",
    "We've received your details and our team will be in touch.",
    "",
    "Would rather not wait, or need to correct something you sent?",
    `Call ${SALES_PHONE} or write to ${SALES_EMAIL}.`,
    "",
    "--",
    "ReNew Solar Panels",
    "You received this because this address was entered on an enquiry form on",
    "our website. If that wasn't you, please ignore this email — we will not",
    "contact you again.",
  ].join("\n");
}
