import type { DeadlineUrgency } from "@/types";

export function getDeadlineUrgency(deadline: Date): DeadlineUrgency {
  const now = Date.now();
  const end = deadline.getTime();
  const total = end - (end - 14 * 86400000);
  const remaining = end - now;
  const ratio = remaining / Math.max(total, 1);

  if (remaining <= 0) return "red";
  if (ratio < 0.2 || remaining < 86400000 * 2) return "red";
  if (ratio < 0.5 || remaining < 86400000 * 5) return "yellow";
  return "green";
}

export function getDeadlineProgress(deadline: Date, createdAt: Date): number {
  const start = createdAt.getTime();
  const end = deadline.getTime();
  const now = Date.now();
  if (now >= end) return 100;
  if (now <= start) return 0;
  return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
}

export function formatTimeRemaining(deadline: Date): string {
  const ms = deadline.getTime() - Date.now();
  if (ms <= 0) return "Overdue";
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h left`;
  const mins = Math.floor((ms % 3600000) / 60000);
  return `${mins}m left`;
}

export const URGENCY_COLORS: Record<DeadlineUrgency, string> = {
  green: "bg-success",
  yellow: "bg-warning",
  red: "bg-danger",
};

export const URGENCY_BG: Record<DeadlineUrgency, string> = {
  green: "bg-success/10 text-success border-success/30",
  yellow: "bg-warning/10 text-warning border-warning/30",
  red: "bg-danger/10 text-danger border-danger/30",
};
