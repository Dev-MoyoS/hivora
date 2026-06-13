import type {
  AppNotification,
  CollaborationCard,
  HelpPost,
  MentorMatch,
  PostComment,
  ResourceItem,
  StudySession,
  TalentOffer,
  TrustPost,
  CampusPulseMetric,
  CampusIdea,
} from "@/types";

const daysAgo = (n: number) => new Date(Date.now() - n * 86400000);
const hoursAgo = (n: number) => new Date(Date.now() - n * 3600000);
const daysFromNow = (n: number) => new Date(Date.now() + n * 86400000);
const hoursFromNow = (n: number) => new Date(Date.now() + n * 3600000);

export const CAMPUS_COURSES = [
  "CSC3001",
  "CSC3020",
  "MAM1000",
  "MAM2000",
  "ENG4002",
  "ACC1001",
  "BUS2010",
  "PHY1000",
  "ECO1010",
  "STA2001",
  "INF2004",
  "LAW2010",
  "PSY1001",
  "CHM1010",
  "FILM3001",
] as const;

export const MOCK_HELP_POSTS: HelpPost[] = [
  {
    id: "hp1",
    courseTag: "Web Dev",
    moduleTag: "Web Dev 2A",
    assignmentTitle: "Assignment 2 – Responsive Design",
    authorPseudonym: "TechieNova",
    isAnonymous: true,
    content:
      "I'm trying to build a responsive navbar using CSS Grid and Flexbox but my mobile layout keeps breaking. The hamburger menu works but the dropdown overlaps the hero section. Has anyone solved this for the Assignment 2 brief?",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=500&fit=crop&q=80",
    ],
    deadline: daysFromNow(2),
    category: "academic",
    university: "University of Cape Town",
    faculty: "Science",
    upvotes: 42,
    likes: 38,
    commentCount: 18,
    noReplyRescue: false,
    difficultyVotes: { understand: 24, struggling: 45, stuck: 18 },
    createdAt: hoursAgo(2),
    tags: ["css", "responsive"],
  },
  {
    id: "hp2",
    courseTag: "Mathematics",
    moduleTag: "MAM2000",
    assignmentTitle: "Proof by Induction Problem Set",
    authorPseudonym: "SteadyRiver",
    isAnonymous: false,
    content:
      "The inductive step for sequence problems is breaking my brain. I understand base cases fine. Assignment due in 36 hours — any study partners want to work through Q4-Q7 together?",
    deadline: daysFromNow(1.5),
    category: "academic",
    upvotes: 56,
    likes: 41,
    commentCount: 12,
    difficultyVotes: { understand: 8, struggling: 52, stuck: 31 },
    createdAt: daysAgo(0),
    tags: ["proofs"],
  },
  {
    id: "hp3",
    courseTag: "Engineering",
    moduleTag: "ENG4002",
    assignmentTitle: "Capstone Proposal Draft",
    authorPseudonym: "Anonymous",
    isAnonymous: true,
    content:
      "Looking for feedback on my project proposal structure. It's a campus sustainability app — need someone with UX background to review before Friday submission.",
    deadline: daysFromNow(3),
    category: "collaboration",
    upvotes: 21,
    likes: 9,
    commentCount: 0,
    noReplyRescue: true,
    difficultyVotes: { understand: 20, struggling: 15, stuck: 5 },
    createdAt: daysAgo(2),
    tags: ["capstone"],
  },
  {
    id: "hp4",
    courseTag: "Computer Science",
    moduleTag: "CSC3020",
    assignmentTitle: "React Server Components Lab",
    authorPseudonym: "CodeWave",
    isAnonymous: false,
    content:
      "Pre-seeded launch post: sharing my notes on RSC boundaries and when to use client components. Happy to answer questions this week.",
    deadline: daysFromNow(10),
    category: "academic",
    upvotes: 18,
    likes: 22,
    commentCount: 4,
    difficultyVotes: { understand: 35, struggling: 10, stuck: 3 },
    createdAt: daysAgo(3),
    tags: ["react", "launch"],
  },
];

