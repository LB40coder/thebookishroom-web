import { z } from "zod";

const bookLinkLanguageSchema = z.enum(["en", "pt", "es", "de", "fr", "it"]).optional();
const bookLinkFormatSchema = z.enum(["paperback", "kindle", "hardcover"]).optional();

export const affiliateLinkSchema = z.object({
  title: z.string().min(2).max(120),
  url: z.string().url(),
  bookSlug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional()
    .or(z.literal("")),
  language: bookLinkLanguageSchema,
  format: bookLinkFormatSchema,
});

export const affiliateLinkUpdateSchema = affiliateLinkSchema.partial();

export type AffiliateLinkInput = z.infer<typeof affiliateLinkSchema>;
