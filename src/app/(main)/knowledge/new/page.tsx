"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { helpPostSchema, type HelpPostInput } from "@/schemas/help-post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CAMPUS_COURSES } from "@/lib/mock-data";
import { useRoleStore } from "@/stores/role-store";
import { ImagePlus } from "lucide-react";

export default function NewHelpPostPage() {
  const router = useRouter();
  const can = useRoleStore((s) => s.can);
  const [addingCourse, setAddingCourse] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<HelpPostInput>({
    resolver: zodResolver(helpPostSchema),
    defaultValues: { isAnonymous: false },
  });

  if (!can("post")) {
    return (
      <main className="p-6 text-center text-muted-foreground">
        Spectator mode — upgrade to Participant to post.{" "}
        <Link href="/profile" className="text-primary underline">
          Profile
        </Link>
      </main>
    );
  }

  const onSubmit = () => router.push("/knowledge");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <main className="mx-auto max-w-xl p-4 lg:p-6">
      <Link href="/knowledge" className="text-sm text-primary hover:underline">
        ← Feed
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">Ask for help</h1>
      <p className="text-sm text-muted-foreground">Shows fully inline on the feed</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div>
          <Label>Course / module</Label>
          {!addingCourse ? (
            <div className="mt-1 flex gap-2">
              <Controller
                name="moduleTag"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="flex-1 rounded-xl">
                      <SelectValue placeholder="Select course code" />
                    </SelectTrigger>
                    <SelectContent>
                      {CAMPUS_COURSES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <Button type="button" variant="outline" className="rounded-xl" onClick={() => setAddingCourse(true)}>
                + New
              </Button>
            </div>
          ) : (
            <div className="mt-1 space-y-2">
              <Input placeholder="New course code e.g. CSC3010" {...register("newCourse")} className="rounded-xl" />
              <Button type="button" variant="ghost" size="sm" onClick={() => setAddingCourse(false)}>
                Use existing list
              </Button>
            </div>
          )}
          {errors.moduleTag && <p className="text-xs text-destructive">{errors.moduleTag.message}</p>}
        </div>

        <div>
          <Label>Course name</Label>
          <Input {...register("courseTag")} placeholder="e.g. Computer Science" className="mt-1 rounded-xl" />
        </div>

        <div>
          <Label>Assignment title</Label>
          <Input {...register("assignmentTitle")} className="mt-1 rounded-xl" />
        </div>

        <div>
          <Label>Deadline</Label>
          <Input type="datetime-local" {...register("deadline")} className="mt-1 rounded-xl" />
        </div>

        <div>
          <Label>Help request</Label>
          <Textarea {...register("content")} className="mt-1 min-h-[140px] rounded-xl resize-none" />
        </div>

        <div>
          <Label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border p-4">
            <ImagePlus className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">Add screenshot (optional)</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </Label>
          {preview && <img src={preview} alt="" className="mt-2 max-h-40 rounded-xl border" />}
        </div>

        <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
          <div>
            <p className="text-sm font-medium">Post anonymously</p>
            <p className="text-xs text-muted-foreground">Shows as &ldquo;Anonymous&rdquo;</p>
          </div>
          <Controller
            name="isAnonymous"
            control={control}
            render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full rounded-xl">
          Post to Knowledge Square
        </Button>
      </form>
    </main>
  );
}
