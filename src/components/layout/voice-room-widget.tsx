"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AvatarStack } from "@/components/shared/user-avatar";
import { useAuthGate } from "@/hooks/use-auth-gate";
import { cn } from "@/lib/utils";

const PARTICIPANTS = ["Nova_23", "CodeCraft_", "TreeWalker", "QuietOwl", "PixelForge", "SteadyRiver"];

export function VoiceRoomWidget() {
  const [expanded, setExpanded] = useState(false);
  const [joined, setJoined] = useState(false);
  const [muted, setMuted] = useState(false);
  const { requireAuth } = useAuthGate();

  const tryJoin = () => {
    if (!requireAuth("join_voice")) return;
    setJoined(true);
  };

  return (
    <div
      className={cn(
        "fixed z-40 w-[min(100vw-1.5rem,320px)]",
        "bottom-[calc(5rem+env(safe-area-inset-bottom))] left-3",
        "lg:bottom-6 lg:left-auto lg:right-4"
      )}
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            className="mb-3 overflow-hidden rounded-2xl border border-white/10 bg-brand-navy/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="border-b border-white/10 px-4 py-3">
              <p className="text-sm font-semibold text-white">Voice Study Room</p>
              <p className="text-xs text-white/60">Web Dev 2A Group</p>
            </div>
            <div className="space-y-3 p-4">
              <div className="flex items-center justify-between">
                <AvatarStack names={PARTICIPANTS} max={5} />
                <span className="text-xs text-white/60">{PARTICIPANTS.length} online</span>
              </div>
              {!joined ? (
                <Button
                  size="sm"
                  className="h-10 w-full touch-manipulation rounded-xl bg-brand-gold font-semibold text-brand-navy hover:bg-brand-gold/90"
                  onClick={tryJoin}
                >
                  Join Voice
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 rounded-xl text-white hover:bg-white/10"
                    onClick={() => setMuted(!muted)}
                  >
                    {muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-10 flex-1 rounded-xl text-white/80"
                    onClick={() => setJoined(false)}
                  >
                    Leave room
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileTap={{ scale: 0.99 }}
        onClick={() => setExpanded(!expanded)}
        className="w-full touch-manipulation overflow-hidden rounded-2xl border border-white/10 bg-brand-navy/95 text-left shadow-xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 p-3 sm:p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gold/20 sm:h-10 sm:w-10">
            <Mic className="h-4 w-4 text-brand-gold sm:h-5 sm:w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">Voice room</p>
            <p className="truncate text-xs text-white/60">{PARTICIPANTS.length} online</p>
          </div>
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 text-white/60 transition-transform", expanded && "rotate-180")}
          />
        </div>
      </motion.button>
    </div>
  );
}
