import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS } from "@/lib/constants";
import type { UserProfile, UserRole } from "@/types";

export const usersRepository = {
  async get(uid: string): Promise<UserProfile | null> {
    if (!db) return null;
    const snap = await getDoc(doc(db, COLLECTIONS.users, uid));
    if (!snap.exists()) return null;
    const d = snap.data();
    return {
      id: snap.id,
      email: d.email,
      displayName: d.displayName ?? d.pseudonym ?? "Student",
      photoURL: d.photoURL,
      university: d.university,
      faculty: d.faculty,
      course: d.course,
      bio: d.bio,
      skills: d.skills ?? [],
      reputation: d.reputation ?? 0,
      badges: d.badges ?? [],
      role: (d.role as UserRole) ?? "participant",
      isModerator: d.isModerator,
      isAdmin: d.isAdmin,
      createdAt: d.createdAt?.toDate?.() ?? new Date(),
    };
  },

  async create(uid: string, data: Partial<UserProfile> & { displayName: string; role?: UserRole }) {
    if (!db) return;
    await setDoc(doc(db, COLLECTIONS.users, uid), {
      uid,
      pseudonym: data.displayName,
      displayName: data.displayName,
      email: data.email ?? null,
      role: data.role ?? "participant",
      university: data.university ?? null,
      faculty: data.faculty ?? null,
      skills: data.skills ?? [],
      reputation: 0,
      badges: ["New Member"],
      createdAt: serverTimestamp(),
      lastActive: serverTimestamp(),
    });
  },

  async touchLastActive(uid: string) {
    if (!db) return;
    await updateDoc(doc(db, COLLECTIONS.users, uid), {
      lastActive: serverTimestamp(),
    });
  },
};
