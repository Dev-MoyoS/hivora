"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HelpPostCard } from "@/components/knowledge/help-post-card";
import { FeedTabs } from "@/components/knowledge/feed-tabs";
import { FeedWithAds } from "@/components/ads/feed-with-ads";
import { MobileDiscoveryStrip } from "@/components/layout/mobile-discovery-strip";
import { MobileFab } from "@/components/layout/mobile-fab";
import { SkeletonGrid } from "@/components/shared/skeleton-grid";
import { useFilterStore, tabToSort } from "@/stores/filter-store";
import { useAuthGate } from "@/hooks/use-auth-gate";
import { MOCK_HELP_POSTS, MOCK_COMMENTS } from "@/lib/mock-data";
import { isFirebaseConfigured } from "@/lib/firebase";
import { subscribeToPosts } from "@/lib/firestore";
import type { HelpPost } from "@/types";

function sortPosts(posts: HelpPost[], sort: string) {
  const copy = [...posts];
  switch (sort) {
    case "most_active":
      return copy.sort((a, b) => b.commentCount + b.upvotes - (a.commentCount + a.upvotes));
    case "nearest_deadline":
      return copy.sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
    case "trending":
      return copy.sort((a, b) => b.upvotes + b.likes - (a.upvotes + a.likes));
    default:
      return copy.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export function KnowledgeFeed() {
  const [posts, setPosts] = useState<HelpPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { course, module, tab } = useFilterStore();
  const { requireAuth } = useAuthGate();
  const sort = tabToSort(tab);

  useEffect(() => {
    if (isFirebaseConfigured) {
      const unsub = subscribeToPosts((data) => {
        setPosts(data.length > 0 ? data : MOCK_HELP_POSTS);
        setLoading(false);
      }, 30);
      if (!unsub) {
        setPosts(MOCK_HELP_POSTS);
        setLoading(false);
      }
      return () => unsub?.();
    }

    const t = setTimeout(() => {
      setPosts(MOCK_HELP_POSTS);
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = posts;
    const code = course || module;
    if (code) {
      list = list.filter(
        (p) =>
          p.moduleTag.toLowerCase().includes(code.toLowerCase()) ||
          p.courseTag.toLowerCase().includes(code.toLowerCase())
      );
    }
    return sortPosts(list, sort);
  }, [posts, course, module, sort]);

  const askHelp = () => {
    if (!requireAuth("create_post", { returnPath: "/knowledge/new" })) return;
    window.location.href = "/knowledge/new";
  };

  return (
    <div>
      <FeedTabs />
      <MobileDiscoveryStrip />

      <div className="mb-4 flex justify-end sm:mb-6">
        <Button
          onClick={askHelp}
          className="hidden rounded-xl bg-brand-navy text-white shadow-sm hover:bg-brand-navy/90 lg:inline-flex"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ask for help
        </Button>
      </div>
      <MobileFab onClick={askHelp} label="Ask for help" />

      {loading ? (
        <SkeletonGrid count={2} />
      ) : (
        <FeedWithAds
          items={filtered}
          renderItem={(post) => (
            <HelpPostCard
              post={post}
              comments={MOCK_COMMENTS[post.id] ?? []}
              onUpvote={(id) =>
                setPosts((prev) =>
                  prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p))
                )
              }
            />
          )}
        />
      )}
    </div>
  );
}
