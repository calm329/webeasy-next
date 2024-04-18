export const maxDuration = 300;

import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
  const data = await request.json();
  const colors = await getImage(data.postImageUrl);

  return NextResponse.json({ colors });
}
