import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import Page from "@/models/page";

export const GET = async (req, res) => {
  // get the url from the link

  const url = req.nextUrl.pathname.split("/").pop();

  try {
    await connectToDB();
    //   check if page exits
    const existingPage = await Page.findOne({ url });
    if (existingPage) {
      return NextResponse.json(existingPage);
    } else {
      return NextResponse(
        {
          error: "no user found!",
        },
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "error fetching profile!",
      },
      {
        status: 500,
      }
    );
  }
};
