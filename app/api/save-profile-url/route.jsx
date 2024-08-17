import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Page from "@/models/page";

export const POST = async (req) => {
  const { url } = await req.json();
  const session = await getServerSession(authOptions);

  console.log(session);

  try {
    await connectToDB();

    //   check if URL exists
    const existingPageWithURL = await Page.findOne({ url });

    if (existingPageWithURL) {
      return NextResponse.json(
        {
          error: "URL already exists!",
        },
        {
          status: 400,
        }
      );
    } else {
      //   check if page exits
      const existingPage = await Page.findOne({ email: session?.user?.email });

      if (existingPage) {
        await Page.findByIdAndUpdate(existingPage._id, {
          url,
        });
        return NextResponse.json(
          {
            message: "URL saved successfully!",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            error: "Complete your profile first.",
          },
          {
            status: 500,
          }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "error saving URL!",
      },
      {
        status: 500,
      }
    );
  }
};
