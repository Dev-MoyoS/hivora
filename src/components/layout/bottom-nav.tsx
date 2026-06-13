"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Bell, User } from "lucide-react";
import { useSearchStore } from "@/stores/search-store";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/", label: "Home", icon: Home, isHome: true },
  { action: "search" as const, label: "Search", icon: Search },
  { href: "/notifications", label: "Notifications", icon: Bell, isHome: false },
  { href: "/profile", label: "Profile", icon: User, isHome: false },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const setOpen = useSearchStore((s) => s.setOpen);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      aria-label="Main navigation"
    >
      <div className="flex h-[4.25rem] items-center justify-around px-1">
        {ITEMS.map((item) => {
          const Icon = item.icon;

          if ("action" in item) {
            return (
              <button
                key="search"
                type="button"
                onClick={() => setOpen(true)}
                className="flex min-h-[44px] flex-1 touch-manipulation flex-col items-center justify-center gap-0.5 py-2 text-xs text-muted-foreground"
              >
                <Icon className="h-5 w-5" />
                <span>Search</span>
              </button>
            );
          }

          const active = item.isHome
            ? pathname === "/" || pathname === "/knowledge"
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-[44px] flex-1 touch-manipulation flex-col items-center justify-center gap-0.5 py-2 text-xs transition-colors",
                active ? "font-medium text-brand-navy dark:text-brand-gold" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", active && "stroke-[2.5]")} />
              <span>{item.label}</span>
              {active && <span className="mt-0.5 h-0.5 w-4 rounded-full bg-brand-gold" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
