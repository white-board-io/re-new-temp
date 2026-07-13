import { ChevronLeft } from "lucide-react";

// TODO(batch-1-followup): price-list PDF from the user
export function PriceListTab() {
  return (
    <a
      href="#"
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 rounded-l-2xl border border-primary-600/60 bg-primary-700 px-3 pb-6 pt-4 text-white shadow-lg lg:flex"
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-white/15">
        <ChevronLeft aria-hidden className="size-4" />
      </span>
      <span className="text-[22px] font-bold [writing-mode:vertical-rl] rotate-180">
        Price List 2026
      </span>
    </a>
  );
}
