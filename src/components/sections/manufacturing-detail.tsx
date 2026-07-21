"use client";

import Image from "next/image";
import { CalendarDays, Factory, MapPin, Play, Sun } from "lucide-react";
import { useState } from "react";

type Plant = {
  id: "jaipur" | "dholera" | "vizag";
  name: string;
  shortName: string;
  map: string;
  eyebrow: string;
  headline: string;
  stats: Array<{
    label: string;
    value: string;
    details: string;
    icon: "capacity" | "area" | "output" | "date";
  }>;
  paragraphs: string[];
  sustainabilityTitle: string;
  sustainabilityBody: string;
};

const plants: Plant[] = [
  {
    id: "jaipur",
    name: "Jaipur, Rajasthan",
    shortName: "Jaipur,\nRajasthan",
    map: "/images/state-jaipur.svg",
    eyebrow: "4 GW under one roof.",
    headline: "India's largest single-location module manufacturing facility.",
    stats: [
      {
        label: "Capacity",
        value: "4 GW",
        details: "4 GW module manufacturing capacity under one roof.",
        icon: "capacity",
      },
      {
        label: "Area",
        value: "48 acres",
        details: "A 48-acre integrated manufacturing campus in Jaipur, Rajasthan.",
        icon: "area",
      },
      {
        label: "Output",
        value: "17,000 / day",
        details: "Approximately 17,000 modules manufactured per day.",
        icon: "output",
      },
      {
        label: "Commissioned",
        value: "2021",
        details: "Commissioned in 2021 for high-volume module production.",
        icon: "date",
      },
    ],
    paragraphs: [
      "The Jaipur plant is ReNew Solar's flagship manufacturing facility and one of the largest single-location solar module manufacturing plants in India. Operating at 4 GW capacity under a single roof, it is designed for high-volume, consistent output — purpose-built to meet the supply requirements of large-scale utility and commercial projects.",
      "The plant produces TOPCon and Mono PERC bifacial modules using advanced automation across the full production line, with rigorous in-line quality control at every stage. An in-house NABL accredited PV Module Test Lab — accredited under ISO/IEC 17025:2017 — ensures every batch meets international performance and reliability standards before dispatch.",
      "Every module produced at Jaipur is backed by a 30-year performance warranty and a 12-year product warranty. The facility is PLI commissioned and uses domestically manufactured cells, making the panels manufactured on-site in Rajasthan fully eligible for government and public sector procurement.",
    ],
    sustainabilityTitle:
      "The Jaipur plant is one of India's few LEED Gold certified solar module manufacturing facilities.",
    sustainabilityBody:
      "The facility runs on a 7.2 MW rooftop solar system comprising 13,340 of its own panels, generating 10 million kWh annually. An internal sewage treatment plant recycles 80 to 90% of treated water within the premises, while local hiring and a dedicated Centre of Excellence support inclusive growth.",
  },
  {
    id: "dholera",
    name: "Dholera, Gujarat",
    shortName: "Dholera,\nGujarat",
    map: "/images/state-dholera.svg",
    eyebrow: "Built for the next generation.",
    headline: "Advanced TOPCon cell and module manufacturing at scale.",
    stats: [
      {
        label: "Cell capacity",
        value: "2.4 GW",
        details: "2.4 GW of advanced solar cell manufacturing capacity.",
        icon: "capacity",
      },
      {
        label: "Area",
        value: "55 acres",
        details: "A 55-acre facility in Gujarat's Special Investment Region.",
        icon: "area",
      },
      {
        label: "Under development",
        value: "4 GW TOPCon",
        details: "A 4 GW next-generation TOPCon facility under development.",
        icon: "output",
      },
      {
        label: "Location",
        value: "Dholera SIR",
        details: "Strategically located in Dholera Special Investment Region.",
        icon: "date",
      },
    ],
    paragraphs: [
      "Located in Gujarat's Special Investment Region, ReNew's Dholera facility combines high-efficiency cell and module manufacturing with an operating model designed for dependable, repeatable quality.",
      "AI-driven defect diagnostics and automated material movement systems improve precision across the production line, while in-line controls help every product meet ReNew's performance and reliability benchmarks.",
      "The site is being expanded with a 4 GW TOPCon facility, strengthening ReNew's vertically integrated manufacturing capability and India's domestic solar supply chain.",
    ],
    sustainabilityTitle: "Designed to raise the efficiency standard for domestic solar manufacturing.",
    sustainabilityBody:
      "The Dholera facility pairs advanced automation with resource-efficient operations and a long-term commitment to responsible manufacturing in Gujarat's clean-energy corridor.",
  },
  {
    id: "vizag",
    name: "Visakhapatnam, Andhra Pradesh",
    shortName: "Visakhapatnam,\nAndhra Pradesh",
    map: "/images/state-vizag.svg",
    eyebrow: "6.5 GW at the source.",
    headline: "A wafer and ingot facility strengthening India's solar value chain.",
    stats: [
      {
        label: "Capacity",
        value: "6.5 GW",
        details: "6.5 GW of planned wafer and ingot manufacturing capacity.",
        icon: "capacity",
      },
      {
        label: "Focus",
        value: "Wafer & ingot",
        details: "Upstream wafer and ingot production for domestic solar manufacturing.",
        icon: "area",
      },
      {
        label: "Supply chain",
        value: "Vertically integrated",
        details: "Greater quality control across an integrated solar value chain.",
        icon: "output",
      },
      {
        label: "Location",
        value: "Visakhapatnam",
        details: "Located in Andhra Pradesh's major industrial and port corridor.",
        icon: "date",
      },
    ],
    paragraphs: [
      "ReNew's Visakhapatnam facility is designed to manufacture wafers and ingots at scale, adding critical upstream capacity to India's fast-growing solar manufacturing ecosystem.",
      "Its integrated production approach improves supply resilience and gives ReNew greater control over quality at the earliest stages of the module value chain.",
      "With 6.5 GW of planned capacity, the facility is positioned to support dependable domestic production for utility, commercial, industrial and residential solar demand.",
    ],
    sustainabilityTitle: "Building a more resilient and self-reliant solar manufacturing ecosystem.",
    sustainabilityBody:
      "The Visakhapatnam facility brings upstream manufacturing closer to India's end market, reducing supply-chain exposure while supporting skilled clean-energy employment in Andhra Pradesh.",
  },
];

