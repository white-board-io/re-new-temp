import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { EditorialListingPage } from "@/components/sections/editorial-listing-page";
import { PriceListTab } from "@/components/sections/price-list-tab";
import { getAllPressReleases, searchPressReleases } from "@/lib/press-releases";

type SearchParams = Promise<{ q?: string | string[]; page?: string | string[] }>;

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const query = first(params.q).trim();
  const page = Math.max(1, Number.parseInt(first(params.page), 10) || 1);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.renew.com";
  return {
    metadataBase: new URL(siteUrl),
    title: query ? `Search “${query}” | Press Releases | ReNew Solar Panels` : "Press Releases | ReNew Solar Panels",
    description: "Explore the latest ReNew press releases and company announcements, sorted by publication date.",
    alternates: { canonical: page > 1 && !query ? `/press-releases?page=${page}` : "/press-releases" },
    robots: query ? { index: false, follow: true } : undefined,
    openGraph: {
      title: "Press Releases | ReNew Solar Panels",
      description: "Explore the latest ReNew press releases and company announcements.",
      url: "/press-releases",
      type: "website",
    },
  };
}

export default async function PressReleasesRoute({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = first(params.q).trim().slice(0, 120);
  const allReleases = getAllPressReleases();
  const releases = searchPressReleases(allReleases, query);
  const requestedPage = Number.parseInt(first(params.page), 10);
  const maxPage = Math.max(1, Math.ceil(Math.max(0, releases.length - 5) / 3) + 1);
  const page = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), maxPage) : 1;

  return (
    <>
      <Header sectionPrefix="/" savingsHref="/#savings-calculator" />
      <div className="hidden lg:block">
        <PriceListTab />
      </div>
      <main className="pt-[88px] lg:pt-[136px] xl:pt-[138px]">
        <EditorialListingPage featured={allReleases.slice(0, 3)} entries={releases} query={query} page={page} heading="Press Releases" description="Stay updated on the latest news and stories from ReNew Solar Panels." label="Press Release" route="/press-releases" />
        <Contact />
      </main>
      <Footer sectionPrefix="/" />
    </>
  );
}
