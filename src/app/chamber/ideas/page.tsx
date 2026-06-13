"use client";

import { MOCK_CAMPUS_IDEAS } from "@/lib/mock-data";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

const STATUS_LABEL = {
  under_review: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
} as const;

export default function CampusIdeasPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <Link href="/chamber/doors" className="text-sm text-gray-500 hover:text-gray-300">
        ← Doors
      </Link>
      <h1 className="mt-6 text-xl font-semibold text-gray-100">Campus ideas</h1>
      <p className="text-sm text-gray-500">Anonymous suggestions · public voting · no identities</p>
      <ul className="mt-8 space-y-4">
        {MOCK_CAMPUS_IDEAS.map((idea) => (
          <li key={idea.id} className="rounded-2xl border border-gray-800 bg-[#141a22] p-5">
            <p className="text-sm text-gray-200">{idea.content}</p>
            <div className="mt-4 flex items-center justify-between">
              <Badge variant="outline" className="rounded-lg border-gray-700 text-gray-300">
                {STATUS_LABEL[idea.status]}
              </Badge>
              <Button variant="ghost" size="sm" className="gap-1 text-gray-400">
                <ThumbsUp className="h-4 w-4" />
                {idea.votes}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
