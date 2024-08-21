import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const POST = async (req) => {
  const { firstname, lastname, image, bio } = await req.json();
  const session = await getServerSession(authOptions);

  console.log(session);

  try {
    // check if user's profile exists in the db
    const userDocRef = doc(db, "pages", session?.user?.email);
    const userDoc = await getDoc(userDocRef);

    // if (userDoc.exists()) {
    //   await updateDoc(userDocRef, {
    //     ...userDoc.data(),
    //     ...updates,
    //     updatedAt: serverTimestamp(),
    //   });
    // } else {
    //   await setDoc(userDocRef, {
    //     email: session?.user?.email,
    //     ...updates,
    //     createdAt: serverTimestamp(),
    //     updatedAt: serverTimestamp(),
    //   });
    // }

    if (userDoc.exists()) {
      await setDoc(
        userDocRef,
        {
          firstname: firstname || userDoc.data().firstname,
          lastname: lastname || userDoc.data().lastname,
          image: image || "",
          bio: bio || "",
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } else {
      // create a new profile
      await setDoc(userDocRef, {
        email: session?.user?.email,
        firstname,
        lastname,
        image: image || "",
        bio: bio || "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      await updateDoc(userDocRef, {
        _id: userDocRef.id,
      });
    }

    return NextResponse.json(
      {
        message: "Profile saved successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

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
