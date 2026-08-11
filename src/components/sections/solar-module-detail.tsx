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
  Play,
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
  dimensions: string;
  weight: string;
  almmApproved: string;
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
    dimensions: "2382 x 1134 x 30 mm",
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
    range: "Up to 610 Wp",
    efficiency: "Up to 23.61%",
    cellType: "N-type TOPCon, half-cut M10R cells",
    bifacialityFactor: "Up to 80%",
    powerWarranty: "30 years",
    productWarranty: "12 years",
    firstYearDegradation: "1%",
    annualPowerAttenuation: "0.40%",
    dimensions: "M10R module format",
    weight: "M10R module format",
    almmApproved: "Yes",
    imageSrc: "/images/products/solar-module/m10r-topcon-144-cell-module.webp",
    imageAlt: "M10R TOPCon 144 cell solar module",
    datasheetHref: "/downloads/product-datasheets/m10r-topcon.pdf",
  },
  {
    id: "m10r-perc",
    label: "M10R PERC",
    title: "M10R PERC Module",
    range: "Up to 560 Wp",
    efficiency: "Up to 21.68%",
    cellType: "P-type Mono PERC, half-cut M10R cells",
    bifacialityFactor: "Bifacial module option",
    powerWarranty: "30 years",
    productWarranty: "12 years",
    firstYearDegradation: "1%",
    annualPowerAttenuation: "0.55%",
    dimensions: "M10R module format",
    weight: "M10R module format",
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
    setActiveModuleId(moduleId);
    window.history.replaceState(null, "", `#${moduleId}`);
  };

  useEffect(() => {
    const syncModuleFromHash = () => {
      const moduleId = getModuleIdFromHash();
      if (moduleId) {
        setActiveModuleId(moduleId);
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
          <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[60px] lg:leading-[64px] lg:tracking-hero">
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

      <section id="module-range" className="relative bg-white">
      <div className="sticky top-[88px] z-30 bg-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.08)] lg:top-[136px] xl:top-[138px]">
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
                className={`relative flex min-h-20 items-center justify-center px-2 text-center text-sm font-normal leading-tight transition-colors sm:min-h-[108px] sm:text-xl lg:text-2xl ${
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
          <div className="relative mx-auto h-[430px] max-w-[660px] sm:h-[560px] lg:h-[640px]">
            <Image
              src={activeModule.imageSrc}
              alt={activeModule.imageAlt}
              fill
              sizes="(min-width: 1024px) 46vw, 90vw"
              className="object-contain"
            />
          </div>
          <div className="mt-8 grid grid-cols-3 gap-2 sm:flex sm:justify-center sm:gap-7">
            {moduleRanges.map((moduleRange) => (
              <button
                key={moduleRange.id}
                type="button"
                aria-label={`Show ${moduleRange.label}`}
                aria-pressed={activeModuleId === moduleRange.id}
                onClick={() => selectModule(moduleRange.id)}
                className={`relative aspect-square w-full min-w-0 overflow-hidden rounded-lg border bg-white p-1 transition sm:size-24 sm:w-24 ${
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
        </div>

        <div className="pt-4 text-center text-primary-950 lg:pt-10 lg:text-left">
          <h2 className="text-3xl font-bold sm:text-4xl">{activeModule.title}</h2>
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
              <dt>Cell type</dt>
              <dd className="mt-1 text-neutral-500 sm:mt-2">{activeModule.cellType}</dd>
            </div>
            <div className="col-span-1 border-b border-neutral-200 py-5 pr-2 sm:col-span-2 sm:py-8 sm:pr-4">
              <dt>Bifaciality factor</dt>
              <dd className="mt-1 text-neutral-500 sm:mt-2">{activeModule.bifacialityFactor}</dd>
            </div>
            <div className="col-span-1 border-b border-neutral-200 py-5 pl-2 text-right sm:col-span-2 sm:px-2 sm:py-8 sm:text-left">
              <dt>Power warranty</dt>
              <dd className="mt-1 text-neutral-500 sm:mt-2">{activeModule.powerWarranty}</dd>
            </div>
            <div className="col-span-1 border-b border-neutral-200 py-5 pr-2 sm:col-span-2 sm:py-8 sm:pl-4 sm:pr-0">
              <dt>Product warranty</dt>
              <dd className="mt-1 text-neutral-500 sm:mt-2">{activeModule.productWarranty}</dd>
            </div>
            <div className="col-span-1 border-b border-neutral-200 py-5 pl-2 text-right sm:col-span-3 sm:py-8 sm:pl-0 sm:pr-4 sm:text-left">
              <dt>First year degradation</dt>
              <dd className="mt-1 text-neutral-500 sm:mt-2">{activeModule.firstYearDegradation}</dd>
            </div>
            <div className="col-span-1 border-b border-neutral-200 py-5 pr-2 sm:col-span-3 sm:py-8 sm:pl-4 sm:pr-0">
              <dt>Annual power attenuation</dt>
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
            <div className="col-span-1 border-b border-neutral-200 py-5 pl-2 text-right sm:col-span-6 sm:py-8 sm:pl-0 sm:text-left">
              <dt>ALMM approved</dt>
              <dd className="mt-1 text-neutral-500 sm:mt-2">{activeModule.almmApproved}</dd>
            </div>
          </dl>

          <div className="mt-16 flex flex-wrap justify-center gap-6 lg:justify-start">
            <ContactModalTrigger
              className="rounded-full bg-primary-400 px-12 py-4 text-xl font-bold text-white transition hover:bg-primary-500"
            >
              Enquire Now
            </ContactModalTrigger>
            <a
              href={activeModule.datasheetHref}
              download
              className="rounded-full bg-primary-950 px-12 py-4 text-xl font-bold text-white transition hover:bg-primary-900"
            >
              Download Datasheet
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal
        stagger
        className="mx-auto grid max-w-content gap-16 px-4 pb-44 pt-0 sm:px-6 lg:grid-cols-[0.98fr_1fr] lg:gap-24 lg:pb-64 xl:px-0"
      >
        <div className="space-y-10 pt-0 sm:space-y-12">
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

        <div className="flex items-start justify-center pt-2 lg:pt-8">
          <PowerOutputChart className="max-w-[560px]" replayKey={activeModuleId} />
        </div>
      </Reveal>

      <div className="mx-auto max-w-content px-4 pb-36 text-center sm:px-6 xl:px-0">
        <Reveal stagger className="grid grid-cols-3 gap-3 sm:gap-14 md:gap-8">
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

      <div className="relative pb-32">
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 top-[150px] overflow-hidden bg-primary-700 sm:top-[180px] lg:top-[280px]"
        >
          <div className="pointer-events-none absolute bottom-0 right-[8%] hidden w-[clamp(320px,34vw,520px)] translate-y-1/2 opacity-40 lg:block">
            <Image
              alt=""
              width={702}
              height={701}
              src="/images/sunburst_full.svg"
              className="w-full animate-sunburst motion-reduce:animate-none"
            />
          </div>
        </div>
        <div className="relative mx-auto max-w-[1532px] px-4 sm:px-6 xl:px-0">
          <button
            type="button"
            aria-label="Play utility-scale solar installation video"
            className="group relative block aspect-[1532/740] min-h-[300px] w-full overflow-hidden rounded-md bg-primary-950 sm:min-h-[360px] lg:min-h-0"
          >
            <Image
              src="/images/solar-module-video.svg"
              alt="Solar panels extending across a utility-scale project site"
              fill
              sizes="(min-width: 1536px) 1532px, 100vw"
              className="object-cover object-[center_35%] transition duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute left-1/2 top-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[6px] border-white sm:size-48">
              <Play aria-hidden className="ml-2 size-14 fill-white text-white sm:size-20" />
            </span>
          </button>

          <div className="relative mt-16 flex flex-wrap justify-center gap-8 lg:mt-44">
            <ContactModalTrigger
              className="relative rounded-full bg-primary-400 px-12 py-4 text-xl font-bold text-white transition hover:bg-primary-500"
            >
              Enquire Now
            </ContactModalTrigger>
            <a
              href={activeModule.datasheetHref}
              download
              className="relative rounded-full bg-primary-950 px-12 py-4 text-xl font-bold text-white transition hover:bg-primary-900"
            >
              Download Datasheet
            </a>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
