"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { trackingCodeSchema } from "@/schemas/chamber";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { z } from "zod";

type CodeInput = z.infer<typeof trackingCodeSchema>;

export default function ChamberReturnPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeInput>({
    resolver: zodResolver(trackingCodeSchema),
  });

  const onSubmit = (data: CodeInput) => {
    alert(`Checking status for ${data.code.toUpperCase()}… (demo)`);
  };

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <Link href="/chamber" className="text-sm text-gray-500 hover:text-gray-300">
        ← Chamber
      </Link>
      <h1 className="mt-6 text-2xl font-semibold">Return with your code</h1>
      <p className="mt-2 text-sm text-gray-400">
        Format: XXXX-1234 (e.g. UBUN-7291)
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div>
          <Label className="text-gray-400">Tracking code</Label>
          <Input
            {...register("code")}
            placeholder="UBUN-7291"
            className="mt-2 rounded-xl border-gray-700 bg-[#1a1f26] font-mono uppercase text-gray-100"
          />
          {errors.code && (
            <p className="mt-1 text-xs text-red-400">{errors.code.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full rounded-xl bg-gray-100 text-[#111827]"
        >
          Check status
        </Button>
      </form>
    </main>
  );
}
