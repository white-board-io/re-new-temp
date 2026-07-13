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

export function calculateSolar(
  usage: string | number,
  unitCost: string | number,
): SolarResult {
  const monthlyUnits = Math.max(0, Number(usage) || 0);
  const cost = Math.max(0, Number(unitCost) || 0);
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
