import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // If authenticated and trying to access /auth, redirect to dashboard
    if (token && path.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        // Always allow access to /auth
        if (path.startsWith("/auth")) {
          return true;
        }
        // Protect other routes
        return !!token;
      },
    },
    pages: {
      signIn: "/auth",
    },
  }
);

export const config = {
  matcher: [
    // Match all routes except api, favicon, and next assets
    "/((?!api/auth|favicon.ico|_next/static|_next/image).*)",
  ],
};

