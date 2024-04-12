import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
import unirest from "unirest"
import OpenAI from "openai";


async function getMedia(accessToken: string) {
  //get user media
  return await unirest.get(`${process.env.INSTAGRAM_API_ENDPOINT}me/media`)
    .query({
      fields: ["id", "media_url", "permalink", "caption", "media_type", "username", "timestamp"].join(),
      access_token: accessToken
    }).then(response => {
      return response.body;
    }).catch(error => {
      throw error;
    })
}

async function getAccessTokenAndUserId(code: string) {
  //transfer auth code to access token
  return await unirest.post(`${process.env.INSTAGRAM_API_AUTH_ENDPOINT}access_token`)
    .field("client_id", process.env.NEXT_PUBLIC_FB_CLIENT_ID)
    .field("client_secret", process.env.INSTAGRAM_API_SECRET)
    .field("grant_type", "authorization_code")
    .field("redirect_uri", process.env.NEXT_PUBLIC_FB_REDIRECT_URL)
    .field("code", code).then(response => {
      return response.body;
    }).catch(error => {
      throw error;
    })
}

async function createAI(captions: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        "role": "system",
        "content": "Create a business website landing page with sections using the provided user instagram post captions. Output using simple h1,h2 and p tags. Use tailwind for styles."
      },
      {
        "role": "user",
        "content": captions
      }
    ],
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [code: string]: string | string[] | undefined }
}) {

  const code = searchParams['code'];
  let aiContent = "";
  if (typeof code === "string") {
    const accessToken = (await getAccessTokenAndUserId(code)).access_token;
    const media = await getMedia(accessToken);

    //console.log(media);
    //concatenate media caption fields into one string
    let mediaCaption = "";
    if (media && media.data && media.data.length > 0) {
      media.data.forEach((item: any) => {
        mediaCaption += item.caption + "\n";
      });
      aiContent = "" + await createAI(mediaCaption);
    }

  }


  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">Your Website</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Magic</h1>
        <p className="mt-6 text-xl leading-8" dangerouslySetInnerHTML={{ __html: aiContent }}/>
      </div>
    </div>
  )
}

