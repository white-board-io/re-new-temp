"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";

type Plant = {
  id: "jaipur" | "dholera" | "vizag";
  name: string;
  shortName: string;
  map: string;
  mapAlt: string;
  mapLabelClassName: string;
  eyebrow: string;
  headline: string;
  video?: { src: string; title: string };
  gallery: Array<{ src: string; alt: string }>;
  sustainabilityImage: { src: string; alt: string };
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
    map: "/images/manufacturing/dholera-tab.webp",
    mapAlt: "Jaipur manufacturing facility",
    mapLabelClassName: "text-2xl sm:text-[32px]",
    eyebrow: "4 GW module manufacturing capacity under a single roof.",
    headline: "India's largest\nsingle-location module\nmanufacturing facility.",
    video: {
      src: "/videos/manufacturing/jaipur.webm",
      title: "Jaipur manufacturing facility video",
    },
    gallery: [
      {
        src: "/images/partner-video-factory.webp",
        alt: "ReNew technicians inspecting a solar module on the Jaipur manufacturing line",
      },
      {
        src: "/images/figma-jaipur-manufacturing-line.png",
        alt: "ReNew engineer testing a solar module on the Jaipur manufacturing line",
      },
      {
        src: "/images/figma-jaipur-cleanroom.jpg",
        alt: "ReNew cleanroom team holding solar cells at the Jaipur facility",
      },
      {
        src: "/images/figma-jaipur-automation.jpg",
        alt: "ReNew technician monitoring automated solar equipment at the Jaipur facility",
      },
      {
        src: "/images/figma-jaipur-cell-inspection.jpg",
        alt: "ReNew technician inspecting a solar cell at the Jaipur facility",
      },
    ],
    sustainabilityImage: {
      src: "/images/figma-jaipur-aerial.jpg",
      alt: "Aerial view of the Jaipur plant and its rooftop solar installation",
    },
    stats: [
      {
        label: "Capacity",
        value: "4 GW",
        details: "4 GW module manufacturing",
        icon: "capacity",
      },
      {
        label: "Area",
        value: "22 acres",
        details: "22 acres",
        icon: "area",
      },
      {
        label: "Daily output",
        value: "23,000/day",
        details: "23000 modules produced every day.",
        icon: "output",
      },
      {
        label: "Commissioned",
        value: "August 2023",
        details:
          "August 2023, under the Government of India's PLI scheme for High Efficiency Solar PV Modules",
        icon: "date",
      },
    ],
    paragraphs: [
      "The Jaipur plant is ReNew Solar's flagship manufacturing facility, with 4 GW module manufacturing capacity under a single roof. Spread across 22 acres, it produces 23000 modules every day and is designed for high-volume, consistent output.",
      "The plant produces TOPCon and Mono PERC bifacial modules using advanced automation across the full production line, with rigorous inline quality control at every stage. An in-house NABL accredited PV Module Test Lab — accredited under ISO/IEC 17025:2017 — ensures every batch meets international performance and reliability standards before dispatch.",
      "The facility is LEED Gold certified and powered by a 7.2 MW rooftop solar system. It has been honoured with the British Safety Council's 5-Star Rating and Sword of Honour.",
    ],
    sustainabilityTitle:
      "The Jaipur plant is one of India's few LEED Gold certified solar module manufacturing facilities.",
    sustainabilityBody:
      "The facility runs on a 7.2 MW rooftop solar system comprising its own panels, generating 10 million kWh annually. An internal sewage treatment plant recycles 80 to 90% of treated water within the premises. The plant has generated over 1,900 direct jobs, with a Centre of Excellence focused on women in STEM.",
  },
  {
    id: "dholera",
    name: "Dholera, Gujarat",
    shortName: "Dholera,\nGujarat",
    map: "/images/manufacturing/jaipur-tab.webp",
    mapAlt: "Dholera cell and module manufacturing facility",
    mapLabelClassName: "text-2xl sm:text-[32px]",
    eyebrow: "6.5 GW cell and 2.4\u00A0GW\u00A0module manufacturing capacity.",
    headline: "Advanced solar cell and module\nmanufacturing at scale.",
    video: {
      src: "/videos/manufacturing/dholera.webm",
      title: "Dholera manufacturing facility video",
    },
    gallery: [
      {
        src: "/images/manufacturing-hero.png",
        alt: "Automated solar cell and module manufacturing equipment at Dholera",
      },
      {
        src: "/images/partner-video-factory.webp",
        alt: "Technicians inspecting a solar module on the production line",
      },
      {
        src: "/images/home-service-projects.jpg",
        alt: "Aerial view of a utility-scale solar installation",
      },
      {
        src: "/images/solar-module-landscape.webp",
        alt: "ReNew solar module ready for dispatch",
      },
      {
        src: "/images/solar-module-rooftop.webp",
        alt: "Solar modules installed on a rooftop",
      },
    ],
    sustainabilityImage: {
      src: "/images/manufacturing-hero.png",
      alt: "Automated solar manufacturing equipment at the Dholera facility",
    },
    stats: [
      {
        label: "Module capacity",
        value: "2.4 GW",
        details: "2.4 GW",
        icon: "capacity",
      },
      {
        label: "Cell capacity",
        value: "6.5 GW",
        details: "6.5 GW cell and 2.4 GW module manufacturing capacity",
        icon: "output",
      },
      {
        label: "Area",
        value: "55 acres",
        details: "55 acres",
        icon: "area",
      },
      {
        label: "Location",
        value: "Dholera",
        details: "Gujarat Special Investment Region (GIDC), Dholera",
        icon: "date",
      },
    ],
    paragraphs: [
      "Located in Gujarat's Special Investment Region, ReNew's Dholera facility has 6.5 GW solar cell manufacturing capacity and 2.4 GW module manufacturing capacity across 55 acres.",
      "AI-driven defect diagnostics and automated material movement systems improve precision across the production line, while in-line controls help every product meet ReNew's performance and reliability benchmarks.",
      "The site includes a 4 GW TOPCon facility under development, strengthening ReNew's vertically integrated manufacturing capability and India's domestic solar supply chain.",
    ],
    sustainabilityTitle: "Designed to raise the efficiency standard for domestic solar manufacturing.",
    sustainabilityBody:
      "The Dholera facility pairs advanced automation with resource-efficient operations and a long-term commitment to responsible manufacturing in Gujarat's clean-energy corridor.",
  },
  {
    id: "vizag",
    name: "Visakhapatnam, Andhra Pradesh",
    shortName: "Visakhapatnam,\nAndhra Pradesh",
    map: "/images/manufacturing-detail.png",
    mapAlt: "Outline map for Visakhapatnam, Andhra Pradesh",
    mapLabelClassName: "text-xl sm:text-[26px]",
    eyebrow: "6.5 GW wafer and ingot manufacturing facility (upcoming).",
    headline: "A wafer and ingot facility strengthening India's solar value chain.",
    gallery: [
      {
        src: "/images/manufacturing-hero.png",
        alt: "Automated equipment for upstream solar manufacturing",
      },
      {
        src: "/images/partner-video-factory.webp",
        alt: "Technicians inspecting a solar module on the production line",
      },
      {
        src: "/images/home-service-projects.jpg",
        alt: "Aerial view of a utility-scale solar installation",
      },
      {
        src: "/images/solar-module-landscape.webp",
        alt: "ReNew solar module ready for dispatch",
      },
      {
        src: "/images/solar-module-rooftop.webp",
        alt: "Solar modules installed on a rooftop",
      },
    ],
    sustainabilityImage: {
      src: "/images/manufacturing-hero.png",
      alt: "Automated solar manufacturing equipment at the Visakhapatnam facility",
    },
    stats: [
      {
        label: "Capacity",
        value: "6.5 GW",
        details: "6.5 GW wafer and ingot manufacturing",
        icon: "capacity",
      },
      {
        label: "Status",
        value: "Upcoming",
        details: "Upcoming",
        icon: "area",
      },
      {
        label: "Location",
        value: "Visakhapatnam",
        details: "Visakhapatnam, Andhra Pradesh",
        icon: "date",
      },
    ],
    paragraphs: [
      "ReNew Solar Panel's third plant will complete the value chain from ingot to module, making it one of the most integrated solar manufacturers in India.",
      "The upcoming Visakhapatnam facility is designed to manufacture wafers and ingots at 6.5 GW scale, adding critical upstream capacity to India's fast-growing solar manufacturing ecosystem.",
      "Its integrated production approach improves supply resilience and gives ReNew greater control over quality at the earliest stages of the module value chain.",
    ],
    sustainabilityTitle: "Building a more resilient and self-reliant solar manufacturing ecosystem.",
    sustainabilityBody:
      "The Visakhapatnam facility brings upstream manufacturing closer to India's end market, reducing supply-chain exposure while supporting skilled clean-energy employment in Andhra Pradesh.",
  },
];

