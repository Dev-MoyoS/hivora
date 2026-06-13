"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-[#F3F4F6]/50 px-6 py-16 text-center dark:border-gray-800 dark:bg-gray-900/50"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-gray-800">
        <Icon className="h-7 w-7 text-[#0B1F4D]" />
      </div>
      <h3 className="text-lg font-medium text-[#111827] dark:text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-6 bg-[#0B1F4D] hover:bg-[#091833]">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
