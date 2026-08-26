export type SolarResult = {
  plantSize: number;
  dailyGeneration: number;
  monthlyGeneration: number;
  annualGeneration: number;
  lifetimeGeneration: number;
  monthlySavings: number;
  annualSavings: number;
  lifetimeSavings: number;
  carbonReduced: number;
  treeEquivalent: number;
};

const UNITS_PER_KW_PER_DAY = 4;
const DAYS_IN_MONTH = 30;
const LIFETIME_YEARS = 30;
const CARBON_EMISSION_KG_PER_KWH = 0.841;
const EMISSIONS_REDUCED_BY_TREE_KG_PER_YEAR = 25;

/*
 * Upper bounds are clamped here rather than in the form, so every caller
 * inherits them — the HTML min/max attributes constrain the spinner but not a
 * typed or pasted value, and a future server-side caller would have no such
 * attributes at all. Without these, an entered 1e12 rendered a ₹288 trillion
 * lifetime saving with the same confidence as a real figure.
 */
export const MAX_MONTHLY_UNITS = 100_000;
export const MAX_UNIT_COST = 100;

/**
 * True when `usage` was clamped, so the UI can say so rather than silently
 * lying. Must stay in step with the clamp in `calculateSolar` below: an earlier
 * `Number.isFinite` guard here excluded Infinity, which `calculateSolar` *does*
 * clamp — so an overflowing value was capped with no notice shown. Only NaN
 * (empty or non-numeric input) is exempt, because that yields 0, not a cap.
 */
export function isUsageOutOfRange(usage: string | number): boolean {
  const n = Number(usage);
  if (Number.isNaN(n)) return false;
  return n > MAX_MONTHLY_UNITS;
}

export function calculateSolar(
  usage: string | number,
  unitCost: string | number,
): SolarResult {
  const monthlyUnits = Math.min(MAX_MONTHLY_UNITS, Math.max(0, Number(usage) || 0));
  const cost = Math.min(MAX_UNIT_COST, Math.max(0, Number(unitCost) || 0));
  const unitsPerKwPerMonth = UNITS_PER_KW_PER_DAY * DAYS_IN_MONTH;
  const plantSize = monthlyUnits / unitsPerKwPerMonth;
  const dailyGeneration = plantSize * UNITS_PER_KW_PER_DAY;
  const monthlyGeneration = dailyGeneration * DAYS_IN_MONTH;
  const annualGeneration = monthlyGeneration * 12;
  const lifetimeGeneration = annualGeneration * LIFETIME_YEARS;

  return {
    plantSize,
    dailyGeneration,
    monthlyGeneration,
    annualGeneration,
    lifetimeGeneration,
    monthlySavings: monthlyGeneration * cost,
    annualSavings: annualGeneration * cost,
    lifetimeSavings: lifetimeGeneration * cost,
    carbonReduced: (lifetimeGeneration * CARBON_EMISSION_KG_PER_KWH) / 1000,
    treeEquivalent:
      (annualGeneration * CARBON_EMISSION_KG_PER_KWH) /
      EMISSIONS_REDUCED_BY_TREE_KG_PER_YEAR,
  };
}
