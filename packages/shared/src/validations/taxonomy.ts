import { z } from "zod";
import { isValidMoodIcon } from "@/lib/icons/mood-icons";

const slugSchema = z
  .string()
  .min(2)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const genreCreateSchema = z.object({
  name: z.string().min(2).max(80),
  slug: slugSchema.optional(),
});

const moodIconSchema = z
  .string()
  .refine(isValidMoodIcon, "Invalid mood icon");

export const moodCreateSchema = z.object({
  name: z.string().min(2).max(80),
  slug: slugSchema.optional(),
  description: z.string().max(500).optional(),
  icon: moodIconSchema.optional(),
});

export const moodUpdateSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  description: z.string().max(500).optional(),
  icon: moodIconSchema.optional(),
});

export type GenreCreateInput = z.infer<typeof genreCreateSchema>;
export type MoodCreateInput = z.infer<typeof moodCreateSchema>;
export type MoodUpdateInput = z.infer<typeof moodUpdateSchema>;
