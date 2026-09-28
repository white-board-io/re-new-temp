import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact";
import { EditorialListingPage } from "@/components/sections/editorial-listing-page";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { PriceListTab } from "@/components/sections/price-list-tab";
import { getAllBlogs, searchBlogs } from "@/lib/blogs";

type SearchParams = Promise<{ q?: string | string[]; page?: string | string[] }>;

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const query = first(params.q).trim();
  const page = Math.max(1, Number.parseInt(first(params.page), 10) || 1);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.renew.com"),
    title: query ? `Search “${query}” | Blogs | ReNew Solar Panels` : "Blogs | ReNew Solar Panels",
    description: "Read ReNew's latest ideas and insights on clean energy, solar manufacturing, and sustainability.",
    alternates: { canonical: page > 1 && !query ? `/blogs?page=${page}` : "/blogs" },
    robots: query ? { index: false, follow: true } : undefined,
    openGraph: {
      title: "Blogs | ReNew Solar Panels",
      description: "Ideas and insights on clean energy, solar manufacturing, and sustainability.",
      url: "/blogs",
      type: "website",
    },
  };
}

export default async function BlogsRoute({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = first(params.q).trim().slice(0, 120);
  const allPosts = getAllBlogs();
  const posts = searchBlogs(allPosts, query);
  const requestedPage = Number.parseInt(first(params.page), 10);
  const maxPage = Math.max(1, Math.ceil(Math.max(0, posts.length - 5) / 3) + 1);
  const page = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), maxPage) : 1;

  return (
    <>
      <Header sectionPrefix="/" savingsHref="/#savings-calculator" />
      <div className="hidden lg:block"><PriceListTab /></div>
      <main className="pt-[88px] lg:pt-[136px] xl:pt-[138px]">
        <EditorialListingPage featured={allPosts.slice(0, 3)} entries={posts} query={query} page={page} heading="Blogs" description="Discover updates, ideas, and breakthroughs from ReNew Solar Panels." label="Blog" route="/blogs" />
        <Contact />
      </main>
      <Footer sectionPrefix="/" />
    </>
  );
}
