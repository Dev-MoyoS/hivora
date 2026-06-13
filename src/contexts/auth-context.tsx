"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { createUserProfile, getUserProfile } from "@/lib/firestore";
import { syncAuthSession } from "@/lib/auth-session-client";
import type { UserProfile } from "@/types";

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isDemo: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  enterDemoMode: () => void;
  updateLocalProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_PROFILE: UserProfile = {
  id: "demo-user",
  email: "demo@hivoraa.app",
  displayName: "Demo Student",
  university: "University of Cape Town",
  faculty: "Science",
  course: "Computer Science",
  bio: "Passionate learner building community on Hivoraa.",
  skills: ["React", "TypeScript", "Study Groups"],
  reputation: 420,
  badges: ["Early Adopter", "Helpful Peer", "Resource Sharer"],
  role: "participant",
  createdAt: new Date(),
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    if (isDemo) {
      setLoading(false);
      return;
    }

    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const p = await getUserProfile(firebaseUser.uid);
        setProfile(p);
        await syncAuthSession(firebaseUser).catch(() => {});
      } else {
        setProfile(null);
        await syncAuthSession(null).catch(() => {});
      }
      setLoading(false);
    });

    return () => unsub();
  }, [isDemo]);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!auth) throw new Error("Firebase not configured");
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, name: string) => {
      if (!auth) throw new Error("Firebase not configured");
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      await createUserProfile(cred.user.uid, {
        email,
        displayName: name,
        skills: [],
        reputation: 0,
        badges: ["New Member"],
        role: "participant",
      });
    },
    []
  );

  const signInWithGoogle = useCallback(async () => {
    if (!auth) throw new Error("Firebase not configured");
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    const existing = await getUserProfile(cred.user.uid);
    if (!existing) {
      await createUserProfile(cred.user.uid, {
        email: cred.user.email ?? "",
        displayName: cred.user.displayName ?? "Student",
        photoURL: cred.user.photoURL ?? undefined,
        skills: [],
        reputation: 0,
        badges: ["New Member"],
        role: "participant",
      });
    }
  }, []);

  const signOut = useCallback(async () => {
    if (isDemo) {
      setIsDemo(false);
      setProfile(null);
      setUser(null);
      return;
    }
    await syncAuthSession(null).catch(() => {});
    if (auth) await firebaseSignOut(auth);
    setProfile(null);
  }, [isDemo]);

  const enterDemoMode = useCallback(() => {
    setIsDemo(true);
    setProfile(DEMO_PROFILE);
    setUser(null);
    setLoading(false);
  }, []);

  const updateLocalProfile = useCallback((data: Partial<UserProfile>) => {
    setProfile((prev) => (prev ? { ...prev, ...data } : prev));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isDemo,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        enterDemoMode,
        updateLocalProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
