"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function JournalPage() {
  const [entry, setEntry] = useState("");

  return (
    <main className="p-4 lg:p-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-6 w-6 text-amber-800" />
        <div>
          <h1 className="text-2xl font-semibold">Private Journal</h1>
          <p className="text-sm text-muted-foreground">
            Only you can see this. Stored locally until Firebase sync.
          </p>
        </div>
      </div>

      <Card className="mt-6 rounded-2xl border-amber-100">
        <CardContent className="p-5">
          <p className="mb-4 text-sm text-muted-foreground">How are you feeling today? (1–5)</p>
          <div className="mb-4 flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className="h-10 w-10 rounded-xl border border-amber-100 hover:bg-amber-50"
              >
                {n}
              </button>
            ))}
          </div>
          <Textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write freely. No one else reads this."
            className="min-h-[200px] rounded-xl resize-none"
          />
          <Button className="mt-4 rounded-xl bg-amber-800">Save entry</Button>
        </CardContent>
      </Card>
    </main>
  );
}
