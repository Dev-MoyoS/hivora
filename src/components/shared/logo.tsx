import Link from "next/link";
import Image from "next/image";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const LOGO_SYMBOL_SRC = "/logo-symbol.png";

type LogoSize = "sm" | "md" | "lg";

const SIZE_MAP: Record<LogoSize, { box: number; text: string }> = {
  sm: { box: 28, text: "text-base" },
  md: { box: 36, text: "text-lg" },
  lg: { box: 48, text: "text-xl" },
};

interface LogoProps {
  className?: string;
  href?: string;
  /** Show symbol only (no wordmark) — e.g. compact mobile header */
  symbolOnly?: boolean;
  size?: LogoSize;
}

export function Logo({
  className,
  href = "/",
  symbolOnly = false,
  size = "md",
}: LogoProps) {
  const { box, text } = SIZE_MAP[size];

  const content = (
    <>
      <Image
        src={LOGO_SYMBOL_SRC}
        alt=""
        width={box}
        height={box}
        className="h-auto w-auto shrink-0 object-contain"
        style={{ width: box, height: box }}
        priority
      />
      {!symbolOnly && (
        <span
          className={cn(
            "font-semibold tracking-tight text-brand-navy dark:text-foreground",
            text
          )}
        >
          {BRAND.name}
        </span>
      )}
    </>
  );

  const wrapperClass = cn(
    "inline-flex items-center gap-2.5",
    symbolOnly && "gap-0",
    className
  );

  if (href) {
    return (
      <Link href={href} className={wrapperClass} aria-label={`${BRAND.name} home`}>
        {content}
      </Link>
    );
  }

  return <div className={wrapperClass}>{content}</div>;
}

/** Standalone symbol for loading states, empty states, auth hero */
export function LogoSymbol({
  className,
  size = 56,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src={LOGO_SYMBOL_SRC}
      alt={`${BRAND.name} logo`}
      width={size}
      height={size}
      className={cn("object-contain", className)}
      style={{ width: size, height: size }}
      priority
    />
  );
}
