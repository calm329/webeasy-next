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
  const { data, mediaCaption, type, services } = await request.json();
  let fields = "";
  switch (params.field) {
    case "title":
      fields = `only generate the ${type ?? ""} data for title field for services and please don't add any other field expect the given {"title": "*insert title here*"}`;
      break;
    case "description":
      fields = `only generate the ${type ?? ""} data for description field for services and please don't add any other field expect the given {"description": "*insert description here*"} and don't exceed 20 words `;
      break;
    case "heading":
      fields = `only generate the ${type ?? ""} data for heading field and please don't add any other field expect the given {"heading": "*insert heading here*"}`;
      break;
    case "subheading":
      fields = `only generate the ${type ?? ""} data for subheading field and please don't add any other field expect the given {"subheading": "*insert subheading here*"}`;
      break;
    case "banner":
      fields = `only generate the  data for given fields {"banner": {
          
          "logo": {
            "link":  "",
            "alt": "",
            "show": true
          },
          "businessName": ${data.businessName},
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
  }}`;
      break;
    case "hero":
      fields = `only generate the data for given fields {"hero": {
          "image": {
            "heroImagePrompt": "*Create a prompt for dall-e-3 to create a hero image to represent the business and content from the instagram posts in a simple above the fold style*",
            "imageId": "*The id of the post that best matches the heading and subheading*",
            "alt": "",
            imageUrl:"",
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
          
  }}`;
      break;
    case "services":
      fields = `generate 6 services  and services.description shouldn't exceed 20 words {"services": {
          "show":true,
          "title": "*type of services title Services or Features*",
          "description": "*services heading*",
          "list": [
            {"id":"**unique id**",
              "name": "*first service or feature*",
              "description": "*description*",
              "image": "url-to-service1-image.jpg"
            }
          ]
  }}`;
      break;
    case "serviceName":
      fields = `only generate the ${type ?? ""} data for services[0].title field and please don't add any other field expect the given "services":[
          {
           "name": "*first service or feature*",
          }] and it should not be similar to any description from this data ${JSON.stringify(services)} `;
      break;
    case "serviceDescription":
      fields = `
            only generate the ${type ?? ""} data for services[0].description field and please don't add any other field expect the given "services":[
          {
            "description": "*description*",
          }] and it should not be similar to any description from this data ${JSON.stringify(services)} `;
      break;
  }
  const encoder = new TextEncoder();

  const readableStream = new ReadableStream({
    // The start method is where you'll add the stream's content
    async start(controller) {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant that writes website content in a friendly simple marketing tone. Generate comprehensive engaging content for a ${data.businessType} business that is located in ${data.location}  and with business name ${data.businessName} to help build a website homepage that showcases our unique offerings and product descriptions that connects with our target audience. Use insights and themes from similar businesses located in the area to create a series of sections that highlight different aspects of our brand. Ensure the content is lively, informative, and visually appealing, mirroring the dynamic nature of the business category.

                Respond only contain JSON output with the following structure and don't add any extra spaces to the JSON send it as it is every time please please don't do any formatting or alternation in the given json string:
                
        
                
                ${fields}`,
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
