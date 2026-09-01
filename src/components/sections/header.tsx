'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { ContactModalTrigger } from "@/components/contact-modal";

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
      { label: "Solar Modules", href: "/products/solar-module" },
      { label: "Solar Cells", href: "/products/solar-cell" },
    ],
  },
  {
    label: "Manufacturing",
    href: "#manufacturing",
    children: [
      { label: "Jaipur, Rajasthan", href: "/manufacturing#jaipur" },
      { label: "Dholera, Gujarat", href: "/manufacturing#dholera" },
      { label: "Visakhapatnam, Andhra Pradesh", href: "/manufacturing#vizag" },
    ],
  },
  { label: "Channel Partners", href: "#channel-partners" },
];

const utilityItems = [
  { label: "Projects", href: "#our-projects" },
  { label: "Press Releases", href: "#press-releases" },
  { label: "Blogs", href: "#blogs" },
  { label: "Module Warranty Registration", href: "https://warranty.renew.com" },
  { label: "Muft Bijli Yojana", href: "/muft-bijli-yojana" },
];

function getUtilityHref(href: string, sectionPrefix: string) {
  if (href.startsWith("http") || href.startsWith("/")) {
    return href;
  }

  return `${sectionPrefix}${href}`;
}

function UtilityLink({
  href,
  label,
  sectionPrefix,
}: {
  href: string;
  label: string;
  sectionPrefix: string;
}) {
  const resolvedHref = getUtilityHref(href, sectionPrefix);
  const className = "transition-colors hover:text-primary-700";

  if (resolvedHref.startsWith("http")) {
    return (
      <a href={resolvedHref} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={resolvedHref} className={className}>
      {label}
    </Link>
  );
}

export function Header({
  sectionPrefix = "",
  savingsHref = "#savings-calculator",
}: {
  sectionPrefix?: string;
  contactHref?: string;
  savingsHref?: string;
} = {}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileItems, setExpandedMobileItems] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="hidden bg-surface-gray lg:absolute lg:inset-x-0 lg:top-0 lg:z-10 lg:block lg:h-8 lg:bg-[linear-gradient(to_left,#ebebeb_0%,#ebebeb_16%,#f1f1f1_42%,#fafafa_72%,#fff_100%)] xl:h-[min(32px,1.666667vw)]">
        <div className="mx-auto flex max-w-content items-center justify-end gap-7 px-4 py-1.5 text-xs uppercase text-neutral-900 sm:px-6 lg:h-full lg:py-0 xl:relative xl:max-w-none xl:px-0">
          <nav
            aria-label="Utility"
            className="hidden lg:block xl:absolute xl:right-[min(343px,17.864583vw)] xl:top-0 xl:h-[min(32px,1.666667vw)]"
          >
            <ul className="flex items-center xl:h-full xl:text-[min(14px,0.729167vw)] xl:leading-[min(32px,1.666667vw)]">
              {utilityItems.map((item) => (
                <li
                  key={item.href}
                  className="relative flex items-center px-6 first:pl-0 xl:px-[min(26px,1.354167vw)] [&:not(:first-child)]:before:absolute [&:not(:first-child)]:before:left-0 [&:not(:first-child)]:before:top-1/2 [&:not(:first-child)]:before:h-[45%] [&:not(:first-child)]:before:-translate-y-1/2 [&:not(:first-child)]:before:w-px [&:not(:first-child)]:before:bg-neutral-500 [&:not(:first-child)]:before:content-['']"
                >
                  <UtilityLink
                    href={item.href}
                    label={item.label}
                    sectionPrefix={sectionPrefix}
                  />
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="tel:9220440044"
            className="inline-flex shrink-0 items-center normal-case text-primary-700 xl:absolute xl:right-[min(196px,10.208333vw)] xl:top-0 xl:h-[min(32px,1.666667vw)] xl:justify-end xl:text-[min(14px,0.729167vw)] xl:leading-[min(32px,1.666667vw)]"
          >
            <span>Call Us&nbsp;</span>
            <strong className="font-bold">9220 440 044</strong>
          </a>
        </div>
      </div>
      <div className="relative border-t border-neutral-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-4 after:bg-[linear-gradient(to_bottom,rgb(0_0_0_/_0.08),rgb(0_0_0_/_0.03)_45%,transparent)] after:content-[''] lg:h-[138px] lg:border-t-0 xl:h-[min(138px,7.1875vw)] xl:shadow-none">
        <div className="relative mx-auto flex max-w-content items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:pointer-events-none lg:z-20 lg:h-full lg:py-0 lg:pt-8 xl:max-w-none xl:px-0 xl:pt-0">
          <Link
            href="/"
            className="shrink-0 lg:pointer-events-auto lg:-translate-y-4 xl:absolute xl:left-[min(181px,9.427083vw)] xl:top-[min(16px,0.833333vw)] xl:translate-y-0"
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
            className="hidden xl:pointer-events-auto xl:absolute xl:right-[min(613px,31.927083vw)] xl:top-[min(70px,3.645833vw)] xl:block xl:h-[min(32px,1.666667vw)]"
          >
            <ul className="flex h-full items-center gap-[min(40px,2.083333vw)]">
              {navItems.map((item) => (
                <li key={item.href} className="group relative flex h-full items-center">
                  <a
                    href={`${sectionPrefix}${item.href}`}
                    className="inline-flex h-full items-center gap-1 text-[min(20px,1.041667vw)] font-normal leading-[min(32px,1.666667vw)] text-black transition-colors hover:text-primary-700"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        aria-hidden
                        className="size-[min(16px,0.833333vw)] transition-transform duration-200 group-hover:rotate-180"
                      />
                    )}
                  </a>
                  {item.children && (
                    <ul className="invisible absolute left-0 top-full w-max min-w-[min(190px,9.895833vw)] translate-y-2 rounded-md border border-neutral-100 bg-white py-[min(10px,0.520833vw)] opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      {item.children.map((child) => (
                        <li key={`${item.label}-${child.label}`}>
                          <a
                            href={child.href}
                            className="block px-[min(18px,0.9375vw)] py-[min(8px,0.416667vw)] text-[min(16px,0.833333vw)] leading-[min(24px,1.25vw)] text-neutral-800 hover:bg-primary-50 hover:text-primary-700"
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center gap-4 lg:flex lg:pointer-events-auto xl:absolute xl:left-[min(1347px,70.15625vw)] xl:top-[min(66px,3.4375vw)] xl:gap-[min(22px,1.145833vw)]">
            <ContactModalTrigger
              className="rounded-full border border-primary-700 px-6 py-1.5 text-base font-bold leading-8 text-primary-700 transition-colors hover:bg-primary-50 xl:flex xl:h-[min(40px,2.083333vw)] xl:w-[min(145px,7.552083vw)] xl:items-center xl:justify-center xl:border-[min(2px,0.104167vw)] xl:p-0 xl:text-[min(16px,0.833333vw)] xl:leading-[min(32px,1.666667vw)]"
            >
              Contact Us
            </ContactModalTrigger>
            <a
              href={savingsHref}
              className="rounded-full bg-primary-950 px-6 py-1.5 text-base font-bold leading-8 text-white transition-colors hover:bg-primary-900 xl:flex xl:h-[min(40px,2.083333vw)] xl:w-[min(210px,10.9375vw)] xl:items-center xl:justify-center xl:p-0 xl:text-[min(16px,0.833333vw)] xl:leading-[min(32px,1.666667vw)]"
            >
              Solar Calculator
            </a>
          </div>
          <input
            type="checkbox"
            id="mobile-menu-toggle"
            className="peer sr-only xl:hidden"
            aria-label="Toggle menu"
            checked={isMobileMenuOpen}
            onChange={(event) => setIsMobileMenuOpen(event.currentTarget.checked)}
          />
          <label
            htmlFor="mobile-menu-toggle"
            aria-label="Toggle menu"
            className="pointer-events-auto -mr-2 flex size-11 touch-manipulation items-center justify-center rounded-full text-primary-950 peer-checked:[&_.close-icon]:block peer-checked:[&_.menu-icon]:hidden xl:hidden"
          >
            <Menu aria-hidden className="menu-icon size-7" />
            <X aria-hidden className="close-icon hidden size-7" />
          </label>
          <nav
            aria-label="Main"
            className="absolute inset-x-0 top-full z-50 hidden border-t border-neutral-100 bg-white px-6 pb-6 pt-2 shadow-[0_12px_24px_rgba(0,0,0,0.08)] peer-checked:block xl:hidden"
          >
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.children ? (
                    <div className="flex items-center justify-between gap-3">
                      <a
                        href={`${sectionPrefix}${item.href}`}
                        className="text-lg text-black"
                      >
                        {item.label}
                      </a>
                      <button
                        type="button"
                        aria-expanded={expandedMobileItems[item.label] ?? false}
                        aria-controls={`mobile-${item.label.toLowerCase()}-submenu`}
                        aria-label={`${expandedMobileItems[item.label] ? "Collapse" : "Expand"} ${item.label}`}
                        onClick={() =>
                          setExpandedMobileItems((current) => ({
                            ...current,
                            [item.label]: !current[item.label],
                          }))
                        }
                        className="flex size-11 shrink-0 items-center justify-center text-primary-950"
                      >
                        <ChevronDown
                          aria-hidden
                          className={`size-5 transition-transform duration-200 ${
                            expandedMobileItems[item.label] ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  ) : (
                    <a
                      href={`${sectionPrefix}${item.href}`}
                      className="inline-flex items-center gap-1 text-lg text-black"
                    >
                      {item.label}
                    </a>
                  )}
                  {item.children && (
                    <ul
                      id={`mobile-${item.label.toLowerCase()}-submenu`}
                      hidden={!expandedMobileItems[item.label]}
                      className="mt-2 space-y-2 border-l border-primary-200 pl-4"
                    >
                      {item.children.map((child) => (
                        <li key={`${item.label}-${child.label}`}>
                          <a
                            href={child.href}
                            className="text-base text-neutral-600"
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              {utilityItems.map((item) => (
                <li key={item.href}>
                  <UtilityLink
                    href={item.href}
                    label={item.label}
                    sectionPrefix={sectionPrefix}
                  />
                </li>
              ))}
              <li className="flex flex-col items-start gap-3 pt-2">
                <ContactModalTrigger
                  className="inline-flex min-h-10 min-w-[168px] items-center justify-center rounded-full border border-primary-700 px-8 py-0 text-base font-bold text-primary-700"
                >
                  Contact Us
                </ContactModalTrigger>
                <a
                  href="tel:9220440044"
                  className="inline-flex min-h-10 min-w-[168px] items-center justify-center gap-2 rounded-full border border-primary-200 px-8 py-0 text-base font-bold text-primary-700"
                >
                  <Phone aria-hidden className="size-4" />
                  <span>Call Us 9220 440 044</span>
                </a>
                <a
                  href={savingsHref}
                  className="inline-flex min-h-10 min-w-[168px] items-center justify-center rounded-full bg-primary-950 px-8 py-0 text-base font-bold text-white"
                >
                  Solar Calculator
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
