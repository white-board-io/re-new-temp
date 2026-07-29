"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, Grid3X3, Leaf, Medal, ShieldCheck } from "lucide-react";

function ModuleIcon() {
  return (
    <svg viewBox="0 0 44 48" aria-hidden className="size-[29px] text-accent">
      <g fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round">
        <path d="M12 2h29L30 40H1L12 2Z" />
        <path d="M18 8h18M16 15h18M14 22h18M12 29h18M10 36h18" />
        <path d="M18 2 7 40M25 2 14 40M32 2 21 40" />
        <path d="M30 40h12L40 8" />
        <path d="M35 14h5M33 21h7M31 28h8M29 35h9" />
      </g>
    </svg>
  );
}

function CellIcon() {
  return (
    <svg viewBox="0 0 46 46" aria-hidden className="size-[29px] text-accent">
      <g fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round">
        <path d="M7 2h32l5 5v32l-5 5H7l-5-5V7l5-5Z" />
        {Array.from({ length: 7 }, (_, index) => (
          <path key={index} d={`M${10 + index * 4} 8v30`} />
        ))}
      </g>
    </svg>
  );
}

function BottomFeature({
  icon,
  label,
}: {
  icon: ReactNode;
  label: ReactNode;
}) {
  return (
    <div className="flex h-[48px] w-[75px] flex-col items-center justify-start gap-[5px] text-center text-white">
      <span className="flex size-[14px] items-center justify-center text-accent">{icon}</span>
      <span className="text-[8px] font-bold leading-[10px]">{label}</span>
    </div>
  );
}

export function PriceListTab({
  activeSectionId,
  defaultOpen = false,
}: {
  activeSectionId?: string;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    if (!activeSectionId) return;

    const activeSection = document.getElementById(activeSectionId);
    if (!activeSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsOpen(entry.isIntersecting),
      { rootMargin: "-40% 0px -40% 0px" },
    );

    observer.observe(activeSection);
    return () => observer.disconnect();
  }, [activeSectionId]);

  return (
    <aside
      aria-label="Price List 2026"
      className={[
        "design-scale-fixed-center fixed right-0 top-1/2 z-40 hidden origin-right overflow-hidden rounded-l-2xl border border-primary-600/60 bg-[#007337] text-white shadow-lg transition-[width] duration-300 ease-out xl:block",
        isOpen ? "h-[310px] w-[473px]" : "h-[310px] w-[65px]",
      ].join(" ")}
    >
      <div
        className="absolute inset-y-0 left-0 flex w-[65px] flex-col items-center bg-[#007337] px-0 pb-[17px] pt-[21px]"
      >
        <button
          type="button"
          aria-label={isOpen ? "Close price list" : "Open price list"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="flex size-[25px] shrink-0 items-center justify-center rounded-full bg-white text-primary-950 transition hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
        >
          <ChevronLeft
            aria-hidden
            className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        <span
          className="mt-[36px] rotate-180 text-[21px] font-bold leading-none [writing-mode:vertical-rl]"
        >
          <span className="text-white">Price List </span>
          <span className="text-accent">2026</span>
        </span>

        <Grid3X3
          aria-hidden
          className="mt-auto h-[32px] w-[21px] text-accent"
          strokeWidth={1.35}
        />
      </div>

      <div
        className={[
          "absolute left-[65px] top-0 h-full w-[408px] transition-opacity duration-200",
          isOpen ? "opacity-100 delay-150" : "pointer-events-none opacity-0",
        ].join(" ")}
        aria-hidden={!isOpen}
      >
        <section className="absolute left-0 top-[21px] h-[208px] w-[408px] overflow-visible rounded-[7px] border-[3px] border-[#1398ff] bg-[#f8f9f4] text-primary-700 shadow-[0_1px_5px_rgba(0,0,0,0.2)]">
          <div className="absolute inset-0 overflow-hidden rounded-[4px]" aria-hidden>
            <Image
              src="/images/sunburst.svg"
              alt=""
              width={608}
              height={314}
              className="absolute bottom-[11px] right-[6px] h-[119px] w-[220px] object-contain object-bottom opacity-100"
            />
          </div>

          <div className="relative z-[1] pl-[28px] pt-[25px]">
            <p className="text-[9px] leading-none text-neutral-900">
              <strong>Price list</strong> GST included (INR/Wp)
            </p>
            <h2 className="mt-[5px] text-[21px] font-bold leading-[25px] tracking-[0] text-primary-700">
              ReNew Mono PERC DCR
            </h2>

            <div className="mt-[15px] flex items-center gap-[15px]">
              <ModuleIcon />
              <div>
                <p className="text-[13px] leading-[15px] text-neutral-900">Modules</p>
                <p className="mt-px text-[19px] font-bold leading-[22px] text-primary-700">
                  ₹ 24.70<span className="text-[10px]">/Wp</span>
                </p>
              </div>
            </div>

            <div className="mt-[11px] h-px w-[177px] bg-accent/25" />

            <div className="mt-[14px] flex items-center gap-[15px]">
              <CellIcon />
              <div>
                <p className="text-[13px] leading-[15px] text-neutral-900">Cells</p>
                <p className="mt-px text-[19px] font-bold leading-[22px] text-primary-700">
                  ₹ 13.10<span className="text-[10px]">/Wp</span>
                </p>
              </div>
            </div>
          </div>

          <p className="absolute bottom-[11px] left-[28px] z-[3] text-[6px] leading-none text-neutral-900">
            *Prices are subject to change without prior notice.
          </p>

          <Image
            src="/images/solar-module-pair.webp"
            alt=""
            width={103}
            height={160}
            aria-hidden
            className="absolute bottom-[-66px] right-[64px] z-[2] h-[160px] w-[103px] object-contain"
          />
        </section>

        <div className="absolute bottom-[17px] left-0 flex h-[48px] items-start">
          <BottomFeature
            icon={<Medal aria-hidden className="size-[14px]" fill="currentColor" strokeWidth={1.7} />}
            label={
              <>
                High
                <br />
                Efficiency
              </>
            }
          />
          <div className="h-[48px] w-px bg-accent" aria-hidden />
          <BottomFeature
            icon={<ShieldCheck aria-hidden className="size-[14px]" fill="currentColor" strokeWidth={1.7} />}
            label={
              <>
                Trusted
                <br />
                Quality
              </>
            }
          />
          <div className="h-[48px] w-px bg-accent" aria-hidden />
          <BottomFeature
            icon={<Leaf aria-hidden className="size-[14px]" fill="currentColor" strokeWidth={1.7} />}
            label={
              <>
                Sustainable
                <br />
                Energy
              </>
            }
          />
        </div>
      </div>
    </aside>
  );
}
