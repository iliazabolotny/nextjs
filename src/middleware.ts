import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionId = request.cookies.get("sessionId");

  if (!sessionId && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.json({ message: "forbidden" }, { status: 403 });
  }

  if (
    request.nextUrl.pathname.startsWith("/403") &&
    !request.headers.get("x-middleware-auth")
  ) {
    return NextResponse.json({ message: "not-found" }, { status: 404 });
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};