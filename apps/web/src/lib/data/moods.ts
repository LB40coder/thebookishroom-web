import type { Mood } from "@/lib/types";
import { apiFetch } from "@/lib/api";

export async function getMoods(): Promise<Mood[]> {
  return (await apiFetch<Mood[]>("/api/public/moods")) ?? [];
}

export async function getMoodBySlug(slug: string): Promise<Mood | undefined> {
  const mood = await apiFetch<Mood>(`/api/public/moods/${slug}`);
  return mood ?? undefined;
}
