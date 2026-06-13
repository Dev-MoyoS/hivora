"use client";

import { useEffect } from "react";
import { initFirebaseAnalytics, isFirebaseConfigured } from "@/lib/firebase";

export function FirebaseAnalytics() {
  useEffect(() => {
    if (isFirebaseConfigured) {
      initFirebaseAnalytics().catch(() => {});
    }
  }, []);

  return null;
}
