// import { type NextRequest } from "next/server";
// import { updateSession } from "@/lib/supabase/middleware";

// export async function middleware(request: NextRequest) {
//   // update user's auth session
//   return await updateSession(request);
// }

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
