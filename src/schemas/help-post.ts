import { z } from "zod";

export const helpPostSchema = z.object({
  courseTag: z.string().min(1, "Select or add a course"),
  moduleTag: z.string().min(1, "Module code is required"),
  assignmentTitle: z.string().min(1, "Assignment title is required"),
  content: z.string().min(20, "Please describe what you need help with"),
  deadline: z.string().min(1, "Deadline is required"),
  isAnonymous: z.boolean().optional(),
  newCourse: z.string().optional(),
});

export type HelpPostInput = z.infer<typeof helpPostSchema>;
