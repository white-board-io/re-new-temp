"use client";

import { useMemo, useState } from "react";
import { IndianRupee, Leaf, Zap } from "lucide-react";
import { calculateSolar, isUsageOutOfRange, MAX_MONTHLY_UNITS } from "@/lib/solar";
import { CustomDropdown } from "@/components/custom-dropdown";
import { Reveal } from "@/components/reveal";

const STATE_TARIFFS: Record<string, number> = {
  "Andaman and Nicobar Islands": 6.5,
  "Andhra Pradesh": 7.5,
  "Arunachal Pradesh": 5.8,
  Assam: 7,
  Bihar: 7.4,
  Chandigarh: 6.6,
  Chhattisgarh: 6.8,
  "Dadra and Nagar Haveli and Daman and Diu": 5.9,
  Delhi: 8,
  Goa: 6.7,
  Gujarat: 7.2,
  Haryana: 7.6,
  "Himachal Pradesh": 5.8,
  "Jammu and Kashmir": 5.5,
  Jharkhand: 6.6,
  Karnataka: 8.2,
  Kerala: 7.1,
  Ladakh: 5.2,
  Lakshadweep: 7,
  "Madhya Pradesh": 7.3,
  Maharashtra: 11.0,
  Manipur: 6.2,
  Meghalaya: 6.4,
  Mizoram: 6,
  Nagaland: 6.1,
  Odisha: 6.8,
  Puducherry: 6,
  Punjab: 7.1,
  Rajasthan: 7.5,
  Sikkim: 5.7,
  "Tamil Nadu": 7,
  Telangana: 8,
  Tripura: 6.5,
  "Uttar Pradesh": 7.4,
  Uttarakhand: 6.2,
  "West Bengal": 7.3,
};
const STATES = Object.keys(STATE_TARIFFS);
const DEFAULT_STATE = "Maharashtra";

const FALLBACK_TARIFF = 8;

// The tariff for a state, as the string the cost input is bound to. Every unit
// cost in this component comes from here — there is deliberately no flat
// fallback constant in the render path, because one previously shadowed the
// whole table and every state silently calculated at the same rate.
//
// hasOwn, not a bare index: a plain-object lookup inherits from
// Object.prototype, so keys like "constructor" or "toString" return a function
// rather than undefined, `?? FALLBACK` never fires, and .toFixed throws. Same
// reasoning as the Set-based allow-lists guarding the URL fragment elsewhere.
const tariffFor = (state: string) =>
  (Object.hasOwn(STATE_TARIFFS, state) ? STATE_TARIFFS[state] : FALLBACK_TARIFF).toFixed(2);

type Category = "residential" | "commercial" | "industrial";

const CATEGORIES: Category[] = ["residential", "commercial", "industrial"];

const inr = (n: number) =>
  n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

const twoDecimals = (n: number) =>
  n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

function labelForCategory(category: Category) {
  return category[0].toUpperCase() + category.slice(1);
}

