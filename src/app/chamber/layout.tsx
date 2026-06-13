"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/app-store";

export default function ChamberLayout({ children }: { children: React.ReactNode }) {
  const setWorld = useAppStore((s) => s.setWorld);

  useEffect(() => {
    setWorld("chamber");
  }, [setWorld]);

  return (
    <div className="min-h-screen bg-[#0F1419] text-gray-100">
      {children}
    </div>
  );
}
