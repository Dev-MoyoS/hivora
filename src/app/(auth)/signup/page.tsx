"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/shared/logo";
import { useAuth } from "@/contexts/auth-context";
import { isFirebaseConfigured } from "@/lib/firebase";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle, enterDemoMode } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signUp(email, password, name);
      router.push("/onboarding");
    } catch {
      setError("Could not create account. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F4F6] px-4 dark:bg-[#111827]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="mb-8 flex flex-col items-center gap-3">
          <Logo href="/" className="flex-col gap-3 [&_span]:text-center" size="lg" />
        </div>
        <h1 className="text-center text-2xl font-semibold text-[#111827] dark:text-white">
          Join the community
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Create your free student account
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.ac.za"
              required
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              className="rounded-xl"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            type="submit"
            disabled={loading || !isFirebaseConfigured}
            className="w-full rounded-xl bg-[#0B1F4D] hover:bg-[#091833]"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
          </Button>
        </form>

        <Button
          variant="secondary"
          onClick={() => {
            enterDemoMode();
            router.push("/");
          }}
          className="mt-4 w-full rounded-xl"
        >
          Try demo mode
        </Button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#0B1F4D] hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
