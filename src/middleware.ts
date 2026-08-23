import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionId = request.cookies.get("sessionId");

  if (!sessionId && request.nextUrl.pathname.startsWith("/products-paginated")) {
    return NextResponse.redirect(new URL("/401", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};