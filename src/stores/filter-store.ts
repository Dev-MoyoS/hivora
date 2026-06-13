import { create } from "zustand";
import type { FeedTab } from "@/types";

interface FilterState {
  course: string;
  module: string;
  tab: FeedTab;
  set: (partial: Partial<FilterState>) => void;
  reset: () => void;
}

const initial = {
  course: "",
  module: "",
  tab: "for_you" as FeedTab,
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initial,
  set: (partial) => set(partial),
  reset: () => set(initial),
}));

export function tabToSort(tab: FeedTab) {
  switch (tab) {
    case "recent":
      return "newest";
    case "most_active":
      return "most_active";
    case "deadline_soon":
      return "nearest_deadline";
    default:
      return "trending";
  }
}
