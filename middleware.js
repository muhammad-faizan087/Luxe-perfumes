import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/checkout(.*)?",
  //   "/resume(.*)?",
  //   "/interview-prep(.*)?",
  //   "/cover-letter(.*)?",
]);

export default clerkMiddleware(async (auth, req) => {
  const session = await auth();
  const userId = session?.userId;

  if (!userId && isProtectedRoute(req)) {
    const redirectToSignIn = session?.redirectToSignIn;
    return redirectToSignIn();
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
