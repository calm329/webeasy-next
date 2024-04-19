"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

// export async function createNewSite(
//   subdomain: string,
//   posts: string,
//   aiResult: string,
// ) {
//   const session = await getServerSession();

//   if (!session) {
//     return {
//       error: "Not authenticated",
//     };
//   }

//   try {
//     const response = await prisma.site.create({
//       data: {
//         subdomain,
//         posts,
//         aiResult,
//         user: {
//           connect: {
//             id: session?.user?.id,
//           },
//         },
//       },
//     });

//     await revalidateTag(
//       `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
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

export async function updateSite(
  formData: FormData,
  site: string,
  keys: string[],
) {
  const session = await getServerSession();

  if (!session) {
    return {
      error: "Not authenticated",
    };
  }
}
