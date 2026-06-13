"use client";

import { useFilterStore } from "@/stores/filter-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CAMPUS_COURSES } from "@/lib/mock-data";

export function FeedFiltersPanel({ onClose }: { onClose?: () => void }) {
  const { course, set, reset } = useFilterStore();

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-2">
        <Select value={course || "all"} onValueChange={(v) => set({ course: v === "all" ? "" : v })}>
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Course / module" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All courses</SelectItem>
            {CAMPUS_COURSES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={reset} className="flex-1 rounded-xl">
            Clear
          </Button>
          {onClose && (
            <Button onClick={onClose} className="flex-1 rounded-xl bg-brand-navy text-white hover:bg-brand-navy/90">
              Apply
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
