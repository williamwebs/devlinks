import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Page from "@/models/page";

export const GET = async (req, res) => {
  const session = await getServerSession(authOptions);

  console.log(session);

  try {
    await connectToDB();
    //   check if page exits
    const existingPage = await Page.findOne({ email: session?.user?.email });
    if (existingPage) {
      console.log(existingPage);
      return NextResponse.json(existingPage);
    } else {
      return NextResponse.json({
        error: "error",
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "error fetching profile",
      },
      {
        status: 500,
      }
    );
  }
};
