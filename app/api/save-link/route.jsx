import Page from "@/models/page";
import { connectToDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req) => {
  const { name, href } = await req.json();
  const session = await getServerSession(authOptions);
  const linkID = uuidv4();
  console.log(linkID);

  try {
    const userDocRef = doc(db, "pages", session?.user?.email);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // check if the link already exists
      const existingLinks = userDoc
        .data()
        .links?.find((link) => link.name === name);

      if (existingLinks) {
        // update the existing link
        await updateDoc(userDocRef, {
          links: userDoc
            .data()
            .links.map((link) =>
              link.name === name ? { ...link, href } : link
            ),
        });
      } else {
        // Add new link
        await updateDoc(
          userDocRef,
          // {
          //   links: [
          //     ...(userDoc.data().links || []),
          //     { name, href, id: linkID, totalClicks: 0, dailyClicks: {} },
          //   ],
          // },
          {
            links: arrayUnion({
              name,
              href,
              id: linkID,
              totalClicks: 0,
              dailyClicks: {},
            }),
          },
          { merge: true }
        );
      }

      return NextResponse.json(
        {
          message: "link saved successfully!",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({
        error: "complete your profile first!",
      });
    }

    await connectToDB();

    const userPage = await Page.findOne({ email: session?.user?.email });
    console.log(userPage);

    if (userPage) {
      // check if the link already exist
      const existingLink = userPage.links.find((link) => link.name === name);

      if (existingLink) {
        // update the existing link
        await Page.findByIdAndUpdate(
          userPage._id,
          {
            $set: { "links.$[elem].href": href },
          },
          {
            arrayFilters: [{ "elem.name": name }],
          }
        );
      } else {
        // Add new link
        await Page.findByIdAndUpdate(userPage._id, {
          $push: { links: { name, href } },
        });
      }

      return NextResponse.json(
        {
          message: "link saved successfully!",
        },
        { status: 200 }
      );
    } else {
      console.log("create profile first!");
      return NextResponse.json({
        error: "complete your profile first!",
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
