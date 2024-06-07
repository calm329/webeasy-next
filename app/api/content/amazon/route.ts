export const maxDuration = 300;
export const runtime = "edge";

import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { productTitle,mediaCaption } = await request.json();
  const encoder = new TextEncoder();

  const readableStream = new ReadableStream({
    // The start method is where you'll add the stream's content
    async start(controller) {
      const text = "###";
      // Queue the encoded content into the stream
      controller.enqueue(encoder.encode(text));

      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant that writes website content in a friendly simple marketing tone. Generate comprehensive engaging content for a amazon product website homepage that showcases ${productTitle}.
                Respond only contain JSON output with the following structure:
                generate four features
                {
                    "features":[
                        {
                            "title":"**Title for the feature**",   
                            "description":"**Description for the feature**",       
                        }
                    ],
                    "description":"**Write a Detailed Description for the product using title and features**"
                }
                `,
            },
            {
              role: "user",
              content: mediaCaption??"",
            },
          ],
          temperature: 1,
          max_tokens: 1024,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });

        controller.enqueue(
          encoder.encode(response.choices[0].message.content || ""),
        );
      } catch (error) {}

      controller.close();
    },
  });

  const decoder = new TextDecoder();
  // TransformStreams can transform a stream's chunks
  // before they're read in the client
  const transformStream = new TransformStream({
    transform(chunk, controller) {
      // Decode the content, so it can be transformed
      const text = decoder.decode(chunk);
      // Make the text uppercase, then encode it and
      // add it back to the stream
      controller.enqueue(encoder.encode(text));
    },
  });

  return new Response(readableStream.pipeThrough(transformStream), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
