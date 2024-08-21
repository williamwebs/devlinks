import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import Page from "@/models/page";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const GET = async (req, res) => {
  // get the url from the link

  const url = req.nextUrl.pathname.split("/").pop();
  console.log(url);

  try {
    const existingURLQuery = query(
      collection(db, "pages"),
      where("url", "==", url)
    );
    const existingURLDocs = await getDocs(existingURLQuery);

    if (existingURLDocs.docs.length > 0) {
      return NextResponse.json(existingURLDocs.docs[0].data());
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
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
};
