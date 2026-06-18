import { z } from "zod";

export const authorSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z
    .string()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  bio: z.string().min(20).max(3000),
  nationality: z.string().min(2).max(80),
  birthYear: z.number().int().min(0).max(2100).optional(),
  deathYear: z.number().int().min(0).max(2100).optional(),
  mainBooks: z.array(z.string()).max(30).optional().default([]),
  whereToStart: z.string().min(10).max(1000),
  readingOrder: z.array(z.string()).max(30).optional().default([]),
  image: z.string().optional(),
  published: z.boolean().optional().default(true),
});

export const authorUpdateSchema = authorSchema.partial();

export type AuthorInput = z.infer<typeof authorSchema>;
