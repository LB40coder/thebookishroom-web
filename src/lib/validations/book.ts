import { z } from "zod";

const amazonEditionSchema = z.object({
  language: z.enum(["en", "pt", "es"]),
  label: z.string().min(2).max(80),
  url: z.string().url(),
  format: z.enum(["paperback", "kindle", "hardcover"]).optional(),
});

export const bookSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z
    .string()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  author: z.string().min(2).max(120),
  authorSlug: z.string().min(3).max(120),
  year: z.number().int().min(0).max(2100),
  genres: z.array(z.string()).max(15).optional().default([]),
  moods: z.array(z.string()).max(15).optional().default([]),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  length: z.enum(["short", "medium", "long"]),
  description: z.string().min(10).max(2000),
  whyRead: z.string().min(10).max(2000),
  whoIsItFor: z.string().min(10).max(2000),
  estimatedReadingTime: z.string().min(2).max(40),
  similarBooks: z.array(z.string()).max(20).optional().default([]),
  coverImage: z.string().optional(),
  amazonEditions: z.array(amazonEditionSchema).max(3).optional(),
  published: z.boolean().optional().default(true),
});

export const bookUpdateSchema = bookSchema.partial();

export type BookInput = z.infer<typeof bookSchema>;
