import { bcrypt } from "bcrypt";
import { AuthOptions } from "next-auth";
import Instagram from "next-auth/providers/instagram";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import Credentials from "next-auth/providers/credentials";
import { createNewUser } from "./actions";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      id: "email",
      name: "email",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) throw Error("Email or Password doesn't match!");

        if (!user.password) {
          throw Error("Please sign in with Google");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValid) throw Error("Email or Password doesn't match!");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as any,
  callbacks: {},
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
};
