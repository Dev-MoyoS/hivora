"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Users, Trophy, Activity, Flame, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MOCK_TRENDING,
  MOCK_ACTIVE_GROUPS,
  MOCK_TOP_CONTRIBUTORS,
  MOCK_CAMPUS_PULSE,
  MOCK_RESOURCES,
  MOCK_TALENT_OFFERS,
} from "@/lib/mock-data";
import { AdSlot } from "@/components/ads/ad-slot";
import { ADSENSE } from "@/lib/adsense-config";
import { useAuthGate } from "@/hooks/use-auth-gate";
import { cn } from "@/lib/utils";

function Widget({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof TrendingUp;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3 text-sm font-semibold text-brand-navy dark:text-brand-gold">
        <Icon className="h-4 w-4 text-brand-gold" />
        {title}
      </div>
      <div className="p-4">{children}</div>
    </motion.div>
  );
}

export function RightSidebar({ showAds = false }: { showAds?: boolean }) {
  const { requireAuth } = useAuthGate();

  const handleJoin = (e: React.MouseEvent) => {
    if (!requireAuth("join_group", { returnPath: "/knowledge/groups" })) {
      e.preventDefault();
    }
  };

  return (
    <aside className="hidden w-[320px] shrink-0 space-y-5 xl:block">
      <Widget icon={TrendingUp} title="Trending assignments">
        <ul className="space-y-3">
          {MOCK_TRENDING.map((t, i) => (
            <li key={t.title} className="text-sm">
              <div className="flex items-start gap-2">
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold",
                    i < 3 ? "bg-brand-gold text-brand-navy" : "bg-brand-navy text-white"
                  )}
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 font-medium leading-snug text-foreground">
                    {t.title}
                    {t.hot && <Flame className="h-3.5 w-3.5 shrink-0 text-orange-500" />}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.votes} discussing</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Widget>

      <Widget icon={Users} title="Active study groups">
        <ul className="space-y-4">
          {MOCK_ACTIVE_GROUPS.map((g) => (
            <li key={g.name} className="text-sm">
              <p className="font-medium text-foreground">{g.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {g.members}/{g.maxMembers} members · {g.time}
              </p>
              <p className="text-xs text-muted-foreground/80">{g.location}</p>
              {g.members >= g.maxMembers ? (
                <Button size="sm" disabled className="mt-2 h-8 rounded-lg text-xs">
                  Full
                </Button>
              ) : (
                <Button size="sm" className="mt-2 h-8 rounded-lg bg-brand-navy text-xs text-white hover:bg-brand-navy/90" asChild>
                  <Link href="/knowledge/groups" onClick={handleJoin}>Join</Link>
                </Button>
              )}
            </li>
          ))}
        </ul>
      </Widget>

      <Widget icon={Trophy} title="Top contributors">
        <ul className="space-y-3">
          {MOCK_TOP_CONTRIBUTORS.map((c, i) => (
            <li key={c.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground">#{i + 1}</span>
                <span className="font-medium text-foreground">{c.name}</span>
                {c.badge && (
                  <Badge variant="outline" className="rounded-md border-brand-gold text-[10px] text-brand-gold">
                    {c.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-semibold text-brand-navy dark:text-brand-gold">
                {c.reputation} rep
              </span>
            </li>
          ))}
        </ul>
      </Widget>

      <Widget icon={BookOpen} title="Resource library">
        <ul className="space-y-3">
          {MOCK_RESOURCES.slice(0, 3).map((r) => (
            <li key={r.id}>
              <Link href="/knowledge/resources" className="block text-sm hover:underline">
                <p className="font-medium text-foreground">{r.title}</p>
                <p className="text-xs text-muted-foreground">
                  {r.module} · {r.downloads} downloads
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/knowledge/resources" className="mt-3 block text-xs font-medium text-brand-navy dark:text-brand-gold">
          Browse all resources →
        </Link>
      </Widget>

      <Widget icon={Sparkles} title="Talent Wall">
        <ul className="space-y-3">
          {MOCK_TALENT_OFFERS.slice(0, 2).map((t) => (
            <li key={t.id} className="text-sm">
              <p className="font-medium text-foreground">{t.skill}</p>
              <p className="text-xs text-muted-foreground">
                {t.type === "offer" ? "Offering" : "Seeking"} · {t.pseudonym}
              </p>
            </li>
          ))}
        </ul>
        <Link href="/knowledge/talent" className="mt-3 block text-xs font-medium text-brand-navy dark:text-brand-gold">
          View Talent Wall →
        </Link>
      </Widget>

      <Widget icon={Activity} title="Campus Pulse">
        <p className="mb-3 text-xs text-muted-foreground">Anonymous campus analytics</p>
        <ul className="space-y-3">
          {MOCK_CAMPUS_PULSE.map((m) => (
            <li key={m.label}>
              <div className="flex justify-between text-xs">
                <span className="text-foreground">{m.label}</span>
                <span className={cn("font-semibold", m.trend === "up" ? "text-warning" : "text-brand-navy dark:text-brand-gold")}>
                  {m.trend === "up" ? "↑" : "→"} {m.value}%
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-brand-navy transition-all dark:bg-brand-gold"
                  style={{ width: `${Math.min(m.value, 100)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </Widget>

      {showAds && (
        <AdSlot slot={ADSENSE.slots.sidebar} format="sidebar" lazy />
      )}
    </aside>
  );
}
