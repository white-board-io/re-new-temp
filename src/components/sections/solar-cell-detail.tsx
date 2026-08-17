"use client";

import Image from "next/image";
import { useState, type ComponentType } from "react";
import { ContactModalTrigger } from "@/components/contact-modal";
import { Reveal } from "@/components/reveal";
import {
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
    <span aria-hidden className="flex h-12 items-center justify-center text-primary-700 sm:h-20">
      <Icon className="size-10 sm:size-16" strokeWidth={1.6} />
    </span>
  );
}

export function SolarCellDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      <section className="relative flex min-h-[360px] items-start justify-center overflow-hidden px-4 pb-12 pt-12 text-center sm:min-h-[560px] sm:px-6 sm:pb-20 sm:pt-20 lg:min-h-[704px] lg:pt-[114px]">
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
          <h1 className="text-2xl font-bold leading-[1.14] sm:text-[34px] lg:text-[60px] lg:leading-[64px] lg:tracking-hero">
            The cell at the heart of every
            <br />
            ReNew Solar modules.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base font-normal leading-6 sm:mt-8 sm:text-xl sm:leading-8 lg:mt-7 lg:text-2xl">
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
          className="mx-auto grid max-w-content gap-8 px-4 py-12 sm:gap-14 sm:px-6 sm:py-20 lg:grid-cols-[1.08fr_1fr] lg:gap-24 lg:py-28 xl:px-0"
        >
          <div>
            <div className="relative mx-auto h-[320px] max-w-[660px] sm:h-[560px] lg:h-[640px]">
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

          <div className="text-center text-primary-950 lg:pt-10 lg:text-left">
            <h2 className="text-[28px] font-bold leading-[1.14] sm:text-4xl">
              {productName}
            </h2>
            <p className="mt-3 text-xl font-bold text-primary-700 sm:mt-4 sm:text-2xl">
              High Conversion Efficiency.
            </p>

            <h3 className="mt-12 hidden text-left text-2xl font-bold text-primary-950 sm:mt-16 sm:block">
              Product Specifications
            </h3>

            <dl className="mt-6 hidden text-left text-lg sm:block sm:text-xl">
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

            <div className="mt-8 flex flex-wrap justify-center gap-4 sm:mt-16 sm:gap-6 lg:justify-start">
              <ContactModalTrigger
                className="inline-flex min-h-10 w-[220px] items-center justify-center rounded-full bg-primary-400 px-6 py-0 text-base font-bold text-white transition hover:bg-primary-500 md:w-auto md:min-w-[168px] md:px-12 md:py-4 md:text-xl"
              >
                Enquire Now
              </ContactModalTrigger>
              <a
                href={datasheetHref}
                download
                className="inline-flex min-h-10 w-[220px] items-center justify-center rounded-full bg-primary-950 px-6 py-0 text-base font-bold text-white transition hover:bg-primary-900 md:w-auto md:min-w-[168px] md:px-12 md:py-4 md:text-xl"
              >
                Download Datasheet
              </a>
            </div>
          </div>
        </Reveal>

        <div
          className="px-4 pb-20 pt-12 sm:px-6 sm:pb-36 sm:pt-20 xl:px-0"
          style={{
            background:
              "linear-gradient(180deg, #F0F6F3 0%, rgba(240, 246, 243, 0) 100%)",
          }}
        >
          <div className="mx-auto max-w-content">
            <Reveal>
              <p className="text-center text-base font-bold uppercase leading-6 text-primary-700 sm:text-2xl sm:leading-8">
                What goes into every ReNew solar panel
              </p>
            </Reveal>
            <Reveal stagger className="mt-8 grid gap-5 sm:mt-10 sm:gap-8 md:grid-cols-2 xl:grid-cols-4">
              {featureCards.map((feature) => (
                <article
                  key={feature.description}
                  className="flex min-h-[270px] flex-col items-center justify-start rounded-md bg-[#0069340F] px-6 pb-8 pt-8 text-center text-[#143b58] sm:min-h-[445px] sm:px-10 sm:pb-12 sm:pt-16"
                >
                  <CardIcon icon={feature.icon} />
                  <h2 className="mt-5 text-lg font-bold leading-6 sm:mt-10 sm:text-xl">{feature.title}</h2>
                  <p className="mt-5 text-sm leading-6 sm:mt-10 sm:text-lg sm:leading-7">{feature.description}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="relative pb-20 pt-1 sm:pb-32">
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 top-[141px] bg-primary-700 sm:top-[181px] lg:top-[338px]"
          />
          <div className="relative mx-auto max-w-[1532px] px-0 sm:px-6 xl:px-0">
            <Reveal className="relative">
              <div className="relative aspect-[1532/676] min-h-[280px] w-full overflow-hidden bg-primary-950 sm:min-h-[360px] sm:rounded-md lg:min-h-0">
                <Image
                  key={carouselImages[activeSlide].src}
                  src={carouselImages[activeSlide].src}
                  alt={carouselImages[activeSlide].alt}
                  fill
                  sizes="(min-width: 1536px) 1532px, 100vw"
                  className="object-cover transition-opacity duration-500"
                />
              </div>
              <div className="mt-5 flex justify-center gap-3 sm:mt-8">
                {carouselImages.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    aria-label={`Show manufacturing image ${index + 1}`}
                    aria-pressed={activeSlide === index}
                    onClick={() => setActiveSlide(index)}
                    className={`size-2.5 rounded-full transition sm:size-3 ${
                      activeSlide === index ? "bg-primary-400" : "bg-white"
                    }`}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
