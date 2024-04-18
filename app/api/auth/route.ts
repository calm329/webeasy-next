export const maxDuration = 300;

import { NextRequest, NextResponse } from "next/server";
import unirest from "unirest";

async function getData(url: string) {
  //get user media
  return await unirest
    .get(url)
    .query({})
    .then((response) => {
      return response.body;
    })
    .catch((error) => {
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
    .then((response) => {
      return response.body;
    })
    .catch((error) => {
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
    .then((response) => {
      return response.body;
    })
    .catch((error) => {
      throw error;
    });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (typeof code === "string") {
    const accessToken = (await getAccessTokenAndUserId(code)).access_token;

    let mediaCaption = "";

    let media = await getMedia(accessToken);
    let imageIds = {};

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
  }
}
