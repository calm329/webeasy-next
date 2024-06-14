import { checkSiteAvailability, createNewSite, deleteSiteBySiteId, updateSite } from "../actions";
import { getSiteData, getSiteDataById, getSitesByUserId } from "../fetchers";

class SiteApiService {
  /**
   * create a new site
   */
  // public async create({
  //   aiResult,
  //   posts,
  //   accessToken,
  //   userId,
  // }: {
  //   aiResult: string;
  //   posts: string;
  //   accessToken: string;
  //   userId: string;
  // }) {
  //   return createNewSite({ aiResult, posts, accessToken, userId });
  // }

  /**
   * check if site is available
   */
  public async isAvailable(data: Partial<{ userId: string; token: string }>) {
    return checkSiteAvailability(data);
  }

  /**
   * update site
   */
  public async update(
    subdomain: string,
    data: { [key: string]: string },
    keys: string[],
  ) {
    return updateSite(subdomain, data, keys);
  }

  /**
   * Get site by SubDomain
   * @params subdomain
   * @returns site
   */
  public async getBySubDomain(subdomain?: string) {
    return getSiteData(subdomain);
  }

    /**
   * Get site by ID
   * @params id
   * @returns site
   */
    public async getSiteById(id: string) {
      return getSiteDataById(id);
    }

  /**
   * Get site by userId
   * @params id
   * @returns site
   */
  public async getByUserId() {
    return getSitesByUserId();
  }

  public async deleteSiteById(id:string){
    return deleteSiteBySiteId({id})
  }
}
const SiteApi = new SiteApiService();
export default SiteApi;
