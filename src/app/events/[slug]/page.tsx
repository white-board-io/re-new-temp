import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Contact } from "@/components/sections/contact";
import { EditorialArticle, formatDate } from "@/components/sections/editorial-article";
import { FeaturedEditorial } from "@/components/sections/featured-editorial";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { PriceListTab } from "@/components/sections/price-list-tab";
import { getAllEvents, getEventBySlug } from "@/lib/events";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllEvents().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  const pathname = `/events/${slug}`;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.renew.com"),
    title: `${event.title} | Events | ReNew Solar Panels`,
    description: event.description,
    alternates: { canonical: pathname },
    openGraph: {
      type: "article",
      title: event.title,
      description: event.description,
      url: pathname,
      publishedTime: event.date,
      images: event.image ? [{ url: event.image, alt: event.imageAlt }] : undefined,
    },
  };
}

export default async function EventRoute({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();
  const latest = getAllEvents().filter((item) => item.slug !== slug).slice(0, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.renew.com";
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: `${siteUrl}/events/${slug}`,
    image: event.image ? `${siteUrl}${event.image}` : undefined,
    location: event.location ? { "@type": "Place", name: event.location, address: event.location } : undefined,
    organizer: { "@type": "Organization", name: "ReNew", url: siteUrl },
  };

  return (
    <>
      <Header sectionPrefix="/" savingsHref="/#savings-calculator" />
      <div className="hidden lg:block"><PriceListTab /></div>
      <main className="pt-[88px] lg:pt-[136px] xl:pt-[138px]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema).replace(/</g, "\\u003c") }} />
        <EditorialArticle article={event} collectionLabel="Events" collectionHref="/events" details={[
          { label: "Event date", value: <time dateTime={event.date}>{formatDate(event.date)}</time> },
          ...(event.location ? [{ label: "Location", value: event.location }] : []),
          { label: "Event type", value: event.type },
        ]} />
        <FeaturedEditorial releases={latest} route="/events" label="Event" />
        <Contact />
      </main>
      <Footer sectionPrefix="/" />
    </>
  );
}
