"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ContactModalTrigger } from "@/components/contact-modal";

const SLIDE_COUNT = 3;
// Every slide stays visible for roughly one full background-video loop.
const SLIDE_DURATION_MS = 8100;

function EnquireButton({ className = "" }: { className?: string }) {
  return (
    <ContactModalTrigger
      className={`inline-flex min-h-10 min-w-[168px] items-center justify-center rounded-full bg-accent px-8 py-0 text-base font-medium text-white transition-colors hover:bg-primary-400 md:px-11 md:py-2.5 md:text-xl ${className}`}
    >
      Enquire Now
    </ContactModalTrigger>
  );
}

function SlideFilm() {
  return <div aria-hidden className="absolute inset-0 bg-black/35" />;
}

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setActiveSlide((slide) => (slide + 1) % SLIDE_COUNT);
    }, SLIDE_DURATION_MS);

    return () => window.clearTimeout(timeout);
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
      className="relative min-h-[calc(100svh-88px)] w-full overflow-hidden bg-primary-900 md:min-h-0 lg:[clip-path:polygon(0_0,100%_0,100%_calc(100%-56px),calc(100%-56px)_100%,56px_100%,0_calc(100%-56px))]"
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
          className={`relative flex h-full flex-col items-start justify-center py-16 pl-5 pr-16 text-left sm:pl-6 sm:pr-20 md:px-6 xl:px-[181px] hero-full:py-24 ${contentClass(0)}`}
        >
          <h1 className="max-w-6xl text-[28px] font-bold leading-[1.14] tracking-hero text-white sm:text-[34px] md:text-5xl lg:text-5xl xl:max-w-[880px] xl:text-[54px]">
            Switch to clean energy with ReNew Solar Panels, engineered for
            lasting performance.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white sm:text-[17px] md:mt-8 md:text-xl">
            When you put solar on your roof, the manufacturer matters.
          </p>
          <EnquireButton className="mt-10 md:mt-16" />
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
          className={`relative flex h-full items-start pb-28 pl-5 pr-16 pt-28 sm:pl-[9.25vw] sm:pr-20 sm:pt-[17.5vh] md:items-center md:px-[9.25vw] md:pb-20 md:pt-10 hero-full:py-10 ${contentClass(1)}`}
        >
          <div className="max-w-[760px] text-white">
            <h2 className="text-[26px] font-bold leading-[1.14] tracking-[0.02em] sm:text-[32px] md:text-[40px] hero-full:text-[44px]">
              <span className="lg:block">
                The company behind the world&apos;s
              </span>{" "}
              <span className="lg:block">clean energy transition.</span>{" "}
              <span className="lg:block">Now making the solar panels too.</span>
            </h2>
            <p className="mt-6 text-base leading-[1.55] tracking-[0.025em] text-white sm:text-lg md:mt-8 md:text-[22px] hero-full:mt-10 hero-full:text-[24px]">
              20 GW portfolio
              <br />
              18.6M+ tonnes of CO₂ avoided
              <br />
              End-to-end decarbonisation solutions
            </p>
            <a
              href="https://www.renew.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-10 min-w-[168px] items-center justify-center rounded-full bg-accent px-8 text-base font-medium text-white transition-colors hover:bg-primary-400 md:mt-10 md:min-h-11 md:min-w-[204px] md:px-10 md:text-[20px] hero-full:mt-14"
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
          className={`relative flex h-full flex-col items-start justify-center py-16 pl-5 pr-16 text-left sm:pl-6 sm:pr-20 md:px-6 xl:px-[181px] hero-full:py-24 ${contentClass(2)}`}
        >
          {/* Shares slide 1's headline scale so the carousel keeps one type
              size as it cycles. "Net zero does not wait." holds one line from
              xl up: it needs ~590px at 54px, and the sunburst starts 1101px
              into the copy column, so no viewport-based clamp is required. */}
          <h2 className="max-w-[661px] text-[28px] font-bold leading-[1.14] tracking-hero text-white sm:text-[34px] md:text-5xl xl:max-w-none xl:text-[54px]">
            <span className="xl:block">
              Net <span className="text-primary-400">zero</span> does not wait.
            </span>{" "}
            <span className="xl:block">Neither do we.</span>
          </h2>
          <p className="mt-5 text-base font-medium leading-relaxed tracking-hero text-white sm:text-[17px] md:mt-6 md:text-xl xl:mt-[34px] xl:text-2xl xl:leading-10">
            6.5 GW Integrated Module Capacity
            <br />
            Three World-Class Plants
          </p>
          <ContactModalTrigger
            className="mt-8 inline-flex min-h-10 min-w-[168px] items-center justify-center rounded-full bg-primary-400 px-8 text-base font-medium text-white transition-colors hover:bg-accent md:mt-10 md:min-h-[45px] md:min-w-[204px] md:px-8 md:text-xl xl:mt-[62px]"
          >
            Enquire Now
          </ContactModalTrigger>
        </div>
      </div>

      {/* Shared slide progress */}
      <div
        className="absolute inset-x-0 bottom-7 flex items-center justify-start gap-2 pl-5 sm:pl-6 md:bottom-6 md:justify-center md:gap-4 md:pl-0 hero-full:bottom-14"
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
            className="flex size-8 items-center justify-center md:h-8 md:w-[88px] md:justify-start"
          >
            <span
              className={`relative size-2.5 overflow-hidden rounded-full transition-colors md:h-2 md:w-full md:rounded-md md:bg-white ${
                activeSlide === i ? "bg-primary-400" : "bg-white/80"
              }`}
            >
              {activeSlide === i && (
                <span
                  aria-hidden
                  className="hero-progress-fill absolute inset-0 block h-full w-full bg-primary-400 opacity-0 md:opacity-100"
                  style={{
                    animationDuration: `${SLIDE_DURATION_MS}ms`,
                  }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
