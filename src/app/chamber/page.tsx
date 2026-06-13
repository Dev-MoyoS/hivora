"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LogoSymbol } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { EMERGENCY_RESOURCES } from "@/lib/constants";

export default function ChamberDisclaimerPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <LogoSymbol size={48} className="mx-auto opacity-90" />
        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-gray-100">
          Listening Chamber
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-gray-400">
          You are completely anonymous. Nothing shared here can be traced back to you.
          You are safe.
        </p>
        <p className="mx-auto mt-4 max-w-md text-xs text-gray-500">
          No notifications. No likes. No followers. No profiles. Save your code — nothing else links to you.
        </p>

        <div className="mt-10 rounded-2xl border border-gray-800 bg-[#141a22] p-5 text-left text-sm text-gray-400">
          <p className="font-medium text-gray-200">Before you continue</p>
          <p className="mt-2 leading-relaxed">
            This is not emergency medical care. If you are in immediate danger, call emergency services now.
          </p>
          <ul className="mt-4 space-y-2">
            {EMERGENCY_RESOURCES.map((r) => (
              <li key={r.name}>
                <span className="text-gray-300">{r.name}</span>
                <br />
                <span className="text-red-300/90">{r.phone}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="rounded-xl bg-gray-100 text-[#111827] hover:bg-white">
            <Link href="/chamber/doors">Choose a support door</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl border-gray-700 text-gray-300">
            <Link href="/chamber/return">I have a tracking code</Link>
          </Button>
        </div>

        <Link href="/" className="mt-12 inline-block text-xs text-gray-600 hover:text-gray-400">
          Leave the Chamber
        </Link>
      </motion.div>
    </main>
  );
}
