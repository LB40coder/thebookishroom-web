import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { bookLinksToStorage } from "@/lib/authors/book-links";

function htmlMinLength(min: number) {
  return (value: string) =>
    value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().length >= min;
}

const imageUrlSchema = z
  .string()
  .url()
  .or(z.string().startsWith("/"))
  .optional();

const bookLinkUrlSchema = z
  .string()
  .max(500)
  .refine(
    (value) =>
      !value ||
      value.startsWith("/") ||
      z.string().url().safeParse(value).success,
    "Must be a valid URL or path starting with /"
  );

export const authorBookLinkSchema = z.object({
  title: z.string().min(1).max(200),
  url: bookLinkUrlSchema.optional().default(""),
});

export const authorFieldsSchema = z.object({
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
  mainBooks: z.array(authorBookLinkSchema).max(5).optional().default([]),
  whereToStart: z.string().min(10).max(1000),
  readingOrder: z.array(authorBookLinkSchema).max(5).optional().default([]),
  image: imageUrlSchema,
  published: z.boolean().optional().default(true),
});

export const authorSchema = authorFieldsSchema;
export const authorUpdateSchema = authorFieldsSchema.partial();

export type AuthorBookLinkInput = z.infer<typeof authorBookLinkSchema>;
export type AuthorInput = z.infer<typeof authorFieldsSchema>;
export type AuthorUpdateInput = z.infer<typeof authorUpdateSchema>;

export function toAuthorCreateData(
  data: AuthorInput
): Prisma.AuthorCreateInput {
  return {
    ...data,
    mainBooks: bookLinksToStorage(data.mainBooks),
    readingOrder: bookLinksToStorage(data.readingOrder),
  };
}

export function toAuthorUpdateData(
  data: AuthorUpdateInput
): Prisma.AuthorUpdateInput {
  const { mainBooks, readingOrder, ...rest } = data;

  return {
    ...rest,
    ...(mainBooks !== undefined
      ? { mainBooks: bookLinksToStorage(mainBooks) }
      : {}),
    ...(readingOrder !== undefined
      ? { readingOrder: bookLinksToStorage(readingOrder) }
      : {}),
  };
}
