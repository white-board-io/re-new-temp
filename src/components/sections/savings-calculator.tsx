"use client";

import { useState } from "react";
import { IndianRupee, Leaf, Zap } from "lucide-react";

/*
 * STUB MATH — reverse-engineered from the Figma mock's example numbers so the
 * UI reproduces the design exactly; real formulas/tariffs pending from the user.
 *  - plant size (kW)      = monthly units / 120   (≈4 kWh per kW per day)
 *  - generation           = 100% bill offset (monthly units)
 *  - savings              = units × unit cost; lifetime = 30 years
 *  - CO₂e                 = 0.841 kg per kWh
 *  - trees planted / year = annual CO₂e kg / 25 kg per tree
 */
const KWH_PER_KW_PER_DAY = 4;
const LIFETIME_YEARS = 30;
const CO2_KG_PER_KWH = 0.841;
const TREE_KG_PER_YEAR = 25;

// TODO(batch-3-followup): real per-state tariffs from the user
const STATE_TARIFFS: Record<string, number> = {
  "Andhra Pradesh": 9.5,
  Delhi: 8.5,
  Gujarat: 8.0,
  Karnataka: 9.0,
  Maharashtra: 11.0,
  "Tamil Nadu": 8.5,
  Rajasthan: 9.0,
  "Uttar Pradesh": 9.5,
  "West Bengal": 10.0,
};
const STATES = Object.keys(STATE_TARIFFS);

const CATEGORIES = ["Residential", "Commercial", "Industrial"] as const;

const inr = (n: number) =>
  n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export function SavingsCalculator() {
  const [units, setUnits] = useState(400);
  const [state, setState] = useState("Maharashtra");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Residential");
  const [subsidy, setSubsidy] = useState(true);
  const [unitCost, setUnitCost] = useState(STATE_TARIFFS.Maharashtra);
  const [costEdited, setCostEdited] = useState(false);

  const changeState = (next: string) => {
    setState(next);
    if (!costEdited) setUnitCost(STATE_TARIFFS[next]);
  };

  const plantKw = units / (30 * KWH_PER_KW_PER_DAY);
  const dailyUnits = units / 30;
  const annualKwh = units * 12;
  const lifetimeKwh = annualKwh * LIFETIME_YEARS;
  const monthlySavings = units * unitCost;
  const co2Tonnes = (lifetimeKwh * CO2_KG_PER_KWH) / 1000;
  const treesPerYear = (annualKwh * CO2_KG_PER_KWH) / TREE_KG_PER_YEAR;

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
                min={50}
                max={5000}
                value={units}
                onChange={(e) => setUnits(Math.max(0, Number(e.target.value)))}
                className="w-28 rounded-lg border border-neutral-300 px-4 py-3 text-primary-950 focus:border-primary-700 focus:outline-none"
              />
              <input
                type="range"
                aria-label="Electricity used per month"
                min={50}
                max={2000}
                step={10}
                value={Math.min(units, 2000)}
                onChange={(e) => setUnits(Number(e.target.value))}
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
                  onClick={() => setCategory(c)}
                  className={`flex-1 rounded-lg px-2 py-2.5 text-sm font-bold transition ${
                    category === c
                      ? "bg-primary-700 text-white"
                      : "text-neutral-600 hover:text-primary-950"
                  }`}
                >
                  {c}
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
                onClick={() => setSubsidy(!subsidy)}
                className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${
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
              {!costEdited && (
                <span className="rounded-full bg-surface-warm px-3 py-1 text-xs font-bold text-neutral-600">
                  Auto
                </span>
              )}
            </div>
            <div className="mt-3 flex items-center rounded-lg border border-neutral-300 px-4 py-3 focus-within:border-primary-700">
              <span className="text-neutral-500">₹</span>
              <input
                id="calc-cost"
                type="number"
                step="0.5"
                min={1}
                value={unitCost}
                onChange={(e) => {
                  setUnitCost(Number(e.target.value));
                  setCostEdited(true);
                }}
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
                {plantKw.toLocaleString("en-IN", { maximumFractionDigits: 2 })} kW
              </p>
              <p className="mt-6 flex items-center gap-3 border-t border-white/20 pt-5">
                <Zap aria-hidden className="size-5 fill-primary-400 text-primary-400" />
                <span>
                  Generates about{" "}
                  <strong>
                    {dailyUnits.toLocaleString("en-IN", { maximumFractionDigits: 2 })} units
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
                    ["Monthly", units],
                    ["Annually", annualKwh],
                    ["Lifetime (30 yr)", lifetimeKwh],
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
                    ["Monthly", monthlySavings, false],
                    ["Annually", monthlySavings * 12, false],
                    ["Lifetime", monthlySavings * 12 * LIFETIME_YEARS, true],
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
                Estimated savings at ₹{unitCost.toFixed(2)}/kWh.
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
                    {co2Tonnes.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </p>
                  <p className="mt-2 text-neutral-600">
                    tonnes of CO₂e avoided over 30 years
                  </p>
                </div>
                <div className="sm:pl-8">
                  <p className="text-4xl font-bold text-primary-950">
                    {treesPerYear.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
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
