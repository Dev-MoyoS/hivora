"use client";

import { motion } from "framer-motion";
import {
  formatTimeRemaining,
  getDeadlineProgress,
  getDeadlineUrgency,
  URGENCY_COLORS,
} from "@/lib/utils-deadline";
import { cn } from "@/lib/utils";

interface DeadlineProgressProps {
  deadline: Date;
  createdAt: Date;
}

function dueLabel(deadline: Date): string {
  const ms = deadline.getTime() - Date.now();
  if (ms <= 0) return "Overdue";
  const days = Math.ceil(ms / 86400000);
  if (days === 1) return "Due in 1 day";
  if (days <= 7) return `Due in ${days} days`;
  return formatTimeRemaining(deadline);
}

export function DeadlineProgress({ deadline, createdAt }: DeadlineProgressProps) {
  const urgency = getDeadlineUrgency(deadline);
  const progress = getDeadlineProgress(deadline, createdAt);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-brand-navy dark:text-brand-gold">{dueLabel(deadline)}</span>
        <span className="text-muted-foreground">{formatTimeRemaining(deadline)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          className={cn("h-full rounded-full", URGENCY_COLORS[urgency])}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
