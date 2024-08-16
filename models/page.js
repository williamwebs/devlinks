import { Schema, model, models } from "mongoose";

const PageSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "firstname is required!"],
    },
    lastname: {
      type: String,
      required: [true, "lastname is required!"],
    },
    url: {
      type: String,
      required: [true, "url is required!"],
      unique: [true, "url has been taken!", { caseInsensitive: true }],
    },
    email: {
      type: String,
      unique: true,
    },
    bio: {
      type: String,
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
        icon: {
          type: String,
          required: [true, "icon is required!"],
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
