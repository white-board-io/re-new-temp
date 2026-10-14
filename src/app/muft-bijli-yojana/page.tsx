import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { MuftBijliYojana } from "@/components/sections/muft-bijli-yojana";
import { PriceListTab } from "@/components/sections/price-list-tab";

export const metadata: Metadata = {
  title: "PM Surya Ghar Solar Panels | Rooftop Solar Solutions by ReNew",
  description:
    "Choose ReNew Solar Panels for PM Surya Ghar Muft Bijli Yojana and maximize rooftop solar savings with reliable, high-efficiency panels.",
  keywords: [
    "PM Surya Ghar solar panels",
    "Muft Bijli Yojana solar panels",
    "rooftop solar subsidy",
    "residential solar panels",
    "home solar system",
  ],
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
