"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ContactModalTrigger } from "@/components/contact-modal";
import { Reveal } from "@/components/reveal";

const cards = [
  {
    title: ["For your", "Home"],
    image: "/images/For-your-home.webp",
    position: "object-[48%_50%]",
    description:
      "Lower your electricity bill from day one. ReNew Solar Panels are designed for Indian weather — high efficiency, low maintenance, and backed by a 30-year power warranty.",
  },
  {
    title: ["For your", "Business"],
    image: "/images/For-your-business.webp",
    position: "object-center",
    description:
      "When your energy costs are high, and your timelines are tight, you need a manufacturer you can count on — consistent availability, committed supply, and panels that perform.",
  },
  {
    title: ["For large-scale", "Projects"],
    image: "/images/For-large-scale-projects.webp",
    position: "object-center",
    description:
      "19.4 GW of integrated solar manufacturing capacity. PAN India reach. On-time delivery. When your project demands scale, we have the infrastructure to match it — backed by India's leading renewable energy company.",
  },
];

const GROW = "duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]";

export function WhoWeServe() {
  const [scrollActive, setScrollActive] = useState<number | null>(null);
  const [interactionActive, setInteractionActive] = useState<number | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const active = interactionActive ?? scrollActive;

  useEffect(() => {
    let frame = 0;

    const updateScrollActive = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const viewportCenter = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        };

        const closest = cardRefs.current.reduce<{
          index: number;
          distance: number;
        } | null>((best, card, index) => {
          if (!card) return best;

          const rect = card.getBoundingClientRect();
          const visible =
            rect.bottom > 0 &&
            rect.top < window.innerHeight &&
            rect.right > 0 &&
            rect.left < window.innerWidth;

          if (!visible) return best;

          const cardCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
          const distance = Math.hypot(
            cardCenter.x - viewportCenter.x,
            cardCenter.y - viewportCenter.y,
          );

          if (!best || distance < best.distance) {
            return { index, distance };
          }

          return best;
        }, null);

        setScrollActive(closest?.index ?? null);
      });
    };

    updateScrollActive();
    window.addEventListener("scroll", updateScrollActive, { passive: true });
    window.addEventListener("resize", updateScrollActive);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollActive);
      window.removeEventListener("resize", updateScrollActive);
    };
  }, []);

  return (
    <section
      id="who-we-serve"
      className="relative overflow-hidden bg-gradient-to-b from-surface-tint to-white pb-16 pt-14 md:pb-section md:pt-[calc(var(--spacing-section)*2)]"
    >
      <div className="pointer-events-none absolute right-4 top-0 w-32 -translate-y-1/2 sm:w-40 md:right-[18%] md:w-[clamp(200px,42vw,608px)]">
        <Image
          src="/images/sunburst_full.svg"
          alt=""
          width={702}
          height={701}
          className="w-full animate-sunburst motion-reduce:animate-none"
        />
      </div>
      <div className="relative mx-auto max-w-content px-5 text-left sm:px-6">
        <Reveal>
          <p className="text-xl font-bold uppercase leading-7 text-primary-700 md:text-2xl md:leading-8">
            Who We Serve
          </p>
          <h2 className="mt-4 text-[28px] font-bold leading-[1.14] text-primary-950 sm:text-[34px] md:mt-6 md:text-[54px] md:leading-[58px]">
            Solar for <span className="text-primary-400">Every Life</span>
          </h2>
          <ul className="mt-5 flex flex-col items-start gap-3 text-base leading-6 text-neutral-500 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2 md:mt-6 md:text-lg">
            <li className="flex items-start gap-2">
              <Image
                src="/images/icon-factory.svg"
                alt=""
                width={26}
                height={26}
                className="mt-0.5 size-5 shrink-0 md:size-[26px]"
              />
              <span className="min-w-0">Manufactured by us</span>
            </li>
            <li className="flex items-start gap-2">
              <Image
                src="/images/icon-handshake.svg"
                alt=""
                width={26}
                height={26}
                className="mt-0.5 size-5 shrink-0 md:size-[26px]"
              />
              <span className="min-w-0 whitespace-nowrap text-[15px] sm:text-base md:text-lg">
                Installed by our certified partner network
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal
          stagger
          delay={150}
          className="reveal-track mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:mt-16 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 lg:mt-24 lg:gap-12 xl:gap-[90px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onMouseLeave={() => setInteractionActive(null)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setInteractionActive(null);
            }
          }}
        >
          {cards.map((card, index) => {
            const isActive = active === index;

            return (
              <article
                key={card.title.join(" ")}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                tabIndex={0}
                onClick={() => setInteractionActive(index)}
                onMouseEnter={() => setInteractionActive(index)}
                onMouseLeave={() => setInteractionActive(null)}
                onFocus={() => setInteractionActive(index)}
                className={`relative h-[430px] w-[86%] shrink-0 snap-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-700 sm:w-[82%] md:h-[470px] md:w-auto md:shrink lg:h-[500px] ${
                  isActive ? "z-10" : "z-0"
                }`}
              >
                <div
                  className={`absolute inset-0 origin-center overflow-hidden rounded-[6px] transition-[scale,box-shadow] motion-reduce:transition-none ${GROW} ${
                    isActive
                      ? "shadow-[0_10px_22px_rgba(0,0,0,0.2)] md:scale-[1.04] xl:scale-[1.1]"
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
                        ? "bg-gradient-to-t from-primary-950/85 via-primary-950/35 to-transparent md:bg-primary-700/85"
                        : "bg-gradient-to-t from-primary-950/60 via-primary-950/15 to-transparent md:from-primary-950/85 md:via-primary-950/10"
                    }`}
                  />

                  <h3
                    className={`absolute bottom-4 left-5 z-10 max-w-48 text-left text-[34px] font-semibold leading-[42px] tracking-normal align-bottom text-white transition-[opacity,translate] duration-300 md:bottom-8 md:left-12 md:max-w-56 lg:bottom-9 ${
                      isActive
                        ? "translate-y-2 opacity-0"
                        : "translate-y-2 opacity-0 md:translate-y-0 md:opacity-100 md:delay-200"
                    }`}
                  >
                    {card.title.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>

                  <div
                    className={`absolute inset-x-6 bottom-8 top-20 z-10 flex flex-col items-start gap-5 text-left text-white transition-[opacity,translate] duration-500 md:inset-x-8 md:bottom-8 md:top-24 md:items-center md:gap-6 md:text-center lg:top-28 xl:inset-x-12 ${
                      isActive
                        ? "translate-y-0 opacity-100 delay-200"
                        : "translate-y-0 opacity-100 md:pointer-events-none md:translate-y-4 md:opacity-0"
                    }`}
                  >
                    <h3 className="text-[32px] font-semibold leading-[39px] tracking-normal md:text-[34px] md:leading-[42px] xl:text-[42px]">
                      {card.title.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </h3>
                    <p className="max-w-[430px] text-sm leading-5 md:mx-auto lg:text-base lg:leading-6 xl:text-lg xl:leading-7">
                      {card.description}
                    </p>
                    <ContactModalTrigger
                      className="inline-flex min-h-10 min-w-[168px] items-center justify-center rounded-full bg-white px-8 py-0 text-base font-bold text-primary-950 hover:bg-primary-50"
                    >
                      Get in Touch
                    </ContactModalTrigger>
                  </div>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
