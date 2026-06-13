/** Google AdSense — set in .env.local when approved. Leave empty during development. */
export const ADSENSE = {
  clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "",
  slots: {
    /** In-feed rectangle — mobile & desktop feed breaks */
    inFeed: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_FEED ?? "",
    /** Sidebar rectangle — desktop xl only */
    sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR ?? "",
    /** Horizontal banner — tablet/mobile discovery area */
    banner: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER ?? "",
  },
} as const;

export function isAdsenseEnabled() {
  return Boolean(ADSENSE.clientId);
}

/** Paths where ads are disabled (support, auth, onboarding). */
export function isAdFreePath(pathname: string) {
  return (
    pathname.startsWith("/trust") ||
    pathname.startsWith("/chamber") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/onboarding")
  );
}

/** Insert an ad after every N posts, starting after the 2nd post. */
export const FEED_AD_INTERVAL = 3;
export const FEED_AD_START = 2;