export const MOCK_COMMENTS: Record<string, PostComment[]> = {
  hp1: [
    {
      id: "c1",
      postId: "hp1",
      authorPseudonym: "CodeCraft_",
      isAnonymous: false,
      content:
        "Try setting `position: relative` on the nav container and give the dropdown `position: absolute` with a higher z-index:\n\n```css\n.nav-container {\n  position: relative;\n  z-index: 50;\n}\n.dropdown {\n  position: absolute;\n  top: 100%;\n  z-index: 60;\n}\n```",
      isUseful: true,
      upvotes: 24,
      likes: 18,
      createdAt: hoursAgo(1),
    },
    {
      id: "c2",
      postId: "hp1",
      authorPseudonym: "TechieNova",
      isAnonymous: false,
      content: "That fixed it! The z-index was the issue. Thank you 🙏",
      upvotes: 8,
      likes: 6,
      createdAt: hoursAgo(0.5),
    },
  ],
  hp2: [],
};

export const MOCK_STUDY_SESSIONS: StudySession[] = [
  {
    id: "ss1",
    title: "Algorithms Night Session",
    module: "CSC3001",
    topic: "BST & traversals",
    location: "Online — Discord",
    campusPin: { lat: -33.957, lng: 18.461 },
    isOnline: true,
    scheduledAt: daysFromNow(1),
    endsAt: hoursFromNow(28),
    maxParticipants: 8,
    participantCount: 5,
    studyFocus: "Tree traversals & past papers",
    isLive: false,
    isFull: false,
    allowAnonymous: true,
    createdBy: "TreeWalker",
    voiceRoomId: "voice-ss1",
  },
  {
    id: "ss2",
    title: "MAM2000 Library Study",
    module: "MAM2000",
    topic: "Induction proofs",
    location: "Main Library, Level 3",
    campusPin: { lat: -33.932, lng: 18.409 },
    isOnline: false,
    scheduledAt: daysFromNow(2),
    endsAt: daysFromNow(2.5),
    maxParticipants: 6,
    participantCount: 6,
    studyFocus: "Induction proofs",
    isLive: true,
    isFull: true,
    allowAnonymous: false,
    createdBy: "SteadyRiver",
  },
];

export const MOCK_RESOURCES: ResourceItem[] = [
  {
    id: "r1",
    title: "BST Visual Guide",
    type: "link",
    module: "CSC3001",
    faculty: "Science",
    university: "UCT",
    url: "https://notion.so/example",
    downloads: 234,
    views: 890,
    likes: 67,
    commentCount: 12,
    rating: 4.9,
    uploadedBy: "TreeWalker",
    createdAt: daysAgo(3),
  },
  {
    id: "r2",
    title: "2024 Past Paper — Induction",
    type: "pdf",
    module: "MAM2000",
    university: "Wits",
    fileUrl: "/sample.pdf",
    previewUrl: "/sample.pdf",
    downloads: 412,
    views: 1200,
    likes: 98,
    commentCount: 8,
    rating: 4.7,
    uploadedBy: "MathCollective",
    createdAt: daysAgo(7),
  },
];

export const MOCK_TALENT_OFFERS: TalentOffer[] = [
  {
    id: "to1",
    pseudonym: "PixelForge",
    type: "offer",
    skill: "Photoshop & UI Design",
    description: "Can help with wireframes and visual polish for projects.",
    availability: "Weekends",
    badges: ["Designer"],
    createdAt: daysAgo(2),
  },
  {
    id: "to2",
    pseudonym: "MathTutor",
    type: "request",
    skill: "Calculus tutoring",
    description: "Need 1hr/week help with MAM2000 proofs.",
    availability: "Weekday evenings",
    badges: [],
    createdAt: daysAgo(1),
  },
  {
    id: "to3",
    pseudonym: "CodeWave",
    type: "offer",
    skill: "React / TypeScript",
    description: "Happy to pair on assignments — no exam solutions.",
    availability: "Flexible",
    badges: ["Builder"],
    skillsNeeded: [],
    createdAt: daysAgo(0),
  },
];

