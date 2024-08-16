import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req) => {
  const { email, password } = await req.json();

  try {
    console.log(email, password);
    await connectToDB();

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User already exists. Please login instead.",
        },
        { status: 400 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({ email, password: hashedPassword });

      return NextResponse.json(
        {
          message: "user registered successfully!",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "error creating user. Try again!",
      },
      { status: 500 }
    );
  }
};
