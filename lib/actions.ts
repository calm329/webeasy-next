"use server";

import prisma from "@/lib/prisma";

export async function createNewSite(
  userId: string,
  posts: string,
  aiResult: string,
) {
  try {
    // check if user has already created a site (this assumes only one site per user)
    const site = await prisma.site.findFirst({
      where: {
        userId,
      },
    });

    if (site) {
      return {
        success: false,
        error: "duplicate_site",
        data: null,
      };
    }

    const newSite = await prisma.site.create({
      data: {
        userId,
        posts,
        aiResult,
      },
    });

    return {
      success: true,
      data: {
        posts: newSite.posts,
        aiResult: newSite.aiResult,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "internal_server_error",
      data: null,
    };
  }
}
