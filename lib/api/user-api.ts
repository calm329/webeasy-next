import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

class UserApiService {
  /**
   * Get all users
   * @returns List of users
   */
  public async getAll() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      console.log(error);

      return [];
    }
  }

  /**
   * Get user
   * @params id
   * @returns user
   */
  public async get() {
    try {
      const session = await getServerSession(authOptions);
      if (!session) {
        return null;
      }
      const user = await prisma.user.findFirst({
        where: {
          email: session.user?.email,
        },
      });
      console.log("email: " + user?.email);
      return user;
    } catch (error) {
      return null;
    }
  }
}
const UserApi = new UserApiService();
export default UserApi;
