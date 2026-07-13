import Image from "next/image";

function LogoRun({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden} className="flex shrink-0 items-center gap-16 pr-16">
      <Image
        src="/images/certs-1.webp"
        alt={hidden ? "" : "Certifications: TÜV Rheinland, kiwa PV Module Reliability Scorecard, DNV-GL ISO 9001, PI Berlin, Bureau Veritas"}
        width={1384}
        height={209}
        className="h-24 w-auto max-w-none lg:h-28"
      />
      <Image
        src="/images/certs-2.webp"
        alt={hidden ? "" : "Awards: Bloomberg Tier 1, LEED Gold"}
        width={504}
        height={209}
        className="h-24 w-auto max-w-none lg:h-28"
      />
    </div>
  );
}

export function WhyRenew() {
  return (
    <section className="overflow-hidden bg-white py-section">
      <div className="mx-auto max-w-content px-4 text-center sm:px-6">
        <p className="text-2xl font-bold uppercase leading-8 text-primary-700">
          Why ReNew Solar Panels
        </p>
        <h2 className="mt-6 text-4xl font-bold text-primary-950 sm:text-[54px] sm:leading-[62px]">
          Built for India&apos;s sun. Backed for 30 years.
        </h2>
      </div>
      {/* animate-marquee-slow shifts by -50%, so the strip must be two identical
          halves; 3 runs per half keeps each half wider than any viewport so no
          blank gap trails the logos. */}
      <div className="mt-16 flex w-max animate-marquee-slow motion-reduce:animate-none">
        {Array.from({ length: 6 }, (_, i) => (
          <LogoRun key={i} hidden={i > 0} />
        ))}
      </div>
    </section>
  );
}
