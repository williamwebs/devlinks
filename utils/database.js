import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); // sets the mongoose options

  // check if a connection to the database has already been established
  if (isConnected) {
    console.log("MongoDB is already connected");
    return; // terminates the function from running
  }

  // if there is no established connection, create a connection to the db
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "devlinks",
    });

    // isConnected = true;
    // console.log("MongoDB is connected");
    connection.on("connected", () => {
      isConnected = true;
      console.log("MongoDB is connected");
    });

    connection.on("error", (error) => {
      console.log("MongoDB connection error:", error);
    });

    connection.on("disconnected", () => {
      isConnected = false;
      console.log("MongoDB connection disconnected");
    });
  } catch (error) {
    console.log(error);
  }
};
