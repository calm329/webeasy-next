import { NextRequest, NextResponse } from "next/server";
import unirest from "unirest";
import prisma from "@/lib/prisma";

async function refreshLongLivedAccessToken(access_token: string) {
  return await unirest
    .get(`${process.env.INSTAGRAM_API_ENDPOINT}/refresh_access_token`)
    .query({
      grant_type: "ig_refresh_token",
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
  const accessTokens = await prisma.accessToken.findMany({
    where: {
      expires: {
        lt: new Date(Date.now() - 1000 * 60 * 60 * 24), // check if expire time is less than currentTime - one day
      },
    },
  });

  for (const accessToken of accessTokens) {
    const { access_token } = await refreshLongLivedAccessToken(
      accessToken.token,
    );

    await prisma.accessToken.update({
      where: {
        id: accessToken.id,
      },
      data: {
        token: access_token,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60), // add 60 days to current date
      },
    });
  }

  return NextResponse.json({
    success: true,
    message: `Refreshed ${accessTokens.length} access tokens`,
  });
}
