import { create } from "zustand";
import type { ProtectedAction } from "@/lib/permissions";

export interface PendingAuthAction {
  action: ProtectedAction;
  returnPath?: string;
  metadata?: Record<string, string>;
}

interface AuthGateState {
  open: boolean;
  pending: PendingAuthAction | null;
  requestAuth: (pending: PendingAuthAction) => void;
  close: () => void;
  clearPending: () => void;
}

export const useAuthGateStore = create<AuthGateState>((set) => ({
  open: false,
  pending: null,
  requestAuth: (pending) => set({ open: true, pending }),
  close: () => set({ open: false }),
  clearPending: () => set({ pending: null }),
}));
