"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
    module: "Bifacial 540 Wp Mono PERC",
    developer: "ReNew",
    offtaker: "Solar Energy Corporation of India",
    location: "Rajasthan",
    image: "/images/project-40mwp.webp",
    alt: "Aerial view of ReNew's 40 MWp project site in Rajasthan",
    objectPosition: "center 52%",
  },
];

export function ProjectShowcase() {
  const trackRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [trackHeight, setTrackHeight] = useState("400svh");

  useEffect(() => {
    let frame = 0;

    const getStickyMetrics = () => {
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      const stickyTop = wide ? 136 : 120;
      const minHeight = wide ? 640 : 560;
      const stickyHeight = Math.max(window.innerHeight - stickyTop, minHeight);

      return { stickyTop, stickyHeight };
    };

    const update = () => {
      const track = trackRef.current;
      if (!track) return;

      const { stickyTop, stickyHeight } = getStickyMetrics();
      setTrackHeight(`${stickyHeight * (PROJECT_SLIDES.length + 1)}px`);

      const progress = Math.max(0, stickyTop - track.getBoundingClientRect().top);
      const nextSlide = Math.min(
        PROJECT_SLIDES.length - 1,
        Math.max(0, Math.floor(progress / stickyHeight)),
      );

      setActiveSlide((current) => (current === nextSlide ? current : nextSlide));
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
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
      <div className="sticky top-[120px] h-[calc(100svh-120px)] min-h-[560px] overflow-hidden lg:top-[136px] lg:h-[calc(100svh-136px)] lg:min-h-[640px]">
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

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.48)_0%,rgba(0,0,0,0.24)_38%,rgba(0,0,0,0.1)_100%)]" />

        <div className="relative mx-auto flex h-full max-w-content items-center px-4 sm:px-6">
          <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 flex-col gap-5 md:flex lg:-left-16 xl:-left-14">
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

                    const wide = window.matchMedia("(min-width: 1024px)").matches;
                    const stickyTop = wide ? 136 : 120;
                    const minHeight = wide ? 640 : 560;
                    const stickyHeight = Math.max(window.innerHeight - stickyTop, minHeight);
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

          <div className="max-w-2xl pl-0 text-white md:pl-24 lg:pl-20">
            <p className="text-5xl font-bold leading-none text-accent sm:text-[64px]">
              {PROJECT_SLIDES[activeSlide].capacity}
            </p>

            <dl className="mt-8 space-y-5 text-xl leading-8 sm:mt-10 sm:text-2xl sm:leading-9">
              <div>
                <dt className="font-bold">Module</dt>
                <dd>{PROJECT_SLIDES[activeSlide].module}</dd>
              </div>
              <div>
                <dt className="font-bold">Developer</dt>
                <dd>{PROJECT_SLIDES[activeSlide].developer}</dd>
              </div>
              <div>
                <dt className="font-bold">Offtaker</dt>
                <dd>{PROJECT_SLIDES[activeSlide].offtaker}</dd>
              </div>
              <div>
                <dt className="font-bold">Location</dt>
                <dd>{PROJECT_SLIDES[activeSlide].location}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
