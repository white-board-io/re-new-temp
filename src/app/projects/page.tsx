import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { PriceListTab } from "@/components/sections/price-list-tab";
import { ProjectShowcase } from "@/components/sections/project-showcase";

export const metadata: Metadata = {
  title: "Home - OPP-Project | ReNew Solar Panels",
  description:
    "Explore ReNew Solar Panels project installations, including utility-scale solar projects in Rajasthan.",
};

export default function ProjectsPage() {
  return (
    <>
      <Header sectionPrefix="/" contactHref="#contact" savingsHref="/#savings-calculator" />
      <PriceListTab />
      <main className="pt-[120px] lg:pt-[136px] xl:pt-[138px]">
        <ProjectShowcase />
        <Contact />
      </main>
      <Footer sectionPrefix="/" />
    </>
  );
}
