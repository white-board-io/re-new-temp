import Image from "next/image";

const projects = [
  {
    capacity: "1000 MWp",
    image: "/images/project-1000mwp.webp",
    logo: { src: "/images/logo-seci.png", alt: "Solar Energy Corporation of India", width: 60, height: 48 },
    module: "Bifacial 540 Wp PERC",
    developer: "ReNew",
    offtaker: "Solar Energy Corporation of India",
    location: "Rajasthan",
  },
  {
    capacity: "80 MWp",
    image: "/images/project-80mwp.webp",
    logo: { src: "/images/logo-seci.png", alt: "Solar Energy Corporation of India", width: 60, height: 48 },
    module: "Bifacial 540 Wp Mono PERC",
    developer: "ReNew",
    offtaker: "Solar Energy Corporation of India",
    location: "Rajasthan",
  },
  {
    capacity: "40 MWp",
    image: "/images/project-40mwp.webp",
    logo: { src: "/images/logo-amazon.png", alt: "Amazon", width: 110, height: 36 },
    module: "Monofacial 600 Wp Mono PERC",
    developer: "ReNew",
    offtaker: "Amazon",
    location: "Rajasthan",
  },
];

export function OurProjects() {
  return (
    <section id="our-projects" className="bg-white py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="text-center">
          <p className="text-2xl font-bold uppercase leading-8 text-primary-700">
            Our Projects
          </p>
          <h2 className="mt-6 text-4xl font-bold text-primary-950 sm:text-[54px] sm:leading-[62px]">
            Where our panels meet the ground.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-xl leading-8 text-neutral-900">
            From utility-scale plants to commercial rooftops, powered by ReNew Solar Panels.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <article key={project.capacity} className="overflow-hidden rounded-2xl">
              <Image
                src={project.image}
                alt={`Aerial view of the ${project.capacity} solar plant in ${project.location}`}
                width={900}
                height={683}
                className="h-56 w-full object-cover lg:h-72"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <div className="bg-surface-tint p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-3xl font-bold text-primary-700">{project.capacity}</p>
                  <Image
                    src={project.logo.src}
                    alt={project.logo.alt}
                    width={project.logo.width}
                    height={project.logo.height}
                    className="h-10 w-auto"
                  />
                </div>
                <dl className="mt-6 space-y-3 text-lg">
                  {(
                    [
                      ["Module", project.module],
                      ["Developer", project.developer],
                      ["Offtaker", project.offtaker],
                      ["Location", project.location],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label} className="flex gap-2">
                      <dt className="shrink-0 font-bold text-neutral-900">{label}</dt>
                      <dd className="text-neutral-600">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
