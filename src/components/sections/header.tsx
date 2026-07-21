"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";

const navItems = [
  { label: "Who We Serve", href: "#who-we-serve" },
  { label: "Products", href: "#products" },
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
      <div className="bg-surface-gray">
        <div className="mx-auto flex max-w-content items-center justify-end gap-7 px-4 py-1.5 text-xs uppercase text-neutral-900 sm:px-6">
          <nav aria-label="Utility" className="hidden lg:block">
            <ul className="flex items-center divide-x divide-neutral-500">
              {utilityItems.map((item) => (
                <li key={item.href} className="px-6 first:pl-0">
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
            className="inline-flex items-center gap-1 normal-case font-bold text-primary-700"
          >
            <Phone aria-hidden className="size-3" />
            Call Us 9220 440 044
          </a>
        </div>
      </div>
      <div className="border-t border-neutral-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex max-w-content items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="ReNew Solar Panels"
              width={122}
              height={81}
              priority
              className="h-14 w-auto lg:h-[72px]"
            />
          </Link>
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-10">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={`${sectionPrefix}${item.href}`}
                    className="text-xl leading-8 text-black transition-colors hover:text-primary-700"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={contactHref}
              className="rounded-full border border-primary-700 px-6 py-1.5 text-base font-bold leading-8 text-primary-700 transition-colors hover:bg-primary-50"
            >
              Contact Us
            </a>
            <a
              href={savingsHref}
              className="rounded-full bg-primary-950 px-6 py-1.5 text-base font-bold leading-8 text-white transition-colors hover:bg-primary-900"
            >
              Savings Calculator
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
                  Savings Calculator
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
