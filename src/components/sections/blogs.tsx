import Image from "next/image";

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
    <section id="blogs" className="bg-white py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <header className="text-center">
          <h2 className="text-4xl font-bold text-primary-950 sm:text-[54px] sm:leading-[62px]">
            Blogs
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-neutral-500">
            Discover updates, ideas, and breakthroughs from ReNew&apos;s solar panel
            business.
          </p>
        </header>

        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="flex min-h-full flex-col overflow-hidden rounded-md bg-neutral-100"
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
