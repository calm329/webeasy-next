import { NextRequest, NextResponse } from "next/server";
import { hostname } from "os";

export default function middleware(req: NextRequest) {
  let hostname = req.headers
    .get("host")!
    .replace("localhost:3000", `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  const subdomain = hostname.split(
    `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
  )[0];

  if (
    subdomain !== "www" &&
    subdomain !== process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(new URL(`/${subdomain}`, req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
