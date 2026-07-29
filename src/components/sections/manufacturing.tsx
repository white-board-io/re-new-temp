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
    details: "4 GW module manufacturing capacity under a single roof.",
  },
  {
    title: ["Dholera,", "Gujarat"],
    image: { src: "/images/_Dholera.webp", width: 478, height: 688 },
    imageClassName: "max-w-[332px]",
    alt: "Aerial view of the Dholera, Gujarat plant within the outline of Gujarat state",
    caption: "2.4 GW module manufacturing capacity across 55 acres.",
    details:
      "(including a 4 GW TOPCon facility under development) and 2.4 GW module manufacturing capacity, spread across 55 acres in Gujarat's Special Investment Region. Equipped with AI-driven defect diagnostics and automated material movement systems.",
  },
  {
    title: ["Visakhapatnam,", "Andhra Pradesh"],
    image: { src: "/images/Visakhapatnam.webp", width: 710, height: 542 },
    imageClassName: "max-w-[500px]",
    alt: "Aerial view of the Visakhapatnam, Andhra Pradesh plant within the outline of Andhra Pradesh state",
    caption: "6.5 GW wafer and ingot manufacturing facility",
    details: "6.5 GW wafer and ingot manufacturing facility",
  },
];

const GROW = "duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]";

export function Manufacturing() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="manufacturing"
      className="relative overflow-hidden bg-primary-950 py-section text-white"
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
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-2xl font-bold uppercase leading-8">Manufacturing</p>
            <h2 className="mt-6 text-4xl font-bold sm:text-[54px] sm:leading-[62px]">
              Built at scale.
              <br />
              Built to last.
            </h2>
            <Link
              href="/manufacturing"
              className="mt-8 inline-flex min-w-36 items-center justify-center rounded-full bg-accent px-8 py-3 text-base font-bold text-white transition-colors hover:bg-primary-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Know More
            </Link>
          </div>
          <p className="lg:text-right">
            <span className="text-4xl font-bold">
              <CountUp value="9.3+ GW" />
            </span>
            <span className="mt-2 block max-w-64 text-xl leading-7 lg:ml-auto">
              of cells and modules dispatched till June 2026.
            </span>
          </p>
        </div>

        <div
          className="mt-16 grid items-center gap-12 md:grid-cols-3 lg:gap-[90px]"
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
                className={`relative h-[500px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                  isActive ? "z-10" : "z-0"
                }`}
              >
                <div
                  className={`absolute inset-0 origin-center overflow-hidden rounded-md transition-[scale,background-color,box-shadow] motion-reduce:transition-none ${GROW} ${
                    isActive
                      ? "bg-black/25 shadow-[0_8px_18px_rgba(0,0,0,0.2)] md:scale-[1.13]"
                      : "scale-100"
                  }`}
                >
                  <figure
                    className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-[opacity,scale] duration-500 ${
                      isActive
                        ? "pointer-events-none scale-95 opacity-0"
                        : "scale-100 opacity-100 delay-200"
                    }`}
                  >
                    <div className="relative flex min-h-[390px] w-full items-center justify-center">
                      <Image
                        src={plant.image.src}
                        alt={plant.alt}
                        width={plant.image.width}
                        height={plant.image.height}
                        className={`mx-auto max-h-[280px] w-full object-contain ${plant.imageClassName}`}
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                      <div className="absolute left-1/2 top-[55%] flex h-[48%] w-[96%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                        <h3 className="flex flex-col items-center justify-center text-center text-xl font-bold leading-8">
                          {plant.title.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </h3>
                      </div>
                    </div>
                    <figcaption className="mx-auto mt-6 max-w-md text-center text-2xl font-bold leading-8">
                      {plant.caption}
                    </figcaption>
                  </figure>

                  <div
                    aria-hidden={!isActive}
                    className={`absolute inset-y-0 inset-x-16 flex flex-col items-center justify-center p-6 text-center transition-[opacity,translate] duration-500 ${
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
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
