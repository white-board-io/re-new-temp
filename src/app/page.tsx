import { EnquireFab } from "@/components/sections/enquire-fab";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { PriceListTab } from "@/components/sections/price-list-tab";
import { StatsBar } from "@/components/sections/stats-bar";
import { WhoWeServe } from "@/components/sections/who-we-serve";
import { Products } from "@/components/sections/products";
import { Ticker } from "@/components/sections/ticker";
import { Manufacturing } from "@/components/sections/manufacturing";
import { SavingsCalculator } from "@/components/sections/savings-calculator";
import { OurProjects } from "@/components/sections/our-projects";
import { ChannelPartners } from "@/components/sections/channel-partners";
import { WhyRenew } from "@/components/sections/why-renew";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ReNew Solar",
  description:
    "The manufacturing arm of ReNew, India's leading decarbonisation solutions company, building solar panels at three facilities in Jaipur, Dholera, and Vizag.",
  parentOrganization: {
    "@type": "Organization",
    name: "ReNew",
    tickerSymbol: "RNW",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Header />
      <PriceListTab />
      <EnquireFab />
      <main className="pt-[104px] lg:pt-[136px]">
        {/* First fold: hero + stats share the viewport below the fixed header,
            matching the Figma 1080px frame (hero ~776px, stats ~168px). */}
        <div className="lg:grid lg:h-[calc(100svh-136px)] lg:min-h-[760px] lg:grid-rows-[minmax(0,1fr)_auto]">
          <Hero />
          <StatsBar />
        </div>
        <WhoWeServe />
        <Products />
        <Ticker />
        <Manufacturing />
        <SavingsCalculator />
        <OurProjects />
        <ChannelPartners />
        <WhyRenew />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
