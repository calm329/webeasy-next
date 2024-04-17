export const maxDuration = 300;

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import unirest from "unirest";
import OpenAI from "openai";
import createNewUser from "@/lib/actions/createNewUser";

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
  //console.log(response.choices[0].message.content);
  return response.choices[0].message.content;
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
        JSON.stringify(aiObj)
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
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between px-6 py-3.5 bg-gray-100 border border-gray-100 rounded-full">
            <div className="w-auto">
              <div className="flex flex-wrap items-center">
                <div
                  className="w-auto text-xl text-black-300 font-medium"
                  style={{ color: aiObj["colors"]["primary"] }}
                >
                  <a href="#">{aiObj["businessName"]}</a>
                </div>
              </div>
            </div>
            <div className="w-auto">
              <div className="flex flex-wrap items-center">
                <div className="w-auto lg:block">
                  <div className="flex flex-wrap -m-2">
                    <div className="w-full md:w-auto p-2">
                      <a
                        className="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 rounded-full"
                        style={{
                          backgroundColor: aiObj["colors"]["secondary"],
                        }}
                        href="#"
                      >
                        {aiObj["hero"]["cta"]}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="py-16 px-8 bg-white rounded-3xl">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap -m-8 mb-10">
                <div className="w-full md:w-1/2 p-8">
                  <div className="md:max-w-lg">
                    <h2
                      className={`font-heading mb-6 text-4xl md:text-5xl text-gray-300 font-black tracking-tight`}
                      style={{ color: aiObj["colors"]["primary"] }}
                    >
                      {aiObj["hero"]["heading"]}
                    </h2>
                    <p className="mb-8 text-xl font-bold">
                      {aiObj["hero"]["subheading"]}
                    </p>
                    <div className="flex flex-wrap -m-2">
                      <div className="w-full md:w-auto p-2">
                        <a
                          className="block w-full px-8 py-3.5 text-lg text-center text-white font-bold bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 rounded-full"
                          style={{
                            backgroundColor: aiObj["colors"]["secondary"],
                          }}
                          href="#"
                        >
                          {aiObj["hero"]["cta"]}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-8">
                  <img
                    className="object-contain mx-auto md:mr-0 rounded-3xl"
                    width="256"
                    height="256"
                    src={aiObj["hero"]["imageUrl"]}
                    alt=""
                  />
                </div>
              </div>
              <div className="p-8 md:p-12 bg-gray-100 rounded-3xl">
                <div className="flex flex-wrap -m-8">
                  {aiObj["services"]["list"].map((service) => (
                    <div key={0} className="w-full md:w-1/3 p-8">
                      <div className="flex flex-wrap -m-3">
                        <div className="w-auto md:w-full lg:w-auto p-3">
                          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl">
                            <svg
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14 16C14 17.77 13.23 19.37 12 20.46C10.94 21.42 9.54 22 8 22C4.69 22 2 19.31 2 16C2 13.9753 3.01397 12.1814 4.5554 11.0973C4.80358 10.9228 5.1393 11.0422 5.27324 11.3145C6.21715 13.2332 7.95419 14.6699 10.02 15.23C10.65 15.41 11.31 15.5 12 15.5C12.4872 15.5 12.9539 15.4538 13.4074 15.3687C13.6958 15.3147 13.9828 15.4995 13.9955 15.7926C13.9985 15.8621 14 15.9314 14 16Z"
                                fill={aiObj["colors"]["primary"]}
                              />
                              <path
                                d="M18 8C18 8.78 17.85 9.53 17.58 10.21C16.89 11.95 15.41 13.29 13.58 13.79C13.08 13.93 12.55 14 12 14C11.45 14 10.92 13.93 10.42 13.79C8.59 13.29 7.11 11.95 6.42 10.21C6.15 9.53 6 8.78 6 8C6 4.69 8.69 2 12 2C15.31 2 18 4.69 18 8Z"
                                fill={aiObj["colors"]["primary"]}
                              />
                              <path
                                d="M22 16C22 19.31 19.31 22 16 22C15.2555 22 14.5393 21.8643 13.8811 21.6141C13.5624 21.4929 13.503 21.0851 13.7248 20.8262C14.8668 19.4938 15.5 17.786 15.5 16C15.5 15.66 15.47 15.32 15.42 15C15.3902 14.8155 15.4844 14.6342 15.6478 14.5437C16.9719 13.8107 18.0532 12.6876 18.727 11.3153C18.8609 11.0427 19.1968 10.923 19.4452 11.0978C20.9863 12.1818 22 13.9755 22 16Z"
                                fill={aiObj["colors"]["primary"]}
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 p-3">
                          <h3 className="font-heading mb-2 text-xl text-gray-900 font-black">
                            {service["name"]}
                          </h3>
                          <p className="text-sm text-gray-700 font-bold">
                            {service["description"]}
                          </p>
                        </div>
                      </div>
                    </div>
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
            <a key={post.id} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
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
              <p className="mt-1 text-xs font-medium text-gray-900">
                {post.timestamp}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
