import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/count-up";

const plants = [
  {
    title: "Jaipur, Rajasthan",
    image: { src: "/images/plant-jaipur.png", width: 648, height: 554 },
    imageClassName: "max-w-[480px]",
    alt: "Aerial view of the Jaipur, Rajasthan plant within the outline of Rajasthan state",
    caption: "4 GW module manufacturing capacity under a single roof.",
    details: "4 GW module manufacturing capacity under a single roof.",
  },
  {
    title: "Dholera, Gujarat",
    image: { src: "/images/plant-dholera.png", width: 478, height: 688 },
    imageClassName: "max-w-[332px]",
    alt: "Aerial view of the Dholera, Gujarat plant within the outline of Gujarat state",
    caption: null,
    details:
      "(including a 4 GW TOPCon facility under development) and 2.4 GW module manufacturing capacity, spread across 55 acres in Gujarat's Special Investment Region. Equipped with AI-driven defect diagnostics and automated material movement systems.",
  },
  {
    title: "Visakhapatnam, Andhra Pradesh",
    image: { src: "/images/plant-vizag.png", width: 710, height: 542 },
    imageClassName: "max-w-[500px]",
    alt: "Aerial view of the Visakhapatnam, Andhra Pradesh plant within the outline of Andhra Pradesh state",
    caption: "6.5 GW wafer and ingot manufacturing facility",
    details: "6.5 GW wafer and ingot manufacturing facility",
  },
];

export function Manufacturing() {
  return (
    <section
      id="manufacturing"
      className="relative overflow-hidden bg-primary-950 py-section text-white"
    >
      <Image
        src="/images/sunburst-dark.svg"
        alt=""
        width={608}
        height={314}
        className="pointer-events-none absolute right-[18%] top-0 hidden w-[608px] lg:block"
      />
      <div className="relative mx-auto max-w-content px-4 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-2xl font-bold uppercase leading-8">Manufacturing</p>
            <h2 className="mt-6 text-4xl font-bold sm:text-[54px] sm:leading-[62px]">
              Built at scale.
              <br />
              Built to last.
            </h2>
            <Link
              href="/manufacturing"
              className="mt-8 inline-flex min-w-36 items-center justify-center rounded-full bg-accent px-8 py-3 text-base font-bold text-white transition-colors hover:bg-primary-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Know More
            </Link>
          </div>
          <p className="lg:text-right">
            <span className="text-4xl font-bold">
              <CountUp value="9.3+ GW" />
            </span>
            <span className="mt-2 block max-w-52 text-xl leading-7 lg:ml-auto">
              of cells and modules dispatched till now.
            </span>
          </p>
        </div>

        <div className="mt-16 grid items-center gap-10 md:grid-cols-3">
          {plants.map((plant) => (
            <div key={plant.title} tabIndex={0} className="group perspective-[1600px]">
              <div className="grid transition-transform duration-700 transform-3d group-hover:rotate-y-180 group-focus-within:rotate-y-180 motion-reduce:transition-none">
                <figure className="flex flex-col justify-center [grid-area:1/1] backface-hidden">
                  <Image
                    src={plant.image.src}
                    alt={plant.alt}
                    width={plant.image.width}
                    height={plant.image.height}
                    className={`mx-auto w-full ${plant.imageClassName}`}
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  {plant.caption && (
                    <figcaption className="mx-auto mt-6 max-w-md text-center text-2xl leading-9">
                      {plant.caption}
                    </figcaption>
                  )}
                </figure>

                <article className="flex rotate-y-180 flex-col justify-center bg-black/25 p-10 text-center [grid-area:1/1] backface-hidden">
                  <h3 className="text-3xl font-bold">{plant.title}</h3>
                  <p className="mt-10 text-2xl leading-9">{plant.details}</p>
                </article>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
