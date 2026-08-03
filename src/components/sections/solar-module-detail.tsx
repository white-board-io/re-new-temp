"use client";

import Image from "next/image";
import { useEffect, useState, type ComponentType } from "react";
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

const gallery = [
  {
    src: "/images/solar-module-front.webp",
    alt: "Rear view of a ReNew G12R solar module",
  },
  {
    src: "/images/solar-module-product.webp",
    alt: "Front and rear views of ReNew G12R solar modules",
  },
  {
    src: "/images/solar-module-landscape.webp",
    alt: "Landscape view of a ReNew solar module",
  },
  {
    src: "/images/solar-module-landscape-alt.webp",
    alt: "Alternate landscape view of a ReNew solar module",
  },
  {
    src: "/images/solar-module-pair.webp",
    alt: "Paired front and rear ReNew solar modules",
  },
];

const features = [
  {
    title: "Advanced TOPCon technology",
    description: "N-type TOPCon cells deliver high efficiency and dependable output.",
    icon: Cpu,
  },
  {
    title: "Tough modules for harsh weather",
    description: "Tested to withstand extended wind load (2400 Pa) and snow load (5400 Pa)",
    icon: ThermometerSun,
  },
  {
    title: "High performance tolerance",
    description:
      "Excellent low light performance on cloudy or rainy days and a low temperature coefficient for stable performance in hot climates.",
    icon: Gauge,
  },
  {
    title: "Robust performance",
    description: "1% first-year degradation with excellent PID resistance performance.",
    icon: ShieldCheck,
  },
];

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

type ModuleRange = {
  id: "g12r-topcon-bifacial" | "m10r-topcon" | "m10r-perc";
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
      className="flex size-11 shrink-0 items-center justify-center text-primary-700 lg:mt-1"
    >
      <Icon className="size-10" strokeWidth={1.7} />
    </span>
  );
}

