"use client";

import Image from "next/image";
import { useEffect, useState, type ComponentType } from "react";
import { ContactModalTrigger } from "@/components/contact-modal";
import { PowerOutputChart } from "@/components/power-output-chart";
import { Reveal } from "@/components/reveal";
import {
  Cpu,
  Factory,
  Gauge,
  House,
  ShieldCheck,
  ThermometerSun,
  Warehouse,
  type LucideProps,
} from "lucide-react";

const applications = [
  {
    line1: "Utility-scale solar",
    line2: "power plants",
    icon: Warehouse,
  },
  {
    line1: "High capacity commercial and",
    line2: "industrial installations",
    icon: Factory,
  },
  {
    line1: "High power requirement",
    line2: "residential units",
    icon: House,
  },
];

type ModuleId = "g12r-topcon-bifacial" | "m10r-topcon" | "m10r-perc";

type ModuleFeature = {
  title: string;
  description: string;
  icon: ComponentType<LucideProps>;
};

const featuresByModule: Record<ModuleId, ModuleFeature[]> = {
  "g12r-topcon-bifacial": [
    {
      title: "Advanced TOPCon Technology",
      description:
        "16 busbars to minimise micro-crack impacts. Half cut. G12R cell. Smart soldering. Zero LID.",
      icon: Cpu,
    },
    {
      title: "Tough Modules for Harsh Weather",
      description:
        "Tested to withstand wind load of 2400 Pa and snow load of 5400 Pa.",
      icon: ThermometerSun,
    },
    {
      title: "Robust Performance",
      description: "1% first year degradation. Excellent PID resistance performance.",
      icon: ShieldCheck,
    },
    {
      title: "High Performance Tolerance",
      description:
        "Excellent low-light performance on cloudy or rainy days. Low temperature coefficient for stable performance in hot climates.",
      icon: Gauge,
    },
  ],
  "m10r-topcon": [
    {
      title: "Advanced TOPCon Technology",
      description:
        "16 busbars to minimise micro-crack impacts. Half cut. M10 cell. Smart soldering. Zero LID.",
      icon: Cpu,
    },
    {
      title: "Tough Modules for Harsh Weather",
      description:
        "Tested to withstand wind load of 2400 Pa and snow load of 5400 Pa.",
      icon: ThermometerSun,
    },
    {
      title: "Robust Performance",
      description: "1% first year degradation. Excellent PID resistance performance.",
      icon: ShieldCheck,
    },
    {
      title: "High Performance Tolerance",
      description:
        "Excellent low-light performance on cloudy or rainy days. Low temperature coefficient for stable performance in hot climates.",
      icon: Gauge,
    },
  ],
  "m10r-perc": [
    {
      title: "Advanced Technologies",
      description: "Multi-bus bar. PERC. Ga Doped. Half cut. M10 cell. Smart soldering.",
      icon: Cpu,
    },
    {
      title: "Heavy Snow, Hail and Wind-Load Resistant",
      description:
        "Enhanced mechanical load up to 5400 Pascals snow load and 2400 Pascals wind load.",
      icon: ThermometerSun,
    },
    {
      title: "Reliable Modules with Longer Lifespan",
      description:
        "Hotspot resistant. Micro-cracking resistant. 0.45% linear degradation over 30 years.",
      icon: ShieldCheck,
    },
    {
      title: "Excellent Low Light Performance",
      description:
        "More power output in weak light conditions including early morning, sunset and cloudy days. Suitable for large-scale utility and ground-mount projects.",
      icon: Gauge,
    },
  ],
};

type ModuleRange = {
  id: ModuleId;
  label: string;
  title: string;
  range: string;
  efficiency: string;
  cellType: string;
  bifacialityFactor: string;
  powerWarranty: string;
  productWarranty: string;
  firstYearDegradation: string;
  annualPowerAttenuation: string;
  firstYearOutput: number;
  annualAttenuation: number;
  dimensions: string;
  weight: string;
  almmApproved?: string;
  imageSrc: string;
  imageAlt: string;
  datasheetHref: string;
};

