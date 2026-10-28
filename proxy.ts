import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only protect the admin page UI, not the API routes
  // API routes are called after the client-side password check
  const isAdminPage = pathname.startsWith("/secret-admin-xyz123");

  if (isAdminPage) {
    const isAuthenticated = request.cookies.get("admin_auth")?.value === "true";

    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/secret-admin-xyz123/:path*"],
};