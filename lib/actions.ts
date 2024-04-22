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
  formData: FormData,
  site: string,
  keys: string[],
) {
  const session = await getServerSession();

  if (!session) {
    return {
      error: "Not authenticated",
    };
  }
}
