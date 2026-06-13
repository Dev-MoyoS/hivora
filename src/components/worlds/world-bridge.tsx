"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

type BridgeVariant = "support" | "chamber" | "knowledge";

interface WorldBridgeProps {
  variant: BridgeVariant;
  message: string;
  className?: string;
}

const config: Record<
  BridgeVariant,
  { href: string; label: string; icon: typeof Heart; styles: string }
> = {
  support: {
    href: "/trust",
    label: "Visit Trust Circle",
    icon: Heart,
    styles: "border-amber-100 bg-[#FDF8F6] text-amber-900",
  },
  chamber: {
    href: "/chamber",
    label: "Listening Chamber",
    icon: Moon,
    styles: "border-gray-700 bg-[#1a1f26] text-gray-200",
  },
  knowledge: {
    href: "/knowledge",
    label: "Get academic help",
    icon: ArrowRight,
    styles: "border-blue-100 bg-blue-50/50 text-[#111827]",
  },
};

export function WorldBridge({ variant, message, className }: WorldBridgeProps) {
  const c = config[variant];
  const Icon = c.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-2xl border p-4", c.styles, className)}
    >
      <p className="text-sm leading-relaxed opacity-90">{message}</p>
      <Link
        href={c.href}
        className="mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline"
      >
        <Icon className="h-4 w-4" />
        {c.label}
      </Link>
    </motion.div>
  );
}
