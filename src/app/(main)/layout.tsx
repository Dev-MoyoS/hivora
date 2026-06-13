"use client";

import { useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { useAppStore } from "@/stores/app-store";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const setWorld = useAppStore((s) => s.setWorld);

  useEffect(() => {
    setWorld("knowledge");
  }, [setWorld]);

  return <AppShell>{children}</AppShell>;
}
