import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Routes that require authentication (redirect to login). */
const PROTECTED_PREFIXES = [
  "/knowledge/new",
  "/knowledge/groups/new",
  "/profile/edit",
  "/admin",
  "/moderator",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const session = request.cookies.get("__session")?.value;
  if (session) return NextResponse.next();

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("return", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/knowledge/new/:path*",
    "/knowledge/groups/new/:path*",
    "/profile/edit/:path*",
    "/admin/:path*",
    "/moderator/:path*",
  ],
};
