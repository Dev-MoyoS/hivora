import Script from "next/script";
import { ADSENSE, isAdsenseEnabled } from "@/lib/adsense-config";

export function AdSenseScript() {
  if (!isAdsenseEnabled()) return null;

  return (
    <Script
      id="adsense-loader"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE.clientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
