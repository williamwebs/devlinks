import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const POST = async (req) => {
  const { url } = await req.json();
  const session = await getServerSession(authOptions);

  console.log(session);

  try {
    const userDocRef = doc(db, "pages", session?.user?.email);

    const existingURLQuery = query(
      collection(db, "pages"),
      where("url", "==", url)
    );
    const existingURLDocs = await getDocs(existingURLQuery);

    if (existingURLDocs.docs.length > 0) {
      return NextResponse.json(
        {
          error: "URL already exists!",
        },
        {
          status: 400,
        }
      );
    } else {
      // check if the user has a page
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // URL does not exist, proceed to updating the user's document
        await updateDoc(
          userDocRef,
          {
            url,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );

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
    console.log(error);

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
