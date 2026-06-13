"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MOCK_STUDY_SESSIONS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GroupChat } from "@/components/study/group-chat";
import { VoiceRoom } from "@/components/study/voice-room";
import { format } from "date-fns";

export default function StudyGroupDetailPage() {
  const params = useParams();
  const session = MOCK_STUDY_SESSIONS.find((s) => s.id === params.id);
  const [joined, setJoined] = useState(false);

  if (!session) {
    return <p className="p-6">Session not found</p>;
  }

  return (
    <main className="space-y-6 p-4 lg:p-6">
      <Link href="/knowledge/groups" className="text-sm text-primary hover:underline">
        ← Groups
      </Link>
      <div>
        <h1 className="text-2xl font-semibold">{session.title}</h1>
        <p className="text-muted-foreground">{session.topic}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="outline">{session.module}</Badge>
          <Badge>{session.participantCount}/{session.maxParticipants} participants</Badge>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {session.location} · {format(session.scheduledAt, "PPp")}
        </p>
      </div>

      {!joined ? (
        <Button
          className="rounded-xl"
          disabled={session.isFull}
          onClick={() => setJoined(true)}
        >
          {session.isFull ? "Session full" : "Join session"}
        </Button>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            Temporary group chat & voice unlocked · anonymous participants allowed
          </p>
          {session.voiceRoomId && <VoiceRoom roomId={session.voiceRoomId} />}
          <GroupChat expiresAt={session.endsAt} />
        </>
      )}
    </main>
  );
}
