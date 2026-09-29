"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ContactModalTrigger } from "@/components/contact-modal";

const SLIDE_COUNT = 4;
const SLIDE_DURATION_MS = 8100;
const FIRST_VIDEO_DURATION_MS = 10802;
const CAMPAIGN_VIDEO_DURATION_MS = 20008;
const SWIPE_THRESHOLD_PX = 48;
const SUBTEXT_SIZE_CLASS =
  "text-base sm:text-lg md:text-[22px] hero-full:text-[24px]";

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
  const firstVideoRef = useRef<HTMLVideoElement>(null);
  const campaignVideoRef = useRef<HTMLVideoElement>(null);
  const firstVideoStartedRef = useRef(false);
  const activeSlideRef = useRef(0);
  const previousSlideRef = useRef(-1);
  const videoIntersectionRef = useRef(false);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [videoVisible, setVideoVisible] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundBlocked, setSoundBlocked] = useState(false);
  const [firstVideoFailed, setFirstVideoFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    activeSlideRef.current = activeSlide;
  }, [activeSlide]);

  useEffect(() => {
    const video = firstVideoRef.current;
    if (!video) return;

    if (activeSlide !== 0) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    // Keep the initial autoplay position, then start from zero on each return.
    if (firstVideoStartedRef.current) video.currentTime = 0;
    firstVideoStartedRef.current = true;

    if (video.ended) {
      setActiveSlide(1);
      return;
    }

    video.play().then(
      () => setFirstVideoFailed(false),
      () => setFirstVideoFailed(true),
    );
  }, [activeSlide]);

  useEffect(() => {
    const video = campaignVideoRef.current;
    if (!video) return;

    const updateVisibility = () => {
      setVideoVisible(
        videoIntersectionRef.current && document.visibilityState === "visible",
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        videoIntersectionRef.current = entry.intersectionRatio >= 0.5;
        updateVisibility();
      },
      { threshold: [0, 0.5, 1] },
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const video = campaignVideoRef.current;
    if (!video) return;

    const enteringSlide = previousSlideRef.current !== activeSlide;
    previousSlideRef.current = activeSlide;

    if (activeSlide !== 1) {
      video.muted = true;
      video.pause();
      video.currentTime = 0;
      return;
    }

    if (enteringSlide) {
      video.pause();
      video.currentTime = 0;
    }

    video.muted = !videoVisible || !soundEnabled;
    video.play().then(
      () => {
        setVideoFailed(false);
        if (!video.muted) setSoundBlocked(false);
      },
      () => {
        if (video.muted) {
          setVideoFailed(true);
          return;
        }

        // Chrome and other browsers may require a user gesture before sound.
        // Keep the carousel moving with muted playback and offer a sound button.
        video.muted = true;
        setSoundBlocked(true);
        video.play().then(
          () => setVideoFailed(false),
          () => setVideoFailed(true),
        );
      },
    );
  }, [activeSlide, videoVisible, soundEnabled]);

  useEffect(() => {
    if ((activeSlide === 0 && !firstVideoFailed) ||
        (activeSlide === 1 && !videoFailed)) return;

    const timeout = window.setTimeout(() => {
      setActiveSlide((slide) => (slide + 1) % SLIDE_COUNT);
    }, activeSlide === 0
      ? FIRST_VIDEO_DURATION_MS
      : activeSlide === 1
        ? CAMPAIGN_VIDEO_DURATION_MS
        : SLIDE_DURATION_MS);

    return () => window.clearTimeout(timeout);
  }, [activeSlide, firstVideoFailed, videoFailed]);

  const toggleSound = () => {
    const video = campaignVideoRef.current;
    if (!video) return;

    if (!video.muted) {
      video.muted = true;
      setSoundEnabled(false);
      return;
    }

    // This runs inside the click gesture, which can unlock sound after an
    // earlier automatic attempt was blocked by the browser.
    video.muted = false;
    setSoundEnabled(true);
    video.play().then(
      () => {
        setVideoFailed(false);
        setSoundBlocked(false);
      },
      () => {
        video.muted = true;
        setSoundBlocked(true);
        video.play().catch(() => setVideoFailed(true));
      },
    );
  };

  useEffect(() => {
    if (activeSlide !== 1 || !videoVisible || !soundEnabled || !soundBlocked) {
      return;
    }

    const retrySound = () => {
      const video = campaignVideoRef.current;
      if (!video || !video.muted) return;

      // A click anywhere on the page can unlock audio after muted autoplay.
      video.muted = false;
      video.play().then(
        () => setSoundBlocked(false),
        () => {
          video.muted = true;
        },
      );
    };

    window.addEventListener("click", retrySound);
    return () => window.removeEventListener("click", retrySound);
  }, [activeSlide, videoVisible, soundEnabled, soundBlocked]);

  const selectSlide = (i: number) => {
    activeSlideRef.current = i;
    setActiveSlide(i);
  };

  const selectAdjacentSlide = (direction: 1 | -1) => {
    const nextSlide = activeSlideRef.current + direction;
    if (nextSlide < 0 || nextSlide >= SLIDE_COUNT) return;

    selectSlide(nextSlide);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLElement>) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (!start) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const isHorizontalSwipe =
      Math.abs(deltaX) >= SWIPE_THRESHOLD_PX &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

    if (!isHorizontalSwipe) return;

    selectAdjacentSlide(deltaX < 0 ? 1 : -1);
  };

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
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerEnd}
      onPointerCancel={() => {
        pointerStartRef.current = null;
      }}
      className="relative min-h-[calc(100svh-88px)] w-full touch-pan-y overflow-hidden bg-primary-900 md:min-h-0 lg:[clip-path:polygon(0_0,100%_0,100%_calc(100%-56px),calc(100%-56px)_100%,56px_100%,0_calc(100%-56px))]"
    >
      {/* Slide 1 */}
      <div className={slideClass(0)} aria-hidden={activeSlide !== 0}>
        <video
          ref={firstVideoRef}
          src="/videos/ReNew Banner1.webm"
          autoPlay
          muted
          playsInline
          aria-hidden
          onEnded={() => {
            if (activeSlideRef.current === 0) selectSlide(1);
          }}
          onError={() => setFirstVideoFailed(true)}
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
          <p
            className={`mt-6 leading-relaxed text-white md:mt-8 ${SUBTEXT_SIZE_CLASS}`}
          >
            When you put solar on your roof, the manufacturer matters.
          </p>
          <EnquireButton className="mt-10 md:mt-16" />
        </div>
      </div>

      {/* Slide 2 — ReNew's 15-year clean energy journey */}
      <div className={slideClass(1)} aria-hidden={activeSlide !== 1}>
        <div className="absolute inset-0 bg-[#2e6d42]" />
        <Image
          src="/images/sunburst_full.svg"
          alt=""
          width={702}
          height={701}
          className="pointer-events-none absolute -right-20 -top-24 w-[260px] animate-sunburst opacity-20 motion-reduce:animate-none md:-right-28 md:-top-36 md:w-[370px] xl:-right-28 xl:-top-52 xl:w-[520px]"
        />
        <div
          className={`hero-campaign-content relative flex h-full flex-col items-center justify-center gap-7 px-5 pb-16 pt-8 font-[family-name:var(--font-inter)] sm:gap-8 sm:px-8 md:flex-row md:gap-[5vw] md:px-[6.9vw] md:py-12 xl:gap-[8vw] ${contentClass(1)}`}
        >
          <div className="relative w-full max-w-[936px] shrink-0 overflow-hidden bg-black md:w-[55%]">
            <video
              ref={campaignVideoRef}
              src="/videos/Renew_Solar_Hindi_20s.webm"
              poster="/images/renew-solar-hindi-poster.png"
              preload="auto"
              playsInline
              aria-label="ReNew Solar's clean energy journey"
              onEnded={() => selectSlide(2)}
              onError={() => setVideoFailed(true)}
              className="aspect-video w-full object-cover"
            />
            {videoVisible && activeSlide === 1 && (
              <button
                type="button"
                onClick={toggleSound}
                aria-label={soundEnabled && !soundBlocked ? "Mute sound" : "Enable sound"}
                className="absolute bottom-3 right-3 rounded-full bg-black/75 px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-black/90 sm:bottom-4 sm:right-4 sm:text-sm"
              >
                {soundEnabled && !soundBlocked ? "Mute sound" : "Enable sound"}
              </button>
            )}
          </div>
          <div className="relative z-10 flex w-full max-w-[300px] min-w-0 flex-none flex-col items-center text-center md:max-w-none md:flex-1 md:items-start md:text-left">
            <h2 className="hero-campaign-heading text-[32px] font-bold leading-[1.1] tracking-[0.02em] text-[#a0cd55] sm:text-[42px] md:text-[clamp(31px,3.3vw,64px)]">
              Clean Energy<br />Humse Hai
            </h2>
            <p className="hero-campaign-copy mt-5 text-[18px] leading-[1.3] tracking-[0.02em] text-white sm:text-[22px] md:mt-8 md:text-[clamp(19px,1.6vw,30px)]">
              15 years of powering<br />
              <strong className="font-bold">India&apos;s clean energy transformation</strong>
            </p>
            <a
              href="https://www.renew.com/clean-energy-humse-hai"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-campaign-cta mt-7 inline-flex min-h-11 min-w-[210px] items-center justify-center rounded-full bg-[#a0cd55] px-8 text-[16px] font-medium text-[#132a00] transition-colors hover:bg-[#8dc63f] md:mt-12 md:min-w-[240px] xl:min-w-[280px] xl:text-[20px]"
            >
              Explore the Journey
            </a>
          </div>
        </div>
      </div>

      {/* Slide 3 — the company behind India's clean energy transition */}
      <div className={slideClass(2)} aria-hidden={activeSlide !== 2}>
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
          className={`relative flex h-full items-start pb-28 pl-5 pr-16 pt-28 sm:pl-[9.25vw] sm:pr-20 sm:pt-[17.5vh] md:items-center md:px-[9.25vw] md:pb-20 md:pt-10 hero-full:py-10 ${contentClass(2)}`}
        >
          <div className="max-w-[760px] text-white">
            <h2 className="text-[26px] font-bold leading-[1.14] tracking-[0.02em] sm:text-[32px] md:text-[40px] hero-full:text-[44px]">
              <span className="lg:block">
                The company behind the world&apos;s
              </span>{" "}
              <span className="lg:block">clean energy transition.</span>{" "}
              <span className="lg:block">Now making the solar panels too.</span>
            </h2>
            <p
              className={`mt-6 leading-[1.55] tracking-[0.025em] text-white md:mt-8 hero-full:mt-10 ${SUBTEXT_SIZE_CLASS}`}
            >
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

      {/* Slide 4 — net zero. The panel art is already near-black, so this slide
          skips the film and lets the sunburst read at full strength. */}
      <div className={slideClass(3)} aria-hidden={activeSlide !== 3}>
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
          className={`relative flex h-full flex-col items-start justify-center py-16 pl-5 pr-16 text-left sm:pl-6 sm:pr-20 md:px-6 xl:px-[181px] hero-full:py-24 ${contentClass(3)}`}
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
          <p
            className={`mt-5 font-medium leading-relaxed tracking-hero text-white md:mt-6 xl:mt-[34px] xl:leading-10 ${SUBTEXT_SIZE_CLASS}`}
          >
            6.5 GW Integrated Module Capacity
            <br />
            Three World-Class Plants
          </p>
          <ContactModalTrigger className="mt-8 inline-flex min-h-10 min-w-[168px] items-center justify-center rounded-full bg-primary-400 px-8 text-base font-medium text-white transition-colors hover:bg-accent md:mt-10 md:min-h-[45px] md:min-w-[204px] md:px-8 md:text-xl xl:mt-[62px]">
            Enquire Now
          </ContactModalTrigger>
        </div>
      </div>

      {/* Shared slide progress */}
      <div
        className="absolute inset-x-0 bottom-7 flex items-center justify-center gap-2 md:bottom-6 md:gap-4 hero-full:bottom-14"
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
                    animationDuration: `${i === 0 ? FIRST_VIDEO_DURATION_MS : i === 1 ? CAMPAIGN_VIDEO_DURATION_MS : SLIDE_DURATION_MS}ms`,
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
