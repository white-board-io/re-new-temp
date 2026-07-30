import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { PriceListTab } from "@/components/sections/price-list-tab";
import { SolarModuleDetail } from "@/components/sections/solar-module-detail";
import { WhyRenew } from "@/components/sections/why-renew";

export const metadata: Metadata = {
  title: "Solar Modules — ReNew Solar Panels",
  description:
    "Explore ReNew's G12R TOPCon bifacial solar module, engineered for dependable performance across utility, commercial, industrial, and residential installations.",
};

export default function SolarModulePage() {
  return (
    <>
      <Header sectionPrefix="/" savingsHref="/#savings-calculator" />
      <PriceListTab />
      <main className="pt-[88px] lg:pt-[136px] xl:pt-[138px]">
        <SolarModuleDetail />
        <WhyRenew />
        <Contact />
      </main>
      <Footer sectionPrefix="/" />
    </>
  );
}
