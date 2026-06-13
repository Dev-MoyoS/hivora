"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface ChatMessage {
  id: string;
  author: string;
  text: string;
  createdAt: Date;
}

const SEED: ChatMessage[] = [
  { id: "1", author: "TreeWalker", text: "See you all at 8pm!", createdAt: new Date(Date.now() - 3600000) },
];

interface GroupChatProps {
  expiresAt: Date;
}

/** Temporary chat — auto-deletes 24h after session (Firestore TTL in production) */
export function GroupChat({ expiresAt }: GroupChatProps) {
  const [messages, setMessages] = useState(SEED);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { id: Date.now().toString(), author: "You", text, createdAt: new Date() },
    ]);
    setText("");
  };

  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        Chat deletes 24h after session ends · {formatDistanceToNow(expiresAt, { addSuffix: true })}
      </div>
      <div className="max-h-64 space-y-3 overflow-y-auto p-4">
        {messages.map((m) => (
          <div key={m.id}>
            <span className="text-xs font-medium">{m.author}</span>
            <p className="text-sm">{m.text}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 border-t border-border p-3">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message..."
          className="min-h-[44px] resize-none rounded-xl"
        />
        <Button onClick={send} className="rounded-xl">
          Send
        </Button>
      </div>
    </div>
  );
}
