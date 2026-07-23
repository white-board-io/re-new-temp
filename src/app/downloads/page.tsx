import type { Metadata } from "next";
import Image from "next/image";

import { Contact } from "@/components/sections/contact";
import { Downloads } from "@/components/sections/downloads";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";

export const metadata: Metadata = {
  title: "Downloads — ReNew Solar Panels",
  description:
    "Download ReNew Solar product datasheets, installation and warranty guides, and product certificates.",
};

export default function DownloadsPage() {
  return (
    <>
      <Header sectionPrefix="/" contactHref="#contact" savingsHref="/#savings-calculator" />
      <main className="pt-[120px] lg:pt-[136px] xl:pt-[min(138px,7.1875vw)]">
        <section className="relative flex h-[260px] items-center overflow-hidden sm:h-[310px] lg:h-[330px]">
          <Image
            src="/images/downloads-hero.png"
            alt="Solar panels overlooking green hills at sunrise"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_70%]"
          />
          <div className="absolute inset-0 bg-black/25" aria-hidden />
          <div className="relative mx-auto w-full max-w-content px-4 sm:px-6">
            <h1 className="text-4xl font-normal text-white sm:text-5xl lg:text-[54px]">
              Downloads
            </h1>
          </div>
        </section>
        <Downloads />
        <Contact />
      </main>
      <Footer sectionPrefix="/" />
    </>
  );
}
