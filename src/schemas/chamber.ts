import { z } from "zod";

export const chamberSubmissionSchema = z.object({
  door: z.enum([
    "financial",
    "mental_health",
    "harassment",
    "academic_breakdown",
    "campus_ideas",
  ]),
  content: z
    .string()
    .min(10, "Please share a little more so we can help")
    .max(5000, "Message is too long"),
  optionalContact: z.string().max(200).optional(),
});

export type ChamberSubmissionInput = z.infer<typeof chamberSubmissionSchema>;

export const trackingCodeSchema = z.object({
  code: z
    .string()
    .regex(/^[A-Za-z]{4}-\d{4}$/, "Format: XXXX-1234 (e.g. UBUN-7291)"),
});