export function SavingsCalculator() {
  const [usage, setUsage] = useState("500");
  const [state, setState] = useState(DEFAULT_STATE);
  const [category, setCategory] = useState<Category>("residential");
  const [unitCost, setUnitCost] = useState(tariffFor(DEFAULT_STATE));
  const [isManualCost, setIsManualCost] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [locationStatus, setLocationStatus] = useState("Choose your state manually");

  const changeState = (next: string) => {
    setState(next);
    setLocationStatus("Selected manually");
    // Auto mode tracks the selected state's tariff. A manual override is the
    // user's own figure, so leave it alone until they switch back to Auto.
    if (!isManualCost) {
      setUnitCost(tariffFor(next));
    }
  };

  const changeCategory = (next: Category) => {
    setCategory(next);
  };

  const toggleUnitCostMode = () => {
    // Leaving manual mode restores the selected state's tariff, not a flat default.
    if (isManualCost) setUnitCost(tariffFor(state));
    setIsManualCost(!isManualCost);
  };

  const result = useMemo(() => calculateSolar(usage, unitCost), [usage, unitCost]);
  const numericUsage = Number(usage) || 0;

  return (
    <section id="savings-calculator" className="bg-white py-section lg:py-[calc(var(--spacing-section)*2)]">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <Reveal
          stagger
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-2xl font-bold uppercase leading-8 text-primary-700">
              Solar Calculator
            </p>
            <h2 className="mt-6 max-w-xl text-[28px] font-bold leading-[1.14] text-primary-950 sm:text-[34px] md:text-[54px] md:leading-[62px]">
              How much could you <span className="text-primary-700">save</span> this year?
            </h2>
          </div>
          <p className="max-w-sm text-[23px] leading-7 text-neutral-900 lg:text-right">
            Enter your monthly electricity bill and see your estimated annual savings with
            ReNew Solar Panels
          </p>
        </Reveal>

        <Reveal stagger delay={150} className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.34fr]">
          <form
            className="min-w-0 rounded-md border border-neutral-200 bg-white p-5 min-[360px]:p-8 lg:flex lg:flex-col lg:justify-between"
            onSubmit={(e) => {
              e.preventDefault();
              setHasSubmitted(true);
            }}
          >
            <h3 className="text-2xl font-bold text-primary-950">Your details</h3>
            <p className="mt-1 text-neutral-500">
              Tweak these to match your home or business.
            </p>

            <div className="mt-8 flex flex-col gap-1 min-[360px]:flex-row min-[360px]:items-baseline min-[360px]:justify-between">
              <label htmlFor="calc-units" className="font-bold text-primary-950">
                Electricity used per month
              </label>
              <span className="text-sm text-neutral-500">kWh (units)</span>
            </div>
            <div className="mt-3 flex items-center gap-6">
              <input
                id="calc-units"
                type="number"
                min={1}
                max={5000}
                value={usage}
                onChange={(e) => setUsage(e.target.value)}
                className="w-28 rounded-md border border-neutral-300 px-4 py-3 text-primary-950 focus:border-primary-700 focus:outline-none"
              />
              <input
                type="range"
                aria-label="Electricity used per month"
                min={100}
                max={3000}
                step={10}
                value={Math.max(100, Math.min(3000, numericUsage || 100))}
                onChange={(e) => setUsage(e.target.value)}
                className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-neutral-200 accent-primary-700"
              />
            </div>
            {/* A clamped figure must never be presented as if it were the
                number the user entered. */}
            {isUsageOutOfRange(usage) && (
              <p role="status" className="mt-2 text-sm text-amber-700">
                Capped at {MAX_MONTHLY_UNITS.toLocaleString("en-IN")} units for this
                estimate. For larger loads, talk to our team about a custom design.
              </p>
            )}

            <label htmlFor="calc-state" className="mt-8 block text-neutral-500">
              State / Union Territory
            </label>
            <CustomDropdown
              id="calc-state"
              name="state"
              value={state}
              onChange={changeState}
              options={STATES}
              className="mt-2"
              buttonClassName="relative w-full rounded-md border border-neutral-300 bg-white px-4 py-3 pr-12 text-left text-primary-950 transition focus:border-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-700/10"
              iconClassName="text-neutral-500"
            />
            <p className="mt-2 text-sm text-neutral-500" aria-live="polite">
              + {locationStatus}
            </p>

            <p className="mt-8 font-bold text-primary-950">Customer category</p>
            <div
              role="radiogroup"
              aria-label="Customer category"
              className="mt-3 flex rounded-md bg-surface-warm p-1.5"
            >
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={category === c}
                  onClick={() => changeCategory(c)}
                  className={`min-w-0 flex-1 rounded-md px-1 py-2.5 text-[11px] font-bold transition min-[360px]:px-2 min-[360px]:text-sm ${
                    category === c
                      ? "bg-primary-700 text-white"
                      : "text-neutral-600 hover:text-primary-950"
                  }`}
                >
                  {labelForCategory(c)}
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-neutral-100 pt-6">
              <label htmlFor="calc-cost" className="font-bold text-primary-950">
                Electricity unit cost
              </label>
              <button
                type="button"
                role="switch"
                aria-checked={isManualCost}
                aria-label={`Electricity unit cost mode: ${isManualCost ? "Manual" : "Auto"}`}
                onClick={toggleUnitCostMode}
                className="flex shrink-0 items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
              >
                <span className="text-xs font-bold text-neutral-600">
                  {isManualCost ? "Manual" : "Auto"}
                </span>
                <span
                  aria-hidden
                  className={`relative h-7 w-12 rounded-full transition-colors ${
                    isManualCost ? "bg-primary-700" : "bg-neutral-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 size-5 rounded-full bg-white shadow-sm transition-all ${
                      isManualCost ? "left-6" : "left-1"
                    }`}
                  />
                </span>
              </button>
            </div>
            <div
              className={`mt-3 flex items-center rounded-md border px-4 py-3 ${
                isManualCost
                  ? "border-neutral-300 focus-within:border-primary-700"
                  : "border-neutral-200 bg-neutral-100"
              }`}
            >
              <span className="text-neutral-500">₹</span>
              <input
                id="calc-cost"
                type="number"
                step="0.01"
                min={0}
                max={100}
                value={unitCost}
                onChange={(e) => setUnitCost(e.target.value)}
                disabled={!isManualCost}
                className="w-full bg-transparent px-2 text-primary-950 focus:outline-none disabled:cursor-not-allowed disabled:text-neutral-500"
              />
              <span className="shrink-0 text-neutral-500">/ kWh</span>
            </div>
            <p className="mt-2 text-sm text-neutral-500">
              {isManualCost
                ? "Enter the unit cost shown on your electricity bill."
                : `Auto value is the average tariff for ${state} (₹${tariffFor(state)}). Switch to Manual to edit.`}
            </p>
            <button
              type="submit"
              className="mt-8 inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-primary-700 px-4 py-3 text-base font-bold text-white transition hover:bg-primary-800 lg:hidden"
            >
              Calculate savings
            </button>
          </form>

          <div className="min-w-0">
            <div
              className={`grid min-w-0 transition-[grid-template-rows,opacity] duration-500 ease-out lg:grid-rows-[1fr] lg:opacity-100 ${
                hasSubmitted ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="flex min-w-0 flex-col gap-4">
                  <div className="rounded-md bg-primary-700 p-5 text-white">
                    <p className="text-sm font-bold uppercase tracking-widest">
                      Recommended plant size
                    </p>
                    <p className="mt-2 text-5xl font-bold">
                      {twoDecimals(result.plantSize)} kW
                    </p>
                    <p className="mt-2 flex items-center gap-3 border-t border-white/20 pt-2">
                      <Zap aria-hidden className="size-5 fill-primary-400 text-primary-400" />
                      <span>
                        Generates about{" "}
                        <strong>
                          {twoDecimals(result.dailyGeneration)} units
                        </strong>{" "}
                        every day
                      </span>
                    </p>
                  </div>

                  <div className="min-w-0 rounded-md border border-neutral-200 p-5 min-[360px]:p-6">
                    <h3 className="flex min-w-0 items-center gap-3 text-xl font-bold text-primary-950 min-[360px]:text-2xl">
                      <Zap aria-hidden className="size-6 shrink-0 text-primary-700" />
                      Electricity generation
                    </h3>
                    <dl className="mt-3 divide-y divide-neutral-100">
                      {(
                        [
                          ["Monthly", result.monthlyGeneration],
                          ["Annually", result.annualGeneration],
                          ["Lifetime (30 yr)", result.lifetimeGeneration],
                        ] as const
                      ).map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between gap-3 py-3">
                          <dt className="text-neutral-600">{label}</dt>
                          <dd className="shrink-0 text-lg font-bold text-primary-950 min-[360px]:text-xl">
                            {inr(value)} kWh
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="min-w-0 rounded-md border border-neutral-200 p-5 min-[360px]:p-6">
                    <h3 className="flex min-w-0 items-center gap-3 text-xl font-bold text-primary-950 min-[360px]:text-2xl">
                      <IndianRupee aria-hidden className="size-6 shrink-0 text-primary-700" />
                      Bill savings
                    </h3>
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      {(
                        [
                          ["Monthly", result.monthlySavings, false],
                          ["Annually", result.annualSavings, false],
                          ["Lifetime", result.lifetimeSavings, true],
                        ] as const
                      ).map(([label, value, highlight]) => (
                        <div
                          key={label}
                          className={`rounded-md p-4 ${
                            highlight ? "bg-primary-700 text-white" : "bg-surface-warm"
                          }`}
                        >
                          <p
                            className={`text-xs font-bold uppercase tracking-widest ${
                              highlight ? "text-white/80" : "text-neutral-500"
                            }`}
                          >
                            {label}
                          </p>
                          <p
                            className={`mt-2 text-2xl font-bold ${
                              highlight ? "" : "text-primary-950"
                            }`}
                          >
                            ₹ {inr(value)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-neutral-500">
                      Estimated savings at ₹{Number(unitCost || 0).toFixed(2)}/kWh.
                    </p>
                  </div>

                  <div className="min-w-0 rounded-md bg-surface-mint p-5 min-[360px]:p-6">
                    <h3 className="flex min-w-0 items-center gap-3 text-xl font-bold text-primary-950 min-[360px]:text-2xl">
                      <Leaf aria-hidden className="size-6 shrink-0 text-primary-700" />
                      Environmental impact
                    </h3>
                    <div className="mt-4 grid gap-8 sm:grid-cols-2 sm:divide-x sm:divide-primary-950/10">
                      <div>
                        <p className="text-4xl font-bold text-primary-950">
                          {twoDecimals(result.carbonReduced)}
                        </p>
                        <p className="mt-2 text-neutral-600">
                          tonnes of CO₂e avoided over 30 years
                        </p>
                      </div>
                      <div className="sm:pl-8">
                        <p className="text-4xl font-bold text-primary-950">
                          {twoDecimals(result.treeEquivalent)}
                        </p>
                        <p className="mt-2 text-neutral-600">trees planted, every year</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-sm leading-6 text-neutral-500">
          <strong className="font-bold text-neutral-700">Disclaimer:</strong>{" "}
          Calculations use an average residential tariff for the selected state.
          Actual rates vary by discom, slab and customer category; results are
          indicative only.
        </p>
      </div>
    </section>
  );
}
