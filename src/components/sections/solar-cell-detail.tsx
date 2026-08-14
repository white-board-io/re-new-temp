"use client";

import Image from "next/image";
import { useState, type ComponentType } from "react";
import { ContactModalTrigger } from "@/components/contact-modal";
import { Reveal } from "@/components/reveal";
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Gauge,
  ShieldCheck,
  Sparkles,
  type LucideProps,
} from "lucide-react";

const gallery = [
  {
    src: "/images/products/solar-cell/m10r-p-type-bifacial-perc-1.webp",
    alt: "M10R P-type bifacial PERC solar cell product view",
  },
  {
    src: "/images/products/solar-cell/m10r-p-type-bifacial-perc-2.webp",
    alt: "M10R P-type bifacial PERC solar cell detail view",
  },
  {
    src: "/images/products/solar-cell/m10r-p-type-bifacial-perc-3.webp",
    alt: "M10R P-type bifacial PERC solar cell alternate product view",
  },
];

const featureCards = [
  {
    title: (
      <>
        High Conversion
        <br />
        Efficiency
      </>
    ),
    description:
      "Advanced PERC (Passivated Emitter and Rear Cell) technology enhances light absorption and boosts overall cell efficiency.",
    icon: Cpu,
  },
  {
    title: (
      <>
        M10R Rectangular
        <br />
        Format
      </>
    ),
    description:
      "Optimised cell geometry increases module packing density and raises power output in high-power module designs.",
    icon: ShieldCheck,
  },
  {
    title: (
      <>
        Strong
        <br />
        Reliability
      </>
    ),
    description:
      "Enhanced resistance to micro-cracks, PID, and LeTID ensures long-term durability and consistent performance.",
    icon: Gauge,
  },
  {
    title: (
      <>
        Uniform
        <br />
        Appearance
      </>
    ),
    description:
      "High-precision cell processing provides consistent colour and aesthetic uniformity for premium module quality.",
    icon: Sparkles,
  },
];

const carouselImages = [
  {
    src: "/images/figma-jaipur-cleanroom.jpg",
    alt: "ReNew cleanroom team holding solar cells",
  },
  {
    src: "/images/figma-jaipur-cell-inspection.jpg",
    alt: "Solar cell inspection inside a ReNew manufacturing facility",
  },
  {
    src: "/images/figma-jaipur-automation.jpg",
    alt: "Automated solar cell manufacturing line",
  },
  {
    src: "/images/figma-jaipur-manufacturing-line.png",
    alt: "Solar cell manufacturing equipment",
  },
  {
    src: "/images/figma-jaipur-aerial.jpg",
    alt: "Aerial view of a ReNew manufacturing facility",
  },
];

const productName = "M10R PERC Cell P-Type";
const datasheetHref = "/downloads/product-datasheets/m10r-p-type-perc-bifacial.pdf";

function CardIcon({ icon: Icon }: { icon: ComponentType<LucideProps> }) {
  return (
    <span aria-hidden className="flex h-20 items-center justify-center text-primary-700">
      <Icon className="size-16" strokeWidth={1.6} />
    </span>
  );
}

