import { cn } from "@/lib/utils";
import { BRAND_COLORS } from "@/lib/brand-colors";

const PALETTE = ["#0B1F4D", "#D4A017", "#10B981", "#6366F1", "#EC4899", "#F59E0B"];

function hash(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return Math.abs(h);
}

export function UserAvatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const initials = name
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 2)
    .toUpperCase();
  const bg = PALETTE[hash(name) % PALETTE.length];
  const sizes = { sm: "h-7 w-7 text-[10px]", md: "h-9 w-9 text-xs", lg: "h-11 w-11 text-sm" };

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white",
        sizes[size],
        className
      )}
      style={{ backgroundColor: bg }}
      aria-hidden
    >
      {initials || "?"}
    </span>
  );
}

export function AvatarStack({
  names,
  max = 5,
}: {
  names: string[];
  max?: number;
}) {
  const visible = names.slice(0, max);
  const extra = names.length - max;

  return (
    <div className="flex items-center">
      {visible.map((name, i) => (
        <UserAvatar
          key={name}
          name={name}
          size="sm"
          className={cn("ring-2 ring-card", i > 0 && "-ml-2")}
        />
      ))}
      {extra > 0 && (
        <span
          className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-[10px] font-medium text-white ring-2 ring-white/30"
        >
          +{extra}
        </span>
      )}
    </div>
  );
}
