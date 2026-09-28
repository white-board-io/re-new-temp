"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { EditorialSummary } from "@/lib/editorial";

const FEATURE_DURATION_MS = 8100;
export function FeaturedEditorial({ releases, route, label }: { releases: EditorialSummary[]; route: string; label: string }) {
  const [activeFeature, setActiveFeature] = useState(0);
  const feature = releases[activeFeature];

  useEffect(() => {
    if (releases.length < 2) return;
    const timeout = window.setTimeout(() => {
      setActiveFeature((index) => (index + 1) % releases.length);
    }, FEATURE_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, [activeFeature, releases.length]);

  if (!feature) return null;

  return (
    <section aria-label={`Latest ${label.toLowerCase()}`} className="relative overflow-hidden bg-white pt-20 pb-40 sm:pt-24 sm:pb-52 xl:pt-[124px] xl:pb-[268px]">
      <div className="pointer-events-none absolute -left-[175px] top-[124px] hidden w-[350px] sm:block">
        <Image src="/images/sunburst_full.svg" alt="" width={702} height={701} className="w-full animate-sunburst motion-reduce:animate-none" />
      </div>
      <div className="pointer-events-none absolute -right-[175px] top-[324px] hidden w-[350px] sm:block">
        <Image src="/images/sunburst_full.svg" alt="" width={702} height={701} className="w-full animate-sunburst [animation-direction:reverse] motion-reduce:animate-none" />
      </div>
      <div className="relative mx-auto grid w-[calc(100%-32px)] max-w-[1342px] gap-8 overflow-hidden rounded-md bg-primary-700 p-6 text-white sm:w-[calc(100%-48px)] sm:p-10 lg:min-h-[604px] lg:grid-cols-[minmax(0,1fr)_603px] lg:gap-12 lg:p-12 lg:pl-[58px]">
        <div className="flex flex-col items-start">
          <p className="text-lg text-primary-300 lg:text-[24px]">Latest {label}</p>
          <p className="mt-6 text-lg lg:mt-9 lg:text-[24px]">
            {new Date(`${feature.date}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}
          </p>
          <h2 className="mt-5 max-w-[540px] text-[25px] font-bold leading-[1.32] sm:text-[30px] lg:mt-6 lg:text-[32px]">
            {feature.title}
          </h2>
          <Link href={`${route}/${feature.slug}`} className="mt-8 inline-flex min-h-9 items-center justify-center rounded-full bg-primary-400 px-7 text-base font-bold text-white transition-colors hover:bg-primary-500 lg:mt-14">
            Read more
          </Link>
          <div className="mt-12 flex w-full items-center gap-3 sm:gap-7 lg:mt-auto lg:mb-5" role="group" aria-label={`Featured ${label.toLowerCase()} slides`}>
            {releases.map((release, index) => (
              <button key={release.slug} type="button" aria-label={`Show featured ${label.toLowerCase()} ${index + 1}`} aria-current={activeFeature === index ? "true" : undefined} onClick={() => setActiveFeature(index)} className="relative h-[9px] w-16 shrink-0 overflow-hidden rounded-full bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-[93px]">
                {activeFeature === index && <span aria-hidden="true" className="hero-progress-fill absolute inset-0 block size-full rounded-full bg-primary-400" style={{ animationDuration: `${FEATURE_DURATION_MS}ms` }} />}
              </button>
            ))}
          </div>
        </div>
        <div className="relative min-h-[260px] overflow-hidden rounded-sm sm:min-h-[360px] lg:min-h-0">
          {releases.map((release, index) => (
            <Image key={release.slug} src={release.imagePlaceholder ? "/images/sunburst_full.svg" : release.image || "/images/sunburst_full.svg"} alt={activeFeature === index ? (release.imagePlaceholder ? "" : release.imageAlt) : ""} aria-hidden={activeFeature !== index} fill priority={index === 0} loading={index === 0 ? undefined : "eager"} sizes="(min-width: 1024px) 603px, 100vw" className={`${release.imagePlaceholder ? "bg-surface-mint object-contain p-16" : "object-cover"} transition-opacity duration-700 motion-reduce:transition-none ${activeFeature === index ? "opacity-100" : "opacity-0"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
