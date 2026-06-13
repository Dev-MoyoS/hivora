import type { User } from "firebase/auth";

/** Sync Firebase ID token to an HTTP-only session cookie for middleware-protected routes. */
export async function syncAuthSession(user: User | null): Promise<void> {
  if (!user) {
    await fetch("/api/auth/session", { method: "DELETE" });
    return;
  }

  const idToken = await user.getIdToken();
  await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
}
