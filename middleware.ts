import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths that should NOT be protected
const publicPaths = [
  "/",
  "/api/clans",
  "/api/stories",
  "/api/featured-stories",
  "/api/tribes",
  "/api/search",
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if path is public
  if (publicPaths.some(p => path.startsWith(p))) {
    return NextResponse.next();
  }

  // Protect admin paths
  if (path.startsWith("/secret-admin-xyz123") || path.startsWith("/api/admin")) {
    const token = request.cookies.get("admin_token")?.value;

    if (token !== process.env.ADMIN_SECRET) {
      if (path.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/secret-admin-xyz123/:path*",
    "/api/admin/:path*",
  ],
};
