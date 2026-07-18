const downloadGroups = [
  {
    id: "product-datasheets",
    title: "Product Datasheets",
    items: [
      "G12R TOPCon Bifacial Module",
      "TOPCon Bifacial Module M10 144",
      "Mono PERC Bifacial Module M10 144",
    ],
  },
  {
    id: "installation-warranty",
    title: "Installation and Warranty",
    items: [
      "Installation Manual",
      "Warranty Document",
      "Government Schemes and Subsidies Guide",
    ],
  },
  {
    id: "certificates",
    title: "Certificates",
    items: [
      "Ammonia Resistance Certificate",
      "Salt Mist Resistance Certificate",
      "Dust and Sand Test Certificate",
      "IEC Certificate (Monofacial and Bifacial)",
      "UL 61730 Certificate",
      "BIS Certificate - Jaipur",
      "BIS Certificate - Dholera",
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
      className="size-6"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v9m-4-4 4 4 4-4" />
    </svg>
  );
}

export function Downloads() {
  return (
    <section aria-label="Downloadable resources" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="space-y-20 lg:space-y-24">
          {downloadGroups.map((group) => (
            <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`}>
              <h2
                id={`${group.id}-title`}
                className="text-lg font-normal uppercase tracking-[0.02em] text-primary-700 sm:text-xl"
              >
                {group.title}
              </h2>
              <ul className="mt-9 border-t border-neutral-200 sm:mt-12">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="group flex min-h-28 flex-col justify-center gap-5 border-b border-neutral-200 px-4 py-6 transition-colors hover:bg-surface-tint sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-9"
                  >
                    <p className="text-xl font-light leading-tight text-neutral-500 transition-colors group-hover:text-primary-700 sm:text-2xl lg:text-[30px]">
                      {item}
                    </p>
                    <button
                      type="button"
                      disabled
                      title={`${item} will be available soon`}
                      className="inline-flex w-full shrink-0 cursor-not-allowed items-center justify-center gap-4 rounded-full bg-neutral-400 px-8 py-2.5 text-lg font-bold text-white transition-colors group-hover:bg-primary-700 sm:w-[245px]"
                    >
                      Download
                      <DownloadIcon />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
