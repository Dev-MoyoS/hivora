"use client";

import { Fragment, type ReactNode } from "react";
import { AdSlot } from "@/components/ads/ad-slot";
import { ADSENSE, FEED_AD_INTERVAL, FEED_AD_START } from "@/lib/adsense-config";

interface FeedWithAdsProps<T extends { id: string }> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

export function FeedWithAds<T extends { id: string }>({ items, renderItem }: FeedWithAdsProps<T>) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {items.map((item, index) => {
        const showAd =
          index >= FEED_AD_START &&
          (index - FEED_AD_START) % FEED_AD_INTERVAL === 0;

        return (
          <Fragment key={item.id}>
            {renderItem(item)}
            {showAd && <AdSlot slot={ADSENSE.slots.inFeed} format="in-feed" lazy />}
          </Fragment>
        );
      })}
    </div>
  );
}
