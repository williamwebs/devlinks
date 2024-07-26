import { Schema, model, models } from "mongoose";

const PageSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "firstname is required"],
    },
    lastname: {
      type: String,
      required: [true, "lastname is required"],
    },
    email: {
      type: String,
      unique: true,
    },
    image: {
      type: String,
    },
    links: [
      {
        name: {
          type: String,
          required: [true, "name is required!"],
        },
        href: {
          type: String,
          required: [true, "link is required!"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Page = models.Page || model("Page", PageSchema);

export default Page;
