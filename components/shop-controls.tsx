"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "./icons";

function useParamNavigation() {
  const router = useRouter();
  const params = useSearchParams();

  return (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (!value) next.delete(key);
      else next.set(key, value);
    });
    const query = next.toString();
    router.push(query ? `/shop?${query}` : "/shop");
  };
}

export function ShopSearchField({ initialQuery }: { initialQuery: string }) {
  const [value, setValue] = useState(initialQuery);
  const navigate = useParamNavigation();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        navigate({ q: value.trim() || null });
      }}
      className="relative"
    >
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="جستجو در محصولات…"
        aria-label="جستجو در محصولات"
        className="h-10 w-full rounded-[3px] border border-ink/15 bg-ivory pe-3 ps-9 text-[12px] outline-none transition-colors placeholder:text-muted/70 focus:border-wine"
      />
      <SearchIcon className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </form>
  );
}

export function ShopSortSelect({ value }: { value: string }) {
  const navigate = useParamNavigation();

  return (
    <label className="flex items-center gap-2 text-[11.5px] text-muted">
      <span className="whitespace-nowrap">مرتب‌سازی:</span>
      <select
        value={value}
        onChange={(event) => navigate({ sort: event.target.value })}
        className="h-9 rounded-[3px] border border-ink/15 bg-ivory px-2 text-[12px] text-ink outline-none focus:border-wine"
        aria-label="مرتب‌سازی محصولات"
      >
        <option value="featured">پیشنهاد ولورا</option>
        <option value="new">جدیدترین</option>
        <option value="price-asc">ارزان‌ترین</option>
        <option value="price-desc">گران‌ترین</option>
      </select>
    </label>
  );
}
