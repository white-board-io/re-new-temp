"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import type { EditorialFilter } from "@/lib/editorial";

function buildHref(route: string, query: string, filters: EditorialFilter[], overrides: Record<string, string> = {}) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  for (const filter of filters) {
    const value = overrides[filter.name] ?? filter.value;
    if (value) params.set(filter.name, value);
  }
  const search = params.toString();
  return search ? `${route}?${search}` : route;
}

export function EditorialFilters({ filters, query, route, summary }: { filters: EditorialFilter[]; query: string; route: string; summary: string }) {
  const router = useRouter();
  const active = filters.some((filter) => filter.value);
  const cleared = Object.fromEntries(filters.map((filter) => [filter.name, ""]));

  return (
    <div className="mx-auto max-w-[1530px] px-4 pb-6 sm:px-6 2xl:px-0">
      <form action={route} method="get" aria-label="Filter results" className="flex flex-wrap items-center gap-x-6 gap-y-4">
        {query && <input type="hidden" name="q" value={query} />}
        {filters.map((filter) => (
          <div key={filter.name} className="relative w-full sm:w-[240px]">
            <label htmlFor={`filter-${filter.name}`} className="sr-only">{filter.label}</label>
            <select
              key={filter.value}
              id={`filter-${filter.name}`}
              name={filter.name}
              defaultValue={filter.value}
              onChange={(event) => router.replace(buildHref(route, query, filters, { [filter.name]: event.target.value }), { scroll: false })}
              className={`h-12 w-full cursor-pointer appearance-none rounded-full border border-primary-700 pl-6 pr-12 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 ${filter.value ? "bg-primary-700 text-white hover:bg-primary-800" : "bg-white text-primary-700 hover:bg-surface-tint"}`}
            >
              <option value="">{filter.allLabel}</option>
              {filter.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className={`pointer-events-none absolute right-5 top-1/2 size-5 -translate-y-1/2 ${filter.value ? "text-white" : "text-primary-700"}`} />
          </div>
        ))}
        <noscript>
          <button type="submit" className="inline-flex h-12 items-center rounded-full bg-primary-400 px-7 text-base font-bold text-white">Apply</button>
        </noscript>
        <p aria-live="polite" className="text-lg text-neutral-700">{summary}</p>
        {active && (
          <Link href={buildHref(route, query, filters, cleared)} scroll={false} className="ml-auto text-base font-bold text-primary-700 underline-offset-4 hover:underline sm:ml-0">
            Clear filters
          </Link>
        )}
      </form>
    </div>
  );
}
