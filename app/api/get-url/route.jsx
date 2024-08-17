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
      console.log(existingPage.url);
      return NextResponse.json(existingPage.url);
    } else {
      return NextResponse.json("Complete your profile");
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "error fetching public link!",
      },
      {
        status: 500,
      }
    );
  }
};
