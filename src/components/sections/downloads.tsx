import { Reveal } from "@/components/reveal";

const downloadGroups = [
  {
    id: "product-datasheets",
    title: "Product Datasheets",
    items: [
      {
        label: "G12R TOPCon",
        href: "/downloads/product-datasheets/g12r-topcon-bifacial-module.pdf",
      },
      {
        label: "M10R TOPCon (580-610 Wp)",
        href: "/downloads/product-datasheets/m10r-topcon.pdf",
      },
      {
        label: "M10R PERC (530-560 Wp)",
        href: "/downloads/product-datasheets/m10r-perc.pdf",
      },
      // {
      //   label: "M10R PERC (550 W, 144-cell)",
      //   href: "/downloads/product-datasheets/m10r-perc-550w-144-cell.pdf",
      // },
      // {
      //   label: "M10R PERC (590-615 Wp, 156-cell)",
      //   href: "/downloads/product-datasheets/m10r-perc-590-615wp-156-cell.pdf",
      // },
      {
        label: "M10R PERC Cell P-Type",
        href: "/downloads/product-datasheets/m10r-p-type-perc-bifacial.pdf",
      },
    ],
  },
  {
    id: "installation-warranty",
    title: "Installation and Warranty",
    items: [
      {
        label: "Installation Manual",
        href: "/downloads/installation-warranty/installation-manual.pdf",
      },
      {
        label: "Warranty Document",
        href: "/downloads/installation-warranty/warranty-document.pdf",
      },
      {
        label: "Government Schemes and Subsidies Guide",
        href: "/downloads/installation-warranty/government-schemes-and-subsidies-guide.pdf",
      },
    ],
  },
  {
    id: "certificates",
    title: "Certificates",
    items: [
      {
        label: "Ammonia Resistance Certificate",
        href: "/downloads/certificates/ammonia-resistance-certificate.pdf",
      },
      {
        label: "Salt Mist Resistance Certificate",
        href: "/downloads/certificates/salt-mist-resistance-certificate.pdf",
      },
      {
        label: "Dust and Sand Test Certificate",
        href: "/downloads/certificates/dust-and-sand-test-certificate.pdf",
      },
      {
        label: "IEC Certificate (Monofacial and Bifacial)",
        href: "/downloads/certificates/iec-certificate-monofacial-and-bifacial.pdf",
      },
      {
        label: "UL 61730 Certificate",
        href: "/downloads/certificates/ul-61730-certificate.pdf",
      },
      {
        label: "BIS Certificate - Jaipur",
        href: "/downloads/certificates/bis-certificate-jaipur.pdf",
      },
      {
        label: "BIS Certificate - Dholera",
        href: "/downloads/certificates/bis-certificate-dholera.pdf",
      },
      {
        label: "Certificate of Accreditation",
        href: "/downloads/certificates/certificate-of-accreditation.pdf",
      },
    ],
  },
];

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-5 sm:size-6"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v9m-4-4 4 4 4-4" />
    </svg>
  );
}

export function Downloads() {
  return (
    <section
      aria-label="Downloadable resources"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="space-y-20 lg:space-y-24">
          {downloadGroups.map((group) => (
            <section
              key={group.id}
              id={group.id}
              className="download-anchor"
              aria-labelledby={`${group.id}-title`}
            >
              <Reveal>
                <h2
                  id={`${group.id}-title`}
                  className="text-lg font-semibold uppercase tracking-[0.02em] text-primary-700 sm:text-xl lg:text-[24px]"
                >
                  {group.title}
                </h2>
              </Reveal>
              <Reveal
                as="ul"
                stagger
                delay={100}
                className="mt-9 border-t border-neutral-200 sm:mt-12"
              >
                {group.items.map((item) => (
                  <li
                    key={item.label}
                    className="group flex min-h-28 flex-col justify-center gap-5 border-b border-neutral-200 px-4 py-6 transition-colors hover:bg-surface-tint sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-9"
                  >
                    <p className="text-lg font-normal leading-tight text-primary-700 transition-colors group-hover:text-primary-800 sm:text-2xl lg:text-[30px]">
                      {item.label}
                    </p>
                    <a
                      href={item.href}
                      download
                      className="inline-flex min-h-8 w-fit shrink-0 items-center justify-center gap-3 self-center rounded-full bg-primary-700 px-8 py-0 text-base font-bold text-white transition-colors group-hover:bg-primary-900 sm:w-[245px] sm:gap-4 sm:self-auto sm:text-lg md:bg-primary-800 md:py-2.5 md:group-hover:bg-primary-900"
                    >
                      Download
                      <DownloadIcon />
                    </a>
                  </li>
                ))}
              </Reveal>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
