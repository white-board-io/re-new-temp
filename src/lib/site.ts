/*
 * Canonical public origin, used for sitemap and robots URLs.
 *
 * Vercel exposes the deployment host as NEXT_PUBLIC_VERCEL_URL (no scheme), so
 * previews describe themselves rather than the production domain. Override with
 * NEXT_PUBLIC_SITE_URL when the site moves to a ReNew-controlled domain — the
 * Access-Control-Allow-Origin value in vercel.json and the Canonical line in
 * public/.well-known/security.txt need updating at the same time.
 *
 * The value is validated rather than interpolated verbatim: Next's sitemap
 * generator writes <loc> without XML-escaping, so a malformed origin (a stray
 * `&`, `<` or quote) silently emits a sitemap that no crawler can parse. An
 * unparseable or non-http(s) value falls back to the known-good default.
 */
const FALLBACK_ORIGIN = "https://re-new-mocha.vercel.app";

function normaliseOrigin(candidate: string | undefined): string | null {
  if (!candidate) return null;

  const withScheme = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;

  let parsed: URL;
  try {
    parsed = new URL(withScheme);
  } catch {
    return null;
  }

  // Only absolute http(s) origins; anything else (javascript:, data:, file:)
  // has no business in a sitemap.
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;

  // `origin` drops any path, query, fragment, and credentials — which is also
  // what strips the XML metacharacters that would corrupt the sitemap.
  const origin = parsed.origin;
  if (origin === "null" || /[<>&"']/.test(origin)) return null;

  return origin;
}

export const SITE_URL =
  normaliseOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
  normaliseOrigin(process.env.NEXT_PUBLIC_VERCEL_URL) ??
  FALLBACK_ORIGIN;
