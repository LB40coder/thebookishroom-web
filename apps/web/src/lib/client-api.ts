export function getPublicApiUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3457";
  return url.replace(/\/$/, "");
}
