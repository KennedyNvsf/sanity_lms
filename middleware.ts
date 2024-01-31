// middlewate.ts
import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware

const publicRoutes = ["/", "/studio", "/api/uploadthing", "/api/webhook"];

export default authMiddleware({
  publicRoutes,
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};