import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact";
import { EditorialListingPage } from "@/components/sections/editorial-listing-page";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { PriceListTab } from "@/components/sections/price-list-tab";
import { filterEvents, getAllEvents, getEventTypes, getEventYears, searchEvents } from "@/lib/events";

type SearchParams = Promise<{ q?: string | string[]; page?: string | string[]; type?: string | string[]; year?: string | string[] }>;

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const query = first(params.q).trim();
  const page = Math.max(1, Number.parseInt(first(params.page), 10) || 1);
  const filtered = Boolean(first(params.type) || first(params.year));
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.renew.com"),
    title: query ? `Search “${query}” | Events | ReNew Solar Panels` : "Events | ReNew Solar Panels",
    description: "Explore the exhibitions, distributor meets, and industry events where ReNew Solar Panels has showcased its solar modules.",
    alternates: { canonical: page > 1 && !query && !filtered ? `/events?page=${page}` : "/events" },
    robots: query || filtered ? { index: false, follow: true } : undefined,
    openGraph: {
      title: "Events | ReNew Solar Panels",
      description: "Exhibitions, distributor meets, and industry events featuring ReNew Solar Panels.",
      url: "/events",
      type: "website",
    },
  };
}

export default async function EventsRoute({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = first(params.q).trim().slice(0, 120);
  const allEvents = getAllEvents();
  const types = getEventTypes(allEvents);
  const years = getEventYears(allEvents);
  const type = types.find((option) => option === first(params.type)) || "";
  const year = years.find((option) => option === first(params.year)) || "";
  const events = searchEvents(filterEvents(allEvents, { type, year }), query);
  const requestedPage = Number.parseInt(first(params.page), 10);
  const maxPage = Math.max(1, Math.ceil(Math.max(0, events.length - 5) / 3) + 1);
  const page = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), maxPage) : 1;

  return (
    <>
      <Header sectionPrefix="/" savingsHref="/#savings-calculator" />
      <div className="hidden lg:block"><PriceListTab /></div>
      <main className="pt-[88px] lg:pt-[136px] xl:pt-[138px]">
        <EditorialListingPage featured={allEvents.slice(0, 3)} entries={events} query={query} page={page} heading="Events" description="Setting new benchmarks in the global solar manufacturing industry." label="Event" route="/events" filters={[
          { name: "type", label: "Filter by event type", allLabel: "All event types", options: types, value: type },
          { name: "year", label: "Filter by year", allLabel: "All years", options: years, value: year },
        ]} />
        <Contact />
      </main>
      <Footer sectionPrefix="/" />
    </>
  );
}
