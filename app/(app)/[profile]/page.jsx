"use client";

import { Button } from "@/components/button/Button";
import Link from "@/components/card/Link";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { notFound, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [page, setPage] = useState({});
  const { data: session } = useSession();
  const path = usePathname();
  const url = path.split("/").pop();
  // console.log(url);

  const router = useRouter();

  // fetch page details from db
  const fetchPage = async () => {
    try {
      const res = await axios.get(`/api/fetch-url/${url}`);
      // console.log(res.status);
      setPage(res.data);

      if (res.status === 404) {
        console.log("user not found");
        router.push("/not-found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPage();
  }, []);

  // copy to clipboard
  const copyProfileURL = () => {
    window.navigator.clipboard.writeText(window.location.href);
    toast.success("copied to clipboard!");
  };

  return (
    <>
      {/* head */}
      <Head>
        {/* Basic metadata */}
        <title>{page?.firstname + " " + page?.lastname}</title>
        <meta
          property="og:title"
          content={page?.firstname + " " + page?.lastname}
        />
        <meta property="og:description" content={page?.bio} />
        <meta property="og:image" content={page?.image} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="profile" />

        {/* Instagram metadata */}
        <meta property="instagram:media_type" content="image" />

        {/* LinkedIn metadata */}
        <meta
          property="linkedin:author"
          content={page?.firstname + " " + page?.lastname}
        />
        <meta property="linkedin:publishedTime" content={page?.publishedTime} />

        {/* Twitter Card metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={page?.firstname + " " + page?.lastname}
        />
        <meta name="twitter:description" content={page?.bio} />
        <meta name="twitter:image" content={page?.image} />
      </Head>

      {/* main content */}
      <main>
        <header className="border bg-primary h-64 px-5 py-3 rounded-b-3xl">
          <nav className="bg-white rounded-lg w-full p-2 flex items-center justify-between">
            {session && (
              <Button variant="outline" href="/dashboard">
                Back to Editor
              </Button>
            )}
            <Button onClick={copyProfileURL} className="ml-auto">
              Share Link
            </Button>
          </nav>
        </header>
        <div className="flex justify-center w-full">
          <div className="-mt-16 bg-white shadow rounded-2xl h-full max-w-80 w-full py-10 px-8 mb-8">
            <div>
              {/* image */}
              {page?._id ? (
                <div className="w-24 h-24 mx-auto rounded-full border-4 border-primary overflow-hidden mb-4">
                  <img
                    src={page?.image}
                    alt={page?.firstname + " " + page?.lastname}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 mx-auto rounded-full border-4 border-primary overflow-hidden mb-4"></div>
              )}

              {/* name and email */}
              {page?._id && (
                <div className="text-center">
                  <h4 className="font-semibold text-xl text-dark">
                    {page?.firstname + " " + page?.lastname}
                  </h4>
                  <a
                    href={`mailto:${page?.email}`}
                    className="font-normal underline text-grey text-xs my-1"
                  >
                    {page?.email}
                  </a>
                  <p className="font-medium text-grey text-xs my-1">
                    {page?.bio}
                  </p>
                </div>
              )}

              {!page && (
                <div className="text-center">
                  <div className="w-32 mx-auto h-4 mb-2 bg-bgGrey rounded-full"></div>
                  <div className="w-[60px] h-2 mx-auto bg-bgGrey rounded-full"></div>
                </div>
              )}

              {/* links */}
              <div className="mt-6">
                {page &&
                  page?.links?.map((link, index) => (
                    <Link link={link} key={index} owner={page?.email} />
                  ))}
              </div>

              {/* loading */}
              {!page && (
                <div className="w-full mt-6">
                  <div className="mb-3 bg-bgGrey w-full h-11 rounded-lg"></div>
                  <div className="mb-3 bg-bgGrey w-full h-11 rounded-lg"></div>
                  <div className="mb-3 bg-bgGrey w-full h-11 rounded-lg"></div>
                  <div className="mb-3 bg-bgGrey w-full h-11 rounded-lg"></div>
                  <div className="mb-3 bg-bgGrey w-full h-11 rounded-lg"></div>
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="text-xs text-center text-grey font-normal mb-10">
          created with:{" "}
          <a
            href="https://devlinks-kohl.vercel.app"
            className="text-primary font-semibold hover:underline"
          >
            devlinks
          </a>
        </p>
      </main>
    </>
  );
};

export default ProfilePage;
