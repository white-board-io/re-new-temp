import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { EditorialArticleData } from "@/lib/editorial";

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/renew-solar-panels/",
    path: <path d="M6.94 8.75H3.56V20.5h3.38V8.75ZM5.25 7.19a1.97 1.97 0 1 0 0-3.94 1.97 1.97 0 0 0 0 3.94ZM20.5 13.06c0-3.06-1.63-4.56-3.94-4.56-1.4 0-2.37.66-2.94 1.56V8.75H10.3V20.5h3.37v-6.19c0-1.5.75-2.31 1.94-2.31 1.13 0 1.7.75 1.7 2.31v6.19h3.19v-7.44Z" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/renewsolarpanels/",
    path: <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.4" cy="6.7" r="1" /></>,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/61591585425865/",
    path: <path d="M13.5 21.888v-7.403h2.438l.465-3.02h-2.903V9.51c0-.826.405-1.632 1.703-1.632h1.318V5.307s-1.196-.204-2.34-.204c-2.387 0-3.947 1.447-3.947 4.066v2.296H7.578v3.02h2.656v7.403a10.06 10.06 0 0 0 3.266 0Z" />,
  },
  {
    label: "X",
    href: "https://x.com/ReNewCorp",
    path: <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.3-8.5L1.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@renewsolarpanels",
    path: <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.42-4.81ZM10 15.13V8.87L15.25 12 10 15.13Z" />,
  },
];

export function EditorialArticle({ article, collectionLabel, collectionHref, bylineLabel = "Published By" }: { article: EditorialArticleData; collectionLabel: string; collectionHref: string; bylineLabel?: string }) {
  const heroImage = article.image && !article.imagePlaceholder ? article.image : "/images/solarmodule.webp";

  return (
    <article>
      <header className="relative flex min-h-[350px] items-center justify-center overflow-hidden bg-primary-950 px-4 py-16 text-center text-white sm:min-h-[420px] sm:px-6 lg:min-h-[520px]">
        <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,42,0,0.88),rgba(0,77,43,0.72))]" />
        <div className="relative z-10 mx-auto max-w-[1100px]">
          <nav aria-label="Breadcrumb" className="mx-auto mb-10 w-fit rounded-full bg-primary-700/75 px-6 py-2 text-sm sm:text-base">
            <Link href="/" className="text-white/70 hover:text-white">Home</Link>
            <span aria-hidden="true" className="mx-1.5">/</span>
            <Link href={collectionHref} className="font-bold hover:text-primary-300">{collectionLabel}</Link>
          </nav>
          <h1 className="text-[34px] font-bold leading-[1.12] sm:text-[44px] lg:text-[54px]">{article.title}</h1>
        </div>
      </header>

      <div className="mx-auto max-w-[1244px] px-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-8 pb-12 pt-12 sm:pb-16 sm:pt-14 lg:gap-12">
          <dl className="grid grid-cols-2 gap-x-5 gap-y-5 text-sm text-neutral-700 sm:flex sm:gap-0 sm:text-base">
            <div className="sm:min-w-[175px] sm:border-r sm:border-neutral-300 sm:pr-8">
              <dt className="text-neutral-500">Published on :</dt>
              <dd className="mt-1 font-medium"><time dateTime={article.date}>{formatDate(article.date)}</time></dd>
            </div>
            <div className="sm:min-w-[173px] sm:border-r sm:border-neutral-300 sm:px-8">
              <dt className="text-neutral-500">{bylineLabel} :</dt>
              <dd className="mt-1 font-medium">{article.author || article.publisher || "ReNew"}</dd>
            </div>
            <div className="sm:pl-8">
              <dt className="text-neutral-500">Category :</dt>
              <dd className="mt-1 font-medium">{article.category || "Press Release"}</dd>
            </div>
          </dl>
          <nav aria-label="ReNew social media" className="flex items-center gap-3 sm:gap-5">
            {socialLinks.map(({ label, href, path }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`ReNew on ${label}`} className="flex size-10 items-center justify-center rounded-full bg-primary-700 text-white transition-colors hover:bg-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 sm:size-12">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5 sm:size-6">{path}</svg>
              </a>
            ))}
          </nav>
        </div>

        <div className="editorial-content pb-10 text-neutral-600 sm:pb-16">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h2>{children}</h2>,
              img: ({ src, alt }) => typeof src === "string" ? <Image src={src} alt={alt || ""} width={1200} height={800} className="my-10 h-auto w-full rounded-md object-contain" /> : null,
              a: ({ href, children }) => <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noopener noreferrer" : undefined} className="text-primary-700 underline underline-offset-4 hover:text-primary-900">{children}</a>,
              table: ({ children }) => <div className="my-8 overflow-x-auto"><table className="min-w-full border-collapse text-left text-base">{children}</table></div>,
              th: ({ children }) => <th className="border border-neutral-300 bg-surface-tint px-4 py-3 font-bold text-neutral-800">{children}</th>,
              td: ({ children }) => <td className="border border-neutral-300 px-4 py-3 align-top">{children}</td>,
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
        {article.localPdf && (
          <div className="pb-10 sm:pb-16">
            <a href={article.localPdf} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-primary-700 px-6 py-2.5 font-bold text-primary-700 transition-colors hover:bg-primary-700 hover:text-white">View original PDF</a>
          </div>
        )}
      </div>
    </article>
  );
}
