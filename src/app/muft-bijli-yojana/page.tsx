import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { MuftBijliYojana } from "@/components/sections/muft-bijli-yojana";
import { PriceListTab } from "@/components/sections/price-list-tab";

export const metadata: Metadata = {
  title: "PM Surya Ghar Muft Bijli Yojana — ReNew Solar Panels",
  description:
    "A step-by-step guide to applying for the PM Surya Ghar Muft Bijli Yojana rooftop solar subsidy.",
};

export default function MuftBijliYojanaPage() {
  return (
    <>
      <Header sectionPrefix="/" savingsHref="/#savings-calculator" />
      <PriceListTab />
      <main className="pt-[88px] lg:pt-[138px]">
        <MuftBijliYojana />
        <Contact />
      </main>
      <Footer sectionPrefix="/" />
    </>
  );
}