const plantIds = new Set<Plant["id"]>(plants.map((plant) => plant.id));

function getPlantIdFromHash(): Plant["id"] | null {
  const hash = window.location.hash.replace("#", "");
  return plantIds.has(hash as Plant["id"]) ? (hash as Plant["id"]) : null;
}

function scrollToTabContentStart(panelId: string, tabsId: string) {
  window.requestAnimationFrame(() => {
    const panel = document.getElementById(panelId);
    if (!panel) return;

    const header = document.querySelector("header");
    const tabs = document.getElementById(tabsId);
    const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
    const tabsHeight = tabs?.getBoundingClientRect().height ?? 0;

    window.scrollTo({
      top: window.scrollY + panel.getBoundingClientRect().top - headerBottom - tabsHeight,
      behavior: "auto",
    });
  });
}

function StatIcon({ icon }: { icon: Plant["stats"][number]["icon"] }) {
  const src =
    icon === "area"
      ? "/images/figma-stat-area.png"
      : icon === "date"
        ? "/images/figma-stat-commissioned.png"
        : "/images/figma-stat-capacity.png";

  return (
    <Image
      src={src}
      alt=""
      width={132}
      height={132}
      className="size-14 object-contain sm:size-[132px]"
    />
  );
}

export function ManufacturingDetail() {
  const statsTrackRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<Plant["id"]>("jaipur");
  const [statsPage, setStatsPage] = useState(0);
  const [statsPageCount, setStatsPageCount] = useState(1);
  const activePlant = plants.find((plant) => plant.id === activeId) ?? plants[0];
  const isDholera = activePlant.id === "dholera";
  const isVizag = activePlant.id === "vizag";
  const statsGridClass =
    activePlant.stats.length === 3
      ? "sm:grid-cols-3 xl:mx-auto xl:max-w-[1120px] xl:gap-[72px]"
      : "sm:grid-cols-2 xl:grid-cols-4 xl:gap-[72px]";
  const showSustainabilityMedia = activePlant.id !== "vizag";

  const selectPlant = (plantId: Plant["id"]) => {
    const isNewPlant = plantId !== activeId;
    setActiveId(plantId);
    setStatsPage(0);
    statsTrackRef.current?.scrollTo({ left: 0 });
    window.history.replaceState(null, "", `#${plantId}`);
    if (isNewPlant) scrollToTabContentStart("plant-panel", "manufacturing-tabs");
  };

  useEffect(() => {
    const syncPlantFromHash = () => {
      const plantId = getPlantIdFromHash();
      if (plantId) {
        setActiveId(plantId);
        setStatsPage(0);
        statsTrackRef.current?.scrollTo({ left: 0 });
        scrollToTabContentStart("plant-panel", "manufacturing-tabs");
      }
    };

    syncPlantFromHash();
    window.addEventListener("hashchange", syncPlantFromHash);

    return () => {
      window.removeEventListener("hashchange", syncPlantFromHash);
    };
  }, []);

  useEffect(() => {
    const track = statsTrackRef.current;
    if (!track) return;

    const update = () => {
      const pages = Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth));
      setStatsPageCount(pages);
      setStatsPage(Math.min(pages - 1, Math.round(track.scrollLeft / track.clientWidth)));
    };

    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [activeId]);

  const scrollToStatsPage = (target: number) => {
    const track = statsTrackRef.current;
    if (!track) return;
    track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
  };

  return (
    <>
      <section className="relative isolate flex min-h-[620px] items-center justify-center overflow-hidden text-white lg:min-h-[700px]">
        <video
          src="/videos/Manufacturing.webm"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-primary-950/70" />
        <Reveal className="mx-auto max-w-content px-4 py-20 text-center sm:px-6">
          <h1 className="text-[28px] font-light leading-[1.14] tracking-wide sm:text-[34px] lg:text-[46px]">
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
        </Reveal>
      </section>

      <div
        id="manufacturing-tabs"
        className="sticky top-[88px] z-30 border-b border-neutral-200 bg-neutral-50 shadow-sm lg:top-[138px]"
      >
        <div
          role="tablist"
          aria-label="Manufacturing plants"
          className="mx-auto grid max-w-[1580px] grid-cols-3 px-2 sm:px-6"
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
                onClick={() => selectPlant(plant.id)}
                className={`relative flex min-h-20 items-center justify-center gap-3 px-1 text-xs font-bold transition-colors sm:min-h-28 sm:px-2 sm:text-lg lg:text-2xl ${
                  active ? "text-primary-700" : "text-neutral-400 hover:text-primary-700"
                }`}
              >
                {/* <Image
                  src={plant.map}
                  alt=""
                  width={52}
                  height={48}
                  className={`hidden h-10 w-12 object-contain sm:block ${active ? "" : "grayscale opacity-55"}`}
                />
                <span className="sm:hidden">
                  {plant.id === "jaipur"
                    ? "Jaipur"
                    : plant.id === "dholera"
                      ? "Dholera"
                      : "Visakhapatnam"}
                </span> */}
                <span className="whitespace-pre-line leading-tight sm:hidden">
                  {plant.shortName}
                </span>
                <span className="hidden sm:inline">{plant.name}</span>
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
        <section className="mx-auto max-w-[1580px] px-4 py-20 sm:px-6 lg:py-24">
          <Reveal
            stagger
            className={`grid w-full items-start gap-14 pb-20 lg:items-stretch lg:gap-12 lg:pb-[150px] ${
              isVizag ? "justify-items-center" : "lg:grid-cols-2"
            }`}
          >
            <div
              className={`w-full max-w-none ${
                isVizag
                  ? "text-center"
                  : isDholera
                    ? "lg:flex lg:h-full lg:flex-col lg:justify-start"
                    : "lg:flex lg:h-full lg:flex-col lg:justify-between"
              }`}
            >
              <p
                className={`text-base font-bold uppercase tracking-[0.18em] text-primary-700 sm:text-xl md:text-2xl lg:hidden ${
                  isVizag ? "mx-auto max-w-[760px]" : "max-w-[620px]"
                }`}
              >
                {activePlant.name}
              </p>
              <p
                className={`mt-5 text-2xl font-extrabold uppercase leading-[1.14] tracking-[0.03em] text-primary-700 sm:text-[34px] md:text-[48px] md:leading-[54px] lg:mt-0 ${
                  isVizag ? "mx-auto max-w-[760px]" : "max-w-[620px]"
                }`}
              >
                {activePlant.eyebrow}
              </p>
              <h2
                className={`mt-7 whitespace-pre-line text-2xl font-normal leading-[1.16] tracking-[0.03em] text-primary-950 sm:text-[34px] md:text-[46px] md:leading-[54px] ${
                  isVizag
                    ? "mx-auto max-w-[980px]"
                    : isDholera
                      ? "max-w-[660px] text-balance lg:mt-14"
                      : "max-w-[650px] lg:mt-0"
                }`}
              >
                {activePlant.headline}
              </h2>
            </div>
            {!isVizag ? (
              <div className="relative mx-auto flex aspect-[741/430] w-full max-w-none items-start justify-center overflow-hidden lg:mx-0">
                <Image
                  src={activePlant.map}
                  alt={activePlant.mapAlt}
                  width={741}
                  height={378}
                  className="h-full w-full object-cover"
                />
                {/* <p
                  className={`pointer-events-none absolute inset-0 flex items-center justify-center whitespace-pre-line px-10 text-center font-bold leading-tight text-white ${activePlant.mapLabelClassName}`}
                >
                  {activePlant.shortName}
                </p> */}
              </div>
            ) : null}
          </Reveal>

          {/* Wrapper, not the track itself: the track owns statsTrackRef, and
              its cards carry a 3D flip that a per-card reveal would sit on
              top of. The row arrives as one block instead. */}
          <Reveal>
            <div
              ref={statsTrackRef}
              className={`flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] sm:grid sm:gap-7 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden ${statsGridClass}`}
            >
              {activePlant.stats.map((stat) => (
                <article
                  key={stat.label}
                  tabIndex={0}
                  aria-label={`${stat.label}: ${stat.value}. ${stat.details}`}
                  className="group h-[344px] w-[88%] shrink-0 snap-start rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-700 sm:w-auto sm:perspective-[1200px]"
                >
                  <div className="flex h-full flex-col items-center justify-center rounded-md bg-primary-700 px-6 py-7 text-center text-white sm:hidden">
                    <StatIcon icon={stat.icon} />
                    <h3 className="mt-5 text-lg font-bold uppercase tracking-wide">
                      {stat.label}
                    </h3>
                    <p className="mt-3 text-4xl font-bold leading-none">
                      {stat.value}
                    </p>
                    <p className="mt-5 max-w-[250px] text-base font-bold leading-snug">
                      {stat.details}
                    </p>
                  </div>

                  <div className="hidden h-full transition-transform duration-700 transform-3d group-hover:rotate-y-180 group-focus-within:rotate-y-180 motion-reduce:transition-none sm:grid">
                    <div className="flex h-full flex-col items-center justify-center rounded-md bg-primary-700 px-7 py-10 text-center text-white [grid-area:1/1] backface-hidden">
                      <StatIcon icon={stat.icon} />
                      <h3 className="mt-10 text-2xl font-bold uppercase tracking-wide">
                        {stat.label}
                      </h3>
                    </div>

                    <div className="flex h-full rotate-y-180 flex-col items-center justify-center rounded-md bg-primary-950 px-7 py-10 text-center text-white [grid-area:1/1] backface-hidden">
                      <p className="text-2xl font-bold leading-snug">{stat.details}</p>
                      <h3 className="mt-5 text-xl font-bold uppercase tracking-wide">
                        {stat.label}
                      </h3>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>

          <div className="mt-6 flex items-center justify-between sm:hidden">
            <div className="flex gap-3" role="tablist" aria-label="Manufacturing stats">
              {Array.from({ length: statsPageCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={statsPage === i}
                  aria-label={`Stat ${i + 1}`}
                  onClick={() => scrollToStatsPage(i)}
                  className={`size-2.5 rounded-full transition ${
                    statsPage === i ? "bg-neutral-500" : "bg-neutral-300"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                aria-label="Previous manufacturing stat"
                disabled={statsPage === 0}
                onClick={() => scrollToStatsPage(statsPage - 1)}
                className="flex size-12 items-center justify-center rounded-md bg-neutral-200 text-neutral-600 transition enabled:hover:bg-neutral-300 disabled:opacity-40"
              >
                <ChevronLeft aria-hidden className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next manufacturing stat"
                disabled={statsPage >= statsPageCount - 1}
                onClick={() => scrollToStatsPage(statsPage + 1)}
                className="flex size-12 items-center justify-center rounded-md bg-neutral-200 text-neutral-600 transition enabled:hover:bg-neutral-300 disabled:opacity-40"
              >
                <ChevronRight aria-hidden className="size-5" />
              </button>
            </div>
          </div>

          <Reveal
            stagger
            className="mt-14 space-y-7 text-[16px] font-light leading-7 text-neutral-500 sm:mt-[120px] sm:space-y-10 sm:text-[26px] sm:leading-[1.55]"
          >
            {activePlant.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </section>

        <section className="relative overflow-hidden bg-surface-tint pb-8 pt-24 lg:py-32">
          <Image
            src="/images/sunburst.svg"
            alt=""
            width={560}
            height={300}
            className="pointer-events-none absolute -right-8 -top-10 w-56 opacity-60 sm:w-96 lg:-right-10 lg:-top-16 lg:w-[560px] lg:opacity-70"
          />
          <Reveal className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
            <p className="text-xl font-bold uppercase text-primary-700">Sustainability Credentials</p>
            <h2 className="mt-10 text-2xl font-bold leading-[1.14] text-primary-950 sm:mt-12 sm:text-[34px] md:text-[50px]">
              {activePlant.sustainabilityTitle}
            </h2>
            <p className="mx-auto mt-8 max-w-6xl text-[17px] font-light leading-6 text-neutral-500 sm:mt-12 sm:text-2xl sm:leading-10">
              {activePlant.sustainabilityBody}
            </p>
          </Reveal>

          {showSustainabilityMedia ? (
            <Reveal as="figure" className="relative mx-[calc(50%-50vw)] mt-16 w-screen lg:mx-auto lg:mt-20 lg:max-w-[1580px] lg:px-4 xl:px-0">
              <div className="relative aspect-[21/9] min-h-[260px] w-full overflow-hidden bg-primary-950 lg:aspect-[16/7] lg:min-h-0 lg:rounded-md">
                {activePlant.video ? (
                  <video
                    key={activePlant.id}
                    src={activePlant.video.src}
                    autoPlay
                    controls
                    loop
                    muted
                    preload="metadata"
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={activePlant.sustainabilityImage.src}
                    alt={activePlant.sustainabilityImage.alt}
                    fill
                    sizes="(min-width: 1532px) 1532px, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
              {activePlant.video ? (
                <figcaption className="sr-only">{activePlant.video.title}</figcaption>
              ) : null}
            </Reveal>
          ) : null}
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
