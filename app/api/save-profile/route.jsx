import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req) => {
  const { firstname, lastname, email, image } = await req.json();
  const session = getServerSession(authOptions);

  console.log(session);

  return NextResponse.json({
    message: "profile route working!",
  });

  try {
    await connectToDB();

    const user = await User.findOne({ email });
  } catch (error) {
    return NextResponse.json(
      {
        error: "error saving profile",
      },
      {
        status: 500,
      }
    );
  }
};
