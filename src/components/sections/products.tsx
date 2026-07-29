"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const DEFAULT_PRODUCT = 0;

const products = [
  {
    title: "Solar Module",
    image: "/images/Solarmodule-s.webp",
    expandedImage: "/images/solarmodule-e.webp",
    position: "object-center",
    alt: "Two ReNew solar modules standing in a grassy valley at sunrise",
    href: "/products/solar-module",
    features: [
      { lead: "G12R TOPCon Bifacial", rest: "Range up to 640 Wp | Efficiency up to 23.69%" },
      { lead: "M10R TOPCon", rest: "Range up to 610Wp | Efficiency up to 23.61%" },
      { lead: "M10R PERC", rest: "Range up to 560Wp | Efficiency up to 21.68%" },
    ],
  },
  {
    title: "Solar Cell",
    image: "/images/solarcell-s.webp",
    expandedImage: "/images/Solarcell-e.webp",
    position: "object-center",
    alt: "A ReNew solar cell standing in a misty field at sunrise",
    href: "/products/solar-cell",
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
    .map((_, i) => (i === active ? "2fr" : "1fr"))
    .join(" ");

  return (
    <section id="products" className="relative overflow-hidden pt-20">
      {/* End the section artwork at the midpoint of the product cards:
          half the card height + the grid's 6rem bottom padding. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[306px] top-0 -z-10 hidden overflow-hidden md:block lg:bottom-[375px]">
        <Image
          src="/images/products-bg1.png"
          alt=""
          width={1920}
          height={887}
          className="h-auto w-full object-cover"
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
          className={`mt-12 grid gap-6 pb-24 transition-[grid-template-columns] md:mt-56 md:grid-cols-[var(--product-cols)] md:gap-12 ${GROW}`}
          style={{ "--product-cols": columns } as React.CSSProperties}
          onMouseLeave={() => setActive(DEFAULT_PRODUCT)}
        >
          {products.map((product, i) => {
            const isActive = i === active;
            const usesLightArtwork = i === 1;
            return (
              <article
                key={product.title}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="relative h-[420px] overflow-hidden rounded-md lg:h-[558px]"
              >
                <Image
                  src={isActive ? product.expandedImage : product.image}
                  alt={product.alt}
                  fill
                  className={`object-cover ${product.position}`}
                  sizes="(min-width: 768px) 62vw, 100vw"
                />
                <h3 className="absolute left-10 top-10 z-10 text-2xl font-bold uppercase leading-8 text-primary-950">
                  {product.title}
                </h3>
                <div
                  aria-hidden={!isActive}
                  className={`absolute bottom-12 left-[47%] right-12 top-[106px] z-10 flex flex-col ${
                    isActive ? "" : "pointer-events-none"
                  }`}
                >
                  <div className={contentIn(isActive, "delay-[350ms]")}>
                    {product.features.map((feature) => (
                      <p
                        key={feature.lead}
                        className={`mt-6 border-b pb-6 text-base leading-6 first:mt-0 last:border-b-0 lg:text-xl lg:leading-7 ${
                          usesLightArtwork
                            ? "border-primary-950/25 text-primary-950"
                            : "border-white/30 text-white"
                        }`}
                      >
                        <strong className="font-bold">{feature.lead}</strong>
                        <br />
                        {feature.rest}
                      </p>
                    ))}
                  </div>
                  <Link
                    href={product.href}
                    className={`mt-auto self-center rounded-full bg-accent px-8 py-2.5 text-xl font-medium text-white hover:bg-primary-400 ${contentIn(
                      isActive,
                      "delay-[450ms]",
                    )}`}
                  >
                    Know More
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
