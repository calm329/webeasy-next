// app/api/generate-image/route.js
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  const openaiApiKey = process.env.OPENAI_API_KEY;
  const url = "https://api.openai.com/v1/images/generations";

  try {
    // Generate image with OpenAI
    const response = await axios.post(
      url,
      {
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    const imageUrl = response.data.data[0].url;

    // Fetch the generated image
    const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(imageResponse.data, "binary");
    const contentType = imageResponse.headers["content-type"];
    const filename = `${nanoid()}.${contentType.split("/")[1]}`;

    // Store the image as a blob on the server
    const blobData = new Uint8Array(buffer);
    const blob = await put(filename, blobData, {
      contentType,
      access: "public",
    });

    // Return the URL of the stored image
    return NextResponse.json({ imageUrl: blob.url });
  } catch (error) {
    return NextResponse.json(
      { error: "Error generating or storing image" },
      { status: 500 }
    );
  }
}
