"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Sun,
  Users,
  BookOpen,
  Sparkles,
  Shield,
  Moon,
  Bell,
  Bookmark,
  User,
  Settings,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home", icon: Home, match: (p: string) => p === "/" || p === "/knowledge" },
  { href: "/", label: "Knowledge Square", icon: Sun, match: () => false },
  { href: "/knowledge/groups", label: "Study Groups", icon: Users, match: (p: string) => p.startsWith("/knowledge/groups") },
  { href: "/knowledge/resources", label: "Resources", icon: BookOpen, match: (p: string) => p.startsWith("/knowledge/resources") },
  { href: "/knowledge/talent", label: "Talent Wall", icon: Sparkles, match: (p: string) => p.startsWith("/knowledge/talent") },
] as const;

const WORLDS_NAV = [
  { href: "/trust", label: "Trust Circle", icon: Shield, match: (p: string) => p.startsWith("/trust") },
  { href: "/chamber", label: "Listening Chamber", icon: Moon, match: (p: string) => p.startsWith("/chamber") },
] as const;

const ACCOUNT_NAV = [
  { href: "/notifications", label: "Notifications", icon: Bell, badge: 3, match: (p: string) => p.startsWith("/notifications") },
  { href: "/saved", label: "Saved Posts", icon: Bookmark, match: (p: string) => p.startsWith("/saved") },
  { href: "/profile", label: "Profile", icon: User, match: (p: string) => p.startsWith("/profile") },
  { href: "/profile", label: "Settings", icon: Settings, match: () => false },
] as const;

function NavItem({
  href,
  label,
  icon: Icon,
  active,
  badge,
}: {
  href: string;
  label: string;
  icon: typeof Home;
  active: boolean;
  badge?: number;
}) {
  return (
    <Link href={href}>
      <motion.span
        whileHover={{ x: 2 }}
        className={cn(
          "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          active
            ? "bg-brand-navy text-white shadow-sm"
            : "text-muted-foreground hover:bg-surface-muted hover:text-brand-navy dark:hover:text-foreground"
        )}
      >
        {active && (
          <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand-gold" />
        )}
        <Icon className={cn("h-[18px] w-[18px] shrink-0", active && "text-white")} />
        <span className="flex-1">{label}</span>
        {badge != null && badge > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-gold px-1.5 text-[10px] font-bold text-brand-navy">
            {badge}
          </span>
        )}
      </motion.span>
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[280px] flex-col border-r border-border bg-card lg:flex">
      <div className="flex h-[72px] items-center border-b border-border px-5">
        <Logo href="/" size="sm" />
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {NAV.map((item) => (
          <NavItem key={item.label} {...item} active={item.match(pathname)} />
        ))}

        <div className="my-3 border-t border-border" />

        {WORLDS_NAV.map((item) => (
          <NavItem key={item.label} {...item} active={item.match(pathname)} />
        ))}

        <div className="my-3 border-t border-border" />

        {ACCOUNT_NAV.map((item) => (
          <NavItem
            key={item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={item.match(pathname)}
            badge={"badge" in item ? item.badge : undefined}
          />
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-sm text-muted-foreground">
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </span>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            aria-label="Toggle dark mode"
          />
        </div>
      </div>
    </aside>
  );
}
