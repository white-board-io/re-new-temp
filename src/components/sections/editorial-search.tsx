"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

function buildHref(route: string, query: string, params: Record<string, string>) {
  const search = new URLSearchParams(params);
  if (query) search.set("q", query);
  const value = search.toString();
  return value ? `${route}?${value}` : route;
}

export function EditorialSearch({ query, route, label, params = {} }: { query: string; route: string; label: string; params?: Record<string, string> }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (input.current && document.activeElement !== input.current) input.current.value = query;
  }, [query]);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  function search(value: string) {
    window.clearTimeout(timeout.current);
    const nextQuery = value.trim();
    if (nextQuery === query) return;
    timeout.current = window.setTimeout(() => {
      router.replace(buildHref(route, nextQuery, params), { scroll: false });
    }, 400);
  }

  return (
    <form action={route} method="get" role="search" className="mt-14 flex h-[62px] w-full max-w-[473px] items-center gap-4 rounded-full border border-white/80 px-7 text-left sm:mt-20 xl:mt-[126px]">
      {Object.entries(params).map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)}
      <label htmlFor="editorial-search" className="sr-only">Search {label.toLowerCase()}</label>
      <input ref={input} id="editorial-search" name="q" type="search" defaultValue={query} onChange={(event) => search(event.target.value)} placeholder="Search" className="min-w-0 flex-1 bg-transparent text-lg text-white outline-none placeholder:text-white/95" />
      <button type="submit" aria-label={`Search ${label.toLowerCase()}`} className="shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
        <Search aria-hidden="true" className="size-7 stroke-[1.4]" />
      </button>
    </form>
  );
}
