// Converts raw Figma exports in .figma-refs/ into optimized web assets in public/.
// Run: bun scripts/import-assets.ts  (see docs/adr/0002-full-static-export.md for why
// images are pre-optimized at import time instead of using next/image optimization)
import sharp from "sharp";

const REFS = ".figma-refs";

const jobs: { src: string; out: string; width?: number }[] = [
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
    src: `${REFS}/assets/0a07-0bce-b8b058e0ded53ecd974a8ad050c06070`,
    out: "public/images/partner-video-factory.webp",
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
