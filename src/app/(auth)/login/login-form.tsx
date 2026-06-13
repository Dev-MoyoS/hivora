"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/shared/logo";
import { useAuth } from "@/contexts/auth-context";
import { isFirebaseConfigured } from "@/lib/firebase";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithGoogle, enterDemoMode } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("return") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      router.push(returnTo);
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push(returnTo);
    } catch {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = () => {
    enterDemoMode();
    router.push("/");
  };

  const signupHref = returnTo !== "/" ? `/signup?return=${encodeURIComponent(returnTo)}` : "/signup";

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
          Welcome back
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Sign in to your student community
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
              required
              className="rounded-xl"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            type="submit"
            disabled={loading || !isFirebaseConfigured}
            className="w-full rounded-xl bg-brand-navy hover:bg-brand-navy/90"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground dark:bg-gray-900">
              Or continue with
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={handleGoogle}
            disabled={loading || !isFirebaseConfigured}
            className="w-full rounded-xl"
          >
            Continue with Google
          </Button>
          <Button variant="secondary" onClick={handleDemo} className="w-full rounded-xl">
            Try demo mode
          </Button>
        </div>

        {!isFirebaseConfigured && (
          <p className="mt-4 text-center text-xs text-amber-600">
            Firebase not configured. Use demo mode or add env variables.
          </p>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href={signupHref} className="font-medium text-brand-navy hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
