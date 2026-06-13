import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserRole } from "@/types";
import { PERMISSIONS, type PermissionKey } from "@/lib/permissions";

interface RoleState {
  role: UserRole;
  setRole: (role: UserRole) => void;
  can: (action: PermissionKey) => boolean;
}

export const useRoleStore = create<RoleState>()(
  persist(
    (set, get) => ({
      role: "spectator",
      setRole: (role) => set({ role }),
      can: (action) => PERMISSIONS[get().role][action],
    }),
    { name: "hivoraa-role" }
  )
);

export { PERMISSIONS };
