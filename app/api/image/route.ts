// app/api/generate-image/route.js
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  const openaiApiKey = process.env.OPENAI_API_KEY;
  const url = "https://api.openai.com/v1/images/generations";

  try {
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
      },
    );

    const imageUrl = response.data.data[0].url;
    return NextResponse.json({ imageUrl: imageUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "Error generating image" },
      { status: 500 },
    );
  }
}
