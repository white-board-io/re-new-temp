import Image from "next/image";

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
    <section id="press-releases" className="bg-white py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <header className="text-center">
          <h2 className="text-4xl font-bold text-primary-950 sm:text-[54px] sm:leading-[62px]">
            Press Releases
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-neutral-500">
            The latest updates from India&apos;s leading solar module manufacturer.
            <br className="hidden sm:block" /> Milestones, investments, and projects making
            headlines.
          </p>
        </header>

        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {releases.map((release) => (
            <article
              key={release.title}
              className="flex min-h-full flex-col overflow-hidden rounded-md bg-neutral-100"
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
                    className="inline-flex w-fit items-center justify-center rounded-full border-2 border-primary-700 px-10 py-2 text-lg font-bold text-primary-700 transition-colors hover:bg-primary-700 hover:text-white"
                  >
                    Read more
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
