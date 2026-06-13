"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/stores/app-store";
import { useAuthGate } from "@/hooks/use-auth-gate";
import type { DifficultyVote } from "@/types";
import { cn } from "@/lib/utils";

interface DifficultyBarometerProps {
  postId: string;
  votes: { understand: number; struggling: number; stuck: number };
}

const OPTIONS: {
  vote: DifficultyVote;
  label: string;
  bar: string;
}[] = [
  { vote: "understand", label: "I understand", bar: "bg-success" },
  { vote: "struggling", label: "I'm struggling a bit", bar: "bg-warning" },
  { vote: "stuck", label: "I'm completely stuck", bar: "bg-danger" },
];

export function DifficultyBarometer({ postId, votes: initialVotes }: DifficultyBarometerProps) {
  const { difficultyVotes, voteDifficulty } = useAppStore();
  const { requireAuth } = useAuthGate();
  const userVote = difficultyVotes[postId];
  const [liveVotes, setLiveVotes] = useState(initialVotes);

  useEffect(() => {
    setLiveVotes(initialVotes);
  }, [initialVotes]);

  const handleVote = (vote: DifficultyVote) => {
    if (!requireAuth("vote")) return;
    if (userVote) return;
    voteDifficulty(postId, vote);
    setLiveVotes((v) => ({ ...v, [vote]: v[vote] + 1 }));
  };

  const total = liveVotes.understand + liveVotes.struggling + liveVotes.stuck || 1;
  const pct = {
    understand: Math.round((liveVotes.understand / total) * 100),
    struggling: Math.round((liveVotes.struggling / total) * 100),
    stuck: Math.round((liveVotes.stuck / total) * 100),
  };

  return (
    <div className="space-y-1.5">
      {OPTIONS.map((opt) => (
        <button
          key={opt.vote}
          type="button"
          disabled={!!userVote}
          onClick={() => handleVote(opt.vote)}
          className={cn(
            "group w-full rounded-lg border px-2.5 py-1.5 text-left transition-all",
            userVote === opt.vote
              ? "border-brand-navy/30 bg-card shadow-sm dark:border-brand-gold/30"
              : "border-transparent bg-surface-muted hover:bg-card disabled:cursor-default"
          )}
        >
          <div className="mb-1 flex items-center justify-between gap-2 text-xs">
            <span className="truncate font-medium text-foreground">{opt.label}</span>
            <span className="shrink-0 tabular-nums text-[11px] text-muted-foreground">
              {pct[opt.vote]}% ({liveVotes[opt.vote]})
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              layout
              className={cn("h-full rounded-full", opt.bar)}
              animate={{ width: `${pct[opt.vote]}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </button>
      ))}
    </div>
  );
}
