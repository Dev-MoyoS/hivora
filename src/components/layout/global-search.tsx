"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useSearchStore, TRENDING_SEARCHES } from "@/stores/search-store";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { globalSearch } from "@/lib/search";
import { cn } from "@/lib/utils";

const TYPE_LABELS = {
  post: "Help post",
  resource: "Resource",
  group: "Study group",
  talent: "Talent",
} as const;

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseFilter?: string;
}

export function GlobalSearch({ open, onOpenChange, courseFilter }: GlobalSearchProps) {
  const { query, setQuery, results, setResults, recent, addRecent, clearRecent } =
    useSearchStore();
  const debounced = useDebouncedValue(query, 280);

  useEffect(() => {
    setResults(globalSearch(debounced, courseFilter));
  }, [debounced, courseFilter, setResults]);

  const handleSelect = (q: string) => {
    setQuery(q);
    addRecent(q);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top" className="h-[85vh] rounded-b-2xl">
        <SheetHeader>
          <SheetTitle>Search campus</SheetTitle>
        </SheetHeader>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            placeholder="Posts, resources, groups, talent..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addRecent(query)}
            className="rounded-xl pl-10"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              onClick={() => setQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="mt-6 max-h-[60vh] overflow-y-auto">
          {debounced && results.length > 0 && (
            <ul className="space-y-2">
              {results.map((r) => (
                <li key={`${r.type}-${r.id}`}>
                  <Link
                    href={r.href}
                    onClick={() => onOpenChange(false)}
                    className="block rounded-xl border border-border p-3 transition-colors hover:bg-muted/50"
                  >
                    <p className="text-xs text-primary">{TYPE_LABELS[r.type]}</p>
                    <p className="font-medium">{r.title}</p>
                    <p className="text-sm text-muted-foreground">{r.subtitle}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {debounced && results.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No results for &ldquo;{debounced}&rdquo;
            </p>
          )}

          {!debounced && (
            <>
              {recent.length > 0 && (
                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> Recent
                    </span>
                    <button
                      type="button"
                      onClick={clearRecent}
                      className="text-xs text-primary"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => handleSelect(r)}
                        className="rounded-lg bg-muted px-3 py-1.5 text-sm"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5" /> Trending
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleSelect(t)}
                      className={cn(
                        "rounded-lg border border-border px-3 py-1.5 text-sm hover:border-primary/30"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
