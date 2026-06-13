/** Static brand values — prefer Tailwind tokens (bg-brand-navy, text-brand-gold) in UI. */
export const BRAND_COLORS = {
  navy: "var(--brand-navy)",
  gold: "var(--brand-gold)",
  white: "#FFFFFF",
  background: "var(--background)",
  border: "var(--border)",
  text: "var(--foreground)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;
