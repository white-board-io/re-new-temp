import Image from "next/image";
import type { CSSProperties } from "react";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";

const stats = [
  {
    value: "6.5 GW",
    label: "Integrated Module Capacity",
    icon: "/images/stat-capacity.png",
    iconWidth: 80.57,
    iconHeight: 89.14,
    gap: "xl:gap-[47.43px]",
    labelWidth: "xl:w-[156px]",
    labelMargin: "xl:mt-2",
    itemOffset: "",
  },
  {
    value: "3 Plants",
    label: "Jaipur, Dholera & Vizag",
    icon: "/images/stat-plants.svg",
    iconWidth: 90,
    iconHeight: 87,
    gap: "xl:gap-[35px]",
    labelWidth: "xl:w-[134px]",
    labelMargin: "xl:mt-2",
    itemOffset: "",
  },
  {
    value: "23,000",
    label: "Modules Per Day",
    icon: "/images/stat-modules.png",
    iconWidth: 86.81,
    iconHeight: 85.81,
    gap: "xl:gap-[36.19px]",
    labelWidth: "xl:w-[88px]",
    labelMargin: "xl:mt-2",
    itemOffset: "xl:mt-1",
  },
  {
    value: "$100 M",
    label: "Marquee Investment from BII",
    icon: "/images/stat-investment.png",
    iconWidth: 81.15,
    iconHeight: 80.8,
    gap: "xl:gap-[34.07px]",
    labelWidth: "xl:w-[158px]",
    labelMargin: "xl:mt-2",
    itemOffset: "xl:mt-1",
  },
];

export function StatsBar() {
  return (
    <section className="bg-white py-16 md:py-12 lg:py-6 xl:flex xl:min-h-[200px] xl:items-center xl:py-0">
      {/* Stats sit in the first fold, so this run plays on load rather than on
          scroll — it hands off to each figure's own CountUp. */}
      <Reveal
        as="dl"
        stagger
        className="mx-auto grid max-w-[1508px] grid-cols-1 gap-x-12 gap-y-10 px-4 sm:grid-cols-2 sm:px-6 lg:gap-x-6 lg:[grid-template-columns:repeat(4,minmax(4px,auto))] xl:w-[1508px] xl:grid-cols-[398px_417px_377px_316px] xl:gap-x-0 xl:px-0"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`grid grid-cols-[auto_1fr] items-stretch gap-4 ${stat.gap} ${stat.itemOffset}`}
          >
            <div
              className="relative shrink-0 self-stretch"
              style={{
                aspectRatio: `${stat.iconWidth} / ${stat.iconHeight}`,
              } as CSSProperties}
            >
              <Image
                src={stat.icon}
                alt=""
                fill
                sizes="(min-width: 768px) 100px, 72px"
                className="object-contain"
              />
            </div>
            <div>
              <dd className="text-[30px] font-bold leading-[30px] text-primary-700">
                <CountUp value={stat.value} />
              </dd>
              <dt
                className={`mt-2 text-[18px] font-medium leading-[26px] text-neutral-500 lg:text-[16px] lg:leading-[22px] xl:text-[18px] xl:leading-[26px] ${stat.labelMargin} ${stat.labelWidth}`}
              >
                {stat.label}
              </dt>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
