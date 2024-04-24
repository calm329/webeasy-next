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

async function getMedia(access_token: string) {
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
      access_token,
    })
    .then((response) => {
      return response.body;
    })
    .catch((error) => {
      throw error;
    });
}

export async function GET(req: NextRequest) {
  const access_token = req.nextUrl.searchParams.get("access_token") || "";

  try {
    let mediaCaption = "";

    let media = await getMedia(access_token);
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
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 401 },
    );
  }
}
