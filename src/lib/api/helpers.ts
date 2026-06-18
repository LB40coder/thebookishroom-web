import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export function apiError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function logApiRequest(
  request: Request,
  status: number
): Promise<void> {
  try {
    const url = new URL(request.url);
    await prisma.apiLog.create({
      data: {
        method: request.method,
        path: url.pathname,
        ip:
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          request.headers.get("x-real-ip") ||
          null,
        userAgent: request.headers.get("user-agent")?.slice(0, 255) || null,
        status,
      },
    });
  } catch {
    // Non-blocking — don't fail request if logging fails
  }
}

export async function parseJsonBody<T>(
  request: Request
): Promise<T | NextResponse> {
  try {
    return (await request.json()) as T;
  } catch {
    return apiError("Invalid JSON body", 400);
  }
}
