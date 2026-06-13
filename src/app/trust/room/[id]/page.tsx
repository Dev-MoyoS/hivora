"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { TRUST_ROOMS, SUPPORTIVE_REACTIONS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { WorldBridge } from "@/components/worlds/world-bridge";
import type { TrustRoomId } from "@/types";

export default function TrustRoomPage() {
  const params = useParams();
  const roomId = params.id as TrustRoomId;
  const room = TRUST_ROOMS.find((r) => r.id === roomId);

  if (!room) return <p className="p-6">Room not found</p>;

  return (
    <main className="p-4 lg:p-6">
      <Link href="/trust" className="text-sm text-primary hover:underline">
        ← Rooms
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">{room.name}</h1>
      <p className="text-muted-foreground">{room.description}</p>

      <Card className="mt-6 rounded-2xl">
        <CardContent className="p-5">
          <p className="text-xs text-muted-foreground">
            Moderator tools: remove · warn · mute · refer to Listening Chamber
          </p>
          <Textarea placeholder="Share with a temporary pseudonym..." className="mt-4 min-h-[100px] rounded-xl resize-none" />
          <div className="mt-3 flex gap-2">
            {SUPPORTIVE_REACTIONS.map((r) => (
              <span key={r} className="text-lg">{r}</span>
            ))}
          </div>
          <Button className="mt-4 rounded-xl">Post</Button>
        </CardContent>
      </Card>

      <div className="mt-6">
        <WorldBridge variant="chamber" message="Moderators may gently suggest the Listening Chamber if you're in crisis." />
      </div>
    </main>
  );
}
