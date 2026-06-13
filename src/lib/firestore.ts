import {
  collection,
  doc,
  addDoc,
  updateDoc,
  setDoc,
  getDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  increment,
  type Unsubscribe,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { COLLECTIONS } from "@/lib/constants";
import type { HelpPost, UserProfile } from "@/types";

export async function createHelpPost(
  data: Omit<
    HelpPost,
    "id" | "createdAt" | "upvotes" | "commentCount" | "difficultyVotes"
  >
): Promise<string | null> {
  if (!db) return null;
  const ref = await addDoc(collection(db, COLLECTIONS.posts), {
    ...data,
    upvotes: 0,
    commentCount: 0,
    difficultyVotes: { understand: 0, struggling: 0, stuck: 0 },
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function upvotePost(postId: string): Promise<void> {
  if (!db) return;
  await updateDoc(doc(db, COLLECTIONS.posts, postId), {
    upvotes: increment(1),
  });
}

export function subscribeToPosts(
  callback: (posts: HelpPost[]) => void,
  postLimit = 20
): Unsubscribe | null {
  if (!db) return null;
  const q = query(
    collection(db, COLLECTIONS.posts),
    orderBy("createdAt", "desc"),
    limit(postLimit)
  );
  return onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        courseTag: (data.course as string) ?? (data.courseTag as string) ?? "",
        moduleTag: (data.moduleTag as string) ?? "",
        assignmentTitle: (data.assignmentTitle as string) ?? "",
        authorPseudonym: (data.authorPseudonym as string) ?? "Anonymous",
        isAnonymous: Boolean(data.anonymous ?? data.isAnonymous),
        content: (data.content as string) ?? "",
        images: data.imageUrl ? [data.imageUrl as string] : (data.images as string[]) ?? [],
        deadline: data.deadline?.toDate?.() ?? new Date(),
        category: (data.category as HelpPost["category"]) ?? "academic",
        university: data.university as string | undefined,
        faculty: data.faculty as string | undefined,
        upvotes: (data.upvotes as number) ?? 0,
        likes: (data.likes as number) ?? 0,
        commentCount: (data.replies as number) ?? (data.commentCount as number) ?? 0,
        noReplyRescue: Boolean(data.noReplyRescue),
        difficultyVotes: (data.difficultyVotes as HelpPost["difficultyVotes"]) ?? {
          understand: 0,
          struggling: 0,
          stuck: 0,
        },
        createdAt: data.createdAt?.toDate?.() ?? new Date(),
        tags: (data.tags as string[]) ?? [],
      } satisfies HelpPost;
    });
    callback(posts);
  });
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  if (!db) return null;
  const snap = await getDoc(doc(db, COLLECTIONS.users, userId));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    id: snap.id,
    ...data,
    createdAt: data.createdAt?.toDate?.() ?? new Date(),
  } as UserProfile;
}

export async function createUserProfile(
  userId: string,
  data: Omit<UserProfile, "id" | "createdAt">
): Promise<void> {
  if (!db) return;
  await setDoc(doc(db, COLLECTIONS.users, userId), {
    ...data,
    reputation: data.reputation ?? 0,
    badges: data.badges ?? [],
    skills: data.skills ?? [],
    createdAt: serverTimestamp(),
  });
}

export { isFirebaseConfigured };
