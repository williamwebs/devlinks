"use client";

import { navigationLinks } from "@/constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  faArrowRightFromBracket,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../button/Button";
import toast from "react-hot-toast";

const Nav = () => {
  const [url, setUrl] = useState("");
  const pathname = usePathname();

  // fetch profile details
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("/api/get-profile");
      setUrl(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <nav className="py-4 m-4 bg-white rounded-lg">
      <div className="container flex items-center justify-between">
        {/* logo */}
        <Link href={"/dashboard"} className="w-fit">
          <Image
            src={"/images/devlinks-logo.png"}
            height={30}
            width={120}
            alt="devlinks logo"
            className="hidden md:block"
          />

          {/* mobile screens */}
          <Image
            src={"/images/solar_link-circle-bold.png"}
            height={40}
            width={40}
            alt="devlinks logo"
            className="block md:hidden"
          />
        </Link>
        {/* links */}
        <div className="flex items-center gap-3 md:gap-4">
          {navigationLinks.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className={
                pathname === link.href
                  ? "flex items-center gap-1 px-4 md:px-6 py-2 rounded-lg text-primary bg-veryLightBlue font-medium text-sm"
                  : "flex items-center gap-1 px-4 md:px-6 py-2 rounded-lg text-grey font-medium text-sm"
              }
            >
              <FontAwesomeIcon icon={link.icon} className="w-5 h-5" />
              <span className="hidden md:inline-block"> {link.name}</span>
            </Link>
          ))}
        </div>
        {/* cta */}
        <div className="flex items-center gap-2 md:gap-4">
          {url?.url && (
            <Link
              href={`/${url.url}`}
              className="px-3 md:px-6 py-2 rounded-lg border border-primary text-primary font-medium text-sm"
            >
              <span className="hidden md:flex">Preview</span>
              <FontAwesomeIcon icon={faEye} className="w-4 h-4 md:hidden" />
            </Link>
          )}
          {!url?.url && (
            <Button
              variant="outline"
              size="default"
              className="px-3 md:px-6 py-2 rounded-lg border border-primary text-primary font-medium text-sm"
              onClick={() => toast.error(`${url.error}`)}
            >
              <span className="hidden md:flex">Preview</span>
              <FontAwesomeIcon icon={faEye} className="w-4 h-4 md:hidden" />
            </Button>
          )}

          <div
            className="border bg-transparent text-grey hover:bg-lightBlue hover:text-white2 w-10 h-10 rounded flex items-center justify-center cursor-pointer transition-all duration-300"
            onClick={() => signOut()}
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="w-4 h-4"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
