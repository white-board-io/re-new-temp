"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CountUp } from "@/components/count-up";

const plants = [
  {
    title: ["Jaipur,", "Rajasthan"],
    image: { src: "/images/Jaipur.webp", width: 648, height: 554 },
    imageClassName: "max-w-[480px]",
    alt: "Aerial view of the Jaipur, Rajasthan plant within the outline of Rajasthan state",
    caption: "4 GW module manufacturing capacity under a single roof.",
    mobileSummary: "4 GW module capacity under one roof.",
    details: "4 GW module manufacturing capacity under a single roof.",
  },
  {
    title: ["Dholera,", "Gujarat"],
    image: { src: "/images/_Dholera.webp", width: 478, height: 688 },
    imageClassName: "max-w-[332px]",
    alt: "Aerial view of the Dholera, Gujarat plant within the outline of Gujarat state",
    caption: "2.4 GW module manufacturing capacity across 55 acres.",
    mobileSummary: "2.4 GW capacity across 55 acres, with 4 GW TOPCon in development.",
    details:
      "(including a 4 GW TOPCon facility under development) and 2.4 GW module manufacturing capacity, spread across 55 acres in Gujarat's Special Investment Region. Equipped with AI-driven defect diagnostics and automated material movement systems.",
  },
  {
    title: ["Visakhapatnam,", "Andhra Pradesh"],
    image: { src: "/images/Visakhapatnam.webp", width: 710, height: 542 },
    imageClassName: "max-w-[500px]",
    alt: "Aerial view of the Visakhapatnam, Andhra Pradesh plant within the outline of Andhra Pradesh state",
    caption: "6.5 GW wafer and ingot manufacturing facility",
    mobileSummary: "6.5 GW wafer and ingot manufacturing facility",
    details: "6.5 GW wafer and ingot manufacturing facility",
    status: "(In pipeline)",
  },
];

const GROW = "md:duration-700 md:ease-[cubic-bezier(0.4,0,0.2,1)]";

export function Manufacturing() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="manufacturing"
      className="relative overflow-hidden bg-primary-950 py-16 text-white md:py-section"
    >
      <div className="pointer-events-none absolute right-[18%] top-0 w-[clamp(200px,42vw,608px)] -translate-y-1/2">
        <Image
          src="/images/sunburst_full-dark.svg"
          alt=""
          width={702}
          height={701}
          className="w-full animate-sunburst motion-reduce:animate-none"
        />
      </div>
      <div className="relative mx-auto max-w-content px-4 sm:px-6">
        <div className="flex flex-col gap-6 text-center md:gap-10 md:text-left lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-2xl font-bold uppercase leading-8">Manufacturing</p>
            <h2 className="mt-4 text-4xl font-bold sm:text-[54px] sm:leading-[62px] md:mt-6">
              Built at scale.
              <br />
              Built to last.
            </h2>
            <Link
              href="/manufacturing"
              className="mt-8 hidden min-w-36 items-center justify-center rounded-full bg-accent px-8 py-3 text-base font-bold text-white transition-colors hover:bg-primary-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:inline-flex"
            >
              Know More
            </Link>
          </div>
          <p className="text-center md:text-left lg:text-right">
            <span className="text-4xl font-bold">
              <CountUp value="9.3+ GW" />
            </span>
            <span className="mx-auto mt-2 block max-w-64 text-xl leading-7 md:mx-0 lg:ml-auto">
              of cells and modules dispatched till June 2026.
            </span>
          </p>
        </div>

        <div
          className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:mt-16 md:grid md:grid-cols-3 md:gap-12 md:overflow-visible md:pb-0 lg:gap-[90px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onMouseLeave={() => setActive(null)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setActive(null);
            }
          }}
        >
          {plants.map((plant, index) => {
            const isActive = active === index;

            return (
              <article
                key={plant.title.join(" ")}
                tabIndex={0}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(index)}
                className={`relative h-[420px] w-[88%] shrink-0 snap-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:h-[500px] md:w-auto md:shrink ${
                  isActive ? "z-10" : "z-0"
                }`}
              >
                <div
                  className={`absolute inset-0 origin-center overflow-hidden rounded-2xl md:rounded-md md:transition-[scale,background-color,box-shadow] motion-reduce:transition-none ${GROW} ${
                    isActive
                      ? "md:bg-black/25 md:shadow-[0_8px_18px_rgba(0,0,0,0.2)] md:scale-[1.13]"
                      : "md:scale-100"
                  }`}
                >
                  <figure
                    className={`absolute inset-0 flex flex-col items-center justify-start gap-4 px-7 pb-7 pt-5 md:justify-center md:gap-0 md:p-8 md:transition-[opacity,scale] md:duration-500 ${
                      isActive
                        ? "md:pointer-events-none md:scale-95 md:opacity-0"
                        : "md:scale-100 md:opacity-100 md:delay-200"
                    }`}
                  >
                    <div className="relative flex min-h-[220px] w-full items-center justify-center md:min-h-[390px]">
                      <Image
                        src={plant.image.src}
                        alt={plant.alt}
                        width={plant.image.width}
                        height={plant.image.height}
                        className={`mx-auto max-h-[190px] w-full object-contain md:max-h-[280px] ${plant.imageClassName}`}
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                      <div className="absolute left-1/2 top-[55%] flex h-[48%] w-[96%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                        <h3 className="flex flex-col items-center justify-center text-center text-lg font-bold leading-7 md:text-xl md:leading-8">
                          {plant.title.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </h3>
                      </div>
                    </div>
                    <figcaption className="mx-auto max-w-[240px] text-center text-lg font-bold leading-6 md:mt-6 md:max-w-md md:text-2xl md:leading-8">
                      <span className="block md:hidden">{plant.mobileSummary}</span>
                      <span className="hidden md:block">{plant.caption}</span>
                      {plant.status ? <span className="block">{plant.status}</span> : null}
                    </figcaption>
                  </figure>

                  <div
                    aria-hidden={!isActive}
                    className={`absolute inset-y-0 inset-x-16 hidden flex-col items-center justify-center p-6 text-center transition-[opacity,translate] duration-500 md:flex ${
                      isActive
                        ? "translate-y-0 opacity-100 delay-200"
                        : "pointer-events-none translate-y-4 opacity-0"
                    }`}
                  >
                    <h3 className="text-2xl font-bold leading-8">
                      {plant.title.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </h3>
                    <p className="mt-10 max-w-[420px] text-lg leading-8">
                      {plant.details}
                      {plant.status ? <span className="block">{plant.status}</span> : null}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mb-8 -mt-8 flex justify-center md:hidden">
          <Link
            href="/manufacturing"
            className="inline-flex min-w-36 items-center justify-center rounded-full bg-accent px-8 py-3 text-base font-bold text-white hover:bg-primary-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Know More
          </Link>
        </div>
      </div>
    </section>
  );
}
