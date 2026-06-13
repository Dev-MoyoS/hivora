import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
  increment,
  type QueryConstraint,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS } from "@/lib/constants";
import type { HelpPost } from "@/types";

function mapPost(id: string, data: Record<string, unknown>): HelpPost {
  return {
    id,
    courseTag: (data.course as string) ?? (data.courseTag as string) ?? "",
    moduleTag: (data.moduleTag as string) ?? "",
    assignmentTitle: (data.assignmentTitle as string) ?? "",
    authorPseudonym: (data.authorPseudonym as string) ?? "Anonymous",
    isAnonymous: Boolean(data.anonymous ?? data.isAnonymous),
    content: (data.content as string) ?? "",
    images: data.imageUrl ? [data.imageUrl as string] : [],
    deadline: (data.deadline as { toDate?: () => Date })?.toDate?.() ?? new Date(),
    category: (data.category as HelpPost["category"]) ?? "academic",
    upvotes: (data.upvotes as number) ?? 0,
    likes: (data.likes as number) ?? 0,
    commentCount: (data.replies as number) ?? (data.commentCount as number) ?? 0,
    difficultyVotes: (data.difficultyVotes as HelpPost["difficultyVotes"]) ?? {
      understand: 0,
      struggling: 0,
      stuck: 0,
    },
    createdAt: (data.createdAt as { toDate?: () => Date })?.toDate?.() ?? new Date(),
    tags: (data.tags as string[]) ?? [],
  };
}

export const postsRepository = {
  async list(opts?: { limit?: number; sort?: "newest" | "deadline" }) {
    if (!db) return [];
    const constraints: QueryConstraint[] = [limit(opts?.limit ?? 30)];
    constraints.unshift(
      orderBy(opts?.sort === "deadline" ? "deadline" : "createdAt", opts?.sort === "deadline" ? "asc" : "desc")
    );
    const snap = await getDocs(query(collection(db, COLLECTIONS.posts), ...constraints));
    return snap.docs.map((d) => mapPost(d.id, d.data()));
  },

  async getById(id: string) {
    if (!db) return null;
    const snap = await getDoc(doc(db, COLLECTIONS.posts, id));
    if (!snap.exists()) return null;
    return mapPost(snap.id, snap.data());
  },

  async create(data: Omit<HelpPost, "id" | "createdAt" | "upvotes" | "commentCount" | "difficultyVotes"> & { authorId: string }) {
    if (!db) return null;
    const ref = await addDoc(collection(db, COLLECTIONS.posts), {
      course: data.courseTag,
      moduleTag: data.moduleTag,
      assignmentTitle: data.assignmentTitle,
      authorId: data.authorId,
      authorPseudonym: data.authorPseudonym,
      anonymous: data.isAnonymous,
      content: data.content,
      imageUrl: data.images?.[0] ?? null,
      deadline: data.deadline,
      category: data.category,
      upvotes: 0,
      likes: 0,
      replies: 0,
      difficultyVotes: { understand: 0, struggling: 0, stuck: 0 },
      createdAt: serverTimestamp(),
    });
    return ref.id;
  },

  async upvote(postId: string) {
    if (!db) return;
    await updateDoc(doc(db, COLLECTIONS.posts, postId), { upvotes: increment(1) });
  },
};
