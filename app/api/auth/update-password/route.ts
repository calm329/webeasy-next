import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword && !newPassword) {
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

  const isSame = await bcrypt.compare(currentPassword, userData.password);

  if (!isSame) {
    return NextResponse.json(
      { error: "Invalid Current Password" },
      { status: 401 },
    );
  }
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  try {
    const user = await prisma.user.update({
      where: {
        id: userData.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    const unknownError = error as any;
    if (unknownError.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 },
      );
    } else {
      return NextResponse.json(
        { error: unknownError.message },
        { status: 500 },
      );
    }
  }
}
