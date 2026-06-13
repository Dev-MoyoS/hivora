"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SUPPORT_DOORS } from "@/lib/constants";
import { LogoSymbol } from "@/components/shared/logo";

export default function ChamberDoorsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/chamber" className="text-sm text-gray-500 hover:text-gray-300">
        ← Back
      </Link>
      <div className="mt-8 flex justify-center">
        <LogoSymbol size={40} className="opacity-80" />
      </div>
      <h1 className="mt-6 text-2xl font-semibold">Choose a door</h1>
      <p className="mt-2 text-sm text-gray-400">
        Each door leads to a private, anonymous form
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {SUPPORT_DOORS.map((door, i) => {
          const Icon = door.icon;
          return (
            <motion.div
              key={door.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/chamber/submit/${door.id}`}>
                <div className="rounded-2xl border border-gray-800 bg-[#1a1f26] p-6 transition-colors hover:border-gray-600">
                  <Icon className="h-6 w-6 text-gray-400" />
                  <h2 className="mt-4 font-medium text-gray-100">{door.title}</h2>
                  <p className="mt-2 text-sm text-gray-500">{door.description}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
