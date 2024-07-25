import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import mongoose from "mongoose";

export const POST = async (req) => {
  const { email, password } = await req.json();

  try {
    console.log(email, password);
    await connectToDB();
    // await mongoose.connect(process.env.MONGODB_URI);

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);
    await User.create({ email, password: hashedPassword });

    return NextResponse.json(
      {
        message: "user registered successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "error creating user. Try again!",
      },
      { status: 500 }
    );
  }
};
