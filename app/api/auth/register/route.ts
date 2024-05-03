import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
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
