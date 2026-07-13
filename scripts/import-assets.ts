// Converts raw Figma exports in .figma-refs/ into optimized web assets in public/.
// Run: bun scripts/import-assets.ts  (see docs/adr/0002-full-static-export.md for why
// images are pre-optimized at import time instead of using next/image optimization)
import sharp from "sharp";

const REFS = ".figma-refs";

const jobs: { src: string; out: string; width?: number }[] = [
  {
    src: `${REFS}/assets/f809-da87-83c0ec33043f7e3661d68e97b20697bb`,
    out: "public/images/hero-poster.webp",
    width: 1920,
  },
  {
    src: `${REFS}/assets/5f3c-8ddd-b5f450fb84bcbad2beefc19642be626b`,
    out: "public/images/who-we-serve-card.webp",
    width: 1000,
  },
  {
    src: `${REFS}/assets/5f84-f0b2-dbf383fe249c413bcc01076dc0ed3ff5`,
    out: "public/images/products-bg.webp",
    width: 1920,
  },
  {
    src: `${REFS}/assets/ef6f-0847-c1f0a17245ca3990aeb8a60a48337244`,
    out: "public/images/product-module.webp",
    width: 1100,
  },
  {
    src: `${REFS}/assets/e17a-5550-90c746b0fc6036ad03bd0ef7db09a2b1`,
    out: "public/images/product-cell.webp",
    width: 800,
  },
  {
    src: `${REFS}/assets/f470-67be-a4f073e0049bd58aa7e1a61c1a8aaa85`,
    out: "public/images/project-1000mwp.webp",
    width: 900,
  },
  {
    src: `${REFS}/assets/dd0c-3e66-b6ae5ca3ff49837ebdedec9ed84b785f`,
    out: "public/images/project-80mwp.webp",
    width: 900,
  },
  {
    src: `${REFS}/assets/7eb1-e94e-1477780e8bf3d99c1323fc075eec6bd4`,
    out: "public/images/project-40mwp.webp",
    width: 900,
  },
  {
    src: `${REFS}/assets/0a07-0bce-b8b058e0ded53ecd974a8ad050c06070`,
    out: "public/images/partner-video-factory.webp",
    width: 900,
  },
  {
    src: `${REFS}/assets/531b-d2b7-352e7e932a2cc345758b7fd1f01c5ebf`,
    out: "public/images/partner-video-field.webp",
    width: 900,
  },
  {
    src: `${REFS}/assets/46ff-29f5-565eb530d57bc312cc3fea19777bb43f`,
    out: "public/images/partners-header-bg.webp",
    width: 1400,
  },
];

for (const job of jobs) {
  let img = sharp(job.src);
  if (job.width) img = img.resize({ width: job.width, withoutEnlargement: true });
  await img.webp({ quality: 78 }).toFile(job.out);
  console.log(`wrote ${job.out}`);
}
