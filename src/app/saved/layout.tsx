"use client";

import { AppShell } from "@/components/layout/app-shell";

export default function SavedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell showRightSidebar={false} showVoiceWidget={false}>
      {children}
    </AppShell>
  );
}
