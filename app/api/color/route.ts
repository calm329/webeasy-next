export const maxDuration = 300;
export const runtime = "edge";

import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { imageUrl } = await request.json();

  if (!imageUrl) {
    return NextResponse.json({ error: "No image url" }, { status: 400 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_VERSION ?? "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Identify the prominent primary and secondary brand logo colors in the image except white and black and light colors. The colors will be used on a website for heading and subheading and should be vibrant and have contrast with a white background.
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

    return NextResponse.json({ colors: response.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({
      colors: JSON.stringify({
        primary: "#000000",
        secondary: "#333333",
      }),
    });
  }
}
