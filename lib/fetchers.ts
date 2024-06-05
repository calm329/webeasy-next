"use server";

import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function getSiteData(subdomain?: string) {
  return await unstable_cache(
    async () => {
      const site = await prisma.site.findFirst({
        where: {
          subdomain: subdomain ?? "",
        },
      });
      console.log("site found", site);
      return site
    },
    [`${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`],
    {
      revalidate: 900,
      tags: [`${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`],
    },
  )();
}

export async function getSitesByUserId() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return [];
  }
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  return await unstable_cache(
    async () => {
      return prisma.site.findMany({
        where: {
          userId: user?.id,
        },
      });
    },
    [`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`],
    {
      revalidate: 900,
      tags: [`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`],
    },
  )();
}

export async function getAccessTokenBySiteId(siteId: string) {
  return await unstable_cache(
    async () => {
      return prisma.accessToken.findFirst({
        where: {
          siteId,
        },
      });
    },
    [`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`],
    {
      revalidate: 900,
      tags: [`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`],
    },
  )();
}

export async function getUserById() {
  const session = await getServerSession(authOptions);

  let user: any;

  if (session) {
    user = await prisma.user.findFirst({
      where: {
        email: session.user?.email,
      },
    });
  }

  // return await unstable_cache(
  //   async () => {
  return user;
  //   },
  //   [`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`],
  //   {
  //     revalidate: 900,
  //     tags: [`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`],
  //   },
  // )();
}

export async function getAllTemplates() {
  try {
    const templates = await prisma.template.findMany();
    return templates;
  } catch (error) {
    

    return [];
  }
}
