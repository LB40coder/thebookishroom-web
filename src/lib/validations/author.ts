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

export const authorSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z
    .string()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  bio: z
    .string()
    .refine(htmlMinLength(20), "Bio must be at least 20 characters")
    .refine((v) => v.length <= 10_000, "Bio is too long"),
  nationality: z.string().min(2).max(80),
  birthYear: z.number().int().min(0).max(2100).optional(),
  deathYear: z.number().int().min(0).max(2100).optional(),
  mainBooks: z.array(z.string()).max(30).optional().default([]),
  whereToStart: z.string().min(10).max(1000),
  readingOrder: z.array(z.string()).max(30).optional().default([]),
  image: imageUrlSchema,
  published: z.boolean().optional().default(true),
});

export const authorUpdateSchema = authorSchema.partial();

export type AuthorInput = z.infer<typeof authorSchema>;
