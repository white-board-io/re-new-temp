/*
 * Shared contract for the "Enquire now" submissions, imported by both forms and
 * by the route handler that mails them. Keeping the field list and the
 * validation in one place is what stops the homepage section and the modal from
 * drifting apart — they collect overlapping but not identical fields (the
 * section asks for State, the modal asks for Email), and the mail template
 * renders whichever ones actually arrived.
 */

/** The options both forms offer; the server rejects anything else. */
export const REQUIREMENT_TYPES = [
  "Residential Rooftop",
  "Commercial & Industrial",
  "Utility-scale Project",
  "Channel Partnership",
  "Other",
];

/* The team's public contact details, as shown beside both forms. They appear in
   the confirmation mail too, so the customer has a way to reach a human without
   waiting for a reply. */
export const SALES_EMAIL = "pv.marketing@renew.com";
export const SALES_PHONE = "9220 440 044";

/** Which form the enquiry came from — shown in the mail so replies have context. */
export const ENQUIRY_SOURCES = {
  "homepage-form": "Homepage contact form",
  "enquire-modal": "Enquire Now modal",
} as const;

export type EnquirySource = keyof typeof ENQUIRY_SOURCES;

export type Enquiry = {
  name: string;
  phone: string;
  requirement: string;
  /** Optional on both forms. */
  company?: string;
  /** Required by both forms, but an enquiry stays valid without one — it is
      what the confirmation mail is sent to, and that is a courtesy, not the
      point of the submission. */
  email?: string;
  /** Homepage section only. */
  state?: string;
  source: EnquirySource;
};

/** Field-keyed messages; an empty object means the payload is good. */
export type EnquiryErrors = Partial<Record<keyof Enquiry | "form", string>>;

const MAX_LENGTHS: Record<string, number> = {
  name: 120,
  company: 160,
  phone: 40,
  email: 254,
  state: 80,
  requirement: 80,
};

/* Deliberately loose: Indian numbers get written with spaces, dashes, +91 and
   leading zeroes, and a stricter pattern rejects real customers. We only insist
   on enough digits to be dialable. */
const PHONE_DIGITS = /\d/g;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Validates an untrusted payload into an `Enquiry`. Runs on the server against
 * the request body; the browser's own `required` attributes are a convenience,
 * not a guarantee.
 */
export function parseEnquiry(input: unknown): {
  enquiry?: Enquiry;
  errors: EnquiryErrors;
} {
  const errors: EnquiryErrors = {};

  if (typeof input !== "object" || input === null) {
    return { errors: { form: "Malformed request body." } };
  }

  const raw = input as Record<string, unknown>;
  const name = text(raw.name);
  const company = text(raw.company);
  const phone = text(raw.phone);
  const email = text(raw.email);
  const state = text(raw.state);
  const requirement = text(raw.requirement);
  const source = text(raw.source);

  if (!name) {
    errors.name = "Please tell us your name.";
  }

  if (!phone) {
    errors.phone = "Please give us a phone number.";
  } else if ((phone.match(PHONE_DIGITS) ?? []).length < 7) {
    errors.phone = "That phone number looks incomplete.";
  }

  if (email && !EMAIL.test(email)) {
    errors.email = "That email address looks incorrect.";
  }

  if (!requirement) {
    errors.requirement = "Please pick a requirement type.";
  } else if (!REQUIREMENT_TYPES.includes(requirement)) {
    errors.requirement = "Please pick one of the listed requirement types.";
  }

  if (!(source in ENQUIRY_SOURCES)) {
    errors.form = "Malformed request body.";
  }

  for (const [field, limit] of Object.entries(MAX_LENGTHS)) {
    if (text(raw[field]).length > limit) {
      errors[field as keyof Enquiry] = `Please keep this under ${limit} characters.`;
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    enquiry: {
      name,
      phone,
      requirement,
      source: source as EnquirySource,
      ...(company ? { company } : {}),
      ...(email ? { email } : {}),
      ...(state ? { state } : {}),
    },
    errors: {},
  };
}
