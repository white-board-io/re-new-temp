"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { ContactModalTrigger } from "@/components/contact-modal";
import { Reveal } from "@/components/reveal";

const videos = [
  {
    src: "/videos/channel-partners/partners-in-success-p3.webm",
    poster: "/images/channel-partners/partners-in-success-p3.jpg",
    title: "Partners in success P3",
    desktopSize: "xl:h-[510px] xl:w-[803px]",
  },
  {
    src: "/videos/channel-partners/partners-in-success-rev3.webm",
    poster: "/images/channel-partners/partners-in-success-rev3.jpg",
    title: "Partners in success rev3",
    desktopSize: "xl:h-[510px] xl:w-[793px]",
  },
  {
    src: "/videos/channel-partners/partners-in-success-suntrik-vinay-bansal.webm",
    poster: "/images/channel-partners/partners-in-success-suntrik-vinay-bansal.jpg",
    title: "Partners in success Suntrik Vinay Bansal",
    desktopSize: "xl:h-[510px] xl:w-[803px]",
  },
  {
    src: "/videos/channel-partners/womens-day-rev1.webm",
    poster: "/images/channel-partners/womens-day-rev1.jpg",
    title: "Womens Day rev1",
    desktopSize: "xl:h-[510px] xl:w-[793px]",
  },
];

type VideoCardProps = {
  video: (typeof videos)[number];
};

function VideoCard({ video }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayback = async () => {
    const media = videoRef.current;
    if (!media) return;

    if (media.paused) {
      await media.play();
      setIsPlaying(true);
    } else {
      media.pause();
      setIsPlaying(false);
    }
  };

  const syncProgress = () => {
    const media = videoRef.current;
    if (!media?.duration) return;
    setProgress((media.currentTime / media.duration) * 100);
  };

  return (
    <article
      className={`group relative aspect-video w-[88%] shrink-0 snap-start overflow-hidden rounded-2xl bg-primary-950 md:w-[calc(50%-12px)] xl:aspect-auto xl:rounded-[6px] ${video.desktopSize}`}
    >
      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster}
        aria-label={video.title}
        className="h-full w-full object-cover"
        playsInline
        preload="metadata"
        onClick={togglePlayback}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={syncProgress}
        onLoadedMetadata={syncProgress}
      />
      <button
        type="button"
        aria-label={isPlaying ? `Pause ${video.title}` : `Play ${video.title}`}
        onClick={togglePlayback}
        className={`absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary-400 text-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition duration-200 hover:scale-105 hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:size-24 ${
          isPlaying ? "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100" : "opacity-100"
        }`}
      >
        {isPlaying ? (
          <Pause aria-hidden className="size-9 fill-white sm:size-11" />
        ) : (
          <Play aria-hidden className="ml-1 size-9 fill-white sm:size-11" />
        )}
      </button>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-5 bottom-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        <div className="h-1.5 overflow-hidden rounded-full bg-white/35 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <div
            className="h-full rounded-full bg-primary-400 transition-[width]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </article>
  );
}

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
        <Reveal className="relative mx-auto max-w-content px-4 sm:px-6">
          <p className="text-2xl font-bold uppercase leading-8 text-primary-400">
            Channel Partners
          </p>
          <h2 className="mt-6 text-4xl font-bold text-white sm:text-[54px] sm:leading-[62px]">
            Why our Channel Partners Trust Us
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto -mt-52 max-w-[1652px] px-4 sm:px-6 xl:px-0">
        {/* Wrapper rather than the track itself; the track owns trackRef for
            the pager, and Reveal keeps its own ref. */}
        <Reveal>
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 xl:gap-[45px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {videos.map((video) => (
              <VideoCard key={video.src} video={video} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-6 flex items-center justify-between">
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
        </Reveal>

        <Reveal className="flex flex-wrap justify-center gap-10 pb-24 pt-16 md:pb-[calc(var(--spacing-section)*2)] lg:-mt-2 lg:pt-0">
          <ContactModalTrigger
            className="rounded-full border border-primary-950 px-8 py-3 text-lg font-bold text-primary-950 transition hover:bg-primary-50"
          >
            Become a Channel Partner
          </ContactModalTrigger>
        </Reveal>
      </div>
    </section>
  );
}
