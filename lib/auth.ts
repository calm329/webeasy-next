import { AuthOptions } from "next-auth";
import Instagram from "next-auth/providers/instagram";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";

export const authOptions: AuthOptions = {
  providers: [
    Instagram({
      clientId: process.env.INSTAGRAM_ID,
      clientSecret: process.env.INSTAGRAM_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma) as any,
  callbacks: {
    async signIn({ user, account }) {
      console.log(user);
      return true;
    },
  },
};
