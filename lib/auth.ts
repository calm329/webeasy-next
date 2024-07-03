import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      async profile(profile) {
        // This is called after Google login, we can check if the user exists and link accounts if necessary
        let user = await prisma.user.findUnique({
          where: { email: profile.email },
        });
        console.log("User found",user,profile)
        if (!user) {
          // If the user does not exist, create a new one
          user = await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name,
              googleId: profile.sub,
            },
          });
        } else if (!user.googleId) {
          // If the user exists but doesn't have a linked Google account, link it
          await prisma.user.update({
            where: { email: profile.email },
            data: { googleId: profile.sub },
          });
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
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
    })
  ],
  debug: true,
  adapter: PrismaAdapter(prisma) as any,
  callbacks: {async signIn({ user, account, profile }) {
    console.log("Data received",account,profile)
    if (account?.provider === "google") {
      const existingUser = await prisma.user.findUnique({
        where: { email: profile?.email },
      });

      if (existingUser) {
        if (!existingUser.googleId) {
          // Link the Google account
          await prisma.user.update({
            where: { email: profile?.email },
            data: { googleId: profile?.sub },
          });
        }
      } else {
        // Create a new user if not existing
        await prisma.user.create({
          data: {
            email: profile?.email,
            name: profile?.name,
            googleId: profile?.sub,
          },
        });
      }
    }

    return true;
  },},
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: VERCEL_DEPLOYMENT,
      },
    },
    csrfToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Host-" : ""}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
};
