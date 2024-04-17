"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getUserData(domain: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: domain,
      },
    });

    if (!user)
      return {
        success: false,
        data: null,
      };

    return {
      success: true,
      data: {
        posts: user.posts,
        aiResult: user.aiResult,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      data: null,
    };
  }
}