export const MOCK_COLLABORATIONS: CollaborationCard[] = [
  {
    id: "col1",
    title: "Campus Food Waste App",
    description: "Reducing dining hall waste.",
    skillsNeeded: ["Node.js", "Marketing"],
    skillsOffered: ["React", "Product"],
    type: "startup",
    authorPseudonym: "GreenCampus",
    availability: "This semester",
    createdAt: daysAgo(1),
  },
];

export const MOCK_TRUST_POSTS: TrustPost[] = [
  {
    id: "tp1",
    roomId: "exam_stress",
    authorPseudonym: "GentleStar",
    content: "Three exams in five days. Just needed to say it somewhere safe.",
    likes: 12,
    reactions: { "💙": 24, "🫂": 12 },
    createdAt: daysAgo(0),
  },
];

export const MOCK_MENTORS: MentorMatch[] = [
  {
    id: "m1",
    pseudonym: "AlumniGuide",
    type: "alumni",
    topics: ["Career", "Final year"],
    available: true,
  },
  {
    id: "m2",
    pseudonym: "FourthYearPeer",
    type: "student",
    topics: ["Exam stress", "Time management"],
    available: true,
  },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    title: "Reply on your post",
    message: "TreeWalker answered your BST question",
    read: false,
    href: "/knowledge",
    createdAt: hoursFromNow(-2),
  },
  {
    id: "n2",
    title: "Study session reminder",
    message: "Algorithms Night starts in 24h",
    read: false,
    href: "/knowledge/groups/ss1",
    createdAt: hoursFromNow(-5),
  },
];

export const MOCK_CAMPUS_IDEAS: CampusIdea[] = [
  {
    id: "ci1",
    content: "24/7 quiet study pods in the library basement",
    votes: 142,
    status: "under_review",
    createdAt: daysAgo(4),
  },
  {
    id: "ci2",
    content: "Free menstrual products in all faculty bathrooms",
    votes: 289,
    status: "approved",
    createdAt: daysAgo(10),
  },
];

export const MOCK_TOP_CONTRIBUTORS = [
  { name: "TreeWalker", reputation: 1240, badge: "Mentor" },
  { name: "QuietOwl", reputation: 980, badge: "Helper" },
  { name: "MathCollective", reputation: 876, badge: null },
  { name: "PixelForge", reputation: 654, badge: "Designer" },
];

export const MOCK_TRENDING = [
  { title: "Database Normalization", votes: 189, hot: true },
  { title: "Web Dev 2A – Responsive Design", votes: 156, hot: true },
  { title: "MAM2000 Induction Proofs", votes: 134, hot: false },
  { title: "CSC3001 BST Assignment", votes: 98, hot: false },
];

export const MOCK_CAMPUS_PULSE: CampusPulseMetric[] = [
  { label: "Most difficult module", value: 78, trend: "up", category: "academic" },
  { label: "Stress level", value: 62, trend: "up", category: "wellbeing" },
  { label: "Resource demand", value: 45, trend: "stable", category: "academic" },
];

export const MOCK_TESTIMONIALS = [
  { quote: "Knowledge Square helped me pass data structures.", author: "QuietOwl", world: "☀️ Knowledge Square" },
  { quote: "Trust Circle was the first place I didn't feel judged.", author: "GentleStar", world: "🛡️ Trust Circle" },
  { quote: "The code system made asking for help possible.", author: "Anonymous", world: "🌙 Listening Chamber" },
];

export const MOCK_ACTIVE_GROUPS = [
  {
    name: "Web Dev 2A Study Session",
    members: 12,
    maxMembers: 15,
    module: "Web Dev 2A",
    time: "Today, 6:00 PM",
    location: "Online",
  },
  {
    name: "Algorithms Night",
    members: 5,
    maxMembers: 8,
    module: "CSC3001",
    time: "Tomorrow, 7:00 PM",
    location: "Discord",
  },
  {
    name: "MAM2000 Library",
    members: 6,
    maxMembers: 6,
    module: "MAM2000",
    time: "Sat, 2:00 PM",
    location: "Main Library",
  },
];

export const MOCK_SUGGESTED_COLLABS = [
  { name: "PixelForge", match: "Design + your React skills" },
];
