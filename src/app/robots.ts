import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// Metadata routes are Route Handlers, and `output: "export"` requires them to
// be explicitly static — without this the build fails collecting page data.
export const dynamic = "force-static";

// Emitted as a static robots.txt at build time — see the Metadata Files docs in
// node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Deliberately no Disallow. /_next/ holds the CSS, JS and fonts the pages
      // need to render — blocking it stops crawlers rendering the site and is
      // explicitly advised against. The sitemap below is what tells crawlers
      // which URLs are canonical, so the .txt RSC payloads need no rule either.
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
