"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

// TODO(batch-3-followup): real video URLs from the user; play buttons are
// visual-only until then. The mock shows 5 carousel pages of partner videos —
// only these two are present in the Figma file.
const videos = [
  {
    src: "/images/partner-video-factory.webp",
    alt: "Play video: quality inspection on the module manufacturing line",
    desktopSize: "xl:h-[510px] xl:w-[803px]",
  },
  {
    src: "/images/partner-video-field.webp",
    alt: "Play video: engineers reviewing a rooftop installation",
    desktopSize: "xl:h-[510px] xl:w-[793px]",
  },
];

export function ChannelPartners() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const pages = Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth));
      setPageCount(pages);
      setPage(Math.round(track.scrollLeft / track.clientWidth));
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  const scrollToPage = (target: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
  };

  return (
    <section id="channel-partners" className="bg-gradient-to-b from-surface-tint to-white">
      <div className="relative overflow-hidden bg-primary-950 pb-64 pt-24 text-center">
        <Image
          src="/images/partners-header-bg.webp"
          alt=""
          fill
          className="object-cover opacity-10 saturate-50"
          sizes="100vw"
        />
        <div className="relative mx-auto max-w-content px-4 sm:px-6">
          <p className="text-2xl font-bold uppercase leading-8 text-primary-400">
            Channel Partners
          </p>
          <h2 className="mt-6 text-4xl font-bold text-white sm:text-[54px] sm:leading-[62px]">
            Why our Channel Partners Trust Us
          </h2>
        </div>
      </div>

      <div className="mx-auto -mt-52 max-w-[1652px] px-4 sm:px-6 xl:px-0">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 xl:gap-[45px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {videos.map((video) => (
            <button
              key={video.src}
              type="button"
              aria-label={video.alt}
              className={`group relative aspect-video w-[88%] shrink-0 snap-start overflow-hidden rounded-2xl md:w-[calc(50%-12px)] xl:aspect-auto xl:rounded-[6px] ${video.desktopSize}`}
            >
              <Image
                src={video.src}
                alt=""
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                sizes="(min-width: 768px) 50vw, 88vw"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-20 items-center justify-center rounded-2xl bg-[#f00] transition group-hover:scale-105">
                  <Play aria-hidden className="size-7 fill-white text-white" />
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-3" role="tablist" aria-label="Video pages">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={page === i}
                aria-label={`Page ${i + 1}`}
                onClick={() => scrollToPage(i)}
                className={`size-2.5 rounded-full transition ${
                  page === i ? "bg-neutral-500" : "bg-neutral-300"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              aria-label="Previous videos"
              disabled={page === 0}
              onClick={() => scrollToPage(page - 1)}
              className="flex size-12 items-center justify-center rounded-lg bg-neutral-200 text-neutral-600 transition enabled:hover:bg-neutral-300 disabled:opacity-40"
            >
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next videos"
              disabled={page >= pageCount - 1}
              onClick={() => scrollToPage(page + 1)}
              className="flex size-12 items-center justify-center rounded-lg bg-neutral-200 text-neutral-600 transition enabled:hover:bg-neutral-300 disabled:opacity-40"
            >
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-10 pb-24 pt-16">
          <a
            href="#contact"
            className="rounded-full bg-primary-950 px-8 py-3 text-lg font-bold text-white transition hover:bg-primary-900"
          >
            Submit a Requirement
          </a>
          <a
            href="#contact"
            className="rounded-full border border-primary-950 px-8 py-3 text-lg font-bold text-primary-950 transition hover:bg-primary-50"
          >
            Become a Channel Partner
          </a>
        </div>
      </div>
    </section>
  );
}