export function SolarModuleDetail() {
  const [selectedImage, setSelectedImage] = useState(1);
  const [activeFeature, setActiveFeature] = useState(1);
  const [activeModuleId, setActiveModuleId] =
    useState<ModuleRange["id"]>("g12r-topcon-bifacial");
  const activeModule =
    moduleRanges.find((moduleRange) => moduleRange.id === activeModuleId) ??
    moduleRanges[0];

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
        <div className="relative max-w-5xl text-primary-950">
          <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[60px] lg:leading-[64px] lg:tracking-hero">
            Engineered for performance.
            <br />
            Built for the long run.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl font-normal leading-8 lg:mt-7 lg:text-2xl">
            Three module offerings built for homes, businesses, and large-scale utility
            projects across India.
          </p>
        </div>
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

      <div
        id="module-panel"
        role="tabpanel"
        className="mx-auto grid max-w-content gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_1fr] lg:gap-24 lg:py-28 xl:px-0"
      >
        <div>
          <div className="relative mx-auto h-[430px] max-w-[660px] sm:h-[560px] lg:h-[640px]">
            <Image
              src={gallery[selectedImage].src}
              alt={gallery[selectedImage].alt}
              fill
              sizes="(min-width: 1024px) 46vw, 90vw"
              className="object-contain"
            />
          </div>
          <div className="mt-8 grid grid-cols-5 gap-2 sm:flex sm:justify-center sm:gap-7">
            {gallery.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                aria-label={`Show module view ${index + 1}`}
                aria-pressed={selectedImage === index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square w-full min-w-0 overflow-hidden rounded-lg border bg-white p-1 transition sm:size-24 sm:w-24 ${
                  selectedImage === index
                    ? "border-primary-400 bg-neutral-100"
                    : "border-neutral-200 hover:border-primary-300"
                }`}
              >
                <Image src={image.src} alt="" fill sizes="96px" className="object-contain p-2" />
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 text-center text-primary-950 lg:pt-10 lg:text-left">
          <h2 className="text-3xl font-bold sm:text-4xl">{activeModule.title}</h2>
          <p className="mt-4 text-2xl font-bold text-primary-700">Right. Reliable. Ready.</p>

          <dl className="mt-12 text-left text-lg sm:mt-16 sm:text-xl">
            <div className="grid gap-6 border-t border-neutral-200 py-8 sm:grid-cols-2 sm:gap-8">
              <div>
                <dt>Range</dt>
                <dd className="mt-2 text-neutral-500">{activeModule.range}</dd>
              </div>
              <div>
                <dt>Efficiency</dt>
                <dd className="mt-2 text-neutral-500">{activeModule.efficiency}</dd>
              </div>
            </div>
            <div className="border-t border-neutral-200 py-8">
              <dt>Cell type</dt>
              <dd className="mt-2 text-neutral-500">{activeModule.cellType}</dd>
            </div>
            <div className="grid gap-6 border-t border-neutral-200 py-8 sm:grid-cols-3">
              <div>
                <dt>Bifaciality factor</dt>
                <dd className="mt-2 text-neutral-500">{activeModule.bifacialityFactor}</dd>
              </div>
              <div>
                <dt>Power warranty</dt>
                <dd className="mt-2 text-neutral-500">{activeModule.powerWarranty}</dd>
              </div>
              <div>
                <dt>Product warranty</dt>
                <dd className="mt-2 text-neutral-500">{activeModule.productWarranty}</dd>
              </div>
            </div>
            <div className="grid gap-6 border-t border-neutral-200 py-8 sm:grid-cols-2 sm:gap-8">
              <div>
                <dt>First year degradation</dt>
                <dd className="mt-2 text-neutral-500">{activeModule.firstYearDegradation}</dd>
              </div>
              <div>
                <dt>Annual power attenuation</dt>
                <dd className="mt-2 text-neutral-500">
                  {activeModule.annualPowerAttenuation}
                </dd>
              </div>
            </div>
            <div className="grid gap-6 border-t border-neutral-200 py-8 sm:grid-cols-2 sm:gap-8">
              <div>
                <dt>Dimensions</dt>
                <dd className="mt-2 text-neutral-500">{activeModule.dimensions}</dd>
              </div>
              <div>
                <dt>Weight</dt>
                <dd className="mt-2 text-neutral-500">{activeModule.weight}</dd>
              </div>
            </div>
            <div className="border-y border-neutral-200 py-8">
              <dt>ALMM approved</dt>
              <dd className="mt-2 text-neutral-500">{activeModule.almmApproved}</dd>
            </div>
          </dl>

          <div className="mt-16 flex flex-wrap justify-center gap-6 lg:justify-start">
            <a
              href="#contact"
              className="rounded-full bg-primary-400 px-12 py-4 text-xl font-bold text-white transition hover:bg-primary-500"
            >
              Enquire Now
            </a>
            <button
              type="button"
              disabled
              title="Datasheet coming soon"
              className="rounded-full bg-primary-950 px-12 py-4 text-xl font-bold text-white disabled:cursor-not-allowed disabled:opacity-100"
            >
              Download Datasheet
            </button>
          </div>
        </div>
      </div>

      <div
        className="mx-auto grid max-w-content gap-16 px-4 pb-44 pt-0 sm:px-6 lg:grid-cols-[0.98fr_1fr] lg:gap-24 lg:pb-64 xl:px-0"
      >
        <div className="space-y-12 pt-0 sm:space-y-14">
          {features.map((feature, index) => {
            const active = activeFeature === index;
            return (
              <button
                key={feature.title}
                type="button"
                onMouseEnter={() => setActiveFeature(index)}
                onFocus={() => setActiveFeature(index)}
                onClick={() => setActiveFeature(index)}
                aria-expanded={active}
                className="flex w-full flex-col items-center gap-4 text-center lg:flex-row lg:items-start lg:gap-7 lg:text-left"
              >
                <FeatureIcon icon={feature.icon} />
                <span className="min-w-0 flex-1">
                  <span className="block text-2xl font-bold leading-tight text-[#143b58] sm:text-3xl">
                    {feature.title}
                  </span>
                  <span
                    className={`mx-auto grid max-w-xl transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none lg:mx-0 ${
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
          <div className="product-chart-reveal relative aspect-[433/257] w-full max-w-[560px] overflow-hidden">
            <Image
              src="/images/solar-module-output-chart.webp"
              alt="Power output chart showing 99 percent in year one and 87.4 percent in year 30"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-content px-4 pb-36 text-center sm:px-6 xl:px-0">
        <div className="grid grid-cols-3 gap-3 sm:gap-14 md:gap-8">
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
        </div>
      </div>

      <div className="relative pb-32">
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 top-[150px] bg-primary-700 sm:top-[180px] lg:top-[280px]"
        />
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
            <Image
              src="/images/sunburst.svg"
              alt=""
              width={520}
              height={520}
              aria-hidden
              className="pointer-events-none absolute -bottom-28 right-0 hidden w-[520px] opacity-40 lg:block"
            />
            <a
              href="#contact"
              className="relative rounded-full bg-primary-400 px-12 py-4 text-xl font-bold text-white transition hover:bg-primary-500"
            >
              Enquire Now
            </a>
            <button
              type="button"
              disabled
              title="Datasheet coming soon"
              className="relative rounded-full bg-primary-950 px-12 py-4 text-xl font-bold text-white disabled:cursor-not-allowed disabled:opacity-100"
            >
              Download Datasheet
            </button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
