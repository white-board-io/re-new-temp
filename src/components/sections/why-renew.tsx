import Image from "next/image";

const certifications = [
  {
    src: "/images/cert-tuv-line.webp",
    alt: "TÜV Rheinland regular production surveillance certification",
  },
  { src: "/images/cert-tuv-round.webp", alt: "TÜV Rheinland certification" },
  { src: "/images/cert-kiwa.webp", alt: "Kiwa PV Module Reliability Scorecard" },
  { src: "/images/cert-dnv.webp", alt: "DNV-GL ISO 9001 certification" },
  { src: "/images/cert-pi.webp", alt: "PI Berlin certification" },
  { src: "/images/cert-bureau.webp", alt: "Bureau Veritas certification" },
  { src: "/images/cert-bloomberg.webp", alt: "Bloomberg New Energy Finance Tier 1" },
  { src: "/images/cert-leed.webp", alt: "LEED Gold certification" },
  { src: "/images/cert-bis-jaipur.webp", alt: "BIS certification for Jaipur" },
  { src: "/images/cert-bis-dholera.webp", alt: "BIS certification for Dholera" },
  { src: "/images/cert-ammonia.webp", alt: "Ammonia resistance certification" },
  { src: "/images/cert-salt-mist.webp", alt: "Salt mist resistance certification" },
  { src: "/images/cert-almm.webp", alt: "ALMM approved" },
  { src: "/images/cert-pvel.webp", alt: "Kiwa PVEL certification" },
];

function LogoRun({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden} className="flex shrink-0 items-center gap-14 pr-14 lg:gap-20 lg:pr-20">
      {certifications.map((certification) => (
        <div
          key={certification.src}
          className="flex h-28 w-40 shrink-0 items-center justify-center lg:h-32 lg:w-44"
        >
          <Image
            src={certification.src}
            alt={hidden ? "" : certification.alt}
            width={220}
            height={150}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export function WhyRenew() {
  return (
    <section id="why-renew" className="overflow-hidden bg-white py-section">
      <div className="mx-auto max-w-content px-4 text-center sm:px-6">
        <p className="text-2xl font-bold uppercase leading-8 text-primary-700">
          Why ReNew Solar Panels
        </p>
        <h2 className="mt-8 text-4xl font-bold text-primary-950 sm:text-[54px] sm:leading-[62px]">
          Built for India&apos;s sun. Backed for 30 years.
        </h2>
      </div>
      <div className="mt-16 flex w-max animate-marquee-slow motion-reduce:animate-none">
        <LogoRun />
        <LogoRun hidden />
      </div>
    </section>
  );
}
