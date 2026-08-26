import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// Metadata routes are Route Handlers, and `output: "export"` requires them to
// be explicitly static — without this the build fails collecting page data.
export const dynamic = "force-static";

// The seven prerendered routes, highest-value first. Kept as an explicit list
// rather than derived from the filesystem: the set is small, and an accidental
// route should not silently enter the index.
const ROUTES: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/products/solar-module", priority: 0.9, changeFrequency: "monthly" },
  { path: "/products/solar-cell", priority: 0.9, changeFrequency: "monthly" },
  { path: "/manufacturing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.7, changeFrequency: "monthly" },
  { path: "/downloads", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
