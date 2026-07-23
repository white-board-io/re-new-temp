"use client";

import Image from "next/image";
import { useState } from "react";

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
  },
  {
    title: "Tough modules for harsh weather",
    description:
      "Tested to withstand extended wind load (2400 Pa) and snow load (5400 Pa)",
  },
  {
    title: "High performance tolerance",
    description:
      "Excellent low light performance on cloudy or rainy days and a low temperature coefficient for stable performance in hot climates.",
  },
  {
    title: "Robust performance",
    description: "1% first-year degradation with excellent PID resistance performance.",
  },
];

const applications = [
  "Utility-scale solar power plants",
  "High capacity commercial and industrial installations",
  "High power requirement residential units",
];

function FeatureIcon() {
  return (
    <span aria-hidden className="relative mt-1 block h-9 w-11 shrink-0 text-primary-700">
      <svg viewBox="0 0 44 36" fill="none" className="size-full">
        <path
          d="M27 13.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm0 4.25a4.25 4.25 0 1 1 0 8.5 4.25 4.25 0 0 1 0-8.5Z"
          fill="currentColor"
        />
        <path
          d="m27 9 1.2 4.7h-2.4L27 9Zm0 26-1.2-4.7h2.4L27 35Zm13-13-4.7 1.2v-2.4L40 22ZM14 22l4.7-1.2v2.4L14 22Zm22.2-9.2-2.5 4-1.7-1.7 4.2-2.3Zm-18.4 18.4 2.5-4 1.7 1.7-4.2 2.3Zm18.4 0L32 28.9l1.7-1.7 2.5 4Zm-18.4-18.4 4.2 2.3-1.7 1.7-2.5-4Z"
          fill="currentColor"
        />
        <path
          d="M9.5 1a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 3.25a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5Z"
          fill="#8dc63f"
        />
        <path d="M8.5 0h2l.5 3H8L8.5 0Zm0 15h2l.5-3H8l.5 3ZM2 6.5v2l3 .5V6l-3 .5Zm15 0v2l-3 .5V6l3 .5Z" fill="#8dc63f" />
      </svg>
    </span>
  );
}

function SolarApplicationIcon() {
  return (
    <span className="flex size-28 items-center justify-center rounded-full bg-primary-700 sm:size-32">
      <svg
        aria-hidden
        viewBox="0 0 80 80"
        fill="none"
        stroke="#8dc63f"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        className="size-16 sm:size-[72px]"
      >
        <circle cx="40" cy="25" r="10" />
        <path d="M40 8v6M40 36v6M23 25h-6M63 25h-6M28 13l4 5M52 13l-4 5M28 37l4-5M52 37l-4-5" />
        <path d="M22 47h36l6 23H16l6-23Z" />
        <path d="m28 47-3 23M52 47l3 23M18 59h44M40 47v23" />
      </svg>
    </span>
  );
}

