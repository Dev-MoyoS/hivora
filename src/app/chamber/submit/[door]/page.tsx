"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chamberSubmissionSchema, type ChamberSubmissionInput } from "@/schemas/chamber";
import { generateTrackingCode } from "@/lib/anonymous-code";
import { useAppStore } from "@/stores/app-store";
import { SUPPORT_DOORS, EMERGENCY_RESOURCES } from "@/lib/constants";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { SupportDoor } from "@/types";

export default function ChamberSubmitPage() {
  const params = useParams();
  const router = useRouter();
  const door = params.door as SupportDoor;
  const setAnonymousCode = useAppStore((s) => s.setAnonymousCode);
  const doorInfo = SUPPORT_DOORS.find((d) => d.id === door);
  const [submitted, setSubmitted] = useState(false);
  const [code, setCode] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ChamberSubmissionInput>({
    resolver: zodResolver(chamberSubmissionSchema),
    defaultValues: { door, content: "" },
  });

  useEffect(() => {
    setValue("door", door);
  }, [door, setValue]);

  const onSubmit = () => {
    const trackingCode = generateTrackingCode();
    setCode(trackingCode);
    setAnonymousCode(trackingCode);
    setSubmitted(true);
  };

  if (!doorInfo) {
    return <p className="p-8 text-gray-400">Invalid door</p>;
  }

  if (submitted) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-sm text-gray-400">Your anonymous tracking code</p>
        <p className="mt-4 font-mono text-4xl font-semibold tracking-widest text-gray-100">
          {code}
        </p>
        <p className="mt-6 text-sm leading-relaxed text-gray-500">
          Save this code. It is the only way to check for a response. We do not link
          this to any account or name.
        </p>
        <Button
          asChild
          className="mt-8 rounded-xl bg-gray-100 text-[#111827]"
        >
          <Link href="/chamber/return">Return later with code</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-12">
      <Link href="/chamber/doors" className="text-sm text-gray-500 hover:text-gray-300">
        ← Doors
      </Link>
      <h1 className="mt-6 text-xl font-semibold">{doorInfo.title}</h1>

      {door === "mental_health" && (
        <div className="mt-4 rounded-2xl border border-red-900/40 bg-red-950/20 p-4">
          <p className="text-xs font-medium text-red-300">Crisis support</p>
          {EMERGENCY_RESOURCES.map((r) => (
            <p key={r.name} className="mt-2 text-sm text-gray-400">
              {r.name}: <span className="text-gray-200">{r.phone}</span>
            </p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <input type="hidden" {...register("door")} />
        <Textarea
          {...register("content")}
          placeholder="Share what you need. No judgment."
          className="min-h-[180px] rounded-2xl border-gray-700 bg-[#1a1f26] text-gray-100 resize-none"
        />
        {errors.content && (
          <p className="text-xs text-red-400">{errors.content.message}</p>
        )}
        {door === "harassment" && (
          <p className="text-xs text-gray-500">
            Encrypted evidence upload UI placeholder — files are not stored in demo mode.
          </p>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-gray-100 text-[#111827] hover:bg-white"
        >
          Submit anonymously
        </Button>
      </form>
    </main>
  );
}
