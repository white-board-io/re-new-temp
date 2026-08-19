"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";

const plants = [
  {
    title: ["Jaipur,", "Rajasthan"],
    href: "/manufacturing#jaipur",
    image: { src: "/images/Jaipur.webp", width: 648, height: 554 },
    imageClassName: "max-w-[480px]",
    alt: "Aerial view of the Jaipur, Rajasthan plant within the outline of Rajasthan state",
    caption: "4 GW module manufacturing capacity under a single roof",
    mobileSummary: "4 GW module manufacturing capacity under a single roof",
    mobileDetails:
      "Spread across 22 acres. 23000 modules produced every day. LEED Gold certified. Powered by a 7.2 MW rooftop solar system. Honoured with the British Safety Council's 5-Star Rating and Sword of Honour.",
    details:
      "Spread across 22 acres. 23000 modules produced every day. LEED Gold certified. Powered by a 7.2 MW rooftop solar system. Honoured with the British Safety Council's 5-Star Rating and Sword of Honour.",
  },
  {
    title: ["Dholera,", "Gujarat"],
    href: "/manufacturing#dholera",
    image: { src: "/images/_Dholera.webp", width: 478, height: 688 },
    imageClassName: "max-w-[332px]",
    detailContainerClassName: "inset-x-6 xl:inset-x-10",
    detailTextClassName: "max-w-[280px]",
    alt: "Aerial view of the Dholera, Gujarat plant within the outline of Gujarat state",
    caption: "6.5 GW solar cell manufacturing capacity",
    mobileSummary: "6.5 GW solar cell manufacturing capacity",
    mobileDetails:
      "2.4 GW module manufacturing capacity, spread across 55 acres in Gujarat's Special Investment Region (including a 4 GW TOPCon facility under development). Equipped with AI-driven defect diagnostics and automated material movement systems.",
    details:
      "2.4 GW module manufacturing capacity, spread across 55 acres in Gujarat's Special Investment Region (including a 4 GW TOPCon facility under development). Equipped with AI-driven defect diagnostics and automated material movement systems.",
  },
  {
    title: ["Visakhapatnam,", "Andhra Pradesh"],
    href: "/manufacturing#vizag",
    image: { src: "/images/Visakhapatnam.webp", width: 710, height: 542 },
    imageClassName: "max-w-[500px]",
    alt: "Aerial view of the Visakhapatnam, Andhra Pradesh plant within the outline of Andhra Pradesh state",
    caption: "6.5 GW wafer and ingot manufacturing facility (upcoming)",
    mobileSummary: "6.5 GW wafer and ingot manufacturing facility (upcoming)",
    mobileDetails:
      "ReNew Solar Panel's third plant will complete the value chain from ingot to module, making it one of the most integrated solar manufacturers in India.",
    details:
      "ReNew Solar Panel's third plant will complete the value chain from ingot to module, making it one of the most integrated solar manufacturers in India.",
  },
];

const GROW = "md:duration-700 md:ease-[cubic-bezier(0.4,0,0.2,1)]";

