import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/firebase/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

export const POST = async (req) => {
  const { email, password } = await req.json();

  try {
    // check if email already exists
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return NextResponse.json(
        {
          error: "User already exists. Please login instead.",
        },
        { status: 400 }
      );
    } else {
      // Create a new user document
      const docRef = await addDoc(collection(db, "users"), {
        email,
        password: await bcrypt.hash(password, 10),
        createdAt: serverTimestamp(),
      });

      console.log(docRef);

      return NextResponse.json(
        {
          message: "User created!",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Error creating user. Try again!",
      },
      { status: 500 }
    );
  }

  // try {
  //   console.log(email, password);
  //   await connectToDB();

  //   // check if user already exists
  //   const existingUser = await User.findOne({ email });

  //   if (existingUser) {
  //     return NextResponse.json(
  //       {
  //         error: "User already exists. Please login instead.",
  //       },
  //       { status: 400 }
  //     );
  //   } else {
  //     const hashedPassword = await bcrypt.hash(password, 10);

  //     await User.create({ email, password: hashedPassword });

  //     return NextResponse.json(
  //       {
  //         message: "user registered successfully!",
  //       },
  //       { status: 200 }
  //     );
  //   }
  // } catch (error) {
  //   return NextResponse.json(
  //     {
  //       error: "error creating user. Try again!",
  //     },
  //     { status: 500 }
  //   );
  // }
};
