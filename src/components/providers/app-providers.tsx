"use client";

import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
