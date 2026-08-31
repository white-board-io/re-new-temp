# Full static export (output: 'export')

The site must be servable from any static host, so we build with Next.js `output: 'export'` producing a pure `out/` directory. This was chosen over default static prerendering on a Node host (which would have kept `next/image` optimization and allowed API routes). Consequences: `next/image` runs with `unoptimized: true`, so all raster assets are pre-optimized at import time (Figma PNG → right-sized WebP in `public/images`); the contact form cannot POST to a Next.js route and must target an external endpoint; all interactivity (savings calculator, carousels) is client-side only.

## Superseded in part (2026-08-31)

`output: 'export'` is removed. The "Enquire now" forms — the homepage Contact
section and the Enquire modal — now POST to `/api/enquiry`, a Node route handler
that mails each submission over SMTP, and a static export can serve only `GET`
route handlers. The site therefore needs a Node host (`next start`, a container,
or Vercel) rather than a plain static bucket.

Everything else in this decision stands: `next/image` still runs with
`unoptimized: true` against pre-optimized assets, and every page except
`/api/enquiry` is still prerendered at build time, so the hosting change costs
nothing at render time.
