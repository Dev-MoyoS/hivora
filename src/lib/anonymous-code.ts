const PREFIXES = ["CONFI", "UBUN", "SAFE", "HEAR", "CALM", "HOPE"] as const;

export function generateTrackingCode(): string {
  const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${num}`;
}

export function isValidTrackingCode(code: string): boolean {
  return /^[A-Z]{4}-\d{4}$/.test(code.trim().toUpperCase());
}
