"use client";

import Link from "next/link";
import { Flame, TrendingUp } from "lucide-react";
import { MOCK_TRENDING } from "@/lib/mock-data";
import { AdSlot } from "@/components/ads/ad-slot";
import { ADSENSE } from "@/lib/adsense-config";

export function MobileDiscoveryStrip() {
  return (
    <div className="mb-5 space-y-3 xl:hidden">
      <div className="flex items-center gap-2 px-0.5">
        <TrendingUp className="h-4 w-4 text-brand-gold" />
        <h2 className="text-sm font-semibold text-foreground">Trending now</h2>
      </div>

      <div className="-mx-3 flex touch-pan-x snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-1 scrollbar-none sm:-mx-0 sm:px-0">
        {MOCK_TRENDING.slice(0, 4).map((t, i) => (
          <Link
            key={t.title}
            href="/"
            className="min-w-[200px] max-w-[220px] shrink-0 touch-manipulation snap-start rounded-2xl border border-border bg-card p-3.5 active:scale-[0.98] sm:min-w-[240px]"
          >
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold ${
                  i < 2 ? "bg-brand-gold text-brand-navy" : "bg-brand-navy text-white"
                }`}
              >
                {i + 1}
              </span>
              {t.hot && <Flame className="h-3.5 w-3.5 text-orange-500" />}
            </div>
            <p className="line-clamp-2 text-sm font-medium leading-snug text-foreground">
              {t.title}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{t.votes} discussing</p>
          </Link>
        ))}
      </div>

      <AdSlot slot={ADSENSE.slots.banner} format="banner" lazy className="hidden sm:block xl:hidden" />
    </div>
  );
}
