import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { FAQ_ITEMS } from "@/lib/constants";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4">
        <Logo href="/" />
      </header>
      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-2xl font-semibold text-foreground">Privacy at Hivoraa</h1>
        <p className="mt-4 text-muted-foreground">
          Hivoraa is built for students. We minimize data collection, never give staff access to
          Knowledge Square, and keep Listening Chamber submissions encrypted and code-only.
        </p>
        <ul className="mt-8 space-y-4">
          {FAQ_ITEMS.map((item) => (
            <li key={item.q} className="rounded-2xl border border-border bg-card p-4">
              <p className="font-medium text-foreground">{item.q}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
            </li>
          ))}
        </ul>
        <Link href="/" className="mt-8 inline-block text-sm text-brand-navy dark:text-brand-gold">
          ← Back to Knowledge Square
        </Link>
      </main>
    </div>
  );
}
