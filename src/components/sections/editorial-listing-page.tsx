import Image from "next/image";
import Link from "next/link";

import { FeaturedEditorial } from "@/components/sections/featured-editorial";
import { EditorialSearch } from "@/components/sections/editorial-search";
import type { EditorialSummary } from "@/lib/editorial";

type Props = {
  featured: EditorialSummary[];
  entries: EditorialSummary[];
  query: string;
  page: number;
  heading: string;
  description: string;
  label: string;
  route: string;
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function EntryArtwork({ entry }: { entry: EditorialSummary }) {
  if (!entry.image || entry.imagePlaceholder) {
    return (
      <div className="flex aspect-[709/324] w-full items-center justify-center bg-surface-mint">
        <Image src="/images/sunburst_full.svg" alt="" width={702} height={701} className="w-[32%]" />
      </div>
    );
  }

  return (
    <div className="relative aspect-[709/324] w-full overflow-hidden">
      <Image src={entry.image} alt={entry.imageAlt} fill sizes="(min-width: 1024px) 709px, 100vw" className="object-cover" />
    </div>
  );
}

export function EditorialListingPage({ featured, entries, query, page, heading, description, label, route }: Props) {
  const visibleCount = 5 + (page - 1) * 3;
  const visibleEntries = entries.slice(0, visibleCount);
  const nextParams = new URLSearchParams();
  if (query) nextParams.set("q", query);
  nextParams.set("page", String(page + 1));

  return (
    <>
      <section className="relative h-[480px] overflow-hidden bg-primary-950 text-white sm:h-[580px] xl:h-[705px]">
        <Image src="/images/solarmodule.webp" alt="" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,42,0,0.90)_0%,rgba(19,42,0,0.78)_55%,rgba(19,42,0,0.73)_100%)]" />
        <div className="relative mx-auto flex h-full max-w-content flex-col items-center px-4 pt-20 text-center sm:px-6 sm:pt-28 xl:pt-[176px]">
          <h1 className="text-[38px] font-bold leading-tight sm:text-[48px] xl:text-[62px]">{heading}</h1>
          <p className="mt-5 max-w-[850px] text-lg leading-7 sm:text-xl xl:mt-6 xl:text-[24px] xl:leading-9">
            {description}
          </p>
          <EditorialSearch query={query} route={route} label={heading} />
        </div>
      </section>

      <FeaturedEditorial releases={featured} route={route} label={label} />

      <section id={route === "/blogs" ? "blogs-list" : "releases"} aria-label={heading} className="bg-white">
        {query && (
          <p className="mx-auto max-w-[1530px] px-4 pb-8 text-lg text-neutral-700 sm:px-6">
            {entries.length} {entries.length === 1 ? "result" : "results"} for “{query}”
          </p>
        )}
        {visibleEntries.length === 0 ? (
          <p className="mx-auto max-w-content px-4 py-24 text-center text-xl text-neutral-600 sm:px-6">
            No {heading.toLowerCase()} match “{query}”.
          </p>
        ) : (
          <div>
            {visibleEntries.map((entry) => (
              <article key={entry.slug} className="flex min-h-[454px] items-center bg-white py-12 transition-colors duration-300 hover:bg-surface-tint focus-within:bg-surface-tint lg:py-0">
                <Link href={`${route}/${entry.slug}`} className="group mx-auto grid w-full max-w-[1530px] items-center gap-8 px-4 sm:px-6 focus-visible:outline-2 focus-visible:outline-primary-700 lg:grid-cols-[709px_minmax(0,1fr)] lg:gap-[76px] lg:px-0">
                  <EntryArtwork entry={entry} />
                  <div className="max-w-[695px]">
                    <time dateTime={entry.date} className="text-lg font-bold text-primary-700 lg:text-[24px]">{formatDate(entry.date)}</time>
                    <h3 className="mt-6 text-[26px] font-bold leading-[1.35] text-neutral-900 transition-colors group-hover:text-primary-700 sm:text-[30px] lg:mt-7 lg:text-[32px]">
                      {entry.title}
                    </h3>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
        {visibleCount < entries.length && (
          <div className="flex justify-center pb-[122px] pt-[136px]">
            <Link href={`${route}?${nextParams}`} scroll={false} className="inline-flex min-h-9 items-center justify-center rounded-full bg-primary-400 px-7 text-base font-bold text-white transition-colors hover:bg-primary-500">
              Load more
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
