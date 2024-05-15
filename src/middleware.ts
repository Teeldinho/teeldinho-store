import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSessionData } from "./lib/sessions/iron-session";

// List of paths accessible by unauthenticated users
const publicPaths = ["/", "/login"];

export async function middleware(request: NextRequest) {
  const session = await getIronSessionData();
  const { pathname } = request.nextUrl;

  // Check if the path is in publicPaths
  const isPublicPath = publicPaths.includes(pathname);

  if (!session.isLoggedIn && !isPublicPath) {
    // Redirect unauthenticated users to login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session.isLoggedIn && pathname === "/login") {
    // Redirect authenticated users trying to access the login page
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
