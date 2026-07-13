"use client";

import Image from "next/image";
import { useState } from "react";

const DEFAULT_PRODUCT = 0;

const products = [
  {
    title: "Solar Module",
    image: "/images/product-module.webp",
    // The module panels sit in the left third of the photo; anchor the crop
    // there so they stay in frame when the card is in its narrow state.
    position: "object-[10%_50%]",
    alt: "Two ReNew solar modules standing in a grassy valley at sunrise",
    features: [
      { lead: "Mono PERC cells", rest: "with up to 23.7% conversion efficiency" },
      { lead: "TOPCon cells", rest: "with industry-leading efficiency of up to 25.2%" },
    ],
  },
  {
    title: "Solar Cell",
    image: "/images/product-cell.webp",
    position: "object-center",
    alt: "A ReNew solar cell standing in a misty field at sunrise",
    features: [
      { lead: "TOPCon & Mono PERC cells", rest: "with conversion efficiency of up to 25.2%" },
      { lead: "6.4 lakh cells produced daily", rest: "across three world-class plants" },
    ],
  },
];

// Same clock as the Who We Serve cards: the width trade reads as one motion.
const GROW = "duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]";

// Expanded content exits fast and together, then re-enters with a gentle rise
// once the card is most of the way open.
const contentIn = (isActive: boolean, delay: string) =>
  `transition-[opacity,transform,background-color] ease-out ${
    isActive
      ? `translate-y-0 opacity-100 duration-500 ${delay}`
      : "translate-y-2 opacity-0 duration-200"
  }`;

export function Products() {
  const [active, setActive] = useState(DEFAULT_PRODUCT);

  const columns = products
    .map((_, i) => (i === active ? "1.9fr" : "1fr"))
    .join(" ");

  return (
    <section id="products" className="relative overflow-hidden pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden md:block">
        <Image
          src="/images/products-bg.webp"
          alt=""
          width={1920}
          height={887}
          className="w-full object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white via-white/70 to-transparent" />
      </div>

      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="text-center">
          <p className="text-2xl font-bold uppercase leading-8 text-primary-700">Products</p>
          <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-bold text-primary-950 sm:text-[54px] sm:leading-[62px]">
            The <span className="text-primary-700">right panel</span> for your home, your
            business, your project.
          </h2>
        </div>

        <div
          className={`mt-12 grid gap-6 pb-24 transition-[grid-template-columns] md:mt-56 md:grid-cols-[var(--product-cols)] ${GROW}`}
          style={{ "--product-cols": columns } as React.CSSProperties}
          onMouseLeave={() => setActive(DEFAULT_PRODUCT)}
        >
          {products.map((product, i) => {
            const isActive = i === active;
            return (
              <article
                key={product.title}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="relative flex h-[420px] flex-col justify-between overflow-hidden rounded-3xl p-8 lg:h-[558px]"
              >
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  className={`object-cover ${product.position}`}
                  sizes="(min-width: 768px) 62vw, 100vw"
                />
                <h3 className="relative text-3xl font-bold text-primary-950 lg:text-4xl">
                  {product.title}
                </h3>
                <div
                  aria-hidden={!isActive}
                  className={`relative flex flex-col items-center gap-6 ${
                    isActive ? "" : "pointer-events-none"
                  }`}
                >
                  <div
                    className={`w-full rounded-2xl bg-primary-950/50 p-6 backdrop-blur-[2px] ${contentIn(
                      isActive,
                      "delay-[350ms]",
                    )}`}
                  >
                    {product.features.map((feature) => (
                      <p
                        key={feature.lead}
                        className="mt-3 text-lg text-white first:mt-0 lg:text-xl"
                      >
                        <strong className="font-bold">{feature.lead}</strong>
                        <br />
                        {feature.rest}
                      </p>
                    ))}
                  </div>
                  {/* TODO(batch-2-followup): product detail page */}
                  <a
                    href="#"
                    className={`rounded-full bg-accent px-8 py-2.5 text-xl font-medium text-white hover:bg-primary-400 ${contentIn(
                      isActive,
                      "delay-[450ms]",
                    )}`}
                  >
                    Know More
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
