import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_INTERNAL_PATH,
  getAdminPath,
  getBearerToken,
  verifyApiKey,
} from "@/lib/auth/security";
import { verifySession, SESSION_COOKIE } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminPath = getAdminPath();

  // Block direct access to internal admin routes
  if (pathname.startsWith(ADMIN_INTERNAL_PATH)) {
    return new NextResponse(null, { status: 404 });
  }

  // Protect bot API with Bearer token
  if (pathname.startsWith("/api/v1/")) {
    const token = getBearerToken(request.headers.get("authorization"));
    if (!verifyApiKey(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Admin login/logout — public but rate-limited in route handlers
  if (
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout"
  ) {
    return NextResponse.next();
  }

  // Other admin API routes require session
  if (pathname.startsWith("/api/admin/")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const valid = await verifySession(token);
    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Rewrite secret admin path to internal studio
  if (adminPath && pathname.startsWith(`/${adminPath}`)) {
    const suffix = pathname.slice(`/${adminPath}`.length) || "";
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = `${ADMIN_INTERNAL_PATH}${suffix}`;
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/v1/:path*",
    "/api/admin/:path*",
    "/_studio/:path*",
    "/((?!_next/static|_next/image|favicon.ico|images|robots.txt).*)",
  ],
};
