import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SearchResult } from "@/types";

interface SearchState {
  query: string;
  isOpen: boolean;
  recent: string[];
  results: SearchResult[];
  setQuery: (q: string) => void;
  setOpen: (open: boolean) => void;
  setResults: (results: SearchResult[]) => void;
  addRecent: (q: string) => void;
  clearRecent: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      query: "",
      isOpen: false,
      recent: [],
      results: [],
      setQuery: (query) => set({ query }),
      setOpen: (isOpen) => set({ isOpen }),
      setResults: (results) => set({ results }),
      addRecent: (q) => {
        const trimmed = q.trim();
        if (!trimmed) return;
        const recent = [trimmed, ...get().recent.filter((r) => r !== trimmed)].slice(0, 8);
        set({ recent });
      },
      clearRecent: () => set({ recent: [] }),
    }),
    { name: "hivoraa-search", partialize: (s) => ({ recent: s.recent }) }
  )
);

export const TRENDING_SEARCHES = [
  "CSC3001",
  "MAM2000",
  "past papers",
  "study group",
  "Photoshop help",
];