export function SolarModuleDetail() {
  const [selectedImage, setSelectedImage] = useState(1);
  const [activeFeature, setActiveFeature] = useState(1);

  return (
    <>
      <section className="relative flex min-h-[460px] items-start justify-center overflow-hidden px-4 pb-20 pt-24 text-center sm:min-h-[560px] sm:px-6 sm:pt-32 lg:min-h-[75svh]">
        <Image
          src="/images/solar-module-hero.webp"
          alt="A large solar farm across green hills at sunrise"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/15" />
        <div className="relative max-w-5xl text-primary-950">
          <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[64px] lg:leading-[1.02]">
            Engineered for performance.
            <br />
            Built for the long run.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 sm:text-2xl sm:leading-9">
            Three module offerings built for homes, businesses, and large-scale utility
            projects across India.
          </p>
        </div>
      </section>

      <section id="module-range" className="relative bg-white">
        <div className="sticky top-[104px] z-30 border-b border-neutral-100 bg-neutral-50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] lg:top-[133px] xl:top-[min(138px,7.1875vw)]">
          <div className="mx-auto flex max-w-content overflow-x-auto px-4 sm:px-6 md:grid md:grid-cols-3">
            {[
              "G12R TOPCon Bifacial Module",
              "TOPCon Bifacial Module - M10 144",
              "TopCorn PERC",
            ].map((label, index) => (
              <button
                key={label}
                type="button"
                disabled={index !== 0}
                className={`min-w-[280px] shrink-0 border-b-[14px] px-4 py-7 text-left text-lg font-bold sm:text-xl md:min-w-0 md:text-center lg:text-2xl ${
                  index === 0
                    ? "border-primary-400 text-primary-700"
                    : "border-transparent text-neutral-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-content gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_1fr] lg:gap-24 lg:py-28">
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
            <div className="mt-8 flex justify-center gap-4 sm:gap-7">
              {gallery.map((image, index) => (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  aria-label={`Show module view ${index + 1}`}
                  aria-pressed={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative size-16 overflow-hidden rounded-lg border bg-white p-1 transition sm:size-24 ${
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

          <div className="pt-4 text-primary-950 lg:pt-10">
            <h2 className="text-3xl font-bold sm:text-4xl">G12R TOPCon Bifacial Module</h2>
            <p className="mt-4 text-2xl font-bold text-primary-700">Right. Reliable. Ready.</p>

            <dl className="mt-16 text-lg sm:text-xl">
              <div className="grid grid-cols-2 gap-8 border-t border-neutral-200 py-8">
                <div>
                  <dt>Range</dt>
                  <dd className="mt-2 text-neutral-500">605 to 640 Wp</dd>
                </div>
                <div>
                  <dt>Efficiency</dt>
                  <dd className="mt-2 text-neutral-500">Up to 23.69%</dd>
                </div>
              </div>
              <div className="border-t border-neutral-200 py-8">
                <dt>Cell type</dt>
                <dd className="mt-2 text-neutral-500">N-type TOPCon, 132 half-cut G12R cells</dd>
              </div>
              <div className="grid gap-6 border-t border-neutral-200 py-8 sm:grid-cols-3">
                <div>
                  <dt>Bifaciality factor</dt>
                  <dd className="mt-2 text-neutral-500">Up to 80%</dd>
                </div>
                <div>
                  <dt>Power warranty</dt>
                  <dd className="mt-2 text-neutral-500">30 years</dd>
                </div>
                <div>
                  <dt>Product warranty</dt>
                  <dd className="mt-2 text-neutral-500">12 years</dd>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 border-t border-neutral-200 py-8">
                <div>
                  <dt>Dimensions</dt>
                  <dd className="mt-2 text-neutral-500">2382 × 1134 × 30 mm</dd>
                </div>
                <div>
                  <dt>Weight</dt>
                  <dd className="mt-2 text-neutral-500">33.5 kg</dd>
                </div>
              </div>
              <div className="border-y border-neutral-200 py-8">
                <dt>ALMM approved</dt>
                <dd className="mt-2 text-neutral-500">Yes</dd>
              </div>
            </dl>

            <div className="mt-16 flex flex-wrap gap-6">
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

        <div className="mx-auto grid max-w-content gap-16 px-4 pb-24 pt-12 sm:px-6 lg:grid-cols-2 lg:pb-32">
          <div>
            <p className="text-xl font-bold uppercase text-primary-700">
              What goes into every ReNew solar panel
            </p>
            <div className="mt-20 space-y-8">
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
                    className="flex w-full gap-6 text-left"
                  >
                    <FeatureIcon />
                    <span>
                      <span className="block text-2xl font-bold text-[#143b58] sm:text-3xl">
                        {feature.title}
                      </span>
                      <span
                        className={`mt-3 block max-w-xl text-lg leading-7 text-[#143b58] transition ${
                          active ? "opacity-100" : "h-0 overflow-hidden opacity-0"
                        }`}
                      >
                        {feature.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xl font-bold uppercase text-primary-700">
              Performance you can count on
            </p>
            <div className="relative mt-14 aspect-[433/257] w-full">
              <Image
                src="/images/solar-module-output-chart.webp"
                alt="Power output chart showing 99 percent in year one and 87.4 percent in year 30"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-content px-4 pb-24 text-center sm:px-6 lg:pb-32">
          <h2 className="text-3xl font-medium text-primary-700">Ideal Applications</h2>
          <div className="mt-16 grid gap-14 md:grid-cols-3 md:gap-8">
            {applications.map((application) => (
              <div key={application} className="flex flex-col items-center">
                <SolarApplicationIcon />
                <p className="mt-10 max-w-sm text-2xl leading-8 text-[#143b58]">{application}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary-700 pb-32">
          <div className="mx-auto max-w-content -translate-y-1 px-4 sm:px-6">
            <button
              type="button"
              aria-label="Play rooftop solar installation video"
              className="group relative block aspect-[16/7] w-full overflow-hidden rounded-md"
            >
              <Image
                src="/images/solar-module-rooftop.webp"
                alt="Solar panels installed on a residential rooftop"
                fill
                sizes="(min-width: 1536px) 1428px, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
              />
              <span className="absolute left-1/2 top-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[6px] border-white sm:size-48">
                <span className="ml-3 block h-0 w-0 border-y-[28px] border-l-[44px] border-y-transparent border-l-white sm:border-y-[44px] sm:border-l-[66px]" />
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
