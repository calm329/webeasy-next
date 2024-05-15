import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

class AccessTokenApiService {
  /**
   * Get accessToken get userId
   * @returns get AccessToken
   */
  public async getByUserId(siteId: string) {
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
}
const AccessTokenApi = new AccessTokenApiService();
export default AccessTokenApi;
