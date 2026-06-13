"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  MessageCircle,
  Bookmark,
  Star,
  Share2,
  AlertCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserAvatar } from "@/components/shared/user-avatar";
import { DifficultyBarometer } from "@/components/knowledge/difficulty-barometer";
import { DeadlineProgress } from "@/components/knowledge/deadline-progress";
import { WorldBridge } from "@/components/worlds/world-bridge";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { useAuthGate } from "@/hooks/use-auth-gate";
import type { HelpPost, PostComment } from "@/types";
import { cn } from "@/lib/utils";

function CommentBody({ content }: { content: string }) {
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
      {parts.map((part, i) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const code = part.slice(3, -3).replace(/^\w+\n/, "");
          return (
            <pre
              key={i}
              className="overflow-x-auto rounded-xl bg-brand-navy p-4 text-xs leading-relaxed text-emerald-300"
            >
              <code>{code.trim()}</code>
            </pre>
          );
        }
        return part.trim() ? (
          <p key={i} className="whitespace-pre-wrap">
            {part}
          </p>
        ) : null;
      })}
    </div>
  );
}

interface HelpPostCardProps {
  post: HelpPost;
  comments?: PostComment[];
  onUpvote?: (id: string) => void;
}

export function HelpPostCard({ post, comments = [], onUpvote }: HelpPostCardProps) {
  const [reply, setReply] = useState("");
  const [localComments, setLocalComments] = useState(comments);
  const [repliesExpanded, setRepliesExpanded] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [score, setScore] = useState(post.upvotes);
  const [usefulMarked, setUsefulMarked] = useState(false);
  const { toggle, isBookmarked } = useBookmarkStore();
  const { requireAuth } = useAuthGate();
  const saved = isBookmarked(post.id);
  const replyCount = Math.max(post.commentCount, localComments.length);

  const handleReply = () => {
    if (!requireAuth("reply")) return;
    if (!reply.trim()) return;
    setLocalComments((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        postId: post.id,
        authorPseudonym: "You",
        isAnonymous: false,
        content: reply,
        upvotes: 0,
        likes: 0,
        createdAt: new Date(),
      },
    ]);
    setReply("");
    setRepliesExpanded(true);
  };

  const handleUpvote = () => {
    if (!requireAuth("vote")) return;
    if (upvoted) {
      setUpvoted(false);
      setScore((s) => s - 1);
    } else {
      setUpvoted(true);
      setDownvoted(false);
      setScore((s) => s + (downvoted ? 2 : 1));
      onUpvote?.(post.id);
    }
  };

  const handleDownvote = () => {
    if (!requireAuth("vote")) return;
    if (downvoted) {
      setDownvoted(false);
      setScore((s) => s + 1);
    } else {
      setDownvoted(true);
      setUpvoted(false);
      setScore((s) => s - (upvoted ? 2 : 1));
    }
  };

  return (
    <motion.article
      id={`post-${post.id}`}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl",
        post.noReplyRescue && "border-amber-500/40 ring-1 ring-amber-500/20 dark:border-amber-500/30"
      )}
    >
      {post.noReplyRescue && (
        <div className="flex items-center gap-2 bg-amber-500/10 px-6 py-2.5 text-xs text-amber-700 dark:text-amber-300">
          <AlertCircle className="h-3.5 w-3.5" />
          No Reply Rescue — boosted for visibility
        </div>
      )}

      <div className="space-y-4 p-4 sm:space-y-5 sm:p-6">
        <div className="space-y-3">
          <Badge className="rounded-lg bg-brand-navy px-3 py-1 text-xs font-semibold text-white">
            {post.moduleTag}
          </Badge>

          <h2 className="text-lg font-semibold leading-snug text-brand-navy dark:text-foreground sm:text-xl">
            {post.assignmentTitle}
          </h2>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>
              Posted by{" "}
              <span className="font-medium text-foreground">{post.authorPseudonym}</span>
            </span>
            <span>·</span>
            <span>{formatDistanceToNow(post.createdAt, { addSuffix: true })}</span>
            {post.isAnonymous && (
              <Badge variant="outline" className="rounded-md border-brand-gold/40 text-xs text-brand-gold">
                Anonymous
              </Badge>
            )}
          </div>
        </div>

        <DeadlineProgress deadline={post.deadline} createdAt={post.createdAt} />

        <DifficultyBarometer postId={post.id} votes={post.difficultyVotes} />

        <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-muted-foreground">
          {post.content}
        </p>

        {post.images && post.images.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-border">
            {post.images.map((src, i) => (
              <img key={i} src={src} alt="" className="max-h-80 w-full object-cover" />
            ))}
          </div>
        )}

        {post.commentCount === 0 && post.noReplyRescue && (
          <WorldBridge
            variant="support"
            message="Still no replies? Trust Circle is here if you need emotional support too."
          />
        )}

        <div className="flex flex-wrap items-center gap-1 border-t border-border pt-4">
          <div className="mr-2 flex items-center gap-0.5 rounded-xl bg-surface-muted px-1">
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8 rounded-lg", upvoted && "text-brand-navy dark:text-brand-gold")}
              onClick={handleUpvote}
            >
              <ChevronUp className={cn("h-4 w-4", upvoted && "stroke-[2.5]")} />
            </Button>
            <span className="min-w-[2ch] text-center text-sm font-semibold tabular-nums">{score}</span>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8 rounded-lg", downvoted && "text-danger")}
              onClick={handleDownvote}
            >
              <ChevronDown className={cn("h-4 w-4", downvoted && "stroke-[2.5]")} />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-1.5 rounded-xl", repliesExpanded && "text-brand-navy dark:text-brand-gold")}
            aria-expanded={repliesExpanded}
            onClick={() => setRepliesExpanded((open) => !open)}
          >
            <MessageCircle className="h-4 w-4" />
            {replyCount}
            <ChevronDown
              className={cn("h-3.5 w-3.5 transition-transform", repliesExpanded && "rotate-180")}
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-1.5 rounded-xl", usefulMarked && "text-brand-gold")}
            onClick={() => {
              if (!requireAuth("like")) return;
              setUsefulMarked(!usefulMarked);
            }}
          >
            <Star className={cn("h-4 w-4", usefulMarked && "fill-current")} />
            Useful
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-1.5 rounded-xl", saved && "text-brand-navy dark:text-brand-gold")}
            onClick={() => {
              if (!requireAuth("bookmark")) return;
              toggle(post.id);
            }}
          >
            <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
            Save
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5 rounded-xl">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        {repliesExpanded && replyCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border pt-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-brand-navy dark:text-brand-gold">
                {replyCount} Replies
              </h3>
              <Select defaultValue="best">
                <SelectTrigger className="h-8 w-24 rounded-lg text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="best">Best</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="old">Old</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {localComments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <UserAvatar name={c.authorPseudonym} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {c.isAnonymous ? "Anonymous" : c.authorPseudonym}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(c.createdAt, { addSuffix: true })}
                      </span>
                      {c.isUseful && (
                        <span className="flex items-center gap-1 text-xs font-medium text-brand-gold">
                          <Star className="h-3 w-3 fill-current" />
                          Useful answer
                        </span>
                      )}
                    </div>
                    <CommentBody content={c.content} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex gap-2 border-t border-border pt-4">
          <Textarea
            placeholder="Write a reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="min-h-[72px] flex-1 resize-none rounded-2xl border-border bg-surface-muted"
          />
          <Button onClick={handleReply} className="self-end rounded-xl bg-brand-navy text-white hover:bg-brand-navy/90">
            Reply
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
