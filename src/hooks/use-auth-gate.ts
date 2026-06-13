"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useRoleStore } from "@/stores/role-store";
import {
  PERMISSIONS,
  roleFromProfile,
  type ProtectedAction,
  type PermissionKey,
} from "@/lib/permissions";
import { useAuthGateStore } from "@/stores/auth-gate-store";

export function usePermissions() {
  const { user, profile, isDemo, loading } = useAuth();
  const role = useRoleStore((s) => s.role);
  const setRole = useRoleStore((s) => s.setRole);

  const isAuthenticated = Boolean(user) || isDemo;
  const isVisitor = !loading && !isAuthenticated;

  useEffect(() => {
    if (isVisitor) {
      setRole("spectator");
      return;
    }
    if (profile) {
      setRole(roleFromProfile(profile.role, profile));
    }
  }, [isVisitor, profile, setRole]);

  const can = useCallback(
    (action: PermissionKey) => {
      if (isVisitor) return false;
      return PERMISSIONS[role][action];
    },
    [isVisitor, role]
  );

  return { can, isVisitor, isAuthenticated, role, loading };
}

export function useAuthGate() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading } = usePermissions();
  const requestAuth = useAuthGateStore((s) => s.requestAuth);
  const pending = useAuthGateStore((s) => s.pending);
  const clearPending = useAuthGateStore((s) => s.clearPending);
  const close = useAuthGateStore((s) => s.close);

  const requireAuth = useCallback(
    (action: ProtectedAction, options?: { returnPath?: string; metadata?: Record<string, string> }) => {
      if (loading) return false;
      if (isAuthenticated) return true;
      requestAuth({
        action,
        returnPath: options?.returnPath ?? pathname,
        metadata: options?.metadata,
      });
      return false;
    },
    [isAuthenticated, loading, pathname, requestAuth]
  );

  useEffect(() => {
    if (!isAuthenticated || !pending) return;
    const path = pending.returnPath;
    clearPending();
    close();
    if (path && path !== pathname) {
      router.push(path);
    }
  }, [isAuthenticated, pending, clearPending, close, router, pathname]);

  return { requireAuth, isAuthenticated };
}
