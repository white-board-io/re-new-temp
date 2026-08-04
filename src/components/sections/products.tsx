"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/reveal";

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
      { lead: "Mono PERC cells", rest: "with up to 23.7% conversion efficiency." },
      { lead: "TOPCon cells", rest: "with industry-leading efficiency of up to 25.2%." },
    ],
  },
];

// Expanded content exits fast and together, then re-enters with a gentle rise
// once the card is most of the way open.
const contentIn = (isActive: boolean, delay: string) =>
  `md:transition-[opacity,transform,background-color] md:ease-out ${
    isActive
      ? `md:translate-y-0 md:opacity-100 md:duration-500 ${delay}`
      : "md:translate-y-2 md:opacity-0 md:duration-200"
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
        <Reveal className="text-center">
          <p className="text-2xl font-bold uppercase leading-8 text-primary-700">Products</p>
          <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-bold text-primary-950 sm:text-[54px] sm:leading-[62px]">
            The <span className="text-primary-700">right panel</span> for your home, your
            business, your project.
          </h2>
        </Reveal>

        <Reveal
          stagger
          delay={150}
          className="mt-12 grid gap-6 pb-24 md:mt-56 md:grid-cols-[var(--product-cols)] md:gap-12 md:transition-[grid-template-columns] md:duration-700 md:ease-[cubic-bezier(0.4,0,0.2,1)]"
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
                className="relative h-[420px] overflow-hidden rounded-md lg:h-[558px]"
              >
                <Image
                  src={product.expandedImage}
                  alt={product.alt}
                  fill
                  className={`object-cover md:hidden ${product.position}`}
                  sizes="100vw"
                />
                <Image
                  src={isActive ? product.expandedImage : product.image}
                  alt={product.alt}
                  fill
                  className={`hidden object-cover md:block ${product.position}`}
                  sizes="(min-width: 768px) 62vw, 50vw"
                />
                <div className="absolute inset-0 bg-primary-950/55 md:hidden" />
                <h3 className="absolute left-1/2 top-8 z-10 -translate-x-1/2 text-center text-2xl font-bold uppercase leading-8 text-white md:left-10 md:top-10 md:translate-x-0 md:text-left md:text-primary-950">
                  {product.title}
                </h3>
                <div
                  className={`absolute inset-x-8 bottom-8 top-[104px] z-10 flex flex-col items-center text-center md:bottom-12 md:left-[47%] md:right-12 md:top-[106px] md:items-stretch md:text-left ${
                    isActive ? "" : "md:pointer-events-none"
                  }`}
                >
                  <div className={contentIn(isActive, "md:delay-[350ms]")}>
                    {product.features.map((feature) => (
                      <p
                        key={feature.lead}
                        className="mt-3 border-b border-white/30 pb-3 text-sm leading-5 text-white first:mt-0 last:border-b-0 md:mt-6 md:pb-6 md:text-base md:leading-6 lg:text-xl lg:leading-7"
                      >
                        <strong className="font-bold">{feature.lead}</strong>
                        <br />
                        {feature.rest}
                      </p>
                    ))}
                  </div>
                  <Link
                    href={product.href}
                    className={`mt-auto self-center rounded-full bg-accent px-7 py-2.5 text-base font-medium text-white hover:bg-primary-400 md:self-start md:px-8 md:text-xl ${contentIn(
                      isActive,
                      "md:delay-[450ms]",
                    )}`}
                  >
                    Know More
                  </Link>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
