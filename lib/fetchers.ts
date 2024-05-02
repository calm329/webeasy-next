"use server";

import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";

export async function getSiteData(subdomain?: string) {

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
