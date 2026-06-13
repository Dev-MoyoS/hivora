"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { MOCK_HELP_POSTS } from "@/lib/mock-data";
import { HelpPostCard } from "@/components/knowledge/help-post-card";
import { MOCK_COMMENTS } from "@/lib/mock-data";
import { EmptyState } from "@/components/shared/empty-state";

export default function SavedPostsPage() {
  const postIds = useBookmarkStore((s) => s.postIds);
  const saved = MOCK_HELP_POSTS.filter((p) => postIds.includes(p.id));

  return (
    <main className="p-4 lg:p-6">
      <h1 className="text-2xl font-semibold">Saved posts</h1>
      <p className="text-sm text-muted-foreground">Quick access to bookmarked help requests</p>

      {saved.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={Bookmark}
            title="Nothing saved yet"
            description="Tap the bookmark icon on any post in Knowledge Square."
            actionLabel="Browse feed"
            onAction={() => (window.location.href = "/knowledge")}
          />
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {saved.map((post) => (
            <HelpPostCard
              key={post.id}
              post={post}
              comments={MOCK_COMMENTS[post.id] ?? []}
            />
          ))}
        </div>
      )}
    </main>
  );
}
