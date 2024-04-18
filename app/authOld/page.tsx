export const maxDuration = 300;

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import unirest from "unirest";
import OpenAI from "openai";

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
      //console.log(response.body);
      return response.body;
    })
    .catch((error) => {
      throw error;
    });
}

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
      //console.log(response.body);
      return response.body;
    })
    .catch((error) => {
      throw error;
    });
}

async function createAI(captions: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant that writes website content in a friendly simple marketing tone. Generate comprehensive engaging content for a business website homepage that showcases our unique offerings and product descriptions that connects with our target audience. Use insights and themes from our Instagram posts to create a series of sections that highlight different aspects of our brand. Ensure the content is lively, informative, and visually appealing, mirroring the dynamic nature of our Instagram feed.
        Output only html fragment with div tags and text content. Pay attention to the meaning in the hashtags to get more insight. Use tailwind css classes for styling.`,
      },
      {
        role: "user",
        content: captions,
      },
    ],
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
}
let iPosts: any[] = [];

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [code: string]: string | string[] | undefined };
}) {
  const code = searchParams["code"];
  let aiContent = "";
  if (typeof code === "string") {
    const accessToken = (await getAccessTokenAndUserId(code)).access_token;

    let mediaCaption = "";

    let media = await getMedia(accessToken);

    if (media && media.data && media.data.length > 0) {
      media.data.forEach((item: any) => {
        iPosts.push(item);
        mediaCaption += item.caption + "\n\n";
      });
    }

    if (media && media.paging && media.paging.next) {
      let media2 = await getData(media.paging.next);
      if (media2 && media2.data && media2.data.length > 0) {
        media2.data.forEach((item: any) => {
          iPosts.push(item);
          mediaCaption += item.caption + "\n\n";
        });
      }
    }
    //console.log(mediaCaption);
    aiContent = "" + (await createAI(mediaCaption));
  }

  const jsonTemplate = {
    hero: {
      heading: "*insert heading here*",
      subheading: "*insert subheading here*",
      cta: "*insert call to action here*",
    },
  };

  /*
  {
              "id": "17946976796294774",
              "caption": "In the fast-changing real estate industry, professionals require more comprehensive tools to stay on top of the latest market trends and insights. With TopHap, you now have access to investor-grade real estate analytics\u2014all at your fingertips! Head to www.TopHap.com\u200b to take your real estate research game to the next level. \u200b\ud83d\udcc8\n\n#tophap #tophapcommunity #tophappers #realestate #realestategoals #marketintelligence #realestateagent #realestatebroker #realestateinvestor #realestatetips #realestateadvice #realestateinvesting #realestateexperts #realestateagents #proptech",
              "media_type": "IMAGE",
              "media_url": "https:\/\/scontent-sjc3-1.cdninstagram.com\/v\/t51.2885-15\/321204122_467195552159579_2806292712213809583_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=18de74&_nc_ohc=UFp4tt53H1MAb5g5wHK&_nc_ht=scontent-sjc3-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfB89gcQZvthIqhxe0zFFh2SGExhn-Nzfisd6-j0bFVYsQ&oe=661E1D34",
              "username": "tophapinc",
              "timestamp": "2022-12-23T20:57:48+0000"
          }
  */
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <p className="text-base font-semibold leading-7 text-indigo-600">
        WebEasy.AI
      </p>
      <div
        className="mx-auto max-w-2xl text-base leading-7 text-gray-700"
        dangerouslySetInnerHTML={{ __html: aiContent }}
      />

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Posts</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {iPosts.map((post) => (
            <a key={post.id} className="group">
              <div className="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200">
                {post.media_type === "VIDEO" ? (
                  <video
                    src={post.media_url}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={post.media_url}
                    alt={post.caption}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                )}
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{post.caption}</h3>
              {/*<p className="mt-1 text-xs font-medium text-gray-900">{post.timestamp}</p>*/}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