const moduleRanges: ModuleRange[] = [
  {
    id: "g12r-topcon-bifacial",
    label: "G12R TOPCon Bifacial",
    title: "G12R TOPCon Bifacial Module",
    range: "605 to 640 Wp",
    efficiency: "Up to 23.69%",
    cellType: "N-type TOPCon, 132 half-cut G12R cells",
    bifacialityFactor: "Up to 80%",
    powerWarranty: "30 years",
    productWarranty: "12 years",
    firstYearDegradation: "1%",
    annualPowerAttenuation: "0.40%",
    firstYearOutput: 99,
    annualAttenuation: 0.4,
    dimensions: "2382 × 1134 × 30 mm",
    weight: "33.5 kg",
    almmApproved: "Yes",
    imageSrc: "/images/products/solar-module/g12r-topcon-132-cell-module.webp",
    imageAlt: "G12R TOPCon 132 cell solar module",
    datasheetHref: "/downloads/product-datasheets/g12r-topcon-bifacial-module.pdf",
  },
  {
    id: "m10r-topcon",
    label: "M10R TOPCon",
    title: "M10R TOPCon Module",
    range: "570 to 590 Wp",
    efficiency: "Up to 22.84%",
    cellType: "Bifacial TOPCon, 144 half-cut M10 cells",
    bifacialityFactor: "Up to 80%",
    powerWarranty: "30 years",
    productWarranty: "12 years",
    firstYearDegradation: "1%",
    annualPowerAttenuation: "0.40%",
    firstYearOutput: 99,
    annualAttenuation: 0.4,
    dimensions: "2278 × 1134 × 30 mm",
    weight: "32.5 kg",
    imageSrc: "/images/products/solar-module/m10r-topcon-144-cell-module.webp",
    imageAlt: "M10R TOPCon 144 cell solar module",
    datasheetHref: "/downloads/product-datasheets/m10r-topcon.pdf",
  },
  {
    id: "m10r-perc",
    label: "M10R PERC",
    title: "M10R PERC Module",
    range: "530 to 560 Wp",
    efficiency: "Up to 21.68%",
    cellType: "Bifacial Mono PERC, 144 half-cut M10 cells",
    bifacialityFactor: "Up to 70%",
    powerWarranty: "30 years",
    productWarranty: "12 years",
    firstYearDegradation: "2%",
    annualPowerAttenuation: "0.45%",
    firstYearOutput: 98,
    annualAttenuation: 0.45,
    dimensions: "2278 × 1134 × 30 mm",
    weight: "32.5 kg",
    almmApproved: "Yes",
    imageSrc: "/images/products/solar-module/m10-mono-perc.webp",
    imageAlt: "M10 Mono PERC solar module",
    datasheetHref: "/downloads/product-datasheets/m10r-perc.pdf",
  },
];

const moduleIds = new Set<ModuleRange["id"]>(
  moduleRanges.map((moduleRange) => moduleRange.id),
);

