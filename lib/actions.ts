"use server";

import prisma from "@/lib/prisma";

export async function createNewUser(
  username: string,
  posts: string,
  aiResult: string
) {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        posts,
        aiResult,
      },
    });

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
