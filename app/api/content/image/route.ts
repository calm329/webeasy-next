export const maxDuration = 300;
export const runtime = "edge";

import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { data, businessType } = await request.json();
  console.log(data, "data");
  console.log(businessType, "businessType");

  if (!data || !businessType) {
    return NextResponse.json({ error: "No data" }, { status: 400 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_VERSION ?? "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant. Select the object from the provided list whose description is most related to the given business type.
          
            Just Return me the index of the selected Description 

          `,
        },
        {
          role: "user",
          content: JSON.stringify({
            data,
            businessType,
          }),
        },
      ],
      temperature: 0,
      max_tokens: 1000,
    });
    let content = response?.choices[0]?.message?.content;

    return NextResponse.json(content);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
