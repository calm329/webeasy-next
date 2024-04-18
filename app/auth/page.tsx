export const maxDuration = 300;

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import unirest from "unirest";
import OpenAI from "openai";
import { createNewUser } from "@/lib/actions";
import Image from "next/image";
import { ServiceIcon } from "@/components/icons";
import Link from "next/link";
import PostCard from "@/components/card/post-card";
import ServiceCard from "@/components/card/service-card";
import CTA from "@/components/cta";
import TopBar from "@/components/top-bar";

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
      console.log("========================================================");
      console.log(response.body);
      console.log("========================================================");
      return response.body;
    })
    .catch((error) => {
      throw error;
    });
}

async function getProfile(accessToken: string) {
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
      console.log(response.body);
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
    model: "gpt-4-turbo",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant that writes website content in a friendly simple marketing tone. Generate comprehensive engaging content for a business website homepage that showcases our unique offerings and product descriptions that connects with our target audience. Use insights and themes from our Instagram post captions provided in json to create a series of sections that highlight different aspects of our brand. Ensure the content is lively, informative, and visually appealing, mirroring the dynamic nature of our Instagram feed.
        Respond only contain JSON output with the following structure:
        Make the list of services the most important ones identified from the instagram posts.

        {
          "businessName": "*Name of the business inferred from all the content*",
          "heroImagePrompt": "*Create a prompt for dall-e-3 to create a hero image to represent the business and content from the instagram posts in a simple above the fold style*",
          "hero": {
            "heading": "*insert heading here*",
            "subheading": "*insert subheading here*",
            "cta": "*insert call to action here, it should only be a couple of words long*",
            "imageId": "*The id of the post that best matches the heading and subheading*"
          },
          "services": {
            "title": "*type of services title Services or Features*",
            "description": "*services heading*",
            "list": [
              {
                "name": "*first service or feature*",
                "description": "*description*",
                "image": "url-to-service1-image.jpg"
              }
            ]
          }
        }`,
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
let aiObj = {};

async function getImage(imageUrl: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Identify the prominent primary and secondary brand logo colors in the image except white and black. The colors will be used on a website for heading and subheading and should be vibrant and have contrast with a white background.
            Output results in JSON following this template: 
            {"primary":"*color in hex*",
            "secondary":"*color in hex*"}`,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.log(error);

    return {
      primary: "#000000",
      secondary: "#333333",
    };
  }
}

async function generateImage(prompt: string) {
  //console.log(prompt);
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt:
      "Do not modify or diversify this prompt: Create a simple image with upto 10 objects. " +
      prompt,
    n: 1,
    size: "1024x1024",
  });
  //console.log(response.data);
  return response.data[0].url;
}
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
    console.log(media, "media");
    let imageIds = {};

    iPosts = [];
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
    //console.log(mediaCaption);
    aiContent = "" + (await createAI(mediaCaption));
    //console.log(aiContent);
    aiObj = JSON.parse(aiContent);

    //const heroImageUrl = await generateImage(aiObj["heroImagePrompt"]);
    const postImageUrl = imageIds[aiObj["hero"]["imageId"]];
    aiObj["hero"]["imageUrl"] = postImageUrl;

    //console.log(imageIds[aiObj["hero"]["imageId"]]);
    aiObj["colors"] = JSON.parse("" + (await getImage(postImageUrl)));
    //console.log(aiObj["colors"]["primary"]);

    try {
      const { success, data } = await createNewUser(
        iPosts[0]?.username || "default",
        JSON.stringify(iPosts),
        JSON.stringify(aiObj),
      );

      console.log(success, data);
    } catch (error) {
      console.log(error);
    }
  }

  const jsonTemplate = {
    hero: {
      heading: "*insert heading here, should be short and engaging*",
      subheading: "*insert subheading here*",
      cta: "*insert call to action here*",
    },
    services: {
      title: "*type of services title Services or Features*",
      description: "*services heading*",
      list: [
        {
          name: "*first service or feature*",
          description: "*description*",
          image: "url-to-service1-image.jpg",
        },
        {
          name: "*second service or feature*",
          description: "*description*",
          image: "url-to-service1-image.jpg",
        },
        {
          name: "*third service or feature*",
          description: "*description*",
          image: "url-to-service1-image.jpg",
        },
      ],
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
    <div>
      <section className="bg-white py-6">
        <div className="container mx-auto px-4">
          <TopBar
            businessName={aiObj["businessName"]}
            colors={aiObj["colors"]}
            cta={{
              text: aiObj["hero"]["cta"],
              link: "#",
            }}
          />
        </div>
      </section>
      <section className="overflow-hidden bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-white px-8 py-16">
            <div className="mx-auto max-w-7xl">
              <div className="-m-8 mb-10 flex flex-wrap">
                <div className="w-full p-8 md:w-1/2">
                  <div className="md:max-w-lg">
                    <h2
                      className={`font-heading mb-6 text-4xl font-black tracking-tight text-gray-300 md:text-5xl`}
                      style={{ color: aiObj["colors"]["primary"] }}
                    >
                      {aiObj["hero"]["heading"]}
                    </h2>
                    <p className="mb-8 text-xl font-bold">
                      {aiObj["hero"]["subheading"]}
                    </p>
                    <div className="-m-2 flex flex-wrap">
                      <div className="w-full p-2 md:w-auto">
                        <CTA
                          text={aiObj["hero"]["cta"]}
                          bgColor={aiObj["colors"]["secondary"]}
                          link="#"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full p-8 md:w-1/2">
                  <Image
                    src={aiObj["hero"]["imageUrl"]}
                    width={256}
                    height={256}
                    alt="Hero Image"
                    className="mx-auto rounded-3xl object-contain md:mr-0"
                  />
                </div>
              </div>
              <div className="rounded-3xl bg-gray-100 p-8 md:p-12">
                <div className="-m-8 flex flex-wrap">
                  {aiObj["services"]["list"].map((service) => (
                    <ServiceCard
                      key={service["name"]}
                      name={service["name"]}
                      description={service["description"]}
                      color={aiObj["colors"]["primary"]}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*<p className="text-base font-semibold leading-7 text-indigo-600">WebEasy.AI</p>
      <div className="mx-auto max-w-2xl text-base leading-7 text-gray-700" dangerouslySetInnerHTML={{ __html: aiContent }} />*/}

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Posts</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {iPosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              permalink={post.permalink}
              media_url={post.media_url}
              media_type={post.media_type}
              caption={post.caption}
              timestamp={post.timestamp}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