function StatIcon({ icon }: { icon: Plant["stats"][number]["icon"] }) {
  const className = "size-16 stroke-[1.4]";
  if (icon === "capacity") return <Sun aria-hidden className={className} />;
  if (icon === "area") return <MapPin aria-hidden className={className} />;
  if (icon === "date") return <CalendarDays aria-hidden className={className} />;
  return <Factory aria-hidden className={className} />;
}

export function ManufacturingDetail() {
  const [activeId, setActiveId] = useState<Plant["id"]>("jaipur");
  const activePlant = plants.find((plant) => plant.id === activeId) ?? plants[0];

  return (
    <>
      <section className="relative isolate flex min-h-[620px] items-center justify-center overflow-hidden text-white lg:min-h-[660px]">
        <Image
          src="/images/manufacturing-hero.png"
          alt="Automated solar panel manufacturing facility"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-primary-950/70" />
        <div className="mx-auto -translate-y-20 max-w-content px-4 py-20 text-center sm:px-6 lg:-translate-y-24">
          <h1 className="text-4xl font-light leading-tight tracking-wide sm:text-[42px] lg:text-[46px]">
            Driving solar innovation through
            <strong className="mt-2 block font-bold text-primary-400">
              World-class Manufacturing Facilities
            </strong>
          </h1>
          <p className="mx-auto mt-9 max-w-2xl text-xl leading-8 sm:text-2xl sm:leading-9">
            Three plants. One standard.
            <br />
            Built to power India&apos;s net zero future.
          </p>
        </div>
      </section>

      <div className="sticky top-[120px] z-30 border-b border-neutral-200 bg-neutral-50 shadow-sm lg:top-[136px]">
        <div
          role="tablist"
          aria-label="Manufacturing plants"
          className="mx-auto grid max-w-content grid-cols-3 px-2 sm:px-6"
        >
          {plants.map((plant) => {
            const active = plant.id === activeId;
            return (
              <button
                key={plant.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="plant-panel"
                onClick={() => setActiveId(plant.id)}
                className={`relative flex min-h-28 items-center justify-center gap-3 px-2 text-sm font-bold transition-colors sm:text-lg lg:text-2xl ${
                  active ? "text-primary-700" : "text-neutral-400 hover:text-primary-700"
                }`}
              >
                <Image
                  src={plant.map}
                  alt=""
                  width={52}
                  height={48}
                  className={`hidden h-10 w-12 object-contain sm:block ${active ? "" : "grayscale opacity-55"}`}
                />
                <span>{plant.name}</span>
                <span
                  className={`absolute inset-x-0 bottom-0 h-3 origin-left bg-primary-400 transition-transform ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div id="plant-panel" role="tabpanel" className="bg-white">
        <section className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="text-4xl font-bold uppercase leading-tight text-primary-700 sm:text-[56px] sm:leading-[1.08]">
                {activePlant.eyebrow}
              </p>
              <h2 className="mt-10 max-w-2xl text-4xl font-light leading-tight text-primary-950 sm:text-[58px] sm:leading-[1.18]">
                {activePlant.headline}
              </h2>
            </div>
            <div className="relative mx-auto flex aspect-[1.2/1] w-full max-w-[520px] items-center justify-center">
              <Image
                src={activePlant.map}
                alt={`Outline map for ${activePlant.name}`}
                width={520}
                height={440}
                className="h-full w-full object-contain"
              />
              <p className="pointer-events-none absolute whitespace-pre-line text-center text-3xl font-bold leading-tight text-white sm:text-[44px]">
                {activePlant.shortName}
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
            {activePlant.stats.map((stat) => (
              <article
                key={stat.label}
                tabIndex={0}
                aria-label={`${stat.label}: ${stat.value}. ${stat.details}`}
              className="group h-[22rem] rounded-md perspective-[1200px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-700"
            >
              <div className="grid h-full transition-transform duration-700 transform-3d group-hover:rotate-y-180 group-focus-within:rotate-y-180 motion-reduce:transition-none">
                <div className="flex h-full flex-col items-center justify-center rounded-md bg-primary-700 px-7 py-10 text-center text-white [grid-area:1/1] backface-hidden">
                    <StatIcon icon={stat.icon} />
                    <p className="mt-7 text-3xl font-bold leading-tight">{stat.value}</p>
                    <h3 className="mt-5 text-xl font-bold uppercase tracking-wide">
                      {stat.label}
                    </h3>
                  </div>

                <div className="flex h-full rotate-y-180 flex-col items-center justify-center rounded-md bg-primary-950 px-7 py-10 text-center text-white [grid-area:1/1] backface-hidden">
                    <StatIcon icon={stat.icon} />
                    <p className="mt-7 text-2xl font-bold leading-snug">{stat.details}</p>
                    <h3 className="mt-5 text-xl font-bold uppercase tracking-wide">
                      {stat.label}
                    </h3>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <figure className="mt-24 overflow-hidden rounded-md">
            <div className="relative aspect-[16/7] min-h-72">
              <Image
                src="/images/manufacturing-rooftop.png"
                alt="Rooftop solar panels installed on a ReNew facility"
                fill
                sizes="(min-width: 1428px) 1428px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-8 flex justify-center gap-6" aria-hidden>
                {[true, false, false, false, false].map((selected, index) => (
                  <span
                    key={index}
                    className={`size-5 rounded-full border-2 border-white ${selected ? "bg-primary-700" : "bg-white"}`}
                  />
                ))}
              </div>
            </div>
          </figure>

          <div className="mt-20 space-y-10 text-xl font-light leading-9 text-neutral-500 sm:text-2xl sm:leading-10">
            {activePlant.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden bg-surface-tint py-24 lg:py-32">
          <Image
            src="/images/sunburst.svg"
            alt=""
            width={560}
            height={300}
            className="pointer-events-none absolute -right-10 -top-16 w-96 opacity-70 lg:w-[560px]"
          />
          <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
            <p className="text-xl font-bold uppercase text-primary-700">Sustainability Credentials</p>
            <h2 className="mt-12 text-4xl font-bold leading-tight text-primary-950 sm:text-[50px]">
              {activePlant.sustainabilityTitle}
            </h2>
            <p className="mx-auto mt-12 max-w-5xl text-xl font-light leading-9 text-neutral-500 sm:text-2xl sm:leading-10">
              {activePlant.sustainabilityBody}
            </p>
          </div>

          <div className="relative mx-auto mt-20 max-w-content px-4 sm:px-6">
            <div className="relative aspect-[16/8.2] overflow-hidden rounded-md">
              <Image
                src="/images/manufacturing-rooftop.png"
                alt="Solar panels on the roof of a ReNew facility"
                fill
                sizes="(min-width: 1428px) 1428px, 100vw"
                className="object-cover"
              />
              <button
                type="button"
                aria-label="Play manufacturing facility video"
                className="absolute left-1/2 top-1/2 flex size-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white text-white transition-transform hover:scale-105"
              >
                <Play aria-hidden className="ml-2 size-16 fill-current" />
              </button>
            </div>
          </div>
        </section>

        <div className="overflow-hidden bg-accent py-5 text-white">
          <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap text-lg font-bold motion-reduce:animate-none sm:text-xl">
            {[0, 1].map((run) => (
              <div key={run} aria-hidden={run === 1} className="flex shrink-0 items-center gap-10 pr-10">
                {[
                  "LEED Gold Certified",
                  "PLI Scheme Commissioned",
                  "NABL Accredited PV Module Test Lab under ISO/IEC 17025:2017",
                  "BIS Certified",
                  "ALMM Approved",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-10 before:size-2 before:rounded-full before:bg-white">
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
