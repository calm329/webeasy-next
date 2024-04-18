import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";

export async function getUserData(domain: string) {
  return await unstable_cache(
    async () => {
      return prisma.user.findUnique({
        where: {
          username: domain,
        },
      });
    },
    [`${domain}-metadata`],
    {
      revalidate: 900,
      tags: [`${domain}-metadata`],
    },
  )();
}
