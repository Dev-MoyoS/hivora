"use client";

import { useState } from "react";
import { Mic, MicOff, PhoneOff, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const MOCK_PARTICIPANTS = [
  { id: "1", name: "TreeWalker", speaking: true, muted: false },
  { id: "2", name: "You", speaking: false, muted: false },
  { id: "3", name: "Anonymous", speaking: false, muted: true },
];

interface VoiceRoomProps {
  roomId: string;
  onLeave?: () => void;
}

/** WebRTC / Agora integration placeholder — UI ready for SDK wiring */
export function VoiceRoom({ roomId, onLeave }: VoiceRoomProps) {
  const [joined, setJoined] = useState(false);
  const [muted, setMuted] = useState(false);
  const [pushToTalk, setPushToTalk] = useState(false);

  if (!joined) {
    return (
      <div className="rounded-2xl border border-border bg-muted/30 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Lightweight voice study room · Discord-inspired · auto-closes after session
        </p>
        <Button className="mt-4 rounded-xl" onClick={() => setJoined(true)}>
          Join voice room
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">
          WebRTC / Agora SDK — connect in production
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Voice · {roomId}</span>
        <Badge variant="secondary" className="rounded-lg">
          Live
        </Badge>
      </div>
      <ul className="mt-4 space-y-2">
        {MOCK_PARTICIPANTS.map((p) => (
          <li
            key={p.id}
            className={cn(
              "flex items-center justify-between rounded-xl px-3 py-2",
              p.speaking && "bg-primary/10 ring-1 ring-primary/20"
            )}
          >
            <span className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              {p.name}
            </span>
            {p.speaking && (
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <Button
          variant={muted ? "destructive" : "outline"}
          size="icon"
          className="rounded-xl"
          onClick={() => setMuted(!muted)}
        >
          {muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        <Button
          variant={pushToTalk ? "secondary" : "ghost"}
          size="sm"
          className="rounded-xl"
          onClick={() => setPushToTalk(!pushToTalk)}
        >
          Push-to-talk
        </Button>
        <Button variant="destructive" size="icon" className="rounded-xl" onClick={() => { setJoined(false); onLeave?.(); }}>
          <PhoneOff className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
