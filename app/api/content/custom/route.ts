export const maxDuration = 300;
export const runtime = "edge";

import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { fieldName, data, type,services } = await request.json();
  console.log("prompt", data);
  if (!data) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }
  let fields;
  switch (fieldName) {
    case "heading":
      fields =
        `only generate the  ${type??""} data for the given fields "hero": {"heading": "*insert heading here*"}`;
      break;
    case "subheading":
      fields =
        `only generate the  ${type??""} data for the given fields "hero": {"subheading": "*insert subheading here*"}`;
      break;
      case "serviceName":
        fields = `only generate the ${type??""} data for given fields "services": {"list": [
          {
            "name": "*first service or feature*",
          }]}  and it should not be similar to any name from this data ${JSON.stringify(services)}`;
        break;
      case "serviceDescription":
        fields = `only generate the ${type??""} data for given fields "services": {"list": [
            {
              "description": "*description*",
            }]} and it should not be similar to any description from this data ${JSON.stringify(services)} `;
        break;
    default:
      fields = `
      Make the list of services from businessType ${data.businessType} which is  and list size of services should be from 3 to 6 and services name and description should be unique for all services.
      
      {
        "banner": {
          
          "logo": {
            "link":  "https://xhq5zxhb2o7dgubv.public.blob.vercel-storage.com/2weWEVnPETmQLpQx52_W1-Ofz4wnOvkqM6307M1pfxfkLAZXXBbX.jpeg",
            "alt": "",
            "show": true
          },
          "businessName": "*Name of the business inferred from all the content*",
          "button": {
            "show": true,
            "list": [
              {
                "name": "button1",
                "label": "*insert call to action here, it should only be a couple of words long*",
                "type": "External"
              }
            ]
          }
        },
        "hero": {
          "image": {
            "heroImagePrompt": "*Create a prompt for dall-e-3 to create a hero image to represent the business and content from the instagram posts in a simple above the fold style*",
            "imageId": "*The id of the post that best matches the heading and subheading*",
            "alt": "",
            imageUrl:"123",
            "show": true
          },
          "heading": "*insert heading here*",
          "subheading": "*insert subheading here*",
          "button": {
            "show": true,
            "list": [
              {
                "name": "button1",
                "label": "*insert call to action here, it should only be a couple of words long*",
                "type": "External"
              }
            ]
          }
          
        },
        "services": {
          "show":true,
          "title": "*type of services title Services or Features*",
          "description": "*services heading*",
          "list": [
            {
              "id":"**unique id**",
              "name": "*first service or feature*",
              "description": "*description*",
              "image": "url-to-service1-image.jpg"
            }
          ]
        }
      }`;
      break;
  }

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
              content: `You are a helpful assistant that writes website content in a friendly simple marketing tone. Generate comprehensive engaging content for a ${data.businessType} business that is located in ${data.location}  and with business name ${data.businessName} to help build a website homepage that showcases our unique offerings and product descriptions that connects with our target audience. Use insights and themes from similar businesses located in the area to create a series of sections that highlight different aspects of our brand. Ensure the content is lively, informative, and visually appealing, mirroring the dynamic nature of the business category.

                Respond only contain JSON output with the following structure:
                
        
                
                ${fields}`,
            },
            {
              role: "user",
              content: "",
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
