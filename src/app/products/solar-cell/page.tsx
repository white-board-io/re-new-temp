import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { SolarCellDetail } from "@/components/sections/solar-cell-detail";
import { WhyRenew } from "@/components/sections/why-renew";

export const metadata: Metadata = {
  title: "Solar Cells — ReNew Solar Panels",
  description:
    "Explore ReNew's high-efficiency M10R PERC bifacial solar cells, manufactured for precision and graded for dependable performance.",
};

export default function SolarCellPage() {
  return (
    <>
      <Header sectionPrefix="/" savingsHref="/#savings-calculator" />
      <main className="pt-[104px] lg:pt-[136px]">
        <SolarCellDetail />
        <WhyRenew />
        <Contact />
      </main>
      <Footer sectionPrefix="/" />
    </>
  );
}
