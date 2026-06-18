import { z } from "zod";

function htmlMinLength(min: number) {
  return (value: string) =>
    value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().length >= min;
}

const imageUrlSchema = z
  .string()
  .url()
  .or(z.string().startsWith("/"))
  .optional();

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
  description: z
    .string()
    .refine(htmlMinLength(10), "Description must be at least 10 characters")
    .refine((v) => v.length <= 20_000, "Description is too long"),
  whyRead: z
    .string()
    .refine(htmlMinLength(10), "Why read must be at least 10 characters")
    .refine((v) => v.length <= 20_000, "Why read is too long"),
  whoIsItFor: z
    .string()
    .refine(htmlMinLength(10), "Who is it for must be at least 10 characters")
    .refine((v) => v.length <= 20_000, "Who is it for is too long"),
  estimatedReadingTime: z.string().min(2).max(40),
  similarBooks: z.array(z.string()).max(20).optional().default([]),
  coverImage: imageUrlSchema,
  amazonEditions: z.array(amazonEditionSchema).max(3).optional(),
  published: z.boolean().optional().default(true),
});

export const bookUpdateSchema = bookSchema.partial();

export type BookInput = z.infer<typeof bookSchema>;
