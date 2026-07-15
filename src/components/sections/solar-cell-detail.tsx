"use client";

import Image from "next/image";
import { useState } from "react";

const gallery = [
  {
    src: "/images/solar-module-front.webp",
    alt: "Rear view of a ReNew solar product",
  },
  {
    src: "/images/solar-module-product.webp",
    alt: "Front and rear views of ReNew solar products",
  },
  {
    src: "/images/solar-module-landscape.webp",
    alt: "Landscape view of a ReNew solar product",
  },
  {
    src: "/images/solar-module-landscape-alt.webp",
    alt: "Alternate landscape view of a ReNew solar product",
  },
  {
    src: "/images/solar-module-pair.webp",
    alt: "Paired front and rear ReNew solar products",
  },
];

const features = [
  {
    title: "Advanced technologies",
    description:
      "Precision manufacturing and proven PERC technology deliver dependable conversion efficiency.",
  },
  {
    title: "Heavy snow, hail, wind-load resistant",
    description:
      "Enhanced mechanical load up to 5400 Pascals of snow load and up to 2400 Pascals of wind load.",
  },
  {
    title: "Reliable modules with longer lifespan",
    description:
      "Strict cell grading and automated inspection support consistent output across the module lifetime.",
  },
  {
    title: "Reliable modules with longer lifespan",
    description:
      "Quality controls at every stage help maintain performance in demanding operating conditions.",
  },
];

const carouselImages = [
  {
    src: "/images/solar-module-rooftop.webp",
    alt: "Solar panels installed across residential rooftops",
  },
  {
    src: "/images/project-1000mwp.webp",
    alt: "Large ReNew utility-scale solar installation",
  },
  {
    src: "/images/project-80mwp.webp",
    alt: "ReNew solar project in operation",
  },
  {
    src: "/images/project-40mwp.webp",
    alt: "ReNew solar panels at a project site",
  },
  {
    src: "/images/partner-video-field.webp",
    alt: "Solar panels extending across an open field",
  },
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
        <path
          d="M8.5 0h2l.5 3H8L8.5 0Zm0 15h2l.5-3H8l.5 3ZM2 6.5v2l3 .5V6l-3 .5Zm15 0v2l-3 .5V6l3 .5Z"
          fill="#8dc63f"
        />
      </svg>
    </span>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={`size-7 ${direction === "right" ? "rotate-180" : ""}`}
    >
      <path d="m14.5 5-7 7 7 7" />
    </svg>
  );
}

export function SolarCellDetail() {
  const [selectedImage, setSelectedImage] = useState(1);
  const [activeFeature, setActiveFeature] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0);

  const moveSlide = (step: number) => {
    setActiveSlide((current) =>
      (current + step + carouselImages.length) % carouselImages.length,
    );
  };

  return (
    <>
      <section className="relative flex min-h-[620px] items-start justify-center overflow-hidden px-4 pb-20 pt-24 text-center sm:min-h-[700px] sm:px-6 sm:pt-32 lg:min-h-[calc(100svh-136px)]">
        <Image
          src="/images/solar-cell-hero.webp"
          alt="Solar panels across a desert landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/10" />
        <div className="relative max-w-5xl text-primary-950">
          <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[64px] lg:leading-[1.02]">
            The cell at the heart of every
            <br />
            ReNew Solar module.
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 sm:text-2xl sm:leading-9">
            High-efficiency bifacial cells manufactured at our Dholera facility. Built
            for precision. Graded for performance.
          </p>
        </div>
      </section>

      <section id="cell-range" className="relative bg-white">
        <div className="sticky top-[104px] z-30 border-b border-neutral-100 bg-neutral-50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] lg:top-[136px]">
          <div className="mx-auto grid max-w-content px-4 sm:px-6 md:grid-cols-3">
            <div className="border-b-[14px] border-primary-400 px-4 py-7 text-left text-lg font-bold text-primary-700 sm:text-xl md:text-center lg:text-2xl">
              M10R PERC Cell - P-Type
            </div>
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
            <div className="mt-8 flex justify-center gap-2 sm:gap-7">
              {gallery.map((image, index) => (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  aria-label={`Show solar cell product view ${index + 1}`}
                  aria-pressed={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative size-14 overflow-hidden rounded-lg border bg-white p-1 transition sm:size-24 ${
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
            <h2 className="text-3xl font-bold sm:text-4xl">
              M10R PERC Cell <span className="text-primary-400">P-Type</span>
            </h2>
            <p className="mt-4 text-2xl font-bold text-primary-700">Right. Reliable. Ready.</p>

            <dl className="mt-16 text-lg sm:text-xl">
              <div className="border-t border-neutral-200 py-8">
                <dt>Type</dt>
                <dd className="mt-2 text-neutral-500">
                  High conversion efficiency bifacial PERC cell
                </dd>
              </div>
              <div className="border-t border-neutral-200 py-8">
                <dt>Cell grade</dt>
                <dd className="mt-2 text-neutral-500">High efficiency bifacial PERC</dd>
              </div>
              <div className="border-t border-neutral-200 py-8">
                <dt>Testing standard</dt>
                <dd className="mt-2 text-neutral-500">
                  <strong className="font-semibold text-primary-950">
                    Standard Test Conditions
                  </strong>
                  <br />
                  1000 W/m², AM 1.5G spectrum, 25 degrees C
                </dd>
              </div>
              <div className="border-y border-neutral-200 py-8">
                <dt>Quality inspection</dt>
                <dd className="mt-2 text-neutral-500">
                  Visual grading from 50 cm.
                  <br />
                  Colour and defect sorting by an inspection machine.
                </dd>
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
                    key={`${feature.title}-${index}`}
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
            <div className="relative mt-14 aspect-[420/278] w-full">
              <Image
                src="/images/solar-cell-output-chart.webp"
                alt="Thirty-year power warranty chart ending at 84.95 percent in year 30"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="bg-primary-700 pb-28 pt-1 sm:pb-32">
          <div className="relative mx-auto max-w-content px-4 sm:px-6">
            <div className="relative aspect-[16/6] min-h-[280px] w-full overflow-hidden rounded-md">
              <Image
                key={carouselImages[activeSlide].src}
                src={carouselImages[activeSlide].src}
                alt={carouselImages[activeSlide].alt}
                fill
                sizes="(min-width: 1536px) 1428px, 100vw"
                className="object-cover transition-opacity duration-500"
              />

              <div className="absolute inset-x-0 bottom-7 flex justify-center gap-3">
                {carouselImages.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    aria-label={`Show installation image ${index + 1}`}
                    aria-pressed={activeSlide === index}
                    onClick={() => setActiveSlide(index)}
                    className={`size-3 rounded-full border-2 border-white transition ${
                      activeSlide === index ? "bg-primary-400" : "bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-label="Previous installation image"
              onClick={() => moveSlide(-1)}
              className="absolute left-4 top-1/2 flex size-14 -translate-y-1/2 items-center justify-center bg-white/90 text-primary-950 transition hover:bg-white sm:left-6 lg:-left-12"
            >
              <Arrow direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next installation image"
              onClick={() => moveSlide(1)}
              className="absolute right-4 top-1/2 flex size-14 -translate-y-1/2 items-center justify-center bg-white/90 text-primary-950 transition hover:bg-white sm:right-6 lg:-right-12"
            >
              <Arrow direction="right" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
