import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookmarkState {
  postIds: string[];
  toggle: (postId: string) => void;
  isBookmarked: (postId: string) => boolean;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      postIds: [],
      toggle: (postId) =>
        set((s) => ({
          postIds: s.postIds.includes(postId)
            ? s.postIds.filter((id) => id !== postId)
            : [...s.postIds, postId],
        })),
      isBookmarked: (postId) => get().postIds.includes(postId),
    }),
    { name: "hivoraa-bookmarks" }
  )
);
