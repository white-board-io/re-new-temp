import "server-only";

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const contentDirectory = join(process.cwd(), "content", "press-releases");

export type PressRelease = {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePlaceholder: boolean;
  sourceUrl: string;
  alternateUrl?: string;
  sourcePdf?: string;
  localPdf?: string;
  content: string;
};

export function getAllPressReleases(): PressRelease[] {
  return readdirSync(contentDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const source = readFileSync(join(contentDirectory, filename), "utf8");
      const { data, content } = matter(source);
      return {
        slug: filename.slice(0, -3),
        title: String(data.title),
        date: String(data.date),
        description: String(data.description),
        image: String(data.image || ""),
        imageAlt: String(data.imageAlt || data.title),
        imagePlaceholder: data.imagePlaceholder === true,
        sourceUrl: String(data.sourceUrl),
        alternateUrl: data.alternateUrl ? String(data.alternateUrl) : undefined,
        sourcePdf: data.sourcePdf ? String(data.sourcePdf) : undefined,
        localPdf: data.localPdf ? String(data.localPdf) : undefined,
        content,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getPressReleaseBySlug(slug: string): PressRelease | undefined {
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined;
  const filename = join(contentDirectory, `${slug}.md`);
  if (!existsSync(filename)) return undefined;
  const { data, content } = matter(readFileSync(filename, "utf8"));
  return {
    slug,
    title: String(data.title),
    date: String(data.date),
    description: String(data.description),
    image: String(data.image || ""),
    imageAlt: String(data.imageAlt || data.title),
    imagePlaceholder: data.imagePlaceholder === true,
    sourceUrl: String(data.sourceUrl),
    alternateUrl: data.alternateUrl ? String(data.alternateUrl) : undefined,
    sourcePdf: data.sourcePdf ? String(data.sourcePdf) : undefined,
    localPdf: data.localPdf ? String(data.localPdf) : undefined,
    content,
  };
}

export function searchPressReleases(releases: PressRelease[], query: string): PressRelease[] {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return releases;
  return releases.filter((release) => {
    const text = `${release.title} ${release.description} ${release.content} ${release.date}`.toLocaleLowerCase();
    return terms.every((term) => text.includes(term));
  });
}
