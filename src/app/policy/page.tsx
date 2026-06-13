import Link from "next/link";
import { CONTENT_POLICY_RULES } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4">
        <Logo />
      </header>
      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Community content policy</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Hivoraa is a student-built support ecosystem — not social media. We protect dignity,
          academic integrity, and emotional safety.
        </p>
        <ul className="mt-8 space-y-4">
          {CONTENT_POLICY_RULES.map((rule) => (
            <li key={rule} className="flex gap-3 rounded-2xl border border-border p-4">
              <span className="text-primary">✓</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted-foreground">
          Violations may be removed by student moderators. Severe cases may be referred to campus
          services without exposing anonymous Chamber identities.
        </p>
        <Link href="/" className="mt-8 inline-block text-sm text-primary hover:underline">
          ← Home
        </Link>
      </main>
    </div>
  );
}
