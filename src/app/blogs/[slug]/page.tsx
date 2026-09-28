import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Contact } from "@/components/sections/contact";
import { EditorialArticle } from "@/components/sections/editorial-article";
import { FeaturedEditorial } from "@/components/sections/featured-editorial";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { PriceListTab } from "@/components/sections/price-list-tab";
import { getAllBlogs, getBlogBySlug } from "@/lib/blogs";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogs().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};
  const pathname = `/blogs/${slug}`;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.renew.com"),
    title: `${post.title} | ReNew Solar Panels`,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: { canonical: pathname },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: pathname,
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image, alt: post.imageAlt }] : undefined,
    },
  };
}

export default async function BlogPostRoute({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();
  const latest = getAllBlogs().filter((item) => item.slug !== slug).slice(0, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.renew.com";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: `${siteUrl}/blogs/${slug}`,
    image: post.image ? `${siteUrl}${post.image}` : undefined,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: post.publisher, url: siteUrl },
  };

  return (
    <>
      <Header sectionPrefix="/" savingsHref="/#savings-calculator" />
      <div className="hidden lg:block"><PriceListTab /></div>
      <main className="pt-[88px] lg:pt-[136px] xl:pt-[138px]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
        <EditorialArticle article={post} collectionLabel="Blogs" collectionHref="/blogs" bylineLabel="Written By" />
        <FeaturedEditorial releases={latest} route="/blogs" label="Blog" />
        <Contact />
      </main>
      <Footer sectionPrefix="/" />
    </>
  );
}
