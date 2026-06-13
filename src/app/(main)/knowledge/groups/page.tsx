"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Map, List, Plus, MapPin, Video } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_STUDY_SESSIONS } from "@/lib/mock-data";
import { format } from "date-fns";
import { useRoleStore } from "@/stores/role-store";

export default function StudyGroupsPage() {
  const [view, setView] = useState<"list" | "map">("list");
  const can = useRoleStore((s) => s.can);

  return (
    <main className="p-4 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Study Groups</h1>
          <p className="text-sm text-muted-foreground">Online or on campus · voice & temp chat after join</p>
        </div>
        {can("createGroup") && (
          <Button asChild className="rounded-xl">
            <Link href="/knowledge/groups/new">
              <Plus className="mr-2 h-4 w-4" />
              Create session
            </Link>
          </Button>
        )}
      </div>

      <Tabs value={view} onValueChange={(v) => setView(v as "list" | "map")} className="mt-6">
        <TabsList className="rounded-xl">
          <TabsTrigger value="list" className="gap-1 rounded-lg">
            <List className="h-4 w-4" /> List
          </TabsTrigger>
          <TabsTrigger value="map" className="gap-1 rounded-lg">
            <Map className="h-4 w-4" /> Map
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {view === "map" && (
        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted/30">
          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
            Campus map · interactive pins (Mapbox/Google Maps in production)
          </div>
          {MOCK_STUDY_SESSIONS.filter((s) => s.campusPin).map((s, i) => (
            <Link
              key={s.id}
              href={`/knowledge/groups/${s.id}`}
              className="absolute flex flex-col items-center"
              style={{ left: `${30 + i * 25}%`, top: `${40 + i * 10}%` }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground shadow-lg">
                {s.participantCount}
              </span>
              <span className="mt-1 max-w-[80px] truncate rounded bg-card px-1 text-[10px] shadow">
                {s.module}
              </span>
              {s.isLive && (
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500" />
              )}
            </Link>
          ))}
        </div>
      )}

      <div className={view === "list" ? "mt-6 space-y-4" : "hidden"}>
        {MOCK_STUDY_SESSIONS.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="rounded-2xl">
              <CardContent className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <h3 className="font-semibold">{s.title}</h3>
                      {s.isLive && <Badge className="rounded-lg bg-red-500">Live</Badge>}
                      {s.isFull && <Badge variant="secondary" className="rounded-lg">Complete</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{s.studyFocus}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        {s.isOnline ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
                        {s.location}
                      </span>
                      <span>{format(s.scheduledAt, "EEE, MMM d · h:mm a")}</span>
                      <span>
                        {s.participantCount}/{s.maxParticipants} · {s.allowAnonymous ? "anon OK" : ""}
                      </span>
                    </div>
                    <Badge variant="outline" className="mt-2 rounded-lg">
                      {s.module}
                    </Badge>
                  </div>
                  <Button asChild disabled={s.isFull} className="rounded-xl">
                    <Link href={`/knowledge/groups/${s.id}`}>
                      {s.isFull ? "Full" : "View & join"}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