function getModuleIdFromHash(): ModuleRange["id"] | null {
  const hash = window.location.hash.replace("#", "");
  return moduleIds.has(hash as ModuleRange["id"]) ? (hash as ModuleRange["id"]) : null;
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

function FeatureIcon({ icon: Icon }: { icon: ComponentType<LucideProps> }) {
  return (
    <span
      aria-hidden
      className="mx-auto flex size-14 shrink-0 items-center justify-center text-primary-700 lg:mx-0 lg:mt-1 lg:size-11"
    >
      <Icon className="size-12 lg:size-10" strokeWidth={1.7} />
    </span>
  );
}

export function SolarModuleDetail() {
  const [activeFeature, setActiveFeature] = useState(1);
  const [activeModuleId, setActiveModuleId] =
    useState<ModuleRange["id"]>("g12r-topcon-bifacial");
  const activeModule =
    moduleRanges.find((moduleRange) => moduleRange.id === activeModuleId) ??
    moduleRanges[0];
  const activeModuleFeatures = featuresByModule[activeModuleId];

  const selectModule = (moduleId: ModuleRange["id"]) => {
    const isNewModule = moduleId !== activeModuleId;
    setActiveModuleId(moduleId);
    window.history.replaceState(null, "", `#${moduleId}`);
    if (isNewModule) scrollToTabContentStart("module-panel", "module-tabs");
  };

  useEffect(() => {
    const syncModuleFromHash = () => {
      const moduleId = getModuleIdFromHash();
      if (moduleId) {
        setActiveModuleId(moduleId);
        scrollToTabContentStart("module-panel", "module-tabs");
      }
    };

    syncModuleFromHash();
    window.addEventListener("hashchange", syncModuleFromHash);

    return () => {
      window.removeEventListener("hashchange", syncModuleFromHash);
    };
  }, []);

  return (
    <>
      <section className="relative flex min-h-[460px] items-start justify-center overflow-hidden px-4 pb-20 pt-20 text-center sm:min-h-[560px] sm:px-6 lg:min-h-[704px] lg:pt-[114px]">
        <Image
          src="/images/solarmodule.webp"
          alt="A large solar farm across green hills at sunrise"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-white/15" />
        <Reveal className="relative max-w-5xl text-primary-950">
          <h1 className="text-[28px] font-bold leading-[1.14] sm:text-[34px] lg:text-[60px] lg:leading-[64px] lg:tracking-hero">
            Engineered for performance.
            <br />
            Built for the long run.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl font-normal leading-8 lg:mt-7 lg:text-2xl">
            Three module offerings built for homes, businesses, and large-scale utility
            projects across India.
          </p>
        </Reveal>
      </section>

      <section
        id="module-range"
        className="relative scroll-mt-[88px] bg-white lg:scroll-mt-[136px] xl:scroll-mt-[138px]"
      >
        <div
          id="module-tabs"
          className="sticky top-[88px] z-30 bg-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.08)] lg:top-[138px]"
        >
          <div
            role="tablist"
            aria-label="Solar module range"
            className="mx-auto grid max-w-content grid-cols-3 px-4 sm:px-6 xl:px-0"
          >
            {moduleRanges.map((moduleRange) => {
              const active = activeModuleId === moduleRange.id;

              return (
                <button
                  key={moduleRange.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="module-panel"
                  onClick={() => selectModule(moduleRange.id)}
                  className={`relative flex min-h-20 scroll-mt-[88px] items-center justify-center px-2 text-center text-sm font-normal leading-tight transition-colors sm:min-h-[108px] sm:text-xl lg:scroll-mt-[136px] lg:text-2xl xl:scroll-mt-[138px] ${
                    active ? "text-primary-700" : "text-neutral-400 hover:text-primary-700"
                  }`}
                >
                  <span>{moduleRange.label}</span>
                  <span
                    className={`absolute inset-x-0 bottom-0 h-3.5 origin-left bg-primary-400 transition-transform ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <Reveal
          stagger
          id="module-panel"
          role="tabpanel"
          className="mx-auto grid max-w-content gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_1fr] lg:gap-24 lg:py-28 xl:px-0"
        >
        <div>
          <div className="relative mx-auto mt-4 h-[540px] max-w-[860px] sm:mt-6 sm:h-[720px] lg:mt-8 lg:h-[820px]">
            <Image
              src={activeModule.imageSrc}
              alt={activeModule.imageAlt}
              fill
              sizes="(min-width: 1024px) 46vw, 90vw"
              className="object-contain"
            />
          </div>
          {/*
          <div className="mt-8 grid grid-cols-3 gap-2 sm:flex sm:justify-center sm:gap-7">
            {moduleRanges.map((moduleRange) => (
              <button
                key={moduleRange.id}
                type="button"
                aria-label={`Show ${moduleRange.label}`}
                aria-pressed={activeModuleId === moduleRange.id}
                onClick={() => selectModule(moduleRange.id)}
                className={`relative aspect-square w-full min-w-0 overflow-hidden rounded-md border bg-white p-1 transition sm:size-24 sm:w-24 ${
                  activeModuleId === moduleRange.id
                    ? "border-primary-400 bg-neutral-100"
                    : "border-neutral-200 hover:border-primary-300"
                }`}
              >
                <Image
                  src={moduleRange.imageSrc}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-contain p-2"
                />
              </button>
            ))}
          </div>
          */}
        </div>

        <div className="pt-4 text-center text-primary-950 lg:pt-10 lg:text-left">
          <h2 className="text-[28px] font-bold leading-[1.14] sm:text-4xl">{activeModule.title}</h2>
          <p className="mt-4 text-2xl font-bold text-primary-700">Right. Reliable. Ready.</p>

          <dl className="mt-8 grid grid-cols-2 border-t border-neutral-200 text-left text-sm leading-5 sm:mt-16 sm:grid-cols-6 sm:text-xl sm:leading-normal">
            <div className="col-span-1 border-b border-neutral-200 py-5 pr-2 sm:col-span-3 sm:py-8 sm:pr-4">
              <dt>Range</dt>
              <dd className="mt-1 text-neutral-500 sm:mt-2">{activeModule.range}</dd>
            </div>
            <div className="col-span-1 border-b border-neutral-200 py-5 pl-2 text-right sm:col-span-3 sm:py-8 sm:pl-4 sm:text-left">
              <dt>Efficiency</dt>
              <dd className="mt-1 text-neutral-500 sm:mt-2">{activeModule.efficiency}</dd>
            </div>
            <div className="col-span-2 border-b border-neutral-200 py-5 sm:col-span-6 sm:py-8">
              <dt>Cell Type</dt>
              <dd className="mt-1 text-neutral-500 sm:mt-2">{activeModule.cellType}</dd>
            </div>
            <div className="col-span-1 border-b border-neutral-200 py-5 pr-2 sm:col-span-2 sm:py-8 sm:pr-4">
              <dt>Bifaciality Factor</dt>
              <dd className="mt-1 text-neutral-500 sm:mt-2">{activeModule.bifacialityFactor}</dd>
            </div>
            <div className="col-span-1 border-b border-neutral-200 py-5 pl-2 text-right sm:col-span-2 sm:px-2 sm:py-8 sm:text-left">
              <dt>Power Warranty</dt>
              <dd className="mt-1 text-neutral-500 sm:mt-2">{activeModule.powerWarranty}</dd>
            </div>
            <div className="col-span-1 border-b border-neutral-200 py-5 pr-2 sm:col-span-2 sm:py-8 sm:pl-4 sm:pr-0">
              <dt>Product Warranty</dt>
              <dd className="mt-1 text-neutral-500 sm:mt-2">{activeModule.productWarranty}</dd>
            </div>
            <div className="col-span-1 border-b border-neutral-200 py-5 pl-2 text-right sm:col-span-3 sm:py-8 sm:pl-0 sm:pr-4 sm:text-left">
              <dt>First Year Degradation</dt>
              <dd className="mt-1 text-neutral-500 sm:mt-2">{activeModule.firstYearDegradation}</dd>
            </div>
            <div className="col-span-1 border-b border-neutral-200 py-5 pr-2 sm:col-span-3 sm:py-8 sm:pl-4 sm:pr-0">
              <dt>Annual Power Attenuation</dt>
              <dd className="mt-1 text-neutral-500 sm:mt-2">
                {activeModule.annualPowerAttenuation}
              </dd>
            </div>
            <div className="col-span-1 border-b border-neutral-200 py-5 pl-2 text-right sm:col-span-3 sm:py-8 sm:pl-0 sm:pr-4 sm:text-left">
              <dt>Dimensions</dt>
              <dd className="mt-1 text-neutral-500 sm:mt-2">{activeModule.dimensions}</dd>
            </div>
            <div className="col-span-1 border-b border-neutral-200 py-5 pr-2 sm:col-span-3 sm:py-8 sm:pl-4 sm:pr-0">
              <dt>Weight</dt>
              <dd className="mt-1 text-neutral-500 sm:mt-2">{activeModule.weight}</dd>
            </div>
            {activeModule.almmApproved ? (
              <div className="col-span-1 border-b border-neutral-200 py-5 pl-2 text-right sm:col-span-6 sm:py-8 sm:pl-0 sm:text-left">
                <dt>ALMM Approved</dt>
                <dd className="mt-1 text-neutral-500 sm:mt-2">{activeModule.almmApproved}</dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-16 flex flex-wrap justify-center gap-6 lg:justify-start">
            <ContactModalTrigger
              className="inline-flex min-h-10 min-w-[168px] items-center justify-center rounded-full bg-primary-400 px-8 py-0 text-base font-bold text-white transition hover:bg-primary-500 md:px-12 md:py-4 md:text-xl"
            >
              Enquire Now
            </ContactModalTrigger>
            <a
              href={activeModule.datasheetHref}
              download
              className="inline-flex min-h-10 min-w-[168px] items-center justify-center rounded-full bg-primary-950 px-8 py-0 text-base font-bold text-white transition hover:bg-primary-900 md:px-12 md:py-4 md:text-xl"
            >
              Download Datasheet
            </a>
          </div>
        </div>
      </Reveal>

      <div className="bg-[linear-gradient(180deg,#F0F6F3_0%,rgba(240,246,243,0)_30%,#FFFFFF_100%)]">
        <Reveal
          stagger
          className="mx-auto grid max-w-content gap-16 px-4 pb-44 pt-16 sm:px-6 lg:grid-cols-[0.98fr_1fr] lg:gap-24 lg:pb-64 lg:pt-24 xl:px-0"
        >
          <div className="pt-0">
            <p className="mb-14 text-center text-[20px] font-semibold uppercase leading-[40px] tracking-normal text-primary-700 lg:text-left">
              What goes into every ReNew solar panel
            </p>
            <div className="space-y-10 sm:space-y-12">
              {activeModuleFeatures.map((feature, index) => {
                const active = activeFeature === index;
                return (
                  <button
                    key={`${activeModuleId}-${feature.title}`}
                    type="button"
                    onMouseEnter={() => setActiveFeature(index)}
                    onFocus={() => setActiveFeature(index)}
                    onClick={() => setActiveFeature(index)}
                    aria-expanded={active}
                    className="grid w-full gap-4 text-center lg:grid-cols-[44px_minmax(0,520px)] lg:items-start lg:gap-7 lg:text-left"
                  >
                    <FeatureIcon icon={feature.icon} />
                    <span className="mx-auto w-full max-w-[520px] lg:mx-0">
                      <span className="block text-2xl font-bold leading-tight text-[#143b58] sm:text-3xl">
                        {feature.title}
                      </span>
                      <span
                        className={`mx-auto grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none lg:mx-0 ${
                          active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="min-h-0 overflow-hidden">
                          <span className="block pt-4 text-lg leading-7 text-[#143b58] sm:text-xl sm:leading-8">
                            {feature.description}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 lg:pt-0">
            <div className="mx-auto max-w-[560px]">
              <p className="mb-14 text-left text-[20px] font-semibold uppercase leading-[40px] tracking-normal text-primary-700">
                Performance you can count on
              </p>
              <PowerOutputChart
                annualAttenuation={activeModule.annualAttenuation}
                firstYearOutput={activeModule.firstYearOutput}
                replayKey={activeModuleId}
              />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative overflow-hidden bg-[#F2F2F2] py-16 text-center sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute left-4 top-0 w-40 -translate-y-1/2 opacity-20 sm:left-12 sm:w-56 lg:left-[7%] lg:w-[360px]">
          <Image
            src="/images/sunburst_full.svg"
            alt=""
            width={702}
            height={701}
            className="w-full animate-sunburst motion-reduce:animate-none"
          />
        </div>
        <div className="relative mx-auto max-w-content px-4 sm:px-6 xl:px-0">
          <Reveal>
            <p className="text-xl font-bold uppercase leading-8 text-primary-700 sm:text-2xl">
              Ideal Applications
            </p>
          </Reveal>
          <Reveal stagger className="mt-10 grid grid-cols-3 gap-3 sm:mt-14 sm:gap-14 md:gap-8">
            {applications.map((application) => (
              <div key={application.line1} className="flex flex-col items-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-primary-700 sm:size-32">
                  <application.icon
                    aria-hidden
                    className="size-8 text-white sm:size-16"
                    strokeWidth={1.8}
                  />
                </span>
                <p className="mt-4 max-w-sm text-[11px] font-bold leading-4 text-[#143b58] sm:mt-10 sm:text-2xl sm:leading-8">
                  {application.line1}
                  <br />
                  {application.line2}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

    </section>
    </>
  );
}
