"use client";

import Image from "next/image";
import { useState } from "react";

const cards = [
  {
    title: ["For your", "Home"],
    image: "/images/For-your-home.webp",
    position: "object-[48%_50%]",
    description:
      "Cut your electricity bills for decades with panels engineered for Indian rooftops - from the manufacturer powering the country's clean energy transition.",
  },
  {
    title: ["For your", "Business"],
    image: "/images/For-your-business.webp",
    position: "object-center",
    description:
      "When your energy costs are high, and your timelines are tight, you need a manufacturer you can count on - consistent availability, committed supply, and panels that perform.",
  },
  {
    title: ["For large-scale", "Projects"],
    image: "/images/For-large-scale-projects.webp",
    position: "object-center",
    description:
      "From utility-scale farms to industrial parks, get committed gigawatt-scale supply and consistent quality, delivered on your project's schedule.",
  },
];

const GROW = "duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]";

export function WhoWeServe() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="who-we-serve"
      className="relative overflow-hidden bg-gradient-to-b from-surface-tint to-white pb-section pt-section lg:pt-40"
    >
      <div className="pointer-events-none absolute right-[18%] top-0 w-[clamp(200px,42vw,608px)] -translate-y-1/2">
        <Image
          src="/images/sunburst_full.svg"
          alt=""
          width={702}
          height={701}
          className="w-full animate-sunburst motion-reduce:animate-none"
        />
      </div>
      <div className="relative mx-auto max-w-content px-4 sm:px-6">
        <p className="text-2xl font-bold uppercase leading-8 text-primary-700">Who We Serve</p>
        <h2 className="mt-6 text-4xl font-bold text-primary-950 sm:text-[54px] sm:leading-[58px]">
          Solar for <span className="text-primary-400">Every Life</span>
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

        <div
          className="mt-16 grid items-center gap-6 md:grid-cols-3 lg:mt-24 lg:gap-[90px]"
          onMouseLeave={() => setActive(null)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setActive(null);
            }
          }}
        >
          {cards.map((card, index) => {
            const isActive = active === index;

            return (
              <article
                key={card.title.join(" ")}
                tabIndex={0}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(index)}
                className={`relative h-[462px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-700 ${
                  isActive ? "z-10" : "z-0"
                }`}
                >
                  <div
                  className={`absolute inset-0 origin-center overflow-hidden rounded-md transition-[scale,box-shadow] motion-reduce:transition-none ${GROW} ${
                    isActive
                      ? "shadow-[0_8px_18px_rgba(0,0,0,0.18)] md:scale-[1.14]"
                      : "scale-100"
                  }`}
                >
                  <Image
                    src={card.image}
                    alt={`${card.title.join(" ")}: solar installation`}
                    fill
                    className={`object-cover transition-transform duration-700 motion-reduce:transition-none ${card.position} ${
                      isActive ? "scale-105" : "scale-100"
                    }`}
                    sizes="(min-width: 768px) 38vw, 100vw"
                  />
                  <div
                    className={`absolute inset-0 transition-colors duration-500 ${
                      isActive
                        ? "bg-primary-700/85"
                        : "bg-gradient-to-t from-primary-950/85 via-primary-950/10 to-transparent"
                    }`}
                  />

                  <h3
                    className={`absolute bottom-8 left-8 z-10 max-w-56 text-3xl font-bold leading-tight text-white transition-[opacity,translate] duration-300 ${
                      isActive
                        ? "translate-y-2 opacity-0"
                        : "translate-y-0 opacity-100 delay-200"
                    }`}
                  >
                    {card.title.map((line) => (
                      <span key={line} className="block">{line}</span>
                    ))}
                  </h3>

                  <div
                    aria-hidden={!isActive}
                    className={`absolute inset-x-8 top-20 z-10 text-center text-3xl font-bold leading-tight text-white transition-[opacity,translate] duration-500 ${
                      isActive
                        ? "translate-y-0 opacity-100 delay-150"
                        : "pointer-events-none translate-y-3 opacity-0"
                    }`}
                  >
                    {card.title.map((line) => (
                      <span key={line} className="block">{line}</span>
                    ))}
                  </div>

                  <div
                    aria-hidden={!isActive}
                    className={`absolute inset-x-8 bottom-7 top-[138px] z-10 flex flex-col items-center text-center text-white transition-[opacity,translate] duration-500 ${
                      isActive
                        ? "translate-y-0 opacity-100 delay-200"
                        : "pointer-events-none translate-y-4 opacity-0"
                    }`}
                  >
                    <p className="mx-auto max-w-[430px] text-2xl leading-8">
                      {card.description}
                    </p>
                    <a
                      href="#contact"
                      className="mt-auto rounded-full bg-white px-8 py-2.5 text-base font-bold text-primary-950 hover:bg-primary-50"
                    >
                      Get in Touch
                    </a>
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
