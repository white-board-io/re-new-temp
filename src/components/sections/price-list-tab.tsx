"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

function BottomFeature({
  iconSrc,
  label,
}: {
  iconSrc: string;
  label: ReactNode;
}) {
  return (
    <div className="flex h-[48px] w-[75px] flex-col items-center pt-[3px] text-center text-white">
      <Image
        src={iconSrc}
        alt=""
        width={582}
        height={582}
        aria-hidden
        className="size-[15px] object-contain"
      />
      <span className="mt-[3px] flex h-[27px] items-center justify-center text-[8px] font-semibold leading-[10px] tracking-[0.03em]">
        {label}
      </span>
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
        "price-list-tab design-scale-fixed-center fixed right-0 top-1/2 z-40 block origin-right overflow-hidden rounded-l-[6px] bg-[#006934] text-white shadow-[inset_0_0_0_1px_#11663a,0_4px_4px_rgba(0,0,0,0.25)] transition-[width] duration-300 ease-out",
        isOpen ? "h-[310px] w-[473px]" : "h-[310px] w-[65px]",
      ].join(" ")}
    >
      <div className="absolute inset-y-0 left-0 flex w-[65px] flex-col items-center bg-[#006934] px-0 pb-[24px] pt-[21px]">
        <button
          type="button"
          aria-label={isOpen ? "Close price list" : "Open price list"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="flex size-[25px] shrink-0 items-center justify-center rounded-full bg-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8dc63f]"
        >
          <Image
            src="/images/price-list-arrow-icon-clean.png"
            alt=""
            width={582}
            height={582}
            aria-hidden
            className={[
              "size-[25px] object-contain transition-transform duration-300 ease-out",
              isOpen ? "rotate-180" : "",
            ].join(" ")}
          />
        </button>

        <span className="mt-[34px] rotate-180 text-[22px] font-bold leading-[32px] [writing-mode:vertical-rl]">
          <span className="text-white">Price List </span>
          <span className="text-[#8dc63f]">2026</span>
        </span>

        <Image
          src="/images/price-list-grid-icon-clean.png"
          alt=""
          width={382}
          height={582}
          aria-hidden
          className="mt-auto h-[32px] w-[21px] object-contain"
        />
      </div>

      <div
        className={[
          "absolute left-[65px] top-0 h-full w-[408px] transition-opacity duration-200",
          isOpen ? "opacity-100 delay-150" : "pointer-events-none opacity-0",
        ].join(" ")}
        aria-hidden={!isOpen}
      >
        <section className="absolute left-0 top-[21px] h-[208px] w-[408px] overflow-visible rounded-l-[6px] bg-white text-[#006934]">
          <div className="absolute inset-0 overflow-hidden rounded-l-[6px]" aria-hidden>
            <Image
              src="/images/sunburst.svg"
              alt=""
              width={608}
              height={314}
              className="absolute bottom-[11px] right-[6px] h-[119px] w-[220px] rotate-180 object-contain object-bottom"
            />
          </div>

          <p className="absolute left-[29px] top-[23px] z-[1] h-[18px] w-[174px] text-[9px] font-medium leading-[18px] tracking-[0.03em] text-[#132a00]">
            <strong className="font-bold">Price list</strong> GST included (INR/Wp)
          </p>

          <h2 className="absolute left-[29px] top-[41px] z-[1] h-[18px] w-[250px] text-[20px] font-bold leading-[18px] tracking-[0.03em] text-[#006934]">
            ReNew Mono PERC DCR
          </h2>

          <Image
            src="/images/price-list-module-icon-clean.png"
            alt=""
            width={566}
            height={582}
            aria-hidden
            className="absolute left-[30px] top-[80px] z-[1] h-[29.24px] w-[28.31px] object-contain"
          />
          <p className="absolute left-[74px] top-[76px] z-[1] h-[18px] w-[52px] text-[12px] font-medium leading-[18px] tracking-[0.03em] text-[#132a00]">
            Modules
          </p>
          <p className="absolute left-[74px] top-[94px] z-[1] h-[18px] w-[99px] text-[18px] font-bold leading-[18px] tracking-[0.03em] text-[#006934]">
            ₹ 24.70<span className="text-[10px]">/Wp</span>
          </p>

          <div
            className="absolute left-[28px] top-[124px] z-[1] h-px w-[180px] bg-[linear-gradient(90deg,#8dc63f_0%,rgba(141,198,63,0)_100%)]"
            aria-hidden
          />

          <Image
            src="/images/price-list-cell-icon-clean.png"
            alt=""
            width={582}
            height={582}
            aria-hidden
            className="absolute left-[30px] top-[141px] z-[1] size-[28px] object-contain"
          />
          <p className="absolute left-[74px] top-[136px] z-[1] h-[18px] w-[52px] text-[12px] font-medium leading-[18px] tracking-[0.03em] text-[#132a00]">
            Cells
          </p>
          <p className="absolute left-[74px] top-[154px] z-[1] h-[18px] w-[99px] text-[18px] font-bold leading-[18px] tracking-[0.03em] text-[#006934]">
            ₹ 13.10<span className="text-[10px]">/Wp</span>
          </p>

          <p className="absolute left-[29px] top-[188px] z-[3] flex h-[9px] w-[142px] items-center text-[6px] font-normal leading-[18px] tracking-[0.03em] text-[#132a00]">
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
            iconSrc="/images/price-list-efficiency-icon-clean.png"
            label={
              <>
                High
                <br />
                Efficiency
              </>
            }
          />
          <div className="h-[48px] w-px bg-[#8dc63f]" aria-hidden />
          <BottomFeature
            iconSrc="/images/price-list-quality-icon-clean.png"
            label={
              <>
                Trusted
                <br />
                Quality
              </>
            }
          />
          <div className="h-[48px] w-px bg-[#8dc63f]" aria-hidden />
          <BottomFeature
            iconSrc="/images/price-list-energy-icon-clean.png"
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
