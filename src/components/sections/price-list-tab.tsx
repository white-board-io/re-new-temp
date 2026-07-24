import { ChevronLeft, Grid3X3 } from "lucide-react";

// TODO(batch-1-followup): price-list PDF from the user
export function PriceListTab() {
  return (
    <a
      href="#"
      className="design-scale-fixed-center fixed right-0 top-1/2 z-40 hidden flex-col items-center gap-7 rounded-l-2xl border border-primary-600/60 bg-primary-700 px-4 pb-8 pt-4 text-white shadow-lg lg:flex"
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-white text-primary-950">
        <ChevronLeft aria-hidden className="size-4" />
      </span>
      <span className="text-[22px] font-bold [writing-mode:vertical-rl] rotate-180">
        Price List 2026
      </span>
      <Grid3X3 aria-hidden className="size-6 text-primary-400" />
    </a>
  );
}
