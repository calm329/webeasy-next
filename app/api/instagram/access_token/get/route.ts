import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code") || "";

  if (!code) {
    const access_token = cookies().get("acces_token")?.value || "";

    if (access_token) {
      return NextResponse.json(
        { acces_token: access_token },
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    } else {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
  }

  try {
    const res = await fetch(
      `${process.env.INSTAGRAM_API_AUTH_ENDPOINT}access_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.NEXT_PUBLIC_FB_CLIENT_ID,
          client_secret: process.env.INSTAGRAM_API_SECRET,
          grant_type: "authorization_code",
          redirect_uri: process.env.NEXT_PUBLIC_FB_REDIRECT_URL,
          code,
        }),
      },
    );

    const { acces_token, user_id } = await res.json();

    cookies().set("acces_token", acces_token);

    return NextResponse.json(
      { acces_token, user_id },
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
