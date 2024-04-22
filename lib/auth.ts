import { AuthOptions } from "next-auth";
import Instagram from "next-auth/providers/instagram";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";

export const authOptions: AuthOptions = {
  providers: [
    Instagram({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      authorization:
        "https://api.instagram.com/oauth/authorize?scope=user_profile,user_media",
      async profile(profile) {
        return {
          id: profile.id,
          name: profile.username,
          email: null,
          image: null,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as any,
  callbacks: {
    async session({ token, session }) {
      if (token && "accessToken" in token) {
        session.accessToken = token.accessToken;
      }

      return session;
    },
    async jwt({ token, account, user }) {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
        };
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
};