export function SolarCellDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const moveSlide = (step: number) => {
    setActiveSlide((current) =>
      (current + step + carouselImages.length) % carouselImages.length,
    );
  };

  return (
    <>
      <section className="relative flex min-h-[460px] items-start justify-center overflow-hidden px-4 pb-20 pt-20 text-center sm:min-h-[560px] sm:px-6 lg:min-h-[704px] lg:pt-[114px]">
        <Image
          src="/images/solarcell.webp"
          alt="Solar panels across a desert landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%]"
        />
        <div className="absolute inset-0 bg-white/10" />
        <Reveal className="relative max-w-5xl text-primary-950">
          <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[60px] lg:leading-[64px] lg:tracking-hero">
            The cell at the heart of every
            <br />
            ReNew Solar modules.
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-xl font-normal leading-8 lg:mt-7 lg:text-2xl">
            High-efficiency bifacial cells manufactured at our Dholera facility.{" "}
            <br className="hidden sm:block" />
            Built for precision. Graded for performance.
          </p>
        </Reveal>
      </section>

      <section id="cell-range" className="relative scroll-mt-[88px] bg-white lg:scroll-mt-[136px] xl:scroll-mt-[138px]">
        <div className="sticky top-[88px] z-30 bg-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.08)] lg:top-[136px] xl:top-[138px]">
          <div className="mx-auto grid max-w-content px-4 sm:px-6 md:grid-cols-3 xl:px-0">
            <div className="relative flex min-h-20 items-center justify-center text-center text-sm font-normal text-primary-700 sm:min-h-[108px] sm:text-xl lg:text-2xl">
              {productName}
              <span className="absolute inset-x-0 bottom-0 h-3.5 bg-primary-400" />
            </div>
          </div>
        </div>

        <Reveal
          stagger
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
            <div className="mt-8 grid grid-cols-3 gap-2 sm:flex sm:justify-center sm:gap-7">
              {gallery.map((image, index) => (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  aria-label={`Show solar cell product view ${index + 1}`}
                  aria-pressed={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square w-full min-w-0 overflow-hidden rounded-md border bg-white p-1 transition sm:size-24 sm:w-24 ${
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
            <h2 className="text-3xl font-bold sm:text-4xl">
              {productName}
            </h2>
            <p className="mt-4 text-2xl font-bold text-primary-700">Right. Reliable. Ready.</p>

            <h3 className="mt-12 text-left text-2xl font-bold text-primary-950 sm:mt-16">
              Product Specifications
            </h3>

            <dl className="mt-6 text-left text-lg sm:text-xl">
              <div className="border-t border-neutral-200 py-8">
                <dt>Type</dt>
                <dd className="mt-2 text-neutral-500">
                  High conversion efficiency bifacial PERC cell
                </dd>
              </div>
              <div className="border-t border-neutral-200 py-8">
                <dt>Cell Grade</dt>
                <dd className="mt-2 text-neutral-500">High efficiency bifacial PERC</dd>
              </div>
              <div className="border-t border-neutral-200 py-8">
                <dt>Testing Standard</dt>
                <dd className="mt-2 text-neutral-500">
                  Standard Test Conditions — 1000 W/m², AM 1.5G spectrum, 25°C
                </dd>
              </div>
              <div className="border-y border-neutral-200 py-8">
                <dt>Quality Inspection</dt>
                <dd className="mt-2 text-neutral-500">
                  Visual grading from 50 cm. Colour and defect sorting by an inspection machine.
                </dd>
              </div>
            </dl>

            <div className="mt-16 flex flex-wrap justify-center gap-6 lg:justify-start">
              <ContactModalTrigger
                className="rounded-full bg-primary-400 px-12 py-4 text-xl font-bold text-white transition hover:bg-primary-500"
              >
                Enquire Now
              </ContactModalTrigger>
              <a
                href={datasheetHref}
                download
                className="rounded-full bg-primary-950 px-12 py-4 text-xl font-bold text-white transition hover:bg-primary-900"
              >
                Download Datasheet
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto max-w-content px-4 pb-36 pt-8 sm:px-6 lg:pt-7 xl:px-0">
          <Reveal stagger className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature) => (
              <article
                key={feature.description}
                className="flex min-h-[445px] flex-col items-center justify-start rounded-md bg-surface-tint px-10 pb-12 pt-16 text-center text-[#143b58]"
              >
                <CardIcon icon={feature.icon} />
                <h2 className="mt-10 text-xl font-bold leading-6">{feature.title}</h2>
                <p className="mt-10 text-lg leading-7">{feature.description}</p>
              </article>
            ))}
          </Reveal>
        </div>

        <div className="relative pb-24 pt-1 sm:pb-32">
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 top-[141px] bg-primary-700 sm:top-[181px] lg:top-[338px]"
          />
          <div className="relative mx-auto max-w-[1532px] px-4 sm:px-6 xl:px-0">
            <Reveal className="relative">
              <div className="relative aspect-[1532/676] min-h-[280px] w-full overflow-hidden rounded-md bg-primary-950 sm:min-h-[360px] lg:min-h-0">
                <Image
                  key={carouselImages[activeSlide].src}
                  src={carouselImages[activeSlide].src}
                  alt={carouselImages[activeSlide].alt}
                  fill
                  sizes="(min-width: 1536px) 1532px, 100vw"
                  className="object-cover transition-opacity duration-500"
                />

                <div className="absolute inset-x-0 bottom-10 flex justify-center gap-5">
                  {carouselImages.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      aria-label={`Show manufacturing image ${index + 1}`}
                      aria-pressed={activeSlide === index}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 w-14 rounded-full transition ${
                        activeSlide === index ? "bg-primary-400" : "bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                aria-label="Previous manufacturing image"
                onClick={() => moveSlide(-1)}
                className="absolute left-4 top-1/2 flex size-14 -translate-y-1/2 items-center justify-center rounded-md bg-white/90 text-primary-950 transition hover:bg-white sm:left-6 lg:-left-24"
              >
                <ChevronLeft aria-hidden className="size-8" strokeWidth={1.7} />
              </button>
              <button
                type="button"
                aria-label="Next manufacturing image"
                onClick={() => moveSlide(1)}
                className="absolute right-4 top-1/2 flex size-14 -translate-y-1/2 items-center justify-center rounded-md bg-white/90 text-primary-950 transition hover:bg-white sm:right-6 lg:-right-24"
              >
                <ChevronRight aria-hidden className="size-8" strokeWidth={1.7} />
              </button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
