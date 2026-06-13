"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function GoalsPage() {
  const [goals, setGoals] = useState([
    "Drink water between study blocks",
    "One social connection this week",
  ]);
  const [newGoal, setNewGoal] = useState("");

  return (
    <main className="p-4 lg:p-6">
      <h1 className="text-2xl font-semibold">Private Goals</h1>
      <p className="text-sm text-muted-foreground">Small steps. No pressure.</p>

      <div className="mt-6 space-y-3">
        {goals.map((g) => (
          <Card key={g} className="rounded-2xl border-amber-100">
            <CardContent className="flex items-center gap-3 p-4">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-200"
              >
                <Check className="h-4 w-4 text-amber-800" />
              </button>
              <span className="text-sm">{g}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <Input
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Add a gentle goal..."
          className="rounded-xl"
        />
        <Button
          className="rounded-xl bg-amber-800"
          onClick={() => {
            if (newGoal.trim()) {
              setGoals((prev) => [...prev, newGoal]);
              setNewGoal("");
            }
          }}
        >
          Add
        </Button>
      </div>
    </main>
  );
}
