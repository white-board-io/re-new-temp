import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

/*
 * SMTP transport for the enquiry mails. Nothing else in the app sends mail, but
 * this lives apart from the route handler so the credential reading and the
 * request handling stay separable — and so the transport is created once per
 * process rather than once per submission (a new connection pool for every form
 * post is the classic way to get throttled by SES).
 */

/** Verified sender for the SES account; see `.env.example`. */
const DEFAULT_FROM = "ReNew Solar Website <pv.marketing@renew.com>";
const DEFAULT_TO = "arun@white-board.io";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} is not set — the enquiry form cannot send mail. See .env.example.`,
    );
  }
  return value;
}

export function enquiryRecipient(): string {
  return process.env.ENQUIRY_TO || DEFAULT_TO;
}

export function enquirySender(): string {
  return process.env.SMTP_FROM || DEFAULT_FROM;
}

let cached: Transporter | undefined;

export function getTransport(): Transporter {
  if (cached) {
    return cached;
  }

  const port = Number(process.env.SMTP_PORT || 587);

  cached = nodemailer.createTransport({
    host: required("SMTP_HOST"),
    port,
    // 465 is implicit TLS; 587 opens in the clear and upgrades, so insist on
    // the upgrade rather than letting it silently fall back to plaintext auth.
    secure: port === 465,
    requireTLS: port !== 465,
    auth: {
      user: required("SMTP_USER"),
      pass: required("SMTP_PASSWORD"),
    },
    pool: true,
    maxConnections: 2,
    // SMTP_DEBUG=1 prints the full SMTP conversation to the server log. Worth
    // reaching for when mail is accepted but never arrives: the banner and the
    // response to DATA tell you which service actually took the message.
    // Nodemailer redacts nothing, so keep it off outside of debugging.
    logger: process.env.SMTP_DEBUG === "1",
    debug: process.env.SMTP_DEBUG === "1",
  });

  return cached;
}
