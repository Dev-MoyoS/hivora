"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FeedFiltersPanel } from "@/components/knowledge/feed-filters";
import { useFilterStore } from "@/stores/filter-store";
import type { FeedTab } from "@/types";
import { cn } from "@/lib/utils";

const TABS: { id: FeedTab; label: string }[] = [
  { id: "for_you", label: "For You" },
  { id: "recent", label: "Recent" },
  { id: "most_active", label: "Most Active" },
  { id: "deadline_soon", label: "Deadline Soon" },
];

export function FeedTabs() {
  const { tab, set } = useFilterStore();
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="mb-4 space-y-4 sm:mb-6">
      <div className="flex items-center justify-between gap-2 border-b border-border sm:gap-3">
        <div className="-mx-3 flex touch-pan-x gap-0.5 overflow-x-auto px-3 pb-px scrollbar-none sm:mx-0 sm:px-0">
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => set({ tab: t.id })}
                className={cn(
                  "relative shrink-0 touch-manipulation px-3 py-3 text-sm font-medium transition-colors sm:px-4",
                  active ? "text-brand-navy dark:text-brand-gold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.label}
                {active && (
                  <motion.span
                    layoutId="feed-tab-indicator"
                    className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-brand-navy dark:bg-brand-gold"
                  />
                )}
              </button>
            );
          })}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mb-2 h-9 shrink-0 touch-manipulation rounded-xl px-2.5 sm:px-3"
          onClick={() => setFiltersOpen((o) => !o)}
        >
          <SlidersHorizontal className="h-3.5 w-3.5 sm:mr-2" />
          <span className="hidden sm:inline">Filter</span>
        </Button>
      </div>

      {filtersOpen && <FeedFiltersPanel onClose={() => setFiltersOpen(false)} />}
    </div>
  );
}
