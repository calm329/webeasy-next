export const maxDuration = 300;
export const runtime = "edge";

import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
  request: NextRequest,
  { params }: { params: { field: string } },
) {
  const { productTitle, mediaCaption, type, features } = await request.json();
  let fields = "";
  switch (params.field) {
    case "description":
      fields = `only generate the  data for given fields {"description":"**Write a Detailed Description for the product using title and features**"}`;
      break;
    case "features":
      fields = ` generate four features and only generate data for given fields
        {"features":[{"image":"", "id":"**unique id**", "title":"**Title for the feature**", "description":"**Description for the feature**"}]}`;
      break;
    case "featureTitle":
      fields = `only generate the ${type ?? ""} data for features[0].title field and please don't add any other field expect the given "features":[
          {
           "title":"**Title for the feature**",
          }] and it should not be similar to any description from this data ${JSON.stringify(features)} `;
      break;
    case "featureDescription":
      fields = `
            only generate the ${type ?? ""} data for features[0].description field and please don't add any other field expect the given "features":[
          {
            "description": "**Description for the feature**",
          }] and it should not be similar to any description from this data ${JSON.stringify(features)} `;
      break;
  }
  const encoder = new TextEncoder();

  const readableStream = new ReadableStream({
    // The start method is where you'll add the stream's content
    async start(controller) {
      try {
        const response = await openai.chat.completions.create({
          model: process.env.OPENAI_VERSION ?? "gpt-4o",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant that writes website content in a friendly simple marketing tone. Generate comprehensive engaging content for a amazon product website homepage that showcases ${productTitle}.
                Respond only contain JSON output with the following structure and don't add any extra spaces to the JSON send it as it is every time please:
                ${fields}
                `,
            },
            {
              role: "user",
              content: mediaCaption ?? "",
            },
          ],
          temperature: 1,
          max_tokens: 1024,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          stream: true,
        });

        for await (const chunk of response) {
          if (chunk?.choices[0]?.delta.content)
            controller.enqueue(
              encoder.encode(chunk?.choices[0]?.delta?.content),
            );
          console.log("response", chunk?.choices[0]?.delta.content);
        }
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
