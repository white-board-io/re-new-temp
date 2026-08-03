"use client";

import Image from "next/image";
import { useState } from "react";

const SLIDE_COUNT = 3;
// Every slide stays visible for the full length of hero.mp4 (8.03s, rounded).
const SLIDE_DURATION_MS = 8100;

function EnquireButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#contact"
      className={`rounded-full bg-accent px-11 py-2.5 text-xl font-medium text-white transition-colors hover:bg-primary-400 ${className}`}
    >
      Enquire Now
    </a>
  );
}

function SlideFilm() {
  return <div aria-hidden className="absolute inset-0 bg-black/35" />;
}

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

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
      activeSlide === i
        ? "translate-y-0 opacity-100"
        : "translate-y-8 opacity-0"
    }`;

  // From md up, the first-fold grid owns the height: the hero drops its own
  // floor and absorbs whatever the viewport leaves after the stats bar. Slide
  // content is therefore centred rather than pinned, so it rides the squeeze.
  return (
    <section
      aria-roledescription="carousel"
      className="relative min-h-[640px] overflow-hidden bg-primary-900 md:min-h-0 lg:[clip-path:polygon(0_0,100%_0,100%_calc(100%-56px),calc(100%-56px)_100%,56px_100%,0_calc(100%-56px))]"
    >
      {/* Slide 1 */}
      <div className={slideClass(0)} aria-hidden={activeSlide !== 0}>
        <video
          src="/videos/ReNew Banner1.webm"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
          className="absolute inset-0 size-full object-cover object-[center_60%]"
        />
        <SlideFilm />
        <div
          className={`relative flex h-full flex-col items-start justify-center px-5 pb-24 pt-10 text-left sm:px-6 xl:px-[181px] xl:justify-start xl:pt-[130px] ${contentClass(0)}`}
        >
          <h1 className="max-w-6xl text-4xl font-bold leading-[0.95] tracking-hero text-white sm:text-5xl lg:text-5xl xl:max-w-[880px] xl:text-[54px] xl:leading-[50px]">
            Switch to clean energy with ReNew Solar Panels, engineered for
            lasting performance.
          </h1>
          <p className="mt-8 text-lg leading-snug text-white sm:text-xl">
            When you put solar on your roof, the manufacturer matters.
          </p>
          <EnquireButton className="mt-16" />
        </div>
      </div>

      {/* Slide 2 — the company behind India's clean energy transition */}
      <div className={slideClass(1)} aria-hidden={activeSlide !== 1}>
        <video
          src="/videos/ReNew banner2.webm"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
          className="absolute inset-0 size-full object-cover"
        />
        <SlideFilm />
        <div
          className={`relative flex h-full items-start px-5 pb-28 pt-28 sm:px-[9.25vw] sm:pt-[17.5vh] md:items-center md:pb-20 md:pt-10 hero-full:py-10 ${contentClass(1)}`}
        >
          <div className="max-w-[760px] text-white">
            <h2 className="text-[32px] font-bold leading-[1.12] tracking-[0.02em] sm:text-[40px] hero-full:text-[44px]">
              <span className="lg:block">
                The company behind the world&apos;s
              </span>{" "}
              <span className="lg:block">clean energy transition.</span>{" "}
              <span className="lg:block">Now making the solar panels too.</span>
            </h2>
            <p className="mt-8 text-[20px] leading-[1.55] tracking-[0.025em] text-white sm:text-[22px] hero-full:mt-10 hero-full:text-[24px]">
              20 GW portfolio
              <br />
              18.6M+ tonnes of CO₂ avoided
              <br />
              End-to-end decarbonisation solutions
            </p>
            <a
              href="https://www.renew.com/"
              className="mt-10 inline-flex min-h-11 min-w-[204px] items-center justify-center rounded-full bg-accent px-10 text-[20px] font-medium text-white transition-colors hover:bg-primary-400 hero-full:mt-14"
            >
              Visit ReNew
            </a>
          </div>
        </div>
      </div>

      {/* Slide 3 — net zero. The panel art is already near-black, so this slide
          skips the film and lets the sunburst read at full strength. */}
      <div className={slideClass(2)} aria-hidden={activeSlide !== 2}>
        <Image
          src="/images/banner_3.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Sunburst ring. At xl it takes its design placement: two thirds
            across, overhanging the top edge by a fifth of its own diameter.
            Narrower than that the headline claims the full width, so the ring
            retreats into the top-right corner rather than crossing the copy. */}
        <div className="pointer-events-none absolute right-[-18%] top-0 w-[min(80vw,420px)] -translate-y-[55%] sm:-translate-y-[68%] xl:left-[66.8%] xl:right-auto xl:w-[45vw] xl:-translate-y-[20.3%]">
          <Image
            src="/images/sunburst_full.svg"
            alt=""
            width={702}
            height={701}
            className="w-full animate-sunburst motion-reduce:animate-none"
          />
        </div>
        <div
          className={`relative flex h-full flex-col items-start justify-center px-5 pb-24 pt-10 text-left sm:px-6 xl:justify-start xl:px-[181px] xl:pt-[148px] ${contentClass(2)}`}
        >
          <h2 className="max-w-[661px] text-[40px] font-bold leading-[1.05] tracking-hero text-white sm:text-[56px] xl:text-[80px] xl:leading-[80px]">
            <span className="xl:block">
              Net <span className="text-primary-400">zero</span> does
            </span>{" "}
            <span className="xl:block">not wait.</span>{" "}
            <span className="xl:block">Neither do we.</span>
          </h2>
          <p className="mt-6 text-lg font-medium leading-[1.4] tracking-hero text-white sm:text-xl xl:mt-[34px] xl:text-2xl xl:leading-10">
            6.5 GW Integrated Module Capacity
            <br />
            Three World-Class Plants
          </p>
          <a
            href="#contact"
            className="mt-10 inline-flex min-h-[45px] min-w-[204px] items-center justify-center rounded-full bg-primary-400 px-8 text-xl font-medium text-white transition-colors hover:bg-accent xl:mt-[62px]"
          >
            Enquire Now
          </a>
        </div>
      </div>

      {/* Shared slide progress */}
      <div
        className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-4 hero-full:bottom-14"
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
            className="flex h-8 w-[88px] items-center"
          >
            <span className="h-2 w-full overflow-hidden rounded-lg bg-white">
              {activeSlide === i && (
                <span
                  aria-hidden
                  className="hero-progress-fill block h-full w-full bg-primary-400"
                  style={{
                    animationDuration: `${SLIDE_DURATION_MS}ms`,
                  }}
                  onAnimationEnd={() =>
                    setActiveSlide((slide) => (slide + 1) % SLIDE_COUNT)
                  }
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
