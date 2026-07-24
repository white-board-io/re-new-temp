import Image from "next/image";
import { CountUp } from "@/components/count-up";

const stats = [
  {
    value: "6.5 GW",
    label: "Integrated Module Capacity",
    icon: "/images/stat-capacity.png",
    iconWidth: 80.57,
    iconHeight: 89.14,
    iconOffset: "xl:mt-[0.43px]",
    gap: "xl:gap-[47.43px]",
    labelWidth: "xl:w-[156px]",
    labelMargin: "xl:mt-[17px]",
    itemOffset: "",
  },
  {
    value: "3 Plants",
    label: "Jaipur, Dholera & Vizag",
    icon: "/images/stat-plants.png",
    iconWidth: 90,
    iconHeight: 87,
    iconOffset: "xl:mt-[3px]",
    gap: "xl:gap-[35px]",
    labelWidth: "xl:w-[134px]",
    labelMargin: "xl:mt-[15px]",
    itemOffset: "",
  },
  {
    value: "23,000",
    label: "Modules Per Day",
    icon: "/images/stat-modules.png",
    iconWidth: 86.81,
    iconHeight: 85.81,
    iconOffset: "xl:mt-[2px]",
    gap: "xl:gap-[36.19px]",
    labelWidth: "xl:w-[88px]",
    labelMargin: "xl:mt-[9px]",
    itemOffset: "xl:mt-1",
  },
  {
    value: "$100 M",
    label: "Marquee Investment from BII",
    icon: "/images/stat-investment.png",
    iconWidth: 81.15,
    iconHeight: 80.8,
    iconOffset: "xl:mt-[6.13px]",
    gap: "xl:gap-[34.07px]",
    labelWidth: "xl:w-[158px]",
    labelMargin: "xl:mt-[9px]",
    itemOffset: "xl:mt-1",
  },
];

export function StatsBar() {
  return (
    <section className="bg-white py-16 lg:py-12 xl:flex xl:min-h-[200px] xl:items-center xl:py-0">
      <dl className="mx-auto grid max-w-[1508px] grid-cols-1 gap-x-12 gap-y-10 px-4 sm:grid-cols-2 sm:px-6 lg:[grid-template-columns:repeat(4,minmax(4px,auto))] xl:w-[1508px] xl:grid-cols-[398px_417px_377px_316px] xl:gap-x-0 xl:px-0">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex items-start gap-4 ${stat.gap} ${stat.itemOffset}`}
          >
            <Image
              src={stat.icon}
              alt=""
              width={Math.round(stat.iconWidth * 4)}
              height={Math.round(stat.iconHeight * 4)}
              className={`shrink-0 ${stat.iconOffset}`}
              style={{
                width: `${stat.iconWidth}px`,
                height: `${stat.iconHeight}px`,
              }}
            />
            <div>
              <dd className="text-[30px] font-bold leading-[30px] text-primary-700">
                <CountUp value={stat.value} />
              </dd>
              <dt
                className={`mt-3 text-[18px] font-medium leading-[26px] text-neutral-500 ${stat.labelMargin} ${stat.labelWidth}`}
              >
                {stat.label}
              </dt>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
