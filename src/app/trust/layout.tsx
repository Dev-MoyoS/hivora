"use client";

import { useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { useAppStore } from "@/stores/app-store";

export default function TrustLayout({ children }: { children: React.ReactNode }) {
  const setWorld = useAppStore((s) => s.setWorld);

  useEffect(() => {
    setWorld("trust");
  }, [setWorld]);

  return (
    <AppShell showRightSidebar={false} showVoiceWidget={false}>
      {children}
    </AppShell>
  );
}
