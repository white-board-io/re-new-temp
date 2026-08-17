import Image from "next/image";
import { Reveal } from "@/components/reveal";

const releases = [
  {
    title: "BII Investment in Solar Manufacturing",
    description:
      "ReNew secures $100 million marquee investment from BII to boost India’s solar manufacturing ecosystem.",
    image: "/images/press-bii.webp",
    alt: "ReNew and British International Investment representatives at the BII investment announcement",
    href: "https://www.renew.com/press-release/renew-secures-100-million-marquee-investment-from-bii-to-boost-india-s-solar-manufacturing-ecosystem",
  },
  {
    title: "Largest Solar Project in Rajasthan",
    description:
      "ReNew inaugurates its largest single-location solar project in Rajasthan at 1.3 GW peak power capacity.",
    image: "/images/press-rajasthan.webp",
    alt: "Guests at the inauguration of ReNew’s 1.3 GW solar farm in Rajasthan",
    href: "https://www.renew.com/press-release/renew-inaugurates-largest-single-location-solar-project-in-rajasthan-at-1-3-gw-peak-power-capacity",
  },
  {
    title: "1 GW Solar Project Dedicated",
    description:
      "ReNew dedicates its latest ~1 GW solar project to the people of Rajasthan.",
    image: "/images/press-dedication.webp",
    alt: "A ReNew leader speaking at the Rajasthan solar project dedication",
    href: "https://www.renew.com/press-release/renew-dedicates-its-latest-1-gw-solar-project-to-the-people-of-rajasthan",
  },
];

export function PressReleases() {
  return (
    <section id="press-releases" className="bg-white pb-section md:py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <Reveal as="header" className="text-left">
          <h2 className="text-[28px] font-bold leading-[1.14] text-primary-950 sm:text-[34px] md:text-[54px] md:leading-[62px]">
            Press Releases
          </h2>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-neutral-500">
            The latest updates from India&apos;s leading solar module manufacturer.
            <br className="hidden sm:block" /> Milestones, investments, and projects making
            headlines.
          </p>
        </Reveal>

        <Reveal
          stagger
          delay={120}
          className="reveal-track mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:gap-7 md:overflow-visible md:pb-0 lg:grid-cols-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {releases.map((release) => (
            <article
              key={release.title}
              className="flex min-h-full w-[88%] shrink-0 snap-start flex-col overflow-hidden rounded-md bg-neutral-100 md:w-auto md:shrink"
            >
              <Image
                src={release.image}
                alt={release.alt}
                width={1100}
                height={730}
                className="aspect-[1.58/1] w-full object-cover"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
              <div className="flex flex-1 flex-col p-8 lg:px-12 lg:py-10">
                <h3 className="text-2xl font-bold leading-8 text-primary-700">
                  {release.title}
                </h3>
                <p className="mt-6 text-xl leading-8 text-neutral-500">
                  {release.description}
                </p>
                <div className="mt-auto pt-10">
                  <a
                    href={release.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 min-w-[168px] items-center justify-center rounded-full border-2 border-primary-700 px-8 py-0 text-base font-bold text-primary-700 transition-colors hover:bg-primary-700 hover:text-white md:py-2.5"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
