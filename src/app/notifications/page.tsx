"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  return (
    <main className="p-4 lg:p-6">
      <h1 className="text-2xl font-semibold">Notifications</h1>
      <p className="text-sm text-muted-foreground">Calm updates — no social pressure</p>
      <ul className="mt-6 space-y-2">
        {MOCK_NOTIFICATIONS.map((n) => (
          <li key={n.id}>
            <Link
              href={n.href ?? "#"}
              className={cn(
                "block rounded-2xl border border-border p-4 transition-colors hover:bg-muted/40",
                !n.read && "border-primary/20 bg-primary/5"
              )}
            >
              <p className="font-medium">{n.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{n.message}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {formatDistanceToNow(n.createdAt, { addSuffix: true })}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
