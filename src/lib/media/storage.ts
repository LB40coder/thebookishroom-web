import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const MAX_SIZE = 5 * 1024 * 1024;
const WEBP_QUALITY = 85;

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.has(file.type)) {
    return "Only JPEG, PNG, WebP, GIF, and SVG images are allowed.";
  }
  if (file.size > MAX_SIZE) {
    return "Image must be 5 MB or smaller.";
  }
  return null;
}

async function prepareImageForUpload(
  file: File,
  rawBuffer: Buffer
): Promise<{ buffer: Buffer; mimeType: string; extension: string }> {
  if (file.type === "image/svg+xml") {
    return { buffer: rawBuffer, mimeType: file.type, extension: ".svg" };
  }

  try {
    const webpBuffer = await sharp(rawBuffer, { animated: file.type === "image/gif" })
      .rotate()
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();

    return {
      buffer: webpBuffer,
      mimeType: "image/webp",
      extension: ".webp",
    };
  } catch {
    return {
      buffer: rawBuffer,
      mimeType: file.type,
      extension: extensionForMime(file.type),
    };
  }
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

function shouldTryBlobUpload(): boolean {
  return Boolean(
    process.env.VERCEL ||
      process.env.BLOB_READ_WRITE_TOKEN ||
      process.env.BLOB_STORE_ID
  );
}

export async function uploadImage(file: File): Promise<{
  url: string;
  filename: string;
  mimeType: string;
  size: number;
}> {
  const validationError = validateImageFile(file);
  if (validationError) throw new Error(validationError);

  const rawBuffer = Buffer.from(await file.arrayBuffer());
  const prepared = await prepareImageForUpload(file, rawBuffer);
  const storedName = `${crypto.randomUUID()}${prepared.extension}`;
  const blobPath = `media/${storedName}`;

  if (shouldTryBlobUpload()) {
    try {
      // Let the SDK pick OIDC (BLOB_STORE_ID + VERCEL_OIDC_TOKEN) or
      // BLOB_READ_WRITE_TOKEN — do not pass token manually.
      const blob = await put(blobPath, prepared.buffer, {
        access: "public",
        contentType: prepared.mimeType,
        addRandomSuffix: false,
      });

      return {
        url: blob.url,
        filename: file.name,
        mimeType: prepared.mimeType,
        size: prepared.buffer.length,
      };
    } catch (error) {
      const detail =
        error instanceof Error ? error.message : "Unknown blob upload error";

      throw new Error(
        process.env.VERCEL
          ? `Blob upload failed: ${detail}. In Vercel, open Storage → your Blob store → Projects and confirm this project is connected, then redeploy.`
          : `Blob upload failed: ${detail}. Run "vercel env pull" for local Blob access.`
      );
    }
  }

  const year = new Date().getFullYear().toString();
  const uploadDir = path.join(process.cwd(), "public", "uploads", year);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, storedName), prepared.buffer);

  return {
    url: `/uploads/${year}/${storedName}`,
    filename: file.name,
    mimeType: prepared.mimeType,
    size: prepared.buffer.length,
  };
}
