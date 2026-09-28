"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function EditorialSearch({ query, route, label }: { query: string; route: string; label: string }) {
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
      router.replace(nextQuery ? `${route}?q=${encodeURIComponent(nextQuery)}` : route, { scroll: false });
    }, 400);
  }

  return (
    <form action={route} method="get" role="search" className="mt-14 flex h-[62px] w-full max-w-[473px] items-center gap-4 rounded-full border border-white/80 px-7 text-left sm:mt-20 xl:mt-[126px]">
      <label htmlFor="editorial-search" className="sr-only">Search {label.toLowerCase()}</label>
      <input ref={input} id="editorial-search" name="q" type="search" defaultValue={query} onChange={(event) => search(event.target.value)} placeholder="Search" className="min-w-0 flex-1 bg-transparent text-lg text-white outline-none placeholder:text-white/95" />
      <button type="submit" aria-label={`Search ${label.toLowerCase()}`} className="shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
        <Search aria-hidden="true" className="size-7 stroke-[1.4]" />
      </button>
    </form>
  );
}