export function Manufacturing() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="manufacturing"
      className="relative overflow-hidden bg-primary-950 py-16 text-white md:pb-[calc(var(--spacing-section)*1.75)] md:pt-[calc(var(--spacing-section)*2)]"
    >
      <div className="pointer-events-none absolute right-[-32px] top-0 w-36 -translate-y-1/2 sm:w-44 md:right-[18%] md:w-[clamp(200px,42vw,608px)]">
        <Image
          src="/images/sunburst_full-dark.svg"
          alt=""
          width={702}
          height={701}
          className="w-full animate-sunburst motion-reduce:animate-none"
        />
      </div>
      <div className="relative mx-auto max-w-content px-4 sm:px-6">
        <Reveal
          stagger
          className="flex flex-col gap-6 text-left md:gap-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-2xl font-bold uppercase leading-8">Manufacturing</p>
            <h2 className="mt-4 text-[28px] font-bold leading-[1.14] sm:text-[34px] md:mt-6 md:text-[54px] md:leading-[62px]">
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
          <p className="text-left lg:text-right">
            <span className="text-4xl font-bold">
              <CountUp value="9.3+ GW" />
            </span>
            <span className="mt-2 block max-w-64 text-xl leading-7 lg:ml-auto">
              of cells and modules dispatched till June 2026.
            </span>
          </p>
        </Reveal>

        <Reveal
          stagger
          delay={150}
          className="reveal-track mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:mt-16 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 lg:gap-12 xl:gap-[90px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onMouseLeave={() => setActive(null)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setActive(null);
            }
          }}
        >
          {plants.map((plant, index) => {
            const isActive = active === index;
            const detailContainerClassName =
              plant.detailContainerClassName ?? "inset-x-8 xl:inset-x-16";
            const detailTextClassName = plant.detailTextClassName ?? "max-w-[420px]";

            return (
              <Link
                key={plant.title.join(" ")}
                href={plant.href}
                aria-label={`View ${plant.title.join(" ")} manufacturing details`}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(index)}
                className={`relative block h-[430px] w-[78%] shrink-0 snap-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:h-[500px] md:w-auto md:shrink ${
                  isActive ? "z-10" : "z-0"
                }`}
              >
                <div
                  className={`absolute inset-0 origin-center overflow-hidden rounded-md max-md:bg-primary-900 max-md:shadow-[0_8px_18px_rgba(0,0,0,0.18)] max-md:ring-1 max-md:ring-white/10 md:transition-[scale,background-color,box-shadow] motion-reduce:transition-none ${GROW} ${
                    isActive
                      ? "md:bg-black/25 md:shadow-[0_8px_18px_rgba(0,0,0,0.2)] md:scale-[1.04] xl:scale-[1.13]"
                      : "md:scale-100"
                  }`}
                >
                  <div className="absolute inset-x-5 inset-y-6 z-10 flex flex-col items-center justify-center text-center text-white md:hidden">
                    <div className="-translate-y-6">
                      <h3 className="text-[24px] font-bold leading-[1.12] [text-wrap:balance]">
                        {plant.title.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </h3>
                      <p className="mt-3 py-6 max-w-[240px] text-[18px] font-bold leading-5 text-primary-100 [text-wrap:balance]">
                        {plant.mobileSummary}
                      </p>
                    </div>
                    <div className="relative -mt-2 w-full overflow-visible">
                      <Image
                        src={plant.image.src}
                        alt=""
                        width={plant.image.width}
                        height={plant.image.height}
                        className={`absolute left-1/2 top-1/2 h-[210px] w-full -translate-x-1/2 -translate-y-1/2 object-contain opacity-25 ${plant.imageClassName}`}
                        sizes="88vw"
                      />
                      <p className="relative z-10 mx-auto w-[88%] text-center text-[14px] font-normal leading-5 [text-shadow:0_1px_3px_rgb(0_0_0_/_0.95)] [text-wrap:pretty]">
                        {plant.mobileDetails}
                      </p>
                    </div>
                  </div>

                  <figure
                    className={`absolute inset-0 hidden flex-col items-center justify-start gap-4 px-7 pb-7 pt-5 md:flex md:justify-center md:gap-0 md:p-6 md:transition-[opacity,scale] md:duration-500 xl:p-8 ${
                      isActive
                        ? "md:pointer-events-none md:scale-95 md:opacity-0"
                        : "md:scale-100 md:opacity-100 md:delay-200"
                    }`}
                  >
                    <div className="relative flex min-h-[220px] w-full items-center justify-center md:min-h-[320px] xl:min-h-[390px]">
                      <Image
                        src={plant.image.src}
                        alt={plant.alt}
                        width={plant.image.width}
                        height={plant.image.height}
                        className={`mx-auto max-h-[190px] w-full object-contain md:max-h-[220px] xl:max-h-[280px] ${plant.imageClassName}`}
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
                    <figcaption className="mx-auto max-w-[240px] text-center text-lg font-bold leading-6 md:mt-4 md:max-w-md md:text-xl md:leading-7 xl:mt-6 xl:text-2xl xl:leading-8">
                      <span className="block md:hidden">{plant.mobileSummary}</span>
                      <span className="hidden md:block">{plant.caption}</span>
                    </figcaption>
                  </figure>

                  <div
                    aria-hidden={!isActive}
                    className={`absolute inset-y-0 ${detailContainerClassName} hidden flex-col items-center justify-center p-5 text-center transition-[opacity,translate] duration-500 md:flex xl:p-6 ${
                      isActive
                        ? "translate-y-0 opacity-100 delay-200"
                        : "pointer-events-none translate-y-4 opacity-0"
                    }`}
                  >
                    <h3 className="text-xl font-bold leading-7 xl:text-2xl xl:leading-8">
                      {plant.title.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </h3>
                    <p className={`mt-6 ${detailTextClassName} text-base font-normal leading-6 xl:mt-8 xl:text-lg xl:leading-8`}>
                      {plant.details}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </Reveal>

        <Reveal className="mb-8 mt-4 flex justify-center md:hidden">
          <Link
            href="/manufacturing"
            className="inline-flex min-h-10 min-w-[168px] items-center justify-center rounded-full bg-accent px-8 py-0 text-base font-bold text-white hover:bg-primary-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Know More
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
