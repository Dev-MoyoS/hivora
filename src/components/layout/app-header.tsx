"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Moon, Sun, Bell, MessageSquare, ChevronDown } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/providers/theme-provider";
import { useAuth } from "@/contexts/auth-context";
import { GlobalSearch } from "@/components/layout/global-search";

export function AppHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { profile } = useAuth();
  const displayName = profile?.displayName?.replace(/\s+/g, "_") ?? "Nova_23";

  return (
    <>
      <header className="sticky top-0 z-40 h-14 border-b border-border bg-card/95 shadow-sm backdrop-blur-md sm:h-[72px]">
        <div className="flex h-full items-center gap-2 px-3 sm:gap-4 sm:px-4 lg:px-6">
          <Logo href="/" className="lg:hidden" size="sm" />

          <div className="mx-auto hidden max-w-2xl flex-1 md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                readOnly
                onClick={() => setSearchOpen(true)}
                placeholder="Search posts, resources, groups..."
                className="h-11 cursor-pointer rounded-2xl border-border bg-surface-muted pl-11 text-sm shadow-inner"
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 touch-manipulation rounded-xl md:hidden"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-0.5 md:ml-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-10 w-10 touch-manipulation rounded-xl"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="relative rounded-xl" asChild>
              <Link href="/notifications">
                <Bell className="h-4 w-4" />
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-gold px-1 text-[10px] font-bold text-brand-navy">
                  3
                </span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="hidden rounded-xl sm:flex" asChild>
              <Link href="/knowledge/groups">
                <MessageSquare className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" className="gap-2 rounded-xl px-2" asChild>
              <Link href="/profile">
                <UserAvatar name={displayName} size="sm" />
                <span className="hidden text-sm font-medium text-foreground lg:inline">
                  {displayName}
                </span>
                <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground lg:inline" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
