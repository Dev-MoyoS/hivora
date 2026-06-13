"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useRoleStore } from "@/stores/role-store";

export default function NewStudyGroupPage() {
  const router = useRouter();
  const can = useRoleStore((s) => s.can);
  const { register, handleSubmit } = useForm();

  if (!can("createGroup")) {
    return <p className="p-6">Creator role required to start study sessions.</p>;
  }

  return (
    <main className="mx-auto max-w-lg p-4 lg:p-6">
      <Link href="/knowledge/groups" className="text-sm text-primary hover:underline">
        ← Back
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">Create study session</h1>
      <form
        onSubmit={handleSubmit(() => router.push("/knowledge/groups"))}
        className="mt-8 space-y-4"
      >
        <div>
          <Label>Course / module</Label>
          <Input {...register("module")} className="mt-1 rounded-xl" placeholder="CSC3001" />
        </div>
        <div>
          <Label>Topic</Label>
          <Input {...register("topic")} className="mt-1 rounded-xl" />
        </div>
        <div>
          <Label>Title</Label>
          <Input {...register("title")} className="mt-1 rounded-xl" />
        </div>
        <div>
          <Label>Campus location</Label>
          <Input {...register("location")} className="mt-1 rounded-xl" placeholder="Library L3 or Discord link" />
        </div>
        <div>
          <Label>Date & time</Label>
          <Input type="datetime-local" {...register("scheduledAt")} className="mt-1 rounded-xl" />
        </div>
        <div>
          <Label>Max participants</Label>
          <Input type="number" {...register("max")} defaultValue={6} className="mt-1 rounded-xl" />
        </div>
        <div className="flex items-center justify-between rounded-xl border p-4">
          <Label>Online session</Label>
          <Switch />
        </div>
        <div className="flex items-center justify-between rounded-xl border p-4">
          <Label>Allow anonymous participants</Label>
          <Switch defaultChecked />
        </div>
        <Textarea {...register("focus")} placeholder="Study focus" className="rounded-xl" />
        <Button type="submit" className="w-full rounded-xl">
          Create session
        </Button>
      </form>
    </main>
  );
}
