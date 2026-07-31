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
import { PressReleases } from "@/components/sections/press-releases";
import { Blogs } from "@/components/sections/blogs";

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
      <PriceListTab activeSectionId="products" />
      <main className="pt-[88px] lg:pt-[138px]">
        {/* First fold: hero + stats share the viewport below the fixed header.
            Sizing lives in globals.css — it has to divide out the design zoom. */}
        <div className="first-fold">
          <Hero />
          <StatsBar />
        </div>
        <WhoWeServe />
        <Products />
        <Ticker />
        <Manufacturing />
        <SavingsCalculator />
        <ChannelPartners />
        <OurProjects />
        <PressReleases />
        <Blogs />
        <WhyRenew />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
