"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../card/Card";

const SideNav = () => {
  const [profile, setProfile] = useState();

  // fetch profile details
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("/api/get-profile");
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="flex items-center justify-center h-full py-10">
      <div class="relative mx-auto border-bgGrey bg-transparent border-[12px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
        <div class="w-[148px] h-[18px] bg-bgGrey top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div class="h-[46px] w-[5px] bg-bgGrey absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div class="h-[46px] w-[5px] bg-bgGrey absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div class="h-[64px] w-[5px] bg-bgGrey absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div class="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800"></div>

        <div className="absolute top-0 left-0 w-full h-full px-5 py-10 overflow-hidden">
          <div className="flex items-start justify-center w-full h-full">
            <div className="mb-5">
              {/* picture | show this skeleton when user has no image*/}
              {profile?._id ? (
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

              <div className="w-full h-full mx-auto mb-6">
                {profile?._id ? (
                  <div className="text-center">
                    <h4 className="font-semibold text-base text-dark">
                      {profile.firstname + " " + profile.lastname}
                    </h4>
                    <p className="font-normal text-grey text-xs">
                      {profile.email}
                    </p>
                    {/* <p className="font-normal text-grey text-xs mt-2">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Maiores, dolor! Quod, dolorum quidem. Tenetur magnam
                      dignissimos eaque ipsam, illum reiciendis.{" "}
                    </p> */}
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
                {profile?.links?.length > 0 &&
                  profile.links.map((link, index) => (
                    <Card link={link} index={index} />
                  ))}
                {profile?.links?.length === 0 && (
                  <div>
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
        </div>
      </div>
    </div>
  );
};

export default SideNav;
