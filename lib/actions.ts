"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

export async function createNewSite(aiResult: string, posts: string) {
  const session = await getServerSession();

  if (!session) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    // get user from database using session
    const user = await prisma.user.findFirst({
      where: {
        name: session.user.name,
      },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    const response = await prisma.site.create({
      data: {
        subdomain: user.name || "",
        posts,
        aiResult,
        userId: user.id,
      },
    });

    await revalidateTag(
      `${user.name}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );

    return response;
  } catch (error: any) {
    console.log(error);

    if (error.code === "P2002") {
      return {
        error: `This subdomain is already taken`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
}

export async function updateSite(
  data: { [key: string]: string },
  keys: string[],
) {
  const session = await getServerSession();

  if (!session) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        name: session.user.name,
      },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    const site = await prisma.site.findFirst({
      where: {
        subdomain: session.user.name || "",
        userId: user.id,
      },
    });

    if (!site) {
      return {
        error: "Site not found",
      };
    }

    let newData: any = {
      aiResult: site.aiResult,
    };

    for (const key of keys) {
      if (key === "ctaLink") {
        newData["aiResult"] = JSON.stringify({
          ...JSON.parse(newData["aiResult"]),
          hero: {
            ...JSON.parse(newData["aiResult"]).hero,
            ctaLink: data[key],
          },
        });
      } else if (key === "businessName") {
        newData["aiResult"] = JSON.stringify({
          ...JSON.parse(newData["aiResult"]),
          businessName: data[key],
        });
      } else {
        newData[key] = data[key];
      }
    }

    const response = await prisma.site.update({
      where: {
        id: site.id,
      },
      data: newData,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}
