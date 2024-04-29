"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { getUsernameFromPosts } from "./utils";

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
  const session = await getServerSession();

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
  const session = await getServerSession();

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
  const session = await getServerSession();

  // if (!session) {
  //   return {
  //     error: "Not authenticated",
  //   };
  // }

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
      return {
        error: "Site not found",
      };
    }

    if (user && site.userId !== user.id) {
      return {
        error: "You are not authorized to update this site",
      };
    }

    let newData: any = {
      aiResult: JSON.parse(site.aiResult),
    };

    for (const key of keys) {
      if (key === "ctaLink") {
        // update ctaLink
        newData["aiResult"]["hero"]["ctaLink"] = data[key];
      } else if (key === "businessName") {
        // update businessName
        newData["aiResult"]["businessName"] = data[key];
      } else {
        // update other keys
        newData[key] = data[key];
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
