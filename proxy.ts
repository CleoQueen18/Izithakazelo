import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isApiAdminRoute = request.nextUrl.pathname.startsWith("/api/admin");
  
  if (isAdminRoute || isApiAdminRoute) {
    const isAuthenticated = request.cookies.get("admin_auth")?.value === "true";
    
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};