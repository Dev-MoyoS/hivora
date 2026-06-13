"use client";

import { motion } from "framer-motion";
import { BarChart3, Flag, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_CAMPUS_PULSE } from "@/lib/mock-data";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <header className="border-b border-gray-100 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Logo href="/admin" />
          <Link href="/">
            <Button variant="outline" className="rounded-xl">
              Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-6">
        <h1 className="text-2xl font-semibold text-[#111827]">Admin — Aggregated only</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          No individual identities. Anonymous statistics and moderation queues only.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Response queue", value: "24", icon: Flag },
            { label: "Reports (24h)", value: "7", icon: BarChart3 },
            { label: "Crisis spike alerts", value: "2", icon: TrendingUp },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="rounded-2xl">
                <CardContent className="flex items-center gap-4 p-5">
                  <s.icon className="h-8 w-8 text-[#0B1F4D]" />
                  <div>
                    <p className="text-2xl font-semibold">{s.value}</p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="mt-8 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Campus Pulse — anonymous wellbeing analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {MOCK_CAMPUS_PULSE.map((m) => (
              <div
                key={m.label}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
              >
                <div>
                  <p className="font-medium">{m.label}</p>
                  <p className="text-xs text-muted-foreground capitalize">{m.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{m.value}%</p>
                  <p
                    className={`text-xs ${
                      m.trend === "up" ? "text-amber-600" : "text-gray-500"
                    }`}
                  >
                    {m.trend}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mt-6 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Crisis heatmap (aggregated)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
                <div
                  key={d}
                  className="rounded-lg p-4 text-center text-xs"
                  style={{
                    backgroundColor: `rgba(37, 99, 235, ${0.1 + i * 0.15})`,
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Support category spikes · Financial +18% · Exam stress +34%
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
