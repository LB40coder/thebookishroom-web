export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function getBearerToken(authHeader: string | null): string | null {
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.slice(7).trim() || null;
}

export function verifyApiKey(token: string | null): boolean {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected || !token) return false;
  if (expected.length < 32) return false;
  return timingSafeEqual(token, expected);
}

export function getAdminPath(): string {
  const path = process.env.ADMIN_PATH;
  if (!path || path.length < 12) return "";
  return path.replace(/^\/+|\/+$/g, "");
}

export const ADMIN_INTERNAL_PATH = "/studio";
