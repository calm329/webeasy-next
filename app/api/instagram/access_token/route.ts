import { NextRequest, NextResponse } from "next/server";
import unirest from "unirest";

async function getAccessTokenAndUserId(code?: string) {
  return await unirest
    .post(`${process.env.INSTAGRAM_API_AUTH_ENDPOINT}access_token`)
    .field("client_id", process.env.NEXT_PUBLIC_FB_CLIENT_ID)
    .field("client_secret", process.env.INSTAGRAM_API_SECRET)
    .field("grant_type", "authorization_code")
    .field("redirect_uri", process.env.NEXT_PUBLIC_FB_REDIRECT_URL)
    .field("code", code)
    .then((response: any) => {
      return response.body;
    })
    .catch((error: any) => {
      console.log(error, "get access token error");
    });
}

async function getLongLivedAccessToken(access_token: string) {
  return await unirest
    .get(`${process.env.INSTAGRAM_API_ENDPOINT}access_token`)
    .query({
      grant_type: "ig_exchange_token",
      client_secret: process.env.INSTAGRAM_API_SECRET,
      access_token,
    })
    .then((response: any) => {
      return response.body;
    })
    .catch((error: any) => {
      console.log(error, "get long lived access token error");
    });
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code") || "";

  if (!code) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 401 });
  }

  const { access_token, user_id } = await getAccessTokenAndUserId(code);

  const { access_token: longLivedToken } =
    await getLongLivedAccessToken(access_token);

  return NextResponse.json({
    access_token: longLivedToken,
    user_id,
  });
}
