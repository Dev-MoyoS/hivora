import {
  BookOpen,
  Brain,
  GraduationCap,
  Heart,
  Lightbulb,
  Moon,
  Shield,
  Sparkles,
  Sun,
  Users,
} from "lucide-react";
import type { SupportDoor, TrustRoomId, WorldId } from "@/types";

export const BRAND = {
  name: "Hivoraa",
  headline: ["Learn.", "Connect.", "Belong."] as const,
  tagline: "Learn. Connect. Belong.",
  subtitle:
    "Join thousands of students helping each other with assignments, study groups, resources, and support.",
} as const;

export const COLORS = {
  navy: "#0B1F4D",
  gold: "#D4A017",
  white: "#FFFFFF",
  background: "#F5F7FA",
  text: "#111827",
  accent: "#0B1F4D",
  border: "#E5E7EB",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
} as const;

export const WORLDS: Record<
  WorldId,
  {
    id: WorldId;
    name: string;
    emoji: string;
    tagline: string;
    description: string;
    href: string;
    icon: typeof Sun;
    tone: string;
    cardClass: string;
    navClass: string;
  }
> = {
  knowledge: {
    id: "knowledge",
    name: "Knowledge Square",
    emoji: "☀️",
    tagline: "Learn together",
    description:
      "Public academic collaboration. Ask for help, share resources, find study partners.",
    href: "/knowledge",
    icon: Sun,
    tone: "active collaborative",
    cardClass: "bg-white border-gray-200 shadow-sm",
    navClass: "world-knowledge",
  },
  trust: {
    id: "trust",
    name: "Trust Circle",
    emoji: "🛡️",
    tagline: "Breathe together",
    description:
      "Semi-private emotional support with trained student volunteers. Warm, safe, slower.",
    href: "/trust",
    icon: Shield,
    tone: "warm supportive",
    cardClass: "bg-[#FDF8F6] border-amber-100/80",
    navClass: "world-trust",
  },
  chamber: {
    id: "chamber",
    name: "Listening Chamber",
    emoji: "🌙",
    tagline: "Be heard in silence",
    description:
      "Fully anonymous crisis support. No profiles. No pressure. Code-only return.",
    href: "/chamber",
    icon: Moon,
    tone: "sacred quiet",
    cardClass: "bg-[#0F1419] border-gray-800 text-gray-100",
    navClass: "world-chamber",
  },
};

export const COLLECTIONS = {
  users: "users",
  pseudonyms: "pseudonyms",
  roles: "roles",
  posts: "posts",
  replies: "replies",
  votes: "votes",
  bookmarks: "bookmarks",
  courses: "courses",
  assignments: "assignments",
  studyGroups: "study_groups",
  temporaryChats: "temporary_chats",
  voiceRooms: "voice_rooms",
  resources: "resources",
  talentOffers: "talent_offers",
  collaborations: "collaborations",
  mentors: "mentors",
  trustRooms: "trust_rooms",
  journalEntries: "journal_entries",
  supportRequests: "support_requests",
  anonymousCodes: "anonymous_codes",
  moderationReports: "moderation_reports",
  analytics: "analytics",
  notifications: "notifications",
} as const;

export const TRUST_ROOMS: {
  id: TrustRoomId;
  name: string;
  description: string;
}[] = [
  { id: "exam_stress", name: "Exam Stress", description: "When deadlines feel impossible" },
  { id: "loneliness", name: "Loneliness", description: "You're not alone in feeling alone" },
  { id: "family_pressure", name: "Family Pressure", description: "Expectations, distance, and home" },
  { id: "burnout", name: "Burnout", description: "Rest isn't laziness" },
  { id: "financial_worries", name: "Financial Worries", description: "Money stress is real stress" },
];

export const CONTENT_POLICY_RULES = [
  "No hate speech or discrimination",
  "No harassment, bullying, or threats",
  "No sharing personal information (doxxing)",
  "No exam cheating or academic dishonesty",
  "No abuse of anonymous systems",
] as const;

export const ONBOARDING_PHASES = [
  { phase: 1, title: "Academic foundation", items: ["Knowledge Square", "Study Groups", "Resource Library"] },
  { phase: 2, title: "Community growth", items: ["Talent Wall", "WhatsApp sharing", "QR onboarding"] },
  { phase: 3, title: "Emotional support", items: ["Trust Circle", "Moderator training"] },
  { phase: 4, title: "Crisis care", items: ["Listening Chamber", "Discreet awareness"] },
] as const;

export const SUPPORT_DOORS: {
  id: SupportDoor;
  title: string;
  description: string;
  icon: typeof Heart;
}[] = [
  {
    id: "financial",
    title: "Financial Survival",
    description: "Food insecurity, housing, emergency assistance",
    icon: Heart,
  },
  {
    id: "mental_health",
    title: "Mental Health Support",
    description: "Anxiety, depression, emotional distress, crisis",
    icon: Brain,
  },
  {
    id: "harassment",
    title: "Harassment & Abuse",
    description: "Anonymous reports, safe evidence upload",
    icon: Shield,
  },
  {
    id: "academic_breakdown",
    title: "Academic Breakdown",
    description: "Failing modules, burnout, tutor help",
    icon: GraduationCap,
  },
  {
    id: "campus_ideas",
    title: "Campus Ideas",
    description: "Anonymous suggestions and improvements",
    icon: Lightbulb,
  },
];

export const EMERGENCY_RESOURCES = [
  { name: "South African Depression & Anxiety Group", phone: "0800 567 567" },
  { name: "Lifeline South Africa", phone: "0861 322 322" },
  { name: "Campus Security", phone: "Contact your university" },
];

export const KNOWLEDGE_NAV = [
  { href: "/knowledge", label: "Feed", icon: Sun },
  { href: "/knowledge/groups", label: "Study Groups", icon: Users },
  { href: "/knowledge/resources", label: "Resources", icon: BookOpen },
  { href: "/knowledge/talent", label: "Talent Wall", icon: Sparkles },
] as const;

export const TRUST_NAV = [
  { href: "/trust", label: "Rooms", icon: Shield },
  { href: "/trust/journal", label: "Private Journal", icon: BookOpen },
  { href: "/trust/goals", label: "Goals", icon: Lightbulb },
] as const;

export const SUPPORTIVE_REACTIONS = ["💙", "🫂", "✨", "🌱", "💪"] as const;

export const FAQ_ITEMS = [
  {
    q: "Can lecturers see my posts?",
    a: "No. Knowledge Square is student-only. Staff have no access.",
  },
  {
    q: "How does anonymous support work?",
    a: "The Listening Chamber uses code-only return. No names, no profiles, no linking to your account.",
  },
  {
    q: "Is my IP logged?",
    a: "We minimize data collection. The UI never displays tracking identifiers to you or others.",
  },
  {
    q: "What are pseudonyms?",
    a: "Temporary identities that expire. Use them in Knowledge Square or Trust Circle without revealing your real name.",
  },
];

export const UNIVERSITIES = [
  "University of Cape Town",
  "University of the Witwatersrand",
  "Stellenbosch University",
  "University of Pretoria",
  "University of Johannesburg",
  "Rhodes University",
] as const;

export const LANDING_FEATURES = [
  {
    title: "Three safe worlds",
    description: "Each space has its own privacy level and emotional tone.",
    icon: Shield,
  },
  {
    title: "Student-built",
    description: "Created by students who understand campus life.",
    icon: Users,
  },
  {
    title: "Privacy-first",
    description: "Anonymous when you need it. Pseudonyms when you want distance.",
    icon: Moon,
  },
];
