"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { ONBOARDING_PHASES } from "@/lib/constants";
import Link from "next/link";

export default function OnboardingPage() {
  const router = useRouter();
  const [phase, setPhase] = useState(1);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <Logo href="/" className="mb-8 justify-center" size="lg" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg rounded-2xl border border-border bg-card p-8"
      >
        <h1 className="text-2xl font-semibold">Welcome to Hivoraa</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Phased rollout — you&apos;re joining during Phase {phase}
        </p>
        <div className="mt-6 space-y-4">
          {ONBOARDING_PHASES.map((p) => (
            <div
              key={p.phase}
              className={`rounded-xl border p-4 ${p.phase === phase ? "border-primary bg-primary/5" : "border-border opacity-60"}`}
            >
              <p className="font-medium">
                Phase {p.phase}: {p.title}
              </p>
              <ul className="mt-2 text-sm text-muted-foreground">
                {p.items.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex gap-2">
          {phase < 4 && (
            <Button variant="outline" className="rounded-xl" onClick={() => setPhase((p) => p + 1)}>
              Next phase
            </Button>
          )}
          <Button className="flex-1 rounded-xl" onClick={() => router.push("/knowledge")}>
            Enter Knowledge Square
          </Button>
        </div>
        <Link href="/privacy" className="mt-4 block text-center text-xs text-primary">
          Privacy philosophy
        </Link>
      </motion.div>
    </div>
  );
}
