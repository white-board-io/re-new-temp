import Image from "next/image";
import Link from "next/link";

export function OurProjects() {
  return (
    <section id="our-projects" className="overflow-hidden bg-white pb-section">
      <div className="relative h-[330px] sm:h-[420px] lg:h-[500px]">
        <Image
          src="/images/projects-seasons-hd.webp"
          alt="Solar installations operating through forest, storm, desert, and snow conditions"
          fill
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
      </div>

      <div className="relative mx-auto -mt-14 max-w-content px-4 sm:-mt-24 sm:px-6 lg:-mt-28">
        <div className="relative overflow-hidden rounded-md bg-primary-700 px-7 py-12 text-white sm:px-12 lg:px-20 lg:py-14">
          <Image
            src="/images/sunburst.svg"
            alt=""
            width={608}
            height={314}
            className="pointer-events-none absolute -bottom-24 right-10 hidden w-[560px] opacity-10 lg:block"
          />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xl font-bold uppercase leading-8 text-primary-300">
                Projects
              </p>
              <h2 className="mt-7 text-4xl font-bold leading-tight sm:text-[54px] sm:leading-[62px]">
                Solar solutions across every scale.
              </h2>
              <p className="mt-7 max-w-xl text-xl leading-8 text-white/95">
                From utility-scale plants to commercial rooftops,
                <br className="hidden sm:block" /> powered by ReNew Solar Panels.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex w-fit items-center justify-center rounded-full bg-accent px-12 py-3 text-xl font-medium text-white transition-colors hover:bg-primary-400 lg:mb-5"
            >
              Know More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
