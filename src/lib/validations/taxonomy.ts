import { z } from "zod";

const slugSchema = z
  .string()
  .min(2)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const genreCreateSchema = z.object({
  name: z.string().min(2).max(80),
  slug: slugSchema.optional(),
});

export const moodCreateSchema = z.object({
  name: z.string().min(2).max(80),
  slug: slugSchema.optional(),
  description: z.string().max(500).optional(),
  icon: z.string().min(2).max(40).optional(),
});

export type GenreCreateInput = z.infer<typeof genreCreateSchema>;
export type MoodCreateInput = z.infer<typeof moodCreateSchema>;
