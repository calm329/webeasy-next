"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { getUsernameFromPosts } from "./utils";
import { authOptions } from "./auth";

export async function createNewSite({
  aiResult,
  posts,
  accessToken,
  userId,
}: {
  aiResult: string;
  posts: string;
  accessToken: string;
  userId: string;
}) {
  const session = await getServerSession(authOptions);

  let user;

  if (session) {
    user = await prisma.user.findFirst({
      where: {
        email: session.user?.email,
      },
    });
  }

  // find default template (basic template)
  const defaultTemplate = await prisma.template.findFirst({
    where: {
      name: "Basic template",
    },
  });

  if (!defaultTemplate) {
    return {
      error: "Default template not found",
    };
  }

  const username = getUsernameFromPosts(posts);

  try {
    const siteResponse = await prisma.site.create({
      data: {
        subdomain: username,
        posts,
        aiResult,
        userId: user?.id,
        templateId: defaultTemplate.id,
      },
    });

    // create access token
    const accessTokenResponse = await prisma.accessToken.create({
      data: {
        token: accessToken,
        userId: userId,
        siteId: siteResponse.id,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60), // add 60 days to current date
      },
    });

    await revalidateTag(
      `${username}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );

    return { subdomain: username };
  } catch (error) {
    console.log(error);

    return { error: "Failed to create site" };
  }
}

export async function checkSiteAvailability(
  data: Partial<{ userId: string; token: string }>,
) {
  const session = await getServerSession(authOptions);

  let user;

  if (session) {
    user = await prisma.user.findFirst({
      where: {
        email: session.user?.email,
      },
    });
  }

  const accessToken = await prisma.accessToken.findFirst({
    where: data,
    include: {
      site: true,
    },
  });

  if (accessToken) {
    return {
      subdomain: accessToken.site.subdomain,
      editable: accessToken.site.userId
        ? accessToken.site.userId === user?.id
        : true,
    };
  } else {
    return { subdomain: null, editable: true };
  }
}

export async function updateSite(
  subdomain: string,
  data: { [key: string]: string },
  keys: string[],
) {
  const session = await getServerSession(authOptions);

  try {
    let user;

    if (session) {
      user = await prisma.user.findFirst({
        where: {
          email: session.user?.email,
        },
      });
    }

    const site = await prisma.site.findFirst({
      where: {
        subdomain,
      },
    });

    if (!site) {
      throw new Error("Site not found");
    }

    if (user && site.userId !== user.id) {
      throw new Error("You are not authorized to update this site");
    }

    let newData: any = {
      aiResult: JSON.parse(site.aiResult),
    };

    for (const key of keys) {
      switch (key) {
        case "subdomain":
          newData["subdomain"] = data[key];
          break;
        case "title":
          newData["title"] = data[key];
          break;
        case "description":
          newData["description"] = data[key];
          break;
        case "aiResult":
          newData["aiResult"] = data[key];
          break;
        case "font":
          newData["font"] = data[key];
          break;
        case "posts":
          newData["posts"] = data[key];
          break;
        case "primary":
          newData["aiResult"]["colors"]["primary"] = data[key];
          break;
        case "secondary":
          newData["aiResult"]["colors"]["secondary"] = data[key];
          break;
        default:
          newData["aiResult"]["hero"][key] = data[key];
          break;
      }
    }

    // stringify the aiResult object
    newData.aiResult =
      typeof newData.aiResult === "string"
        ? newData.aiResult
        : JSON.stringify(newData.aiResult);

    if (user) {
      newData["userId"] = user.id;
    }

    const response = await prisma.site.update({
      where: {
        id: site.id,
      },
      data: newData,
    });

    await revalidateTag(
      `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function addTemplate({
  name,
  previewUrl,
}: {
  name: string;
  previewUrl: string;
}) {
  try {
    const templateResponse = await prisma.template.create({
      data: {
        name,
        previewUrl,
      },
    });

    return templateResponse;
  } catch (error) {
    console.log(error);

    return { error: "Failed to create site" };
  }
}
