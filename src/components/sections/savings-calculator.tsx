"use client";

import { useMemo, useState } from "react";
import { IndianRupee, Leaf, Zap } from "lucide-react";
import { calculateSolar } from "@/lib/solar";

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
  const [state, setState] = useState("Maharashtra");
  const [category, setCategory] = useState<Category>("residential");
  const [subsidy, setSubsidy] = useState(true);
  const [unitCost, setUnitCost] = useState("11.00");
  const [locationStatus, setLocationStatus] = useState("Choose your state manually");

  const changeState = (next: string) => {
    setState(next);
    setUnitCost(STATE_TARIFFS[next].toFixed(2));
    setLocationStatus("Selected manually");
  };

  const changeCategory = (next: Category) => {
    setCategory(next);
    if (next !== "residential") setSubsidy(false);
  };

  const result = useMemo(() => calculateSolar(usage, unitCost), [usage, unitCost]);
  const numericUsage = Number(usage) || 0;

  return (
    <section id="savings-calculator" className="bg-white py-section">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-2xl font-bold uppercase leading-8 text-primary-700">
              Savings Calculator
            </p>
            <h2 className="mt-6 max-w-xl text-4xl font-bold text-primary-950 sm:text-[54px] sm:leading-[62px]">
              How much could you <span className="text-primary-700">save</span> this year?
            </h2>
          </div>
          <p className="max-w-sm text-xl leading-7 text-neutral-900 lg:text-right">
            Enter your monthly electricity bill and see your estimated annual savings with
            ReNew Solar Panels
          </p>
        </div>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1fr_1.15fr]">
          <form
            className="rounded-2xl border border-neutral-200 bg-white p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="text-2xl font-bold text-primary-950">Your details</h3>
            <p className="mt-1 text-neutral-500">
              Tweak these to match your home or business.
            </p>

            <div className="mt-8 flex items-baseline justify-between">
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
                className="w-28 rounded-lg border border-neutral-300 px-4 py-3 text-primary-950 focus:border-primary-700 focus:outline-none"
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

            <label htmlFor="calc-state" className="mt-8 block text-neutral-500">
              State / Union Territory
            </label>
            <select
              id="calc-state"
              value={state}
              onChange={(e) => changeState(e.target.value)}
              className="mt-2 w-full appearance-none rounded-lg border border-neutral-300 bg-white px-4 py-3 text-primary-950 focus:border-primary-700 focus:outline-none"
            >
              {STATES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <p className="mt-2 text-sm text-neutral-500" aria-live="polite">
              + {locationStatus}
            </p>

            <p className="mt-8 font-bold text-primary-950">Customer category</p>
            <div
              role="radiogroup"
              aria-label="Customer category"
              className="mt-3 flex rounded-xl bg-surface-warm p-1.5"
            >
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={category === c}
                  onClick={() => changeCategory(c)}
                  className={`flex-1 rounded-lg px-2 py-2.5 text-sm font-bold transition ${
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
              <div>
                <p className="font-bold text-primary-950">Rooftop subsidy applicable</p>
                <p className="mt-1 text-sm text-neutral-500">
                  For residential rooftop under PM Surya Ghar.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={subsidy}
                aria-label="Rooftop subsidy applicable"
                disabled={category !== "residential"}
                onClick={() => setSubsidy(!subsidy)}
                className={`relative h-8 w-14 shrink-0 rounded-full transition-colors disabled:opacity-50 ${
                  subsidy ? "bg-primary-700" : "bg-neutral-300"
                }`}
              >
                <span
                  className={`absolute top-1 size-6 rounded-full bg-white transition-all ${
                    subsidy ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-neutral-100 pt-6">
              <label htmlFor="calc-cost" className="font-bold text-primary-950">
                Electricity unit cost
              </label>
              <span className="rounded-full bg-surface-warm px-3 py-1 text-xs font-bold text-neutral-600">
                Auto
              </span>
            </div>
            <div className="mt-3 flex items-center rounded-lg border border-neutral-300 px-4 py-3 focus-within:border-primary-700">
              <span className="text-neutral-500">₹</span>
              <input
                id="calc-cost"
                type="number"
                step="0.01"
                min={0}
                max={100}
                value={unitCost}
                onChange={(e) => setUnitCost(e.target.value)}
                className="w-full px-2 text-primary-950 focus:outline-none"
              />
              <span className="shrink-0 text-neutral-500">/ kWh</span>
            </div>
            <p className="mt-2 text-sm text-neutral-500">
              Auto-filled for {state} · edit to match your bill.
            </p>
          </form>

          <div className="flex flex-col gap-5">
            <div className="rounded-2xl bg-primary-700 p-8 text-white">
              <p className="text-sm font-bold uppercase tracking-widest">
                Recommended plant size
              </p>
              <p className="mt-2 text-5xl font-bold">
                {twoDecimals(result.plantSize)} kW
              </p>
              <p className="mt-6 flex items-center gap-3 border-t border-white/20 pt-5">
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

            <div className="rounded-2xl border border-neutral-200 p-8">
              <h3 className="flex items-center gap-3 text-2xl font-bold text-primary-950">
                <Zap aria-hidden className="size-6 text-primary-700" />
                Electricity generation
              </h3>
              <dl className="mt-4 divide-y divide-neutral-100">
                {(
                  [
                    ["Monthly", result.monthlyGeneration],
                    ["Annually", result.annualGeneration],
                    ["Lifetime (30 yr)", result.lifetimeGeneration],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between py-4">
                    <dt className="text-neutral-600">{label}</dt>
                    <dd className="text-xl font-bold text-primary-950">{inr(value)} kWh</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-neutral-200 p-8">
              <h3 className="flex items-center gap-3 text-2xl font-bold text-primary-950">
                <IndianRupee aria-hidden className="size-6 text-primary-700" />
                Bill savings
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {(
                  [
                    ["Monthly", result.monthlySavings, false],
                    ["Annually", result.annualSavings, false],
                    ["Lifetime", result.lifetimeSavings, true],
                  ] as const
                ).map(([label, value, highlight]) => (
                  <div
                    key={label}
                    className={`rounded-xl p-5 ${
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
              <p className="mt-4 text-sm text-neutral-500">
                Estimated savings at ₹{Number(unitCost || 0).toFixed(2)}/kWh.
              </p>
            </div>

            <div className="rounded-2xl bg-surface-mint p-8">
              <h3 className="flex items-center gap-3 text-2xl font-bold text-primary-950">
                <Leaf aria-hidden className="size-6 text-primary-700" />
                Environmental impact
              </h3>
              <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:divide-x sm:divide-primary-950/10">
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
    </section>
  );
}
