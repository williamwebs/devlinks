import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Page from "@/models/page";

export const POST = async (req) => {
  const { firstname, lastname, url, image, bio } = await req.json();
  const session = await getServerSession(authOptions);

  console.log(session);

  try {
    await connectToDB();

    //   check if page exits
    const existingPage = await Page.findOne({ email: session?.user?.email });

    if (existingPage) {
      //  update the existing page
      await Page.findByIdAndUpdate(existingPage._id, {
        firstname,
        lastname,
        image,
        url,
        bio,
      });
    } else {
      // create new page
      await Page.create({
        firstname,
        lastname,
        email: session?.user?.email,
        image,
        url,
        bio,
      });
    }

    return NextResponse.json(
      {
        message: "Profile saved successfully!",
      },
      { status: 200 }
    );
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
