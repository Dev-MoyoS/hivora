import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthMode, DifficultyVote, WorldId } from "@/types";

interface AppState {
  currentWorld: WorldId | null;
  authMode: AuthMode;
  activePseudonym: string | null;
  anonymousCode: string | null;
  setWorld: (world: WorldId | null) => void;
  setAuthMode: (mode: AuthMode) => void;
  setPseudonym: (name: string | null) => void;
  setAnonymousCode: (code: string | null) => void;
  voteDifficulty: (postId: string, vote: DifficultyVote) => void;
  difficultyVotes: Record<string, DifficultyVote>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentWorld: null,
      authMode: "pseudonym",
      activePseudonym: "QuietOwl",
      anonymousCode: null,
      difficultyVotes: {},
      setWorld: (world) => set({ currentWorld: world }),
      setAuthMode: (mode) => set({ authMode: mode }),
      setPseudonym: (name) => set({ activePseudonym: name }),
      setAnonymousCode: (code) => set({ anonymousCode: code }),
      voteDifficulty: (postId, vote) =>
        set({
          difficultyVotes: { ...get().difficultyVotes, [postId]: vote },
        }),
    }),
    {
      name: "hivoraa-app",
      partialize: (s) => ({
        authMode: s.authMode,
        activePseudonym: s.activePseudonym,
        anonymousCode: s.anonymousCode,
        difficultyVotes: s.difficultyVotes,
      }),
    }
  )
);
