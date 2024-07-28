import Page from "@/models/page";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req) => {
  const { name, href } = await req.json();
  const session = await getServerSession(authOptions);

  try {
    await connectToDB();

    const userPage = await Page.findOne({ email: session?.user?.email });
    console.log(userPage);

    if (userPage) {
      // check if the link exixts already and update the href\
      await Page.findByIdAndUpdate(userPage._id, {
        $push: { links: { name, href } },
      });
      return NextResponse.json(
        {
          message: "link saved successfully!",
        },
        { status: 200 }
      );
    } else {
      console.log("create profile first");
      return NextResponse.json({
        message: "complete your profile first",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: `Error saving link to db! ${error}`,
      },
      { status: 500 }
    );
  }
};
