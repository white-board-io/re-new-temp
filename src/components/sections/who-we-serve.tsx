import Image from "next/image";

const cards = [
  {
    title: "For your home",
    image: "/images/who-we-serve-card.webp",
    position: "object-[35%_60%]",
    description:
      "Cut your electricity bills for decades with panels engineered for Indian rooftops - from the manufacturer powering the country's clean energy transition.",
  },
  {
    title: "For your business",
    image: "/images/solar-module-rooftop.webp",
    position: "object-center",
    description:
      "When your energy costs are high, and your timelines are tight, you need a manufacturer you can count on - consistent availability, committed supply, and panels that perform.",
  },
  {
    title: "For large-scale projects",
    image: "/images/project-1000mwp.webp",
    position: "object-center",
    description:
      "From utility-scale farms to industrial parks, get committed gigawatt-scale supply and consistent quality, delivered on your project's schedule.",
  },
];

export function WhoWeServe() {
  return (
    <section
      id="who-we-serve"
      className="relative overflow-hidden bg-gradient-to-b from-surface-tint to-white pb-section pt-section lg:pt-40"
    >
      <Image
        src="/images/sunburst.svg"
        alt=""
        width={608}
        height={314}
        className="pointer-events-none absolute right-[18%] top-0 hidden w-[608px] lg:block"
      />
      <div className="relative mx-auto max-w-content px-4 sm:px-6">
        <p className="text-2xl font-bold uppercase leading-8 text-primary-700">Who We Serve</p>
        <h2 className="mt-6 text-4xl font-bold text-primary-950 sm:text-[54px] sm:leading-[58px]">
          Solar for <span className="text-primary-700">every roof.</span>
        </h2>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-lg text-neutral-500">
          <li className="flex items-center gap-2">
            <Image src="/images/icon-factory.svg" alt="" width={26} height={26} />
            Manufactured by us
          </li>
          <li className="flex items-center gap-2">
            <Image src="/images/icon-handshake.svg" alt="" width={26} height={26} />
            Installed by our certified partner network
          </li>
        </ul>

        <div className="mt-16 grid gap-6 md:grid-cols-3 lg:mt-24 lg:gap-[90px]">
          {cards.map((card) => (
            <article
              key={card.title}
              tabIndex={0}
              className="group h-[462px] rounded-md perspective-[1600px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-700 lg:h-[590px]"
            >
              <div className="grid h-full transform-3d transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:rotate-y-180 group-focus-within:rotate-y-180 motion-reduce:transition-none">
                <div className="relative overflow-hidden rounded-md [grid-area:1/1] backface-hidden">
                  <Image
                    src={card.image}
                    alt={`${card.title}: rooftop solar installation`}
                    fill
                    className={`object-cover ${card.position}`}
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-primary-950/10 to-transparent" />
                  <h3 className="absolute bottom-8 left-8 max-w-56 text-3xl font-bold leading-tight text-white">
                    {card.title}
                  </h3>
                </div>

                <div className="flex h-full rotate-y-180 flex-col items-center justify-between rounded-md bg-gradient-to-b from-primary-800 to-primary-950 p-8 text-center text-white [grid-area:1/1] backface-hidden lg:p-10">
                  <div>
                    <h3 className="text-3xl font-bold lg:mt-2">{card.title}</h3>
                    <p className="mx-auto mt-8 max-w-[430px] text-2xl leading-8">
                      {card.description}
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="rounded-full bg-white px-7 py-2.5 text-base font-bold text-primary-950 hover:bg-primary-50"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
