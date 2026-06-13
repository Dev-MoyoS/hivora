/**
 * Firestore document shapes (server timestamps as Firestore Timestamp on write).
 */
import type { UserRole } from "@/types";

export interface FirestoreUser {
  uid: string;
  pseudonym: string;
  email?: string;
  displayName?: string;
  role: UserRole;
  university?: string;
  faculty?: string;
  createdAt: unknown;
  lastActive: unknown;
  isModerator?: boolean;
  isAdmin?: boolean;
}

export interface FirestorePost {
  course: string;
  moduleTag: string;
  assignmentTitle: string;
  deadline: unknown;
  authorId: string;
  authorPseudonym: string;
  anonymous: boolean;
  content: string;
  imageUrl?: string;
  likes: number;
  upvotes: number;
  replies: number;
  difficultyVotes: { understand: number; struggling: number; stuck: number };
  createdAt: unknown;
}

export interface FirestoreReply {
  postId: string;
  authorId: string;
  authorPseudonym: string;
  anonymous: boolean;
  content: string;
  imageUrl?: string;
  likes: number;
  usefulAnswer: boolean;
  createdAt: unknown;
}

export interface FirestoreVote {
  postId: string;
  userId: string;
  voteType: "up" | "down" | "understand" | "struggling" | "stuck";
  createdAt: unknown;
}

export interface FirestoreBookmark {
  userId: string;
  postId: string;
  createdAt: unknown;
}

export interface FirestoreStudyGroup {
  title: string;
  course: string;
  location: string;
  scheduledAt: unknown;
  endsAt: unknown;
  maxParticipants: number;
  participants: string[];
  status: "open" | "full" | "ended";
  createdBy: string;
}

export interface FirestoreResource {
  title: string;
  course: string;
  type: "pdf" | "link" | "video";
  fileUrl?: string;
  url?: string;
  downloads: number;
  views: number;
  likes: number;
  uploadedBy: string;
  createdAt: unknown;
}

export interface FirestoreSupportRequest {
  category: string;
  anonymousCode: string;
  encryptedPayload: string;
  createdAt: unknown;
  status: "open" | "reviewed" | "closed";
}

export interface FirestoreAnalytics {
  category: string;
  count: number;
  date: string;
}
