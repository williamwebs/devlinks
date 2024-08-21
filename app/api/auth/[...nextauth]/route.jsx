import clientPromise from "@/libs/mongoClients";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          // check if the user exists in the db
          const userRef = collection(db, "users");
          const q = query(userRef, where("email", "==", email));
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            throw new Error("Invalid email!");
            return null;
          } else {
            const user = querySnapshot.docs[0].data();

            const passwordsMatch = await bcrypt.compare(
              password,
              user.password
            );

            if (!passwordsMatch) {
              throw new Error("Incorrect password!");
              return null;
            } else {
              return user;
            }
          }

          // await connectToDB();

          // const user = await User.findOne({ email });

          // if (!user) {
          //   throw new Error("Invalid email!");
          //   return null;
          // }

          // const passwordsMatch = await bcrypt.compare(password, user.password);

          // if (!passwordsMatch) {
          //   throw new Error("Incorrect password!");
          //   return null;
          // } else {
          //   return user;
          // }
        } catch (error) {
          console.log(error);
          throw new Error("Invalid email or password!");
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
