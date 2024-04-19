export const maxDuration = 300;
export const runtime = "edge";

import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
  const data = await request.json();
  const aiContent = await createAI(data.mediaCaption);

  return NextResponse.json({ aiContent });
}
