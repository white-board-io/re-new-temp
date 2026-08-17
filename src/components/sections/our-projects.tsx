import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export function OurProjects() {
  return (
    <section id="our-projects" className="overflow-hidden bg-white pb-section">
      <div className="relative aspect-[2/1] md:aspect-auto md:h-[420px] lg:h-[500px]">
        <Image
          src="/images/projects.webp"
          alt="Solar installations operating through forest, storm, desert, and snow conditions"
          fill
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
      </div>

      <div className="relative mx-auto max-w-content px-4 md:-mt-24 sm:px-6 lg:-mt-40">
        <Reveal className="relative -mx-4 overflow-hidden bg-primary-700 px-7 py-12 text-left text-white sm:-mx-6 md:mx-0 md:rounded-md lg:px-20 lg:py-14 xl:mx-[22px]">
          {/* Two sunbursts, each a full circle centred on one of the card's
              horizontal edges so the card's own overflow-hidden clips it to the
              half the design shows: the larger one hangs off the top edge, the
              smaller one rises from the bottom edge behind Know More. Sizes and
              horizontal offsets are percentages of the card width, measured off
              Figma's 1383px-wide card. (Don't trust the y in Figma's frame
              metadata here — both burst frames carry a flip, so it reports the
              top burst a full frame-height too low.) Figma draws them static;
              the slow counter-spin matches who-we-serve and manufacturing. The
              light #8DC63F asset at 20% is the exact colour sampled from the
              design — the dark variant is for light backgrounds. */}
          <div className="pointer-events-none absolute right-[5.4%] top-0 w-[21.4%] -translate-y-1/2 opacity-20">
            <Image
              src="/images/sunburst_full.svg"
              alt=""
              width={702}
              height={701}
              className="w-full animate-sunburst motion-reduce:animate-none"
            />
          </div>
          <div className="pointer-events-none absolute bottom-0 right-[27.4%] w-[17.9%] translate-y-1/2 opacity-20">
            <Image
              src="/images/sunburst_full.svg"
              alt=""
              width={702}
              height={701}
              className="w-full animate-sunburst [animation-direction:reverse] motion-reduce:animate-none"
            />
          </div>
          <div className="relative grid items-end justify-items-start gap-10 lg:grid-cols-[1fr_auto] lg:justify-items-stretch">
            <div>
              <p className="text-xl font-bold uppercase leading-8 text-primary-300">
                Projects
              </p>
              <h2 className="mt-7 text-[28px] font-bold leading-[1.14] sm:text-[34px] md:text-[54px] md:leading-15.5">
                Solar solutions across every scale.
              </h2>
              <p className="mt-7 max-w-xl text-xl leading-8 text-white/95">
                From utility-scale plants to commercial rooftops,
                <br className="hidden sm:block" /> powered by ReNew Solar Panels.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex min-h-10 min-w-[168px] w-fit items-center justify-center rounded-full bg-accent px-8 py-0 text-base font-medium text-white transition-colors hover:bg-primary-400 md:px-12 md:py-3 md:text-xl lg:mb-5 lg:justify-self-end"
            >
              Know More
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
