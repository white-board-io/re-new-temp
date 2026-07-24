"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  { label: "Who We Serve", href: "#who-we-serve" },
  {
    label: "Products",
    href: "#products",
    children: [
      { label: "Solar Module", href: "/products/solar-module" },
      { label: "Solar Cell", href: "/products/solar-cell" },
    ],
  },
  { label: "Manufacturing", href: "#manufacturing" },
  { label: "Channel Partners", href: "#channel-partners" },
];

const utilityItems = [
  { label: "Projects", href: "#our-projects" },
  { label: "Press Releases", href: "#press-releases" },
  { label: "Blogs", href: "#blogs" },
  { label: "Why ReNew Solar Panels", href: "#why-renew" },
];

export function Header({
  sectionPrefix = "",
  contactHref = "#contact",
  savingsHref = "#savings-calculator",
}: {
  sectionPrefix?: string;
  contactHref?: string;
  savingsHref?: string;
} = {}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-surface-gray lg:absolute lg:inset-x-0 lg:top-0 lg:z-10 lg:h-8 lg:bg-[linear-gradient(to_left,#ebebeb_0%,#ebebeb_16%,#f1f1f1_42%,#fafafa_72%,#fff_100%)] xl:h-[min(32px,1.666667vw)]">
        <div className="mx-auto flex max-w-content items-center justify-end gap-7 px-4 py-1.5 text-xs uppercase text-neutral-900 sm:px-6 lg:h-full lg:py-0 xl:relative xl:max-w-none xl:px-0">
          <nav
            aria-label="Utility"
            className="hidden lg:block xl:absolute xl:right-[min(343px,17.864583vw)] xl:top-0 xl:h-[min(32px,1.666667vw)]"
          >
            <ul className="flex items-center divide-x divide-neutral-500 xl:h-full xl:text-[min(14px,0.729167vw)] xl:leading-[min(32px,1.666667vw)]">
              {utilityItems.map((item) => (
                <li
                  key={item.href}
                  className="px-6 first:pl-0 xl:px-[min(26px,1.354167vw)]"
                >
                  <a
                    href={`${sectionPrefix}${item.href}`}
                    className="transition-colors hover:text-primary-700"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="tel:9220440044"
            className="inline-flex items-center normal-case text-primary-700 xl:absolute xl:right-[min(196px,10.208333vw)] xl:top-0 xl:h-[min(32px,1.666667vw)] xl:w-[min(248px,12.916667vw)] xl:justify-end xl:text-[min(14px,0.729167vw)] xl:leading-[min(32px,1.666667vw)]"
          >
            <span>Call Us&nbsp;</span>
            <strong className="font-bold">9220 440 044</strong>
          </a>
        </div>
      </div>
      <div className="border-t border-neutral-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] lg:h-[138px] lg:border-t-0 xl:h-[min(138px,7.1875vw)] xl:border-b-[0.5px] xl:border-primary-700 xl:shadow-none">
        <div className="mx-auto flex max-w-content items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:relative lg:z-20 lg:h-full lg:py-0 lg:pt-8 xl:max-w-none xl:px-0 xl:pt-0">
          <Link
            href="/"
            className="shrink-0 lg:-translate-y-4 xl:absolute xl:left-[min(181px,9.427083vw)] xl:top-[min(16px,0.833333vw)] xl:translate-y-0"
          >
            <Image
              src="/images/logo.svg"
              alt="ReNew Solar Panels"
              width={161}
              height={106}
              priority
              className="h-14 w-auto lg:h-[106px] lg:w-[161px] xl:h-[min(106px,5.520833vw)] xl:w-[min(161px,8.385417vw)]"
            />
          </Link>
          <nav
            aria-label="Main"
            className="hidden xl:absolute xl:right-[min(613px,31.927083vw)] xl:top-[min(70px,3.645833vw)] xl:block xl:h-[min(32px,1.666667vw)]"
          >
            <ul className="flex h-full items-center gap-[min(40px,2.083333vw)]">
              {navItems.map((item) => (
                <li key={item.href} className="group relative flex h-full items-center">
                  <a
                    href={`${sectionPrefix}${item.href}`}
                    className="inline-flex h-full items-center text-[min(20px,1.041667vw)] font-normal leading-[min(32px,1.666667vw)] text-black transition-colors hover:text-primary-700"
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <ul className="invisible absolute left-1/2 top-full w-[min(190px,9.895833vw)] -translate-x-1/2 translate-y-2 rounded-md border border-neutral-100 bg-white py-[min(10px,0.520833vw)] opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-[min(18px,0.9375vw)] py-[min(8px,0.416667vw)] text-[min(16px,0.833333vw)] leading-[min(24px,1.25vw)] text-neutral-800 hover:bg-primary-50 hover:text-primary-700"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center gap-4 lg:flex xl:absolute xl:left-[min(1347px,70.15625vw)] xl:top-[min(66px,3.4375vw)] xl:gap-[min(22px,1.145833vw)]">
            <a
              href={contactHref}
              className="rounded-full border border-primary-700 px-6 py-1.5 text-base font-bold leading-8 text-primary-700 transition-colors hover:bg-primary-50 xl:flex xl:h-[min(40px,2.083333vw)] xl:w-[min(145px,7.552083vw)] xl:items-center xl:justify-center xl:border-[min(2px,0.104167vw)] xl:p-0 xl:text-[min(16px,0.833333vw)] xl:leading-[min(32px,1.666667vw)]"
            >
              Contact Us
            </a>
            <a
              href={savingsHref}
              className="rounded-full bg-primary-950 px-6 py-1.5 text-base font-bold leading-8 text-white transition-colors hover:bg-primary-900 xl:flex xl:h-[min(40px,2.083333vw)] xl:w-[min(210px,10.9375vw)] xl:items-center xl:justify-center xl:p-0 xl:text-[min(16px,0.833333vw)] xl:leading-[min(32px,1.666667vw)]"
            >
              Solar Calculator
            </a>
          </div>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="text-primary-950 xl:hidden"
          >
            {menuOpen ? <X className="size-7" /> : <Menu className="size-7" />}
          </button>
        </div>
        {menuOpen && (
          <nav aria-label="Main" className="border-t border-neutral-100 bg-white px-6 pb-6 pt-2 xl:hidden">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={`${sectionPrefix}${item.href}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg text-black"
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <ul className="mt-2 space-y-2 border-l border-primary-200 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setMenuOpen(false)}
                            className="text-base text-neutral-600"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              {utilityItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={`${sectionPrefix}${item.href}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg text-black"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="flex flex-wrap gap-3 pt-2">
                <a
                  href={contactHref}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-primary-700 px-5 py-2 text-sm font-bold text-primary-700"
                >
                  Contact Us
                </a>
                <a
                  href={savingsHref}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full bg-primary-950 px-5 py-2 text-sm font-bold text-white"
                >
                  Solar Calculator
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
