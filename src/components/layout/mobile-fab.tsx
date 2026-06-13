"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileFabProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export function MobileFab({ label, onClick, className }: MobileFabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "fixed z-40 flex h-14 touch-manipulation items-center gap-2 rounded-full bg-brand-navy px-5 text-sm font-semibold text-white shadow-lg",
        "bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-4",
        "active:scale-95 hover:bg-brand-navy/90 lg:hidden",
        className
      )}
    >
      <Plus className="h-5 w-5" />
      <span className="max-[380px]:sr-only">{label}</span>
    </button>
  );
}
