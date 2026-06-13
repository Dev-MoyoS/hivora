// ─── Worlds & auth ───────────────────────────────────────────────────────────
export type WorldId = "knowledge" | "trust" | "chamber";
export type AuthMode = "pseudonym" | "anonymous_post" | "anonymous_code";
export type UserRole = "spectator" | "participant" | "creator" | "moderator" | "admin";
export type DifficultyVote = "understand" | "struggling" | "stuck";
export type DeadlineUrgency = "green" | "yellow" | "red";
export type FeedSort = "newest" | "most_active" | "nearest_deadline" | "trending";
export type FeedTab = "for_you" | "recent" | "most_active" | "deadline_soon";
export type PostCategory = "academic" | "support" | "motivation" | "collaboration";

export type SupportDoor =
  | "financial"
  | "mental_health"
  | "harassment"
  | "academic_breakdown"
  | "campus_ideas";

export type TrustRoomId =
  | "exam_stress"
  | "loneliness"
  | "family_pressure"
  | "burnout"
  | "financial_worries";

export type CampusIdeaStatus = "under_review" | "approved" | "rejected";

// ─── User ────────────────────────────────────────────────────────────────────
export interface UserProfile {
  id: string;
  email?: string;
  displayName: string;
  photoURL?: string;
  university?: string;
  faculty?: string;
  course?: string;
  bio?: string;
  skills: string[];
  reputation: number;
  badges: string[];
  role: UserRole;
  isModerator?: boolean;
  isAdmin?: boolean;
  createdAt: Date;
}

// ─── Knowledge Square ──────────────────────────────────────────────────────
export interface HelpPost {
  id: string;
  courseTag: string;
  moduleTag: string;
  assignmentTitle: string;
  authorPseudonym: string;
  isAnonymous: boolean;
  content: string;
  images?: string[];
  deadline: Date;
  category: PostCategory;
  university?: string;
  faculty?: string;
  upvotes: number;
  likes: number;
  commentCount: number;
  starredAnswerId?: string;
  noReplyRescue?: boolean;
  difficultyVotes: {
    understand: number;
    struggling: number;
    stuck: number;
  };
  createdAt: Date;
  tags: string[];
}

export interface PostComment {
  id: string;
  postId: string;
  authorPseudonym: string;
  isAnonymous: boolean;
  content: string;
  image?: string;
  isUseful?: boolean;
  upvotes: number;
  likes: number;
  createdAt: Date;
  parentId?: string;
}

export interface StudySession {
  id: string;
  title: string;
  module: string;
  topic: string;
  location: string;
  campusPin?: { lat: number; lng: number };
  isOnline: boolean;
  scheduledAt: Date;
  endsAt: Date;
  maxParticipants: number;
  participantCount: number;
  studyFocus: string;
  isLive: boolean;
  isFull: boolean;
  allowAnonymous: boolean;
  createdBy: string;
  voiceRoomId?: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: "notes" | "pdf" | "past_paper" | "link" | "video" | "guide";
  module: string;
  faculty?: string;
  university: string;
  url?: string;
  fileUrl?: string;
  previewUrl?: string;
  downloads: number;
  views: number;
  likes: number;
  commentCount: number;
  rating: number;
  uploadedBy: string;
  createdAt: Date;
}

export interface TalentOffer {
  id: string;
  pseudonym: string;
  type: "offer" | "request";
  skill: string;
  description: string;
  availability: string;
  badges: string[];
  skillsNeeded?: string[];
  createdAt: Date;
}

export interface CollaborationCard {
  id: string;
  title: string;
  description: string;
  skillsNeeded: string[];
  skillsOffered: string[];
  type: "project" | "startup" | "swap";
  authorPseudonym: string;
  availability: string;
  createdAt: Date;
}

// ─── Trust Circle ──────────────────────────────────────────────────────────
export interface TrustPost {
  id: string;
  roomId: TrustRoomId;
  authorPseudonym: string;
  content: string;
  likes: number;
  reactions: Record<string, number>;
  createdAt: Date;
}

export interface MentorMatch {
  id: string;
  pseudonym: string;
  type: "student" | "alumni";
  topics: string[];
  available: boolean;
}

// ─── Chamber ───────────────────────────────────────────────────────────────
export interface CampusIdea {
  id: string;
  content: string;
  votes: number;
  status: CampusIdeaStatus;
  createdAt: Date;
}

// ─── Search ──────────────────────────────────────────────────────────────────
export type SearchResultType = "post" | "resource" | "group" | "talent";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  href: string;
}

// ─── Notifications ─────────────────────────────────────────────────────────
export interface AppNotification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  href?: string;
  createdAt: Date;
}

export interface CampusPulseMetric {
  label: string;
  value: number;
  trend: "up" | "down" | "stable";
  category: string;
}
