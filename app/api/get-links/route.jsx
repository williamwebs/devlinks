import Page from "@/models/page";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  try {
    await connectToDB();

    const userPage = await Page.findOne({ email: session?.user?.email });

    if (userPage) {
      console.log(userPage.links);
      const response = userPage.links;

      return NextResponse.json(response);
    } else {
      console.log("complete profile and try again!");
      return NextResponse.json({
        error: "Complete profile and try again!",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "error fetching links!",
    });
  }
};
