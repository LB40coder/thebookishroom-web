import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const MAX_SIZE = 5 * 1024 * 1024;

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.has(file.type)) {
    return "Only JPEG, PNG, WebP, GIF, and SVG images are allowed.";
  }
  if (file.size > MAX_SIZE) {
    return "Image must be 5 MB or smaller.";
  }
  return null;
}

function extensionForMime(mimeType: string): string {
  const map: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/svg+xml": ".svg",
  };
  return map[mimeType] ?? ".bin";
}

export async function uploadImage(file: File): Promise<{
  url: string;
  filename: string;
  mimeType: string;
  size: number;
}> {
  const validationError = validateImageFile(file);
  if (validationError) throw new Error(validationError);

  const buffer = Buffer.from(await file.arrayBuffer());
  const storedName = `${crypto.randomUUID()}${extensionForMime(file.type)}`;
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  if (blobToken) {
    const blob = await put(`media/${storedName}`, buffer, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
      token: blobToken,
    });
    return {
      url: blob.url,
      filename: file.name,
      mimeType: file.type,
      size: buffer.length,
    };
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Uploads on Vercel require Blob storage. In the Vercel dashboard go to Storage → Create Blob → Connect to this project, then redeploy."
    );
  }

  const year = new Date().getFullYear().toString();
  const uploadDir = path.join(process.cwd(), "public", "uploads", year);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, storedName), buffer);

  return {
    url: `/uploads/${year}/${storedName}`,
    filename: file.name,
    mimeType: file.type,
    size: buffer.length,
  };
}
