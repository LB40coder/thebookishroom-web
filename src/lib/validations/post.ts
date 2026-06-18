import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z
    .string()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  excerpt: z.string().min(10).max(500),
  content: z.string().max(100_000).optional().default(""),
  coverImage: z.string().url().or(z.string().startsWith("/")),
  category: z.string().min(2).max(80).optional().default("Reading Lists"),
  tags: z.array(z.string().min(1).max(50)).max(20).optional().default([]),
  moods: z.array(z.string().min(1).max(50)).max(10).optional().default([]),
  relatedBooks: z.array(z.string()).max(30).optional().default([]),
  readingTime: z.number().int().min(1).max(120).optional().default(5),
  views: z.number().int().min(0).optional().default(0),
  seoTitle: z.string().min(3).max(200),
  seoDescription: z.string().min(10).max(300),
  published: z.boolean().optional().default(false),
  publishedAt: z.string().datetime().optional(),
});

export const postUpdateSchema = postSchema.partial();

export type PostInput = z.infer<typeof postSchema>;
export type PostUpdateInput = z.infer<typeof postUpdateSchema>;
