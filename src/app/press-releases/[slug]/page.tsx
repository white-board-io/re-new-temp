import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Contact } from "@/components/sections/contact";
import { FeaturedEditorial } from "@/components/sections/featured-editorial";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { EditorialArticle } from "@/components/sections/editorial-article";
import { PriceListTab } from "@/components/sections/price-list-tab";
import { getAllPressReleases, getPressReleaseBySlug } from "@/lib/press-releases";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPressReleases().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const release = getPressReleaseBySlug(slug);
  if (!release) return {};
  const pathname = `/press-releases/${slug}`;
  const image = release.image && !release.imagePlaceholder ? release.image : "/images/solarmodule.webp";
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.renew.com"),
    title: `${release.title} | ReNew Solar Panels`,
    description: release.description,
    alternates: { canonical: pathname },
    openGraph: {
      type: "article",
      title: release.title,
      description: release.description,
      url: pathname,
      publishedTime: release.date,
      images: [{ url: image, alt: release.imageAlt }],
    },
  };
}

export default async function PressReleasePostRoute({ params }: Props) {
  const { slug } = await params;
  const release = getPressReleaseBySlug(slug);
  if (!release) notFound();
  const latest = getAllPressReleases().filter((item) => item.slug !== slug).slice(0, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.renew.com";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: release.title,
    description: release.description,
    datePublished: release.date,
    dateModified: release.date,
    mainEntityOfPage: `${siteUrl}/press-releases/${slug}`,
    image: `${siteUrl}${release.image && !release.imagePlaceholder ? release.image : "/images/solarmodule.webp"}`,
    publisher: { "@type": "Organization", name: "ReNew", url: siteUrl },
  };

  return (
    <>
      <Header sectionPrefix="/" savingsHref="/#savings-calculator" />
      <div className="hidden lg:block"><PriceListTab /></div>
      <main className="pt-[88px] lg:pt-[136px] xl:pt-[138px]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
        <EditorialArticle article={release} collectionLabel="Press Releases" collectionHref="/press-releases" />
        <FeaturedEditorial releases={latest} route="/press-releases" label="Press Release" />
        <Contact />
      </main>
      <Footer sectionPrefix="/" />
    </>
  );
}
