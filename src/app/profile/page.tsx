"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRoleStore } from "@/stores/role-store";
import { useAppStore } from "@/stores/app-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserRole } from "@/types";
import Link from "next/link";

const ROLES: { value: UserRole; label: string; desc: string }[] = [
  { value: "spectator", label: "Spectator", desc: "View, vote, bookmark" },
  { value: "participant", label: "Participant", desc: "Post, reply, join groups" },
  { value: "creator", label: "Creator", desc: "Create groups, assignments, talent offers" },
];

export default function ProfilePage() {
  const { profile, signOut, isDemo, enterDemoMode } = useAuth();
  const { role, setRole } = useRoleStore();
  const { activePseudonym, setPseudonym, authMode, setAuthMode } = useAppStore();

  const initials =
    profile?.displayName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "?";

  return (
    <main className="mx-auto max-w-lg p-4 lg:p-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <Card className="mt-6 rounded-2xl">
        <CardContent className="flex flex-col items-center p-6 text-center">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary text-xl text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-xl font-semibold">{profile?.displayName ?? "Guest"}</h2>
          <p className="text-sm text-muted-foreground">
            {profile?.university ?? "Set up in onboarding"}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {profile?.badges?.map((b) => (
              <Badge key={b} variant="secondary" className="rounded-lg">
                {b}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium">Role (demo)</p>
          <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label} — {r.desc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Active pseudonym</p>
          <div className="flex gap-2">
            <input
              className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm"
              value={activePseudonym ?? ""}
              onChange={(e) => setPseudonym(e.target.value || null)}
              placeholder="e.g. QuietOwl"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Anonymity layer</p>
          <Select value={authMode} onValueChange={(v) => setAuthMode(v as typeof authMode)}>
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pseudonym">Pseudonym (default)</SelectItem>
              <SelectItem value="anonymous_post">Anonymous post toggle</SelectItem>
              <SelectItem value="anonymous_code">Chamber code only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <p className="text-xs text-muted-foreground">
          No lecturer or staff accounts are permitted on Hivoraa.
        </p>

        <div className="flex flex-col gap-2">
          {!profile && !isDemo && (
            <Button variant="secondary" className="rounded-xl" onClick={enterDemoMode}>
              Enter demo mode
            </Button>
          )}
          <Button variant="outline" className="rounded-xl" asChild>
            <Link href="/onboarding">Complete profile</Link>
          </Button>
          <Button variant="destructive" className="rounded-xl" onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      </div>
    </main>
  );
}
