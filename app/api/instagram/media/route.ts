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
    .then((response: any) => {
      return response.body;
    })
    .catch((error: any) => {
      throw error;
    });
}

export async function GET(req: NextRequest) {
  const access_token = req.nextUrl.searchParams.get("access_token") || "";
  const user_id = req.nextUrl.searchParams.get("user_id") || "";

  try {
    // let access_token = cookies().get("acces_token")?.value || "";

    // if (!access_token && code) {
    //   const { access_token: shortLivedToken } =
    //     await getAccessTokenAndUserId(code);
    //   const { access_token: longLivedToken } =
    //     await getLongLivedAccessToken(shortLivedToken);
    //   access_token = longLivedToken;
    //   access_token && cookies().set("acces_token", access_token);
    // } else if (!access_token) {
    //   return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    // }

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
      { error: "Something went wrong" },
      { status: 401 },
    );
  }
}
