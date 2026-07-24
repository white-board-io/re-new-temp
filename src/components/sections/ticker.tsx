const items = [
  "3 Plants - Jaipur, Dholera & Vizag",
  "9.3+ GW Dispatched",
  "6.4 Lakh Cells Produced Daily",
  "23,000 Modules Per Day",
  "7 times Bloomberg Tier 1",
];

function TickerRun({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden}
      className="flex shrink-0 items-center whitespace-nowrap text-xl font-medium text-white"
    >
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span aria-hidden className="mx-10 size-2.5 rounded-full bg-white" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Ticker() {
  return (
    <section aria-label="Manufacturing highlights" className="overflow-hidden bg-accent py-4">
      {/* animate-marquee shifts by -50%, so the strip must be two identical
          halves; 3 runs per half keeps each half wider than any viewport so no
          blank gap trails the items. */}
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {Array.from({ length: 6 }, (_, i) => (
          <TickerRun key={i} hidden={i > 0} />
        ))}
      </div>
    </section>
  );
}
