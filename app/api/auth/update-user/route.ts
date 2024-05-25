import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  const { avatar, name, email } = await req.json();
  if (!avatar && !name && !email) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);

  let userData: any;
  if (session) {
    userData = await prisma.user.findFirst({
      where: {
        email: session.user?.email,
      },
    });
  }

  try {
    // Check if the provided email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
        NOT: {
          id: userData.id,
        },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 },
      );
    }

    const user = await prisma.user.update({
      where: {
        id: userData.id,
      },
      data: {
        name: name,
        image: avatar,
        email: email,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    const unknownError = error as any;
    return NextResponse.json({ error: unknownError.message }, { status: 500 });
  }
}
