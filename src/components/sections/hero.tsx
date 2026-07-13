"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SLIDE_COUNT = 3;
// Slide 1 runs for the full length of hero.mp4 (8.03s, hardcoded).
const SLIDE_DURATIONS_MS = [8100, 7000, 7000];

const plants = [
  { name: "Jaipur", src: "/images/state-jaipur.svg", width: 135, height: 111, offset: "" },
  { name: "Dholera", src: "/images/state-dholera.svg", width: 99, height: 144, offset: "mt-14" },
  { name: "Vizag", src: "/images/state-vizag.svg", width: 158, height: 122, offset: "mt-4" },
];

function EnquireButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#contact"
      className={`rounded-full bg-accent px-8 py-2.5 text-xl font-medium text-white transition-colors hover:bg-primary-400 ${className}`}
    >
      Enquire Now
    </a>
  );
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  // Auto-advance; restarts its window on any slide change (so a manual dot
  // click gets a full interval before moving on). Hovering pauses the reading
  // slides, but the video slide always hands off when the video ends.
  useEffect(() => {
    if (hovered && activeSlide !== 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(
      () => setActiveSlide((slide) => (slide + 1) % SLIDE_COUNT),
      SLIDE_DURATIONS_MS[activeSlide],
    );
    return () => clearTimeout(timer);
  }, [hovered, activeSlide]);

  // The background video restarts each time its slide comes back into view.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (activeSlide !== 0) {
      video.pause();
    } else if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, [activeSlide]);

  const selectSlide = (i: number) => setActiveSlide(i);

  // Slides crossfade while settling from a slight zoom; their content rises
  // into place a beat later for a staggered entrance.
  const slideClass = (i: number) =>
    `absolute inset-0 transition duration-700 ease-out motion-reduce:transition-none ${
      activeSlide === i
        ? "scale-100 opacity-100"
        : "pointer-events-none scale-[1.04] opacity-0"
    }`;

  const contentClass = (i: number) =>
    `transition delay-150 duration-700 ease-out motion-reduce:transition-none ${
      activeSlide === i ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
    }`;

  return (
    <section
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative min-h-[640px] overflow-hidden bg-primary-900 lg:min-h-[560px]"
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% calc(100% - 56px), calc(100% - 56px) 100%, 56px 100%, 0 calc(100% - 56px))",
      }}
    >
      {/* Slide 1 — video */}
      <div className={slideClass(0)} aria-hidden={activeSlide !== 0}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          poster="/images/hero-poster.webp"
          className={`absolute inset-0 size-full object-cover motion-reduce:-translate-x-[10.8%] motion-reduce:scale-[1.22] motion-reduce:animate-none ${
            activeSlide === 0 ? "animate-hero-pan" : ""
          }`}
          aria-hidden
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div
          className={`relative flex h-full flex-col items-center justify-center px-4 pb-24 pt-10 text-center sm:px-6 ${contentClass(0)}`}
        >
          <h1 className="max-w-5xl text-4xl font-bold leading-[0.95] tracking-hero text-white sm:text-5xl lg:text-6xl">
            Choose India&apos;s
            <br />
            most reliable solar panels
          </h1>
          <p className="mt-8 text-lg leading-snug text-white sm:text-xl">
            When you put solar on your roof,
            <br />
            the manufacturer matters.
          </p>
          <EnquireButton className="mt-20" />
        </div>
      </div>

      {/* Slide 2 — the company behind India's clean energy transition */}
      <div className={slideClass(1)} aria-hidden={activeSlide !== 1}>
        <Image
          src="/images/hero-slide2-bg.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className={`relative mx-auto grid h-full max-w-content items-center gap-10 px-4 pb-24 pt-10 sm:px-6 lg:grid-cols-[24rem_1fr] lg:gap-16 ${contentClass(1)}`}
        >
          <div>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              The company behind India&apos;s clean energy transition. Now making the panels
              too.
            </h2>
            <p className="mt-8 max-w-xs text-lg leading-7 text-white/90 sm:text-xl">
              ReNew Solar Panels is backed by ReNew - the manufacturing arm of India&apos;s
              decarbonisation leader.
            </p>
            <EnquireButton className="mt-10 inline-block" />
          </div>
          <Image
            src="/images/world-map.webp"
            alt="World map showing ReNew's global reach"
            width={1486}
            height={982}
            className="mx-auto hidden w-full max-w-3xl lg:block"
          />
        </div>
      </div>

      {/* Slide 3 — net zero */}
      <div className={slideClass(2)} aria-hidden={activeSlide !== 2}>
        <div className="absolute inset-0 bg-primary-700" />
        <Image
          src="/images/sunburst.svg"
          alt=""
          width={608}
          height={314}
          className="absolute -left-[204px] top-1/2 w-[608px] -translate-y-1/2 -rotate-90"
        />
        <Image
          src="/images/sunburst.svg"
          alt=""
          width={608}
          height={314}
          className="absolute -right-[204px] top-1/2 w-[608px] -translate-y-1/2 rotate-90"
        />
        <div
          className={`relative flex h-full flex-col items-center justify-center px-4 pb-20 pt-6 text-center sm:px-6 ${contentClass(2)}`}
        >
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Net zero does not wait.
            <br />
            Neither do we.
          </h2>
          <p className="mt-5 text-lg text-white sm:text-2xl">
            6.4 GW of capacity{" "}
            <span aria-hidden className="mx-3 opacity-60">
              |
            </span>
            Three world-class plants{" "}
            <span aria-hidden className="mx-3 opacity-60">
              |
            </span>
            One mission.
          </p>
          <div className="mt-8 flex items-start justify-center gap-10 sm:gap-16">
            {plants.map((plant) => (
              <figure key={plant.name} className={plant.offset}>
                <Image
                  src={plant.src}
                  alt=""
                  width={plant.width}
                  height={plant.height}
                  className="mx-auto h-16 w-auto sm:h-20 lg:h-24"
                />
                <figcaption className="mt-2 text-lg font-bold text-white">
                  {plant.name}
                </figcaption>
              </figure>
            ))}
          </div>
          <EnquireButton className="mt-8" />
        </div>
      </div>

      {/* Shared slide dots */}
      <div
        className="absolute inset-x-0 bottom-14 flex items-center justify-center gap-6"
        role="tablist"
        aria-label="Hero slides"
      >
        {Array.from({ length: SLIDE_COUNT }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={activeSlide === i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => selectSlide(i)}
            className={`size-4 rounded-full transition ${
              activeSlide === i ? "bg-primary-950 ring-2 ring-white" : "bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
