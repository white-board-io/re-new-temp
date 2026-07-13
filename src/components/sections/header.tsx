"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";

const navItems = [
  { label: "Who We Serve", href: "#who-we-serve" },
  { label: "Products", href: "#products" },
  { label: "Manufacturing", href: "#manufacturing" },
  { label: "Our Projects", href: "#our-projects" },
  { label: "Channel Partners", href: "#channel-partners" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-surface-gray text-right">
        <p className="mx-auto max-w-content px-4 py-2 text-xs text-neutral-900 sm:px-6">
          ReNew solar panels, call{" "}
          <a href="tel:9220440044" className="ml-2 inline-flex items-center gap-1 font-bold">
            <Phone aria-hidden className="size-3" />
            9220 440 044
          </a>
        </p>
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
            <ul className="flex items-center gap-9">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
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
              href="#contact"
              className="rounded-full border border-primary-700 px-6 py-1.5 text-base font-bold leading-8 text-primary-700 transition-colors hover:bg-primary-50"
            >
              Contact Us
            </a>
            <a
              href="#savings-calculator"
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
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg text-black"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-primary-700 px-5 py-2 text-sm font-bold text-primary-700"
                >
                  Contact Us
                </a>
                <a
                  href="#savings-calculator"
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
