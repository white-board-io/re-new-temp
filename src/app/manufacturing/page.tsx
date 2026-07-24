import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { ManufacturingDetail } from "@/components/sections/manufacturing-detail";
import { WhyRenew } from "@/components/sections/why-renew";

export const metadata: Metadata = {
  title: "Manufacturing — ReNew Solar Panels",
  description:
    "Explore ReNew's world-class solar manufacturing facilities in Jaipur, Dholera and Visakhapatnam.",
};

export default function ManufacturingPage() {
  return (
    <>
      <Header sectionPrefix="/" savingsHref="/#savings-calculator" />
      <main className="pt-[120px] lg:pt-[136px] xl:pt-[138px]">
        <ManufacturingDetail />
        <WhyRenew />
        <Contact />
      </main>
      <Footer sectionPrefix="/" />
    </>
  );
}
