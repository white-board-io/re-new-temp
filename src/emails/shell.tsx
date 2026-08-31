/*
 * Shared chrome for the enquiry mails, so the internal notification and the
 * customer's confirmation read as one family.
 *
 * Email clients are not browsers: Outlook renders through Word, Gmail strips
 * <style> blocks in some views, and nothing supports flexbox reliably. So this
 * is built from react-email's table-based primitives with inline styles only,
 * and the palette is hard-coded hex rather than the Tailwind tokens the site
 * uses — globals.css never reaches an inbox.
 */

import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";

/* docs/adr/0001: primary-700 is the brand green, 950 the near-black text. */
export const BRAND = "#006b38";
export const ACCENT = "#acd77e";
export const INK = "#132a00";
export const MUTED = "#6b7280";
export const HAIRLINE = "#e5e7eb";
export const TINT = "#f0f6f3";

export const FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

/**
 * One label/value pair. `href` turns the value into a tel:/mailto: link so the
 * reader can act on it straight from the mail on a phone.
 */
export function DetailRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <Row style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
      <Column
        style={{
          width: "150px",
          padding: "12px 0",
          verticalAlign: "top",
          fontFamily: FONT,
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        {label}
      </Column>
      <Column
        style={{
          padding: "12px 0",
          verticalAlign: "top",
          fontFamily: FONT,
          fontSize: "16px",
          color: INK,
        }}
      >
        {href ? (
          <Link href={href} style={{ color: BRAND, textDecoration: "none" }}>
            {value}
          </Link>
        ) : (
          value
        )}
      </Column>
    </Row>
  );
}

export function EmailShell({
  preview,
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  /** The inbox preview line — the one thing worth knowing before opening. */
  preview: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          margin: 0,
          padding: "24px 0",
          backgroundColor: TINT,
          fontFamily: FONT,
        }}
      >
        <Container
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            overflow: "hidden",
            border: `1px solid ${HAIRLINE}`,
          }}
        >
          <Section style={{ backgroundColor: BRAND, padding: "24px 32px" }}>
            <Text
              style={{
                margin: 0,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: ACCENT,
              }}
            >
              {eyebrow}
            </Text>
            <Heading
              as="h1"
              style={{
                margin: "6px 0 0",
                fontSize: "24px",
                lineHeight: "30px",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              {title}
            </Heading>
            {subtitle ? (
              <Text
                style={{
                  margin: "6px 0 0",
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                {subtitle}
              </Text>
            ) : null}
          </Section>

          {children}

          <Hr style={{ margin: 0, borderColor: HAIRLINE }} />

          <Section style={{ padding: "16px 32px 24px" }}>
            <Text
              style={{ margin: 0, fontSize: "13px", lineHeight: "19px", color: MUTED }}
            >
              {footer}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
