"use client";

import { useEffect, useRef, useState } from "react";
import { ADSENSE, isAdsenseEnabled } from "@/lib/adsense-config";
import { cn } from "@/lib/utils";

type AdFormat = "in-feed" | "banner" | "sidebar";

const FORMAT_STYLES: Record<AdFormat, { minHeight: number; className: string }> = {
  "in-feed": {
    minHeight: 120,
    className: "min-h-[120px] w-full",
  },
  banner: {
    minHeight: 90,
    className: "min-h-[90px] w-full max-w-full",
  },
  sidebar: {
    minHeight: 250,
    className: "min-h-[250px] w-full",
  },
};

interface AdSlotProps {
  slot: string;
  format: AdFormat;
  className?: string;
  lazy?: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export function AdSlot({ slot, format, className, lazy = true }: AdSlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!lazy);
  const [loaded, setLoaded] = useState(false);
  const enabled = isAdsenseEnabled() && Boolean(slot);
  const { minHeight, className: formatClass } = FORMAT_STYLES[format];

  useEffect(() => {
    if (!lazy || !ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lazy]);

  useEffect(() => {
    if (!enabled || !visible || loaded) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setLoaded(true);
    } catch {
      /* AdSense not ready */
    }
  }, [enabled, visible, loaded]);

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-2xl border border-border/60 bg-muted/30",
        formatClass,
        className
      )}
      style={{ minHeight }}
      aria-label="Advertisement"
    >
      <p className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
        Sponsored
      </p>

      {enabled && visible ? (
        <ins
          className="adsbygoogle block w-full"
          style={{ display: "block", minHeight: minHeight - 28 }}
          data-ad-client={ADSENSE.clientId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex flex-1 items-center justify-center px-4 pb-4">
          <p className="text-center text-xs text-muted-foreground/60">
            {enabled ? "Loading ad…" : "Ad space · configure NEXT_PUBLIC_ADSENSE_CLIENT_ID"}
          </p>
        </div>
      )}
    </div>
  );
}
