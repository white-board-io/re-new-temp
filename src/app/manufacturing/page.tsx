import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { ManufacturingDetail } from "@/components/sections/manufacturing-detail";
import { WhyRenew } from "@/components/sections/why-renew";

export const metadata: Metadata = {
  title: "Solar Panel Manufacturing Plants in India | ReNew Solar",
  description:
    "Explore ReNew's advanced solar manufacturing facilities in Jaipur, Dholera and Vizag with integrated production capabilities and world-class quality standards.",
  keywords: [
    "solar manufacturing india",
    "solar panel factory india",
    "solar module manufacturing plant",
    "solar cell manufacturing india",
    "made in india solar panels",
  ],
};

export default function ManufacturingPage() {
  return (
    <>
      <Header sectionPrefix="/" savingsHref="/#savings-calculator" />
      <main className="pt-[88px] lg:pt-[138px]">
        <ManufacturingDetail />
        <WhyRenew spaciousTop />
        <Contact />
      </main>
      <Footer sectionPrefix="/" />
    </>
  );
}
