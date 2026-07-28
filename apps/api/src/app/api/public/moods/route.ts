import type { NextRequest } from "next/server";
import { corsOptions, jsonWithCors } from "@/lib/cors";
import { getMoods } from "@/lib/data/moods";

export const runtime = "nodejs";

export async function OPTIONS(request: NextRequest) {
  return corsOptions(request);
}

export async function GET(request: NextRequest) {
  const moods = await getMoods();
  return jsonWithCors({ data: moods }, request);
}
