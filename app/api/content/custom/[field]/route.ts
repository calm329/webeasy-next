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
  const { data, mediaCaption, type, services,testimonials } = await request.json();
  let fields = "";
  switch (params.field) {
    case "testimonialsSection":
      fields = `only generate the ${type?? ""} data for testimonialsSection and please don't add any other fields expect the given 
      "testimonialsSection": {
                "image":"https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg",
                "message":"**message**",
                "avatar":"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                "name":"**name**",
                "role":"**role**",
                
              } only generate the one testimonial and don't create a array of the given object only return the object`
    break;
    case "testimonialsSectionmessage":
      fields = `only generate the ${type?? ""} data for testimonialsSection and please don't add any other fields expect the given 
      "testimonialsSection": {
                "message":"**message**", 
              } only generate the one testimonial and don't create a array of the given object only return the object`
    break;
    case "testimonialsSectionname":
      fields = `only generate the ${type?? ""} data for testimonialsSection and please don't add any other fields expect the given 
      "testimonialsSection": {
                "name":"**name**",
              } only generate the one testimonial and don't create a array of the given object only return the object`
    break;
    case "testimonialsSectionrole":
      fields = `only generate the ${type?? ""} data for testimonialsSection and please don't add any other fields expect the given 
      "testimonialsSection": {
                "role":"**role**",
              } only generate the one testimonial and don't create a array of the given object only return the object`
    break;
    case "team":
    fields = `only generate the ${type?? ""} data for team and please don't add any other fields expect the given 
    "team": {
           "title":"**title**",
            "description":"**description**",
            "list": Array<
              {
                  "id":"**unique id**",
                  "name": '**name**',
                  "role": '**role**',
                  "imageUrl":
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
                  "xUrl": '#',
                  "linkedinUrl": '#',
                }
            >
          } only generate three objects in the team.list`
  break;
    case "stats":
      fields = `only generate the ${type?? ""} data for stats and please don't add any other fields expect the given 
      "stats": {
             "title":"**title**",
              "description":"**description**",
              "list": Array<
                { "id": "**unique id**", "name": "**name**", "value": "**value**" },
              >
            } only generate 4 items in the stats.list`
    break;
    case "pricing":
      fields = `only generate the ${type?? ""} data for pricing and please don't add any other fields expect the given 
      "pricing": {
              "title":"**title**",
              "description":"**description**",
              "list":Array<
              {
                  "name": "**name**",
                  "id": "**unique id**",
                  "href": "#",
                  "priceMonthly": "**priceMonthly**",
                  "description": "**description**",
                  "features": Array<string>,
                  "mostPopular": boolean,
                  "button":"Buy Plan"
                }
              >
            } generate three list of object and 1 index will have mostPopular as true else false`
                    break;
    case "newsLetter":
      fields = `only generate the ${type?? ""} data for newsLetter and please don't add any other fields expect the given 
      "newsLetter": {
              "title":"**title**",
              "description":"**description**"
            }`
                    break;
                    case "newsLettertitle":
                      fields = `only generate the ${type?? ""} data for newsLetter and please don't add any other fields expect the given 
                      "newsLetter": {
                            "title":"**title**",
                            }`
                                    break;
                                    case "newsLetterdescription":
                                      fields = `only generate the ${type?? ""} data for newsLetter and please don't add any other fields expect the given 
                                      "newsLetter": {
                                        
                                              "description":"**description**"
                                            }`
                                                    break;

    case "logoClouds":
      fields = `only generate the ${type?? ""} data for logo and please don't add any other fields expect the given 
      "logoClouds": {
                  "title":"**title**"
        }`
                    break;

    case "heroSection":
      fields = `only generate the ${type?? ""} data for heroSection and please don't add any other fields expect the given 
      "heroSection": {
                  "title":"**title**",
                  "description":"**description**",
                  "button":{
                    "label":"**label**",
                    "link":"#",
                  },
                  "link":{
                    "label":"**label**",
                    "link":"#",
                  }
                }`
                    break;
    case "heroSectiontitle":
      fields = `only generate the ${type?? ""} data for heroSection and please don't add any other fields expect the given 
      "heroSection": {
                  "title":"**title**",
                }`
                    break;
                    case "heroSectiondescription":
      fields = `only generate the ${type?? ""} data for heroSection and please don't add any other fields expect the given 
      "heroSection": {
                  "description":"**description**",
                 
                }`
                    break;
    case "header":
      fields = `only generate the ${type?? ""} data for header and please don't add any other fields expect the given 
      "header": {
                "title":"**title**",
                "description":"**description**",
                "list":Array<
                  {
                    id:"**unique id**",
                    name: "**name**",
                    description:
                      "**description**.",
                  }
                >
              } only generate three header.list object`
    break;
    case "headertitle":
      fields = `only generate the ${type?? ""} data for header and please don't add any other fields expect the given 
      "header": {
        "title":"**title**",
      }`
    break;
    case "headerdescription":
      fields = `only generate the ${type?? ""} data for header and please don't add any other fields expect the given 
      "header": {
        "description":"**description**",    
      }`
    break;
    case "footer":
      fields = `only generate the ${type?? ""} data for footer and please don't add any other fields expect the given 
      "footer": {
              "title":"**title**",
              "list":{
                "solutions":{
                  "title":"**title**",
                  "list": Array<
                  { "name": "**name**", "href": "#" },
                >},
                "support": {
                  "title":"**title**",
                  "list": Array<
                  { "name": "**name**", "href": "#" },
                >},
                "company": {
                  "title":"**title**",
                  "list": Array<
                  { "name": "**name**", "href": "#" },
                >},
                "legal": {
                  "title":"**title**",
                  "list": Array<
                  { "name": "**name**", "href": "#" },
                >},
                social: [
                  {
                    "name": "Facebook",
                    "href": "#",
                  },
                  {
                    "name": "Instagram",
                    "href": "#",
                  },
                  {
                    "name": "X",
                    "href": "#",
                  },
                  {
                    "name": "GitHub",
                    "href": "#",
                  },
                  {
                    "name": "YouTube",
                    "href": "#",
                  },
                ],
            }
            }`
      break;
    case "faq":
      fields = `only generate the ${type ?? ""} data for FAQ section and please don't add any other fields expect the given 
      "faq": {
              "title":"**title**",
              "list":Array<
                {
                  id:"**unique id**",
                  question: "**question**",
                  answer:
                    "**answer**",
                }>
            } and only generate three question and answers`
      break;
    case "cta":
      fields = `only generate the ${type ?? ""} data for CTA section and please don't add any other fields expect the given 
      "cta": {
              "title":"**title**",
              "description":"**description**",
              "button":{
                "label":"**label**",
                "link":"#",
              },
              "link":{
                "label":"**label**",
                "link":"#",
              }
            }`
      break;
      case "ctatitle":
        fields = `only generate the ${type ?? ""} data for CTA section and please don't add any other fields expect the given 
        "cta": {
                "title":"**title**",
              }`
        break;
        case "ctadescription":
        fields = `only generate the ${type ?? ""} data for CTA section and please don't add any other fields expect the given 
        "cta": {
                "description":"**description**",
              }`
        break;
    case "contact":
      fields = `only generate the ${type ?? ""} data for Contact and please don't add any other fields expect the given 
      "contact":{
      "title":"**Title of the contact**",
      "description":"**description of the contact**",
      }`
      break;
      case "contacttitle":
      fields = `only generate the ${type ?? ""} data for Contact and please don't add any other fields expect the given 
      "contact":{
      "title":"**Title of the contact**",
      }`
      break;
      case "contactdescription":
      fields = `only generate the ${type ?? ""} data for Contact and please don't add any other fields expect the given 
      "contact":{
      "description":"**description of the contact**",
      }`
      break;
    case "blog":
      fields = `only generate the ${type ?? ""} data for blog and please don't add any other fields expect the given 
      "blog":{
      "title":"**Title of the blog**",
      "description":"**description of the blog**",
      "posts":Array<{
        "id": 1,
        "title": "**Title of the blog post**",
        "href": '#',
        "description":
          "**Description of the blog post**",
        "imageUrl":
          "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
        "date": "**date**",
        "datetime": "**datetime**",
        "category": { "title":  "**category**", "href": "#" },
        "author": {
          "name": "**author name**",
          "role": "**author role**",,
          "href": "#",
          "imageUrl":
            "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          },
        }>
      } only generate three posts`
      break;
    case "testimonialName":
      fields = `only generate the ${type ?? ""} data for testimonials[0].name field and please don't add any other field expect the given "testimonials":[
          {
           "name": "*first testimonial*",
          }] and it should not be similar to any name from this data ${JSON.stringify(testimonials)} `;
      break;
    case "testimonialContent":
      fields = `
            only generate the ${type ?? ""} data for testimonials[0].content field and please don't add any other field expect the given "testimonials":[
          {
            "content": "*content*",
          }] and it should not be similar to any content from this data ${JSON.stringify(testimonials)} `;
      break;
    case "partnersTitle":
      fields = `only generate the ${type ?? ""} data for title field for partners section and please don't add any other field expect the given {"title": "*insert title here*"}`;
      break;
    case "partnersDescription":
      fields = `only generate the ${type ?? ""} data for description field for partners section and please don't add any other field expect the given {"description": "*insert description here*"} and don't exceed 20 words `;
      break;
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

    case "testimonials":
      fields = `generate 6 testimonials {"testimonials": {
          "show":true,
          "list": [
            {"id":"**unique id**",
              "name": "*first testimonial*",
              "content": "*content*",
              "avatar": "url-to-testimonial1-image.jpg"
              "gender":"**generate gender according to name it will MALE or FEMALE** "
            }
          ]
  }}`;
      break;
    case "partners":
      fields = `generate partners {"partners": {
          "show":true,
          title:"**generate title for partner section**",
          description:"**generate description for partner section**"

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
            only generate the ${type ?? ""} data for services[0].description field and please don't add any other field expect the given and limit the description to 200 characters   "services":[
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
          model: process.env.OPENAI_VERSION ?? "gpt-4o",
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
