"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const SideNav = () => {
  const [profile, setProfile] = useState();

  // fetch profile details
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("/api/get-profile");
      console.log(res.data);
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);
  return (
    <>
      {/* <div className="flex items-center justify-center h-full">
        <Image
          src={"/images/preview-section.png"}
          width={250}
          height={400}
          alt="phone preview"
        />
      </div> */}

      <div className="flex items-center justify-center h-full">
        <div class="relative mx-auto border-grey bg-transparent border-[12px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
          <div class="w-[148px] h-[18px] bg-grey top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
          <div class="h-[46px] w-[5px] bg-grey absolute -start-[17px] top-[124px] rounded-s-lg"></div>
          <div class="h-[46px] w-[5px] bg-grey absolute -start-[17px] top-[178px] rounded-s-lg"></div>
          <div class="h-[64px] w-[5px] bg-grey absolute -end-[17px] top-[142px] rounded-e-lg"></div>
          <div class="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800"></div>

          <div className="absolute top-0 left-0 w-full h-full px-5 py-10 overflow-hidden">
            <div className="flex items-start justify-center w-full h-full">
              <div className="mb-5">
                {/* picture | show this skeleton when user has no image*/}
                {profile ? (
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                    <img
                      src={profile.image}
                      alt={profile.firstname + " " + profile.lastname}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 mx-auto rounded-full bg-bgGrey mb-4"></div>
                )}

                <div className="w-full h-9 mx-auto mb-6">
                  {profile ? (
                    <div className="text-center">
                      <h4 className="font-semibold text-base text-dark">
                        {profile.firstname + " " + profile.lastname}
                      </h4>
                      <p className="font-normal text-grey text-xs">
                        {profile.email}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="w-32 mx-auto h-4 mb-2 bg-bgGrey rounded-full"></div>
                      <div className="w-[60px] h-2 mx-auto bg-bgGrey rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* links */}
                <div className="h-full w-[230px] mx-auto">
                  <div className="mb-3 bg-bgGrey w-full h-11 rounded-lg"></div>
                  <div className="mb-3 bg-bgGrey w-full h-11 rounded-lg"></div>
                  <div className="mb-3 bg-bgGrey w-full h-11 rounded-lg"></div>
                  <div className="mb-3 bg-bgGrey w-full h-11 rounded-lg"></div>
                  <div className="mb-3 bg-bgGrey w-full h-11 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
