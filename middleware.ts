import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // const session = await getToken({ req });
  // if (!session && req.nextUrl.pathname === "/edit") {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  const fixedSubdomains = ["www", "dev", process.env.NEXT_PUBLIC_ROOT_DOMAIN];

  let hostname = req.headers
    .get("host")!
    .replace("localhost:3000", `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  let subdomain = hostname.split(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)[0];

  if (!fixedSubdomains.includes(subdomain)) {
    subdomain = subdomain.replaceAll("-", ".");
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
