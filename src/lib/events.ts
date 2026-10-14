import "server-only";

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

import type { EditorialArticleData } from "@/lib/editorial";

const contentDirectory = join(process.cwd(), "content", "events");

export type Event = EditorialArticleData & {
  description: string;
  type: string;
  location: string;
  sourceUrl: string;
  detailUrl?: string;
};

function readEvent(filename: string): Event {
  const { data, content } = matter(readFileSync(join(contentDirectory, filename), "utf8"));
  return {
    slug: filename.slice(0, -3),
    title: String(data.title),
    date: String(data.date),
    description: String(data.description),
    type: String(data.type || "Event"),
    location: String(data.location || ""),
    image: String(data.image || ""),
    imageAlt: String(data.imageAlt || data.title),
    sourceUrl: String(data.sourceUrl),
    detailUrl: data.detailUrl ? String(data.detailUrl) : undefined,
    content,
  };
}

export function getAllEvents(): Event[] {
  return readdirSync(contentDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map(readEvent)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getEventBySlug(slug: string): Event | undefined {
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined;
  const filename = `${slug}.md`;
  if (!existsSync(join(contentDirectory, filename))) return undefined;
  return readEvent(filename);
}

export function searchEvents(events: Event[], query: string): Event[] {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return events;
  return events.filter((event) => {
    const text = `${event.title} ${event.description} ${event.content} ${event.type} ${event.location} ${event.date}`.toLocaleLowerCase();
    return terms.every((term) => text.includes(term));
  });
}

export function getEventTypes(events: Event[]): string[] {
  return [...new Set(events.map((event) => event.type))].sort((a, b) => a.localeCompare(b));
}

export function getEventYears(events: Event[]): string[] {
  return [...new Set(events.map((event) => event.date.slice(0, 4)))].sort((a, b) => b.localeCompare(a));
}

export function filterEvents(events: Event[], { type, year }: { type: string; year: string }): Event[] {
  return events.filter((event) => (!type || event.type === type) && (!year || event.date.startsWith(year)));
}
