"use client";

import Image from "next/image";
import { useState } from "react";

const SLIDE_COUNT = 3;
// Every slide stays visible for the full length of hero.mp4 (8.03s, rounded).
const SLIDE_DURATION_MS = 8100;

const plants = [
  {
    name: "Jaipur",
    src: "/images/state-jaipur.svg",
    width: 135,
    height: 111,
    offset: "",
  },
  {
    name: "Dholera",
    src: "/images/state-dholera.svg",
    width: 99,
    height: 144,
    offset: "mt-14",
  },
  {
    name: "Vizag",
    src: "/images/state-vizag.svg",
    width: 158,
    height: 122,
    offset: "mt-4",
  },
];

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

  return (
    <section
      aria-roledescription="carousel"
      className="relative min-h-[640px] overflow-hidden bg-primary-900 lg:min-h-[560px]"
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% calc(100% - 56px), calc(100% - 56px) 100%, 56px 100%, 0 calc(100% - 56px))",
      }}
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
          className={`relative flex h-full flex-col items-center justify-center px-4 pb-24 pt-10 text-center sm:px-6 xl:justify-start xl:pt-[130px] ${contentClass(0)}`}
        >
          <h1 className="max-w-6xl text-4xl font-bold leading-[0.95] tracking-hero text-white sm:text-5xl lg:text-5xl xl:max-w-[1240px] xl:text-[54px] xl:leading-[50px]">
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
          className={`relative flex h-full items-start px-5 pb-28 pt-28 sm:px-[9.25vw] sm:pt-[17.5vh] lg:pt-[148px] xl:pt-[160px] ${contentClass(1)}`}
        >
          <div className="max-w-[760px] text-white">
            <h2 className="text-[32px] font-bold leading-[1.12] tracking-[0.02em] sm:text-[40px] lg:text-[44px]">
              <span className="lg:block">
                The company behind the world&apos;s
              </span>{" "}
              <span className="lg:block">clean energy transition.</span>{" "}
              <span className="lg:block">Now making the solar panels too.</span>
            </h2>
            <p className="mt-8 text-[20px] leading-[1.55] tracking-[0.025em] text-white sm:text-[22px] lg:mt-10 lg:text-[24px]">
              20 GW portfolio
              <br />
              18.6M+ tonnes of CO₂ avoided
              <br />
              End-to-end decarbonisation solutions
            </p>
            <a
              href="https://www.renew.com/"
              className="mt-10 inline-flex min-h-11 min-w-[204px] items-center justify-center rounded-full bg-accent px-10 text-[20px] font-medium text-white transition-colors hover:bg-primary-400 lg:mt-14"
            >
              Visit ReNew
            </a>
          </div>
        </div>
      </div>

      {/* Slide 3 — net zero */}
      <div className={slideClass(2)} aria-hidden={activeSlide !== 2}>
        <Image
          src="/images/ReNew Banner3.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <SlideFilm />
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
            3 plants{" "}
            <span aria-hidden className="mx-3 opacity-60">
              |
            </span>
            23,000 modules a day
            <span aria-hidden className="mx-3 opacity-60">
              |
            </span>
            30-year power warranty
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

      {/* Shared slide progress */}
      <div
        className="absolute inset-x-0 bottom-14 flex items-center justify-center gap-4"
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
