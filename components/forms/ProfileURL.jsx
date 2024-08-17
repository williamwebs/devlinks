"use client";

import { useEffect, useState } from "react";
import Save from "../button/Save";
import axios from "axios";
import toast from "react-hot-toast";

const ProfileURL = () => {
  const [formInput, setFormInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState();

  const handleInputs = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });

    console.log(formInput);
  };

  // save profile in the db
  const handleProfileSave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("/api/save-profile-url", formInput);

      console.log(res.data);

      if (res.error) {
        toast.error(res.error);
        setLoading(false);
      } else {
        toast.success(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error.response.data.error);
      setLoading(false);
    }

    console.log(formInput);
  };

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
    <form onSubmit={handleProfileSave}>
      {/* input fields */}
      <div className="p-5 bg-white2 rounded-lg mb-6">
        {/* profile public link */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between h-16 md:h-10 mb-5">
          <label
            htmlFor="url"
            className="text-sm font-normal text-grey w-full md:w-1/3"
          >
            Public link (lowercase){" "}
            <span className="text-base font-semibold text-red">*</span>
          </label>

          <div className="w-full md:w-2/3">
            <input
              type="text"
              name="url"
              className="bg-gray-50 border border-lightGrey rounded-lg focus:ring-primary focus:border-primary focus:outline-primary focus:shadow focus:shadow-primary block w-full p-2.5 text-sm text-grey"
              placeholder="e.g johndoe / john-doe"
              onChange={handleInputs}
              defaultValue={profile?.url}
              readOnly={profile?.url}
            />
          </div>
        </div>
      </div>

      <Save loading={loading} />
    </form>
  );
};

export default ProfileURL;
