"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Eye, Heart, MessageCircle, FileText, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOCK_RESOURCES } from "@/lib/mock-data";
import { useRoleStore } from "@/stores/role-store";

export default function ResourcesPage() {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const can = useRoleStore((s) => s.can);
  const preview = MOCK_RESOURCES.find((r) => r.id === previewId);

  return (
    <main className="p-4 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Resource Library</h1>
          <p className="text-sm text-muted-foreground">Notes, PDFs, links, videos — tagged by course</p>
        </div>
        {can("uploadResource") && (
          <Button className="rounded-xl">Upload resource</Button>
        )}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Input placeholder="Search..." className="rounded-xl sm:col-span-1" />
        <Select>
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="CSC3001">CSC3001</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {MOCK_RESOURCES.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card
                className="cursor-pointer rounded-2xl transition-shadow hover:shadow-md"
                onClick={() => setPreviewId(r.id)}
              >
                <CardContent className="p-5">
                  <div className="flex justify-between">
                    <Badge className="rounded-lg uppercase">{r.type}</Badge>
                    <span className="text-sm">★ {r.rating}</span>
                  </div>
                  <h3 className="mt-2 font-semibold">{r.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {r.module} · {r.university}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5" /> {r.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3.5 w-3.5" /> {r.downloads}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" /> {r.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5" /> {r.commentCount}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="sticky top-24 rounded-2xl border border-border bg-card p-5">
          {preview ? (
            <>
              <h3 className="font-semibold">Preview</h3>
              <p className="mt-2 text-sm text-muted-foreground">{preview.title}</p>
              {preview.type === "pdf" && (
                <div className="mt-4 flex aspect-[3/4] items-center justify-center rounded-xl bg-muted">
                  <FileText className="h-16 w-16 text-muted-foreground" />
                  <span className="sr-only">PDF preview</span>
                </div>
              )}
              {preview.url && (
                <a href={preview.url} className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                  Open link <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              <Button className="mt-4 w-full rounded-xl">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Select a resource to preview</p>
          )}
        </div>
      </div>
    </main>
  );
}
