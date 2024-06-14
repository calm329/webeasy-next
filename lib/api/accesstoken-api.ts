import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { getAccessTokenBySiteId } from "../fetchers";

class AccessTokenApiService {
  /**
   * Get accessToken get userId
   * @returns get AccessToken
   */
  public async getBySiteId(siteId: string) {
    return getAccessTokenBySiteId(siteId);
  }
}
const AccessTokenApi = new AccessTokenApiService();
export default AccessTokenApi;
