/** @format */
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/auth";
// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const session = await auth();
  const user = session?.user;
  const { pathname } = request.nextUrl;

  if (user?.id && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register"],
};
