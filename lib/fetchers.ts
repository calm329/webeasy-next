"use server";

import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function getSiteData(subdomain?: string) {
  // const session = await getServerSession(authOptions);

  // if (!session && !subdomain) {
  //   return null;
  // }

  return await unstable_cache(
    async () => {
      return prisma.site.findFirst({
        where: {
          subdomain: subdomain || "",
        },
      });
    },
    [`${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`],
    {
      revalidate: 900,
      tags: [`${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`],
    },
  )();
}
