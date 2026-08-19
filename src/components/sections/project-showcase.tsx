"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";

const PROJECT_SLIDES = [
  {
    capacity: "1000 MWp",
    module: "Bifacial 540 Wp TOPConPERC",
    developer: "ReNew",
    offtaker: "Solar Energy Corporation of India",
    location: "Rajasthan",
    image: "/images/project-1000mwp.webp",
    alt: "Aerial view of ReNew's 1000 MWp solar project in Rajasthan",
    objectPosition: "center 58%",
  },
  {
    capacity: "80 MWp",
    module: "Bifacial 540 Wp Mono PERC",
    developer: "ReNew",
    offtaker: "Solar Energy Corporation of India",
    location: "Rajasthan",
    image: "/images/project-80mwp.webp",
    alt: "Solar panels across ReNew's 80 MWp project site in Rajasthan",
    objectPosition: "center",
  },
  {
    capacity: "40 MWp",
    module: "Monofacial 600 Wp Mono PERC",
    developer: "ReNew",
    offtaker: "Amazon",
    location: "Rajasthan",
    image: "/images/project-40mwp-updated.webp",
    alt: "Aerial view of ReNew's 40 MWp project site in Rajasthan",
    objectPosition: "center 52%",
  },
];

function getStickyMetrics() {
  const wide = window.matchMedia("(min-width: 1024px)").matches;
  const scaledDesktop = window.matchMedia("(min-width: 1280px)").matches;
  const designScale = scaledDesktop ? Math.min(1, window.innerWidth / 1920) : 1;
  const stickyTop = scaledDesktop ? 138 : wide ? 136 : 88;
  const minHeight = wide ? 640 : 560;
  const stickyHeight = Math.max(window.innerHeight / designScale - stickyTop, minHeight);

  return { stickyTop, stickyHeight };
}

export function ProjectShowcase() {
  const trackRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const activeSlideRef = useRef(0);
  const wheelLockRef = useRef(false);
  const [trackHeight, setTrackHeight] = useState("400svh");

  useEffect(() => {
    activeSlideRef.current = activeSlide;
  }, [activeSlide]);

  useEffect(() => {
    let frame = 0;
    let wheelLockTimer = 0;

    const scrollToSlide = (slideIndex: number, behavior: ScrollBehavior = "smooth") => {
      const track = trackRef.current;
      if (!track) return;

      const { stickyTop, stickyHeight } = getStickyMetrics();
      const top = track.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top - stickyTop + slideIndex * stickyHeight,
        behavior,
      });
    };

    const update = () => {
      const track = trackRef.current;
      if (!track) return;

      const { stickyTop, stickyHeight } = getStickyMetrics();
      setTrackHeight(`${stickyHeight * (PROJECT_SLIDES.length + 1)}px`);
      if (wheelLockRef.current) return;

      const progress = Math.max(0, stickyTop - track.getBoundingClientRect().top);
      const nextSlide = Math.min(
        PROJECT_SLIDES.length - 1,
        Math.max(0, Math.round(progress / stickyHeight)),
      );

      setActiveSlide((current) => (current === nextSlide ? current : nextSlide));
    };

    const handleWheel = (event: WheelEvent) => {
      const track = trackRef.current;
      if (!track || Math.abs(event.deltaY) < 1) return;

      const { stickyTop } = getStickyMetrics();
      const rect = track.getBoundingClientRect();
      const isStickyActive = rect.top <= stickyTop && rect.bottom > stickyTop;
      if (!isStickyActive) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const currentSlide = activeSlideRef.current;
      const nextSlide = currentSlide + direction;

      if (nextSlide < 0 || nextSlide >= PROJECT_SLIDES.length) {
        return;
      }

      event.preventDefault();
      if (wheelLockRef.current) return;

      wheelLockRef.current = true;
      setActiveSlide(nextSlide);
      activeSlideRef.current = nextSlide;
      scrollToSlide(nextSlide);

      window.clearTimeout(wheelLockTimer);
      wheelLockTimer = window.setTimeout(() => {
        wheelLockRef.current = false;
        requestUpdate();
      }, 900);
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(wheelLockTimer);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      id="projects"
      ref={trackRef}
      className="relative bg-primary-950"
      style={{ height: trackHeight }}
      aria-label="Featured ReNew solar projects"
    >
      <div className="sticky top-[88px] h-[calc(100dvh-88px)] min-h-[560px] overflow-hidden lg:top-[136px] lg:h-[calc(100svh-136px)] lg:min-h-[640px] xl:top-[138px] xl:h-[calc(100svh/var(--design-scale)-138px)]">
        <div className="absolute inset-0">
          {PROJECT_SLIDES.map((slide, index) => (
            <Image
              key={slide.capacity}
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              quality={90}
              style={{ objectPosition: slide.objectPosition }}
              className={`object-cover transition-opacity duration-700 ease-out ${
                activeSlide === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.48)_0%,rgba(0,0,0,0.24)_38%,rgba(0,0,0,0.1)_100%)]" />

        <div className="relative mx-auto flex h-full max-w-content items-start px-4 pt-16 sm:px-6 sm:pt-20 lg:pt-24">
          <div className="absolute bottom-8 left-4 flex gap-3 md:bottom-auto md:left-6 md:top-44 md:flex-col md:gap-5 lg:left-12 lg:top-48 xl:left-16">
            {PROJECT_SLIDES.map((slide, slideIndex) => {
              const isActive = slideIndex === activeSlide;

              return (
                <button
                  key={slide.capacity}
                  type="button"
                  aria-label={`Show ${slide.capacity} project`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => {
                    const track = trackRef.current;
                    if (!track) return;

                    const { stickyTop, stickyHeight } = getStickyMetrics();
                    const top = track.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                      top: top - stickyTop + slideIndex * stickyHeight,
                      behavior: "smooth",
                    });
                  }}
                  className={`size-3 rounded-full border transition ${
                    isActive
                      ? "scale-150 border-accent bg-transparent"
                      : "border-white/70 bg-white/70 hover:border-white hover:bg-white"
                  }`}
                />
              );
            })}
          </div>

          {/* One fade as the showcase arrives. Slide-to-slide changes are the
              scroll track's job, so this settles once and stays put. */}
          <Reveal className="max-w-2xl pl-0 text-white md:pl-20 lg:pl-24 xl:pl-28">
            <p className="text-5xl font-bold leading-none text-accent sm:text-[64px]">
              {PROJECT_SLIDES[activeSlide].capacity}
            </p>

            <dl className="mt-8 w-full max-w-[520px] text-base leading-6 sm:mt-10 sm:text-xl sm:leading-8">
              {(
                [
                  ["Module", PROJECT_SLIDES[activeSlide].module],
                  ["Developer", PROJECT_SLIDES[activeSlide].developer],
                  ["Offtaker", PROJECT_SLIDES[activeSlide].offtaker],
                  ["Location", PROJECT_SLIDES[activeSlide].location],
                ] as const
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="relative flex flex-wrap items-baseline gap-x-2 gap-y-1 py-2.5 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-[linear-gradient(90deg,var(--color-accent)_0%,rgba(255,255,255,0.58)_45%,rgba(255,255,255,0)_100%)]"
                >
                  <dt className="font-extrabold text-white md:font-bold">{label}:</dt>
                  <dd className="font-normal text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
