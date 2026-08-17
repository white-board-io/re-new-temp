import Image from "next/image";
import { Reveal } from "@/components/reveal";

const posts = [
  {
    title:
      "Why proper installation of panels is the key to maximizing the potential of solar energy",
    image: "/images/blog-installation.webp",
    alt: "Technicians checking the alignment of installed solar panels",
    href: "https://www.renew.com/blog-detail/why-proper-installation-of-panels-is-the-key-to-maximizing-the-potential-of-solar-energy",
  },
  {
    title:
      "ReNew’s Jaipur Solar Manufacturing Plant: Setting New Benchmarks in Sustainable Innovation",
    image: "/images/blog-jaipur.webp",
    alt: "A technician monitoring automated equipment at ReNew’s Jaipur plant",
    href: "https://www.renew.com/blog-detail/renew-s-jaipur-solar-manufacturing-plant-setting-new-benchmarks-in-sustainable-innovation",
  },
  {
    title: "ReNew Solar Manufacturing: Fueling Global Decarbonization Dreams",
    image: "/images/blog-decarbonization.webp",
    alt: "ReNew technicians inspecting a solar module on the manufacturing line",
    href: "https://www.renew.com/blog-detail/renew-solar-manufacturing-fueling-global-decarbonization-dreams",
  },
];

export function Blogs() {
  return (
    <section id="blogs" className="bg-white pb-section md:py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <Reveal as="header" className="text-left">
          <h2 className="text-[28px] font-bold leading-[1.14] text-primary-950 sm:text-[34px] md:text-[54px] md:leading-[62px]">
            Blogs
          </h2>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-neutral-500">
            Discover updates, ideas, and breakthroughs from ReNew Solar Panels business.
          </p>
        </Reveal>

        <Reveal
          stagger
          delay={120}
          className="reveal-track mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:gap-7 md:overflow-visible md:pb-0 lg:grid-cols-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((post) => (
            <article
              key={post.title}
              className="flex min-h-full w-[88%] shrink-0 snap-start flex-col overflow-hidden rounded-md bg-neutral-100 md:w-auto md:shrink"
            >
              <Image
                src={post.image}
                alt={post.alt}
                width={1100}
                height={730}
                className="aspect-[1.58/1] w-full object-cover"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
              <div className="flex flex-1 flex-col p-8 lg:px-12 lg:py-10">
                <h3 className="text-2xl font-bold leading-9 text-primary-700">
                  {post.title}
                </h3>
                <div className="mt-auto pt-10">
                  <a
                    href={post.href}
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
