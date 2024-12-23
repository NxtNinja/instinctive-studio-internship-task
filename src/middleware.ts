import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function to handle redirect
export function middleware(request: NextRequest) {
  // Check if the user is visiting the homepage (root path)
  if (request.nextUrl.pathname === "/") {
    // Perform the redirect to /dashboard/students
    return NextResponse.redirect(new URL("/dashboard/students", request.url));
  }

  // If the path is not `/`, just continue with the request
  return NextResponse.next();
}

// Optional: Define the paths the middleware should apply to
export const config = {
  matcher: "/", // Apply this middleware to the root path only
};
