import { getUserById } from "../fetchers";

class UserApiService {
  /**
   * Get user
   * @params id
   * @returns user
   */
  public async get() {
    return getUserById();
  }
}
const UserApi = new UserApiService();
export default UserApi;
