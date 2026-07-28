import { z } from "zod";

export const mediaCreateSchema = z.object({
  filename: z.string().min(1).max(255),
  url: z.string().url().or(z.string().startsWith("/")),
  mimeType: z.string().min(3).max(100),
  size: z.number().int().min(1).max(5 * 1024 * 1024),
  alt: z.string().max(200).optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});
