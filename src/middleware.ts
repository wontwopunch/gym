import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { readSessionFromRequest } from "@/lib/admin-session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }
  if (pathname.startsWith("/admin")) {
    if (!(await readSessionFromRequest(request))) {
      const login = new URL("/admin/login", request.url);
      login.searchParams.set("from", pathname);
      return NextResponse.redirect(login);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
