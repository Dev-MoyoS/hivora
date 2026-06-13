"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { TRUST_ROOMS, SUPPORTIVE_REACTIONS } from "@/lib/constants";
import { MOCK_TRUST_POSTS, MOCK_MENTORS } from "@/lib/mock-data";
import { WorldBridge } from "@/components/worlds/world-bridge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Eye, Shield } from "lucide-react";

export default function TrustCirclePage() {
  const [spectator, setSpectator] = useState(false);

  return (
    <main className="p-4 lg:p-6">
      <h1 className="text-2xl font-semibold">Trust Circle</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Temporary pseudonyms · trained student moderators · supportive reactions only
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant={spectator ? "default" : "outline"}
          size="sm"
          className="rounded-xl gap-1"
          onClick={() => setSpectator(!spectator)}
        >
          <Eye className="h-4 w-4" />
          {spectator ? "Spectator mode on" : "Read-only spectator"}
        </Button>
      </div>

      <div className="mt-6">
        <WorldBridge variant="chamber" message="Severe distress? The Listening Chamber is fully anonymous with code-only return." />
      </div>

      <h2 className="mb-4 mt-8 text-lg font-medium">Themed rooms</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {TRUST_ROOMS.map((room, i) => (
          <motion.div key={room.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Link href={`/trust/room/${room.id}`}>
              <Card className="rounded-2xl border-amber-100/60 bg-card/80 transition-shadow hover:shadow-md dark:border-amber-900/40">
                <CardContent className="p-5">
                  <h3 className="font-semibold">{room.name}</h3>
                  <p className="text-sm text-muted-foreground">{room.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <h2 className="mb-4 mt-10 text-lg font-medium">Mentor matching</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {MOCK_MENTORS.map((m) => (
          <Card key={m.id} className="rounded-2xl">
            <CardContent className="p-4">
              <Badge className="rounded-lg capitalize">{m.type}</Badge>
              <p className="mt-2 font-medium">{m.pseudonym}</p>
              <p className="text-xs text-muted-foreground">{m.topics.join(" · ")}</p>
              <Button size="sm" className="mt-3 rounded-xl" disabled={!m.available}>
                Request anonymous chat
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {!spectator && (
        <>
          <h2 className="mb-4 mt-10 text-lg font-medium">Recent posts</h2>
          <div className="space-y-4">
            {MOCK_TRUST_POSTS.map((post) => (
              <Card key={post.id} className="rounded-2xl">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground">
                    {post.authorPseudonym} · {formatDistanceToNow(post.createdAt, { addSuffix: true })} · {post.likes} likes
                  </p>
                  <p className="mt-3 text-sm leading-relaxed">{post.content}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {SUPPORTIVE_REACTIONS.map((r) => (
                      <button key={r} type="button" className="rounded-xl border px-3 py-1.5 text-sm hover:bg-muted/50">
                        {r} {post.reactions[r] ?? 0}
                      </button>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2 text-xs text-muted-foreground">
                    <Shield className="mr-1 h-3 w-3" />
                    Report · AI moderation active
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
