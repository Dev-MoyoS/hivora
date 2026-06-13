"use client";

import { BottomNav } from "@/components/layout/bottom-nav";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { VoiceRoomWidget } from "@/components/layout/voice-room-widget";
import { MobileSearchBar } from "@/components/layout/mobile-search-bar";
import { PageTransition } from "@/components/layout/page-transition";
import { AuthGateModal } from "@/components/auth/auth-gate-modal";
import { usePathname } from "next/navigation";
import { isAdFreePath } from "@/lib/adsense-config";

interface AppShellProps {
  children: React.ReactNode;
  showRightSidebar?: boolean;
  showVoiceWidget?: boolean;
}

export function AppShell({
  children,
  showRightSidebar,
  showVoiceWidget = true,
}: AppShellProps) {
  const pathname = usePathname();
  const isFeed = pathname === "/" || pathname === "/knowledge";
  const showRight = showRightSidebar ?? isFeed;
  const showAds = isFeed && !isAdFreePath(pathname);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <div className="lg:pl-[280px]">
        <AppHeader />
        <MobileSearchBar />

        <div className="pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-6">
          <PageTransition>
            <div className="mx-auto flex max-w-[1200px] justify-center gap-4 px-3 py-4 sm:gap-6 sm:px-4 sm:py-6 lg:px-6">
              <main className="w-full min-w-0 max-w-[800px] flex-1">{children}</main>
              {showRight && <RightSidebar showAds={showAds} />}
            </div>
          </PageTransition>
        </div>
      </div>

      {showVoiceWidget && <VoiceRoomWidget />}
      <BottomNav />
      <AuthGateModal />
    </div>
  );
}
