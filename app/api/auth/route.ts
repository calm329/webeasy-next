export const maxDuration = 300;
// export const runtime = "edge";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import unirest from "unirest";

async function getData(url: string) {
  //get user media
  return await unirest
    .get(url)
    .query({})
    .then((response: any) => {
      return response.body;
    })
    .catch((error: any) => {
      throw error;
    });
}

async function getMedia(accessToken: string) {
  //get user media
  return await unirest
    .get(`${process.env.INSTAGRAM_API_ENDPOINT}me/media`)
    .query({
      fields: [
        "id",
        "media_url",
        "permalink",
        "caption",
        "media_type",
        "username",
        "timestamp",
      ].join(),
      access_token: accessToken,
    })
    .then((response: any) => {
      return response.body;
    })
    .catch((error: any) => {
      throw error;
    });
}

async function getAccessTokenAndUserId(code: string) {
  //transfer auth code to access token
  return await unirest
    .post(`${process.env.INSTAGRAM_API_AUTH_ENDPOINT}access_token`)
    .field("client_id", process.env.NEXT_PUBLIC_FB_CLIENT_ID)
    .field("client_secret", process.env.INSTAGRAM_API_SECRET)
    .field("grant_type", "authorization_code")
    .field("redirect_uri", process.env.NEXT_PUBLIC_FB_REDIRECT_URL)
    .field("code", code)
    .then((response: any) => {
      console.log(response.body);
      return response.body;
    })
    .catch((error: any) => {
      console.log(error);
    });
}

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    // const session = await getServerSession(authOptions);

    // console.log(session);

    // if (!session || !session.accessToken) {
    //   return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    // }
    const code = request.nextUrl.searchParams.get("code") || "";
    const { access_token, user_id } = await getAccessTokenAndUserId(code);

    let mediaCaption = "";

    let media = await getMedia(access_token);
    let imageIds: any = {};

    let iPosts: any[] = [];
    if (media && media.data && media.data.length > 0) {
      media.data.forEach((item: any) => {
        iPosts.push(item);
        imageIds["" + item.id] = item.media_url;
        mediaCaption +=
          '{"id":"' + item.id + '", "caption": "' + item.caption + '"}\n';
      });
    }

    if (media && media.paging && media.paging.next) {
      let media2 = await getData(media.paging.next);
      if (media2 && media2.data && media2.data.length > 0) {
        media2.data.forEach((item: any) => {
          iPosts.push(item);
          imageIds["" + item.id] = item.media_url;
          mediaCaption +=
            '{"id":"' + item.id + '", "caption": "' + item.caption + '"}\n';
        });
      }
    }

    return NextResponse.json(
      { mediaCaption, imageIds, posts: iPosts },
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 401 },
    );
  }
}
