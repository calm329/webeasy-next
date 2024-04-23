"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import bcrypt from "bcrypt";

export async function createNewUser(email: string, password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return response;
  } catch (error) {
    if (error.code === "P2002") {
      return {
        error: `Email ${email} already exists`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
}

// export async function createNewSite(aiResult: string, posts: string) {
//   const session = await getServerSession();

//   if (!session) {
//     return {
//       error: "Not authenticated",
//     };
//   }

//   try {
//     // get user from database using session
//     const user = await prisma.user.findFirst({
//       where: {
//         name: session.user?.name,
//       },
//     });

//     if (!user) {
//       return {
//         error: "User not found",
//       };
//     }

//     // find default template (basic template)
//     const defaultTemplate = await prisma.template.findFirst({
//       where: {
//         name: "Basic template",
//       },
//     });

//     if (!defaultTemplate) {
//       return {
//         error: "Default template not found",
//       };
//     }

//     const response = await prisma.site.create({
//       data: {
//         subdomain: user.name || "",
//         posts,
//         aiResult,
//         userId: user.id,
//         templateId: defaultTemplate.id,
//       },
//     });

//     await revalidateTag(
//       `${user.name}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
//     );

//     return response;
//   } catch (error: any) {
//     console.log(error);

//     if (error.code === "P2002") {
//       return {
//         error: `This subdomain is already taken`,
//       };
//     } else {
//       return {
//         error: error.message,
//       };
//     }
//   }
// }

// export async function updateSite(
//   data: { [key: string]: string },
//   keys: string[],
// ) {
//   const session = await getServerSession();

//   if (!session) {
//     return {
//       error: "Not authenticated",
//     };
//   }

//   try {
//     const user = await prisma.user.findFirst({
//       where: {
//         name: session.user?.name,
//       },
//     });

//     if (!user) {
//       return {
//         error: "User not found",
//       };
//     }

//     const site = await prisma.site.findFirst({
//       where: {
//         subdomain: session.user?.name || "",
//         userId: user.id,
//       },
//     });

//     if (!site) {
//       return {
//         error: "Site not found",
//       };
//     }

//     let newData: any = {
//       aiResult: JSON.parse(site.aiResult),
//     };

//     for (const key of keys) {
//       if (key === "ctaLink") {
//         // update ctaLink
//         newData["aiResult"]["hero"]["ctaLink"] = data[key];
//       } else if (key === "businessName") {
//         // update businessName
//         newData["aiResult"]["businessName"] = data[key];
//       } else {
//         // update other keys
//         newData[key] = data[key];
//       }
//     }

//     // stringify the aiResult object
//     newData.aiResult =
//       typeof newData.aiResult === "string"
//         ? newData.aiResult
//         : JSON.stringify(newData.aiResult);

//     const response = await prisma.site.update({
//       where: {
//         id: site.id,
//       },
//       data: newData,
//     });

//     await revalidateTag(
//       `${user.name}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
//     );

//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }
