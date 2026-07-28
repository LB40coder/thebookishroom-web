import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL,
  "http://localhost:3456",
  "https://www.thebookishroom.com",
].filter(Boolean) as string[];

export function withCors(response: NextResponse, request: Request): NextResponse {
  const origin = request.headers.get("origin");
  if (origin && ALLOWED_ORIGINS.some((allowed) => origin === allowed || origin.startsWith(allowed))) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  }
  return response;
}

export function corsOptions(request: Request): NextResponse {
  const response = new NextResponse(null, { status: 204 });
  return withCors(response, request);
}

export function jsonWithCors<T>(data: T, request: Request, init?: ResponseInit): NextResponse {
  const response = NextResponse.json(data, init);
  return withCors(response, request);
}
