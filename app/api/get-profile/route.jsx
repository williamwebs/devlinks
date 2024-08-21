import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Page from "@/models/page";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const GET = async (req, res) => {
  const session = await getServerSession(authOptions);

  console.log(session);

  try {
    const userDocRef = doc(db, "pages", session?.user?.email);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // Return initial profile details
      return NextResponse.json(userDoc.data());
    } else {
      return NextResponse.json({
        error: "Complete your profile!",
      });
    }

    // await connectToDB();
    //   check if page exits
    // const existingPage = await Page.findOne({ email: session?.user?.email });
    // if (existingPage) {
    //   console.log(existingPage);
    //   return NextResponse.json(existingPage);
    // } else {
    //   return NextResponse.json({
    //     error: "Complete your profile!",
    //   });
    // }
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
