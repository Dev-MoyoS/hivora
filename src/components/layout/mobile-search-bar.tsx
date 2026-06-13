"use client";

import { Search } from "lucide-react";
import { useSearchStore } from "@/stores/search-store";

export function MobileSearchBar() {
  const setOpen = useSearchStore((s) => s.setOpen);

  return (
    <div className="border-b border-border bg-card px-3 py-2.5 md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-11 w-full touch-manipulation items-center gap-3 rounded-2xl border border-border bg-surface-muted px-4 text-left text-sm text-muted-foreground active:scale-[0.99]"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span>Search posts, resources, groups…</span>
      </button>
    </div>
  );
}
