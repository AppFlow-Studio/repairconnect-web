import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/accept-invite(.*)",
  "/api/waitlist",
  "/api/webhooks(.*)",
  "/shop-only",
]);

const isPortalRoute = createRouteMatcher([
  "/dashboard",
  "/shop(.*)",
  "/jobs(.*)",
  "/schedule(.*)",
  "/team(.*)",
  "/settings(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId, sessionClaims } = await auth();

  // Allow public routes through
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  // If not signed in, redirect to sign-in
  if (!userId) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect_url", request.url);
    return NextResponse.redirect(signInUrl);
  }

  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Portal routes require a shop role or admin
  if (isPortalRoute(request)) {
    if (
      role !== "shop_owner" &&
      role !== "shop_mechanic" &&
      role !== "mechanic" &&
      role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/shop-only", request.url));
    }
  }

  // Admin routes require admin role
  if (isAdminRoute(request)) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
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
