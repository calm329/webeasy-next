import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.delete({
      where: {
        email,
      },
    });

    return NextResponse.json({ message: "User deleted successfully", user });
  } catch (error) {
    const unknownError = error as any;
    if (unknownError.code === "P2025") {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    } else {
      return NextResponse.json(
        { error: unknownError.message },
        { status: 500 },
      );
    }
  }
}
