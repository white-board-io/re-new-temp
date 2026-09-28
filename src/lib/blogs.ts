import "server-only";

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

import type { EditorialArticleData } from "@/lib/editorial";

const contentDirectory = join(process.cwd(), "content", "blogs");

export type BlogPost = EditorialArticleData & {
  description: string;
  category: string;
  author: string;
  publisher: string;
  sourceUrl: string;
};

function readBlog(filename: string): BlogPost {
  const { data, content } = matter(readFileSync(join(contentDirectory, filename), "utf8"));
  return {
    slug: filename.slice(0, -3),
    title: String(data.title),
    date: String(data.date),
    description: String(data.description),
    category: String(data.category || "General"),
    author: String(data.author || "ReNew"),
    publisher: String(data.publisher || "ReNew"),
    image: String(data.image || ""),
    imageAlt: String(data.imageAlt || data.title),
    sourceUrl: String(data.sourceUrl),
    content,
  };
}

export function getAllBlogs(): BlogPost[] {
  return readdirSync(contentDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map(readBlog)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined;
  const filename = `${slug}.md`;
  if (!existsSync(join(contentDirectory, filename))) return undefined;
  return readBlog(filename);
}

export function searchBlogs(posts: BlogPost[], query: string): BlogPost[] {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return posts;
  return posts.filter((post) => {
    const text = `${post.title} ${post.description} ${post.content} ${post.category} ${post.author} ${post.date}`.toLocaleLowerCase();
    return terms.every((term) => text.includes(term));
  });
}
