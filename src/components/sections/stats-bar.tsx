import Image from "next/image";
import { CountUp } from "@/components/count-up";

const stats = [
  { value: "6.5 GW", label: "Integrated Module Capacity" },
  { value: "3 Plants", label: "Jaipur, Dholera & Vizag" },
  { value: "23,000", label: "Modules Per Day" },
  { value: "$100 M", label: "Marquee investment from BII" },
];

export function StatsBar() {
  return (
    <section className="bg-white py-14 lg:py-9">
      <dl className="mx-auto grid max-w-content grid-cols-1 gap-x-12 gap-y-10 px-4 sm:grid-cols-2 sm:px-6 lg:[grid-template-columns:repeat(4,minmax(4px,auto))]">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-start gap-4">
            <Image
              src="/images/stat-map-icon.png"
              alt=""
              width={65}
              height={112}
              className="h-24 w-auto shrink-0"
            />
            <div>
              <dd className="text-3xl font-bold leading-none text-primary-700">
                <CountUp value={stat.value} />
              </dd>
              <dt className="mt-3 text-lg leading-[26px] text-neutral-500">{stat.label}</dt>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
