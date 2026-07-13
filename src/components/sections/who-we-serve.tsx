"use client";

import Image from "next/image";
import { useState } from "react";

const DEFAULT_CARD = -1;

const cards = [
  {
    title: "For your home",
    position: "object-[35%_60%]",
    description:
      "Cut your electricity bills for decades with panels engineered for Indian rooftops - from the manufacturer powering the country's clean energy transition.",
  },
  {
    title: "For your business",
    position: "object-center",
    description:
      "When your energy costs are high, and your timelines are tight, you need a manufacturer you can count on - consistent availability, committed supply, and panels that perform.",
  },
  {
    title: "For large-scale projects",
    position: "object-[65%_60%]",
    description:
      "From utility-scale farms to industrial parks, get committed gigawatt-scale supply and consistent quality, delivered on your project's schedule.",
  },
];

// Size, position, and overlay fades all share one clock so the card reads as a
// single object growing, not parts moving independently.
const GROW = "duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]";

// Text exits fast and together; it re-enters with a gentle rise once the card
// is most of the way open.
const textIn = (isActive: boolean, delay: string) =>
  `transition-[opacity,transform] ease-out ${
    isActive
      ? `translate-y-0 opacity-100 duration-500 ${delay}`
      : "translate-y-2 opacity-0 duration-200"
  }`;

export function WhoWeServe() {
  const [active, setActive] = useState(DEFAULT_CARD);

  return (
    <section
      id="who-we-serve"
      className="relative overflow-hidden bg-gradient-to-b from-surface-tint to-white pb-section pt-section lg:pt-40"
    >
      <Image
        src="/images/sunburst.svg"
        alt=""
        width={608}
        height={314}
        className="pointer-events-none absolute right-[18%] top-0 hidden w-[608px] lg:block"
      />
      <div className="relative mx-auto max-w-content px-4 sm:px-6">
        <p className="text-2xl font-bold uppercase leading-8 text-primary-700">Who We Serve</p>
        <h2 className="mt-6 text-4xl font-bold text-primary-950 sm:text-[54px] sm:leading-[58px]">
          Solar for <span className="text-primary-700">every roof.</span>
        </h2>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-lg text-neutral-500">
          <li className="flex items-center gap-2">
            <Image src="/images/icon-factory.svg" alt="" width={26} height={26} />
            Manufactured by us
          </li>
          <li className="flex items-center gap-2">
            <Image src="/images/icon-handshake.svg" alt="" width={26} height={26} />
            Installed by our certified partner network
          </li>
        </ul>

        {/* Fixed columns and a fixed row height: only the hovered card animates,
            growing from its own center — idle cards never move. */}
        <div
          className="mt-16 grid gap-6 md:grid-cols-3 lg:mt-24"
          onMouseLeave={() => setActive(DEFAULT_CARD)}
        >
          {cards.map((card, i) => {
            const isActive = i === active;
            return (
              <div
                key={card.title}
                className="md:flex md:h-[450px] md:items-center lg:h-[620px]"
              >
              <article
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`relative w-full overflow-hidden rounded-3xl transition-[height] ${GROW} ${
                  isActive ? "h-[450px] lg:h-[620px]" : "h-[380px] lg:h-[461px]"
                }`}
              >
                <Image
                  src="/images/who-we-serve-card.webp"
                  alt={`${card.title}: rooftop solar installation`}
                  fill
                  className={`object-cover ${card.position}`}
                  sizes="(min-width: 768px) 33vw, 100vw"
                />

                {/* Collapsed scrim ⇄ expanded green wash crossfade */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-primary-950/85 via-primary-950/10 to-transparent transition-opacity ${GROW} ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-b from-primary-800/90 via-primary-800/80 to-primary-950/90 transition-opacity ${GROW} ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Collapsed state: title anchored bottom-left */}
                <h3
                  aria-hidden={isActive}
                  className={`absolute bottom-8 left-8 max-w-56 text-3xl font-bold leading-tight text-white transition-[opacity,transform] ease-out ${
                    isActive
                      ? "translate-y-2 opacity-0 duration-200"
                      : "translate-y-0 opacity-100 delay-300 duration-400"
                  }`}
                >
                  {card.title}
                </h3>

                {/* Expanded state: centered title, copy, CTA */}
                <div
                  aria-hidden={!isActive}
                  className={`absolute inset-0 flex flex-col items-center justify-between p-8 text-center lg:p-10 ${
                    isActive ? "" : "pointer-events-none"
                  }`}
                >
                  <div>
                    <h3
                      className={`text-3xl font-bold text-white lg:mt-2 ${textIn(isActive, "delay-200")}`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`mx-auto mt-8 max-w-[354px] text-2xl leading-8 text-white ${textIn(isActive, "delay-300")}`}
                    >
                      {card.description}
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className={`rounded-full bg-white px-7 py-2.5 text-base font-bold text-primary-950 hover:bg-primary-50 ${textIn(isActive, "delay-[400ms]")}`}
                  >
                    Get in Touch
                  </a>
                </div>
              </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
