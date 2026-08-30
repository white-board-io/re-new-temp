"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { ContactModalTrigger } from "@/components/contact-modal";
import { Reveal } from "@/components/reveal";

const videos = [
  {
    src: "/videos/channel-partners/partners-in-success-p3.webm",
    poster: "/images/channel-partners/CP-1.webp",
    title: "Partners in success P3",
    desktopSize: "xl:h-[510px] xl:w-[803px]",
  },
  {
    src: "/videos/channel-partners/partners-in-success-rev3.webm",
    poster: "/images/channel-partners/CP-2.webp",
    title: "Partners in success rev3",
    desktopSize: "xl:h-[510px] xl:w-[793px]",
  },
  {
    src: "/videos/channel-partners/partners-in-success-suntrik-vinay-bansal.webm",
    poster: "/images/channel-partners/CP-3.webp",
    title: "Partners in success Suntrik Vinay Bansal",
    desktopSize: "xl:h-[510px] xl:w-[803px]",
  },
];

type ChannelPartnerVideo = (typeof videos)[number];

type VideoCardProps = {
  video: ChannelPartnerVideo;
  onOpen: (video: ChannelPartnerVideo) => void;
};

function VideoCard({ video, onOpen }: VideoCardProps) {
  return (
    <button
      type="button"
      aria-label={`Open ${video.title} video`}
      onClick={() => onOpen(video)}
      className={`group relative aspect-video w-[88%] shrink-0 snap-start overflow-hidden rounded-md bg-primary-950 md:w-[calc(50%-12px)] xl:aspect-auto ${video.desktopSize}`}
    >
      <Image
        src={video.poster}
        alt={video.title}
        fill
        sizes="(min-width: 1280px) 803px, (min-width: 768px) 50vw, 88vw"
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-primary-950/15 transition group-hover:bg-primary-950/25" />
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary-400 text-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition duration-200 group-hover:scale-105 group-hover:bg-primary-500 sm:size-24"
      >
        <Play className="ml-1 size-9 fill-white sm:size-11" />
      </span>
    </button>
  );
}

function VideoModal({
  video,
  onClose,
}: {
  video: ChannelPartnerVideo | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!video) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, video]);

  if (!video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-primary-950/80 p-4 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-6xl overflow-hidden rounded-md bg-primary-950 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
        <button
          type="button"
          aria-label="Close video"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/90 text-primary-950 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <X aria-hidden className="size-6" />
        </button>
        <video
          key={video.src}
          src={video.src}
          poster={video.poster}
          aria-label={video.title}
          controls
          autoPlay
          playsInline
          className="aspect-video w-full bg-primary-950 object-contain"
        />
      </div>
    </div>
  );
}

export function ChannelPartners() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [activeVideo, setActiveVideo] = useState<ChannelPartnerVideo | null>(null);

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
      <div className="relative overflow-hidden bg-primary-950 pb-64 pt-24 text-left md:text-center">
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
          <h2 className="mt-6 text-[28px] font-bold leading-[1.14] text-white sm:text-[34px] md:text-[54px] md:leading-[62px]">
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
              <VideoCard key={video.src} video={video} onOpen={setActiveVideo} />
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
              className="flex size-12 items-center justify-center rounded-md bg-neutral-200 text-neutral-600 transition enabled:hover:bg-neutral-300 disabled:opacity-40"
            >
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next videos"
              disabled={page >= pageCount - 1}
              onClick={() => scrollToPage(page + 1)}
              className="flex size-12 items-center justify-center rounded-md bg-neutral-200 text-neutral-600 transition enabled:hover:bg-neutral-300 disabled:opacity-40"
            >
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </div>
        </Reveal>

        <Reveal className="flex flex-wrap justify-center gap-10 pb-24 pt-16 md:pb-[calc(var(--spacing-section)*2)] lg:-mt-2 lg:pt-0">
          <ContactModalTrigger
            className="inline-flex min-h-10 min-w-[168px] items-center justify-center rounded-full border border-primary-950 px-8 py-0 text-base font-bold text-primary-950 transition hover:bg-primary-50 md:py-3 md:text-lg"
          >
            Become a Channel Partner
          </ContactModalTrigger>
        </Reveal>
      </div>
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}
