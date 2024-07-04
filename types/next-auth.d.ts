import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend the User model if you have added custom fields in the database model
// declare module "next-auth" {
//   interface User {
//     // Add custom fields for the user here
//     id: number;
//     username: string;
//   }

//   // Extend session to include custom fields
//   interface Session {
//     user: {
//       // Include custom user fields here
//       username: string;
//     } & DefaultSession["user"];
//     // Add other custom session fields if needed
//     accessToken?: string;
//   }
// }

// // Extend the JWT interface if you are using JSON Web Tokens and added custom claims
// declare module "next-auth/jwt" {
//   interface JWT {
//     // Custom JWT fields
//     accessToken?: string;
//   }
// }


import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
