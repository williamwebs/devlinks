"use client";

import { useEffect, useState } from "react";
import Save from "../button/Save";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/firebase";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [formInput, setFormInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [bioCount, setBioCount] = useState(0);

  // handle profile picture upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    setUploadedImage(image);

    try {
      setLoading(true);
      const storageRef = ref(storage, `profile-pictures/${image.name}`);
      const uploadedImage = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(uploadedImage.ref);
      setImageURL(url);

      if (url) {
        toast.success("Success!");
      } else {
        toast.error("Try again!");
      }
      // console.log(`image url: ${imageURL}`);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleInputs = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });

    console.log(formInput);
  };

  // handle bio chnage and wordcount
  const handleBioChange = (e) => {
    e.preventDefault();

    const wordCount = e.target.value.trim().split(/\s+/).length;

    if (wordCount <= 20) {
      handleInputs(e);
      setBioCount(wordCount);
    } else {
      console.log("more than 20 words!");
    }
  };

  // save profile in the db
  const handleProfileSave = async (e) => {
    e.preventDefault();

    const updatedFormInput = { ...formInput, image: imageURL };
    try {
      setLoading(true);
      const res = await axios.post("/api/save-profile", updatedFormInput);

      if (res.data.error) {
        toast.error(res.data.error);
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

    // console.log(formInput);
  };

  // fetch profile details
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("/api/get-profile");
      setProfile(res.data);
      setImageURL(res.data.image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <form onSubmit={handleProfileSave}>
      {/* picture upload */}
      <div className="p-5 bg-white2 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div className="hidden md:block w-1/6">
            <p className="text-sm font-normal text-grey">Profile picture</p>
          </div>
          <div className="w-full md:w-4/6 flex flex-col md:flex-row items-center gap-4 relative">
            <label
              htmlFor="image"
              className="rounded-lg overflow-hidden h-[193px] w-fit md:w-3/6 bg-veryLightBlue text-primary cursor-pointer"
            >
              <div className="relative h-52 w-52 flex flex-col items-center justify-center gap-2 md:h-full md:w-full">
                {uploadedImage ? (
                  <img
                    src={URL.createObjectURL(uploadedImage)}
                    alt="Uploaded Image"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  imageURL && (
                    <img
                      src={imageURL}
                      alt="Profile Picture"
                      className="h-full w-full object-cover"
                    />
                  )
                )}

                {loading && (
                  <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 z-10 bg-white/10 backdrop-blur">
                    <FontAwesomeIcon icon={faSpinner} spin />
                  </div>
                )}

                {!imageURL && (
                  <div className="text-center">
                    <div className="w-fit mx-auto">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M33.75 6.25H6.25C5.58696 6.25 4.95107 6.51339 4.48223 6.98223C4.01339 7.45107 3.75 8.08696 3.75 8.75V31.25C3.75 31.913 4.01339 32.5489 4.48223 33.0178C4.95107 33.4866 5.58696 33.75 6.25 33.75H33.75C34.413 33.75 35.0489 33.4866 35.5178 33.0178C35.9866 32.5489 36.25 31.913 36.25 31.25V8.75C36.25 8.08696 35.9866 7.45107 35.5178 6.98223C35.0489 6.51339 34.413 6.25 33.75 6.25ZM33.75 8.75V24.8047L29.6766 20.7328C29.4444 20.5006 29.1688 20.3164 28.8654 20.1907C28.5621 20.0651 28.2369 20.0004 27.9086 20.0004C27.5802 20.0004 27.2551 20.0651 26.9518 20.1907C26.6484 20.3164 26.3728 20.5006 26.1406 20.7328L23.0156 23.8578L16.1406 16.9828C15.6718 16.5143 15.0362 16.2512 14.3734 16.2512C13.7107 16.2512 13.075 16.5143 12.6062 16.9828L6.25 23.3391V8.75H33.75ZM6.25 26.875L14.375 18.75L26.875 31.25H6.25V26.875ZM33.75 31.25H30.4109L24.7859 25.625L27.9109 22.5L33.75 28.3406V31.25ZM22.5 15.625C22.5 15.2542 22.61 14.8916 22.816 14.5833C23.022 14.275 23.3149 14.0346 23.6575 13.8927C24.0001 13.7508 24.3771 13.7137 24.7408 13.786C25.1045 13.8584 25.4386 14.037 25.7008 14.2992C25.963 14.5614 26.1416 14.8955 26.214 15.2592C26.2863 15.6229 26.2492 15.9999 26.1073 16.3425C25.9654 16.6851 25.725 16.978 25.4167 17.184C25.1084 17.39 24.7458 17.5 24.375 17.5C23.8777 17.5 23.4008 17.3025 23.0492 16.9508C22.6975 16.5992 22.5 16.1223 22.5 15.625Z"
                          fill="#633CFF"
                        />
                      </svg>
                    </div>
                    <p className="font-semibold">+ Upload Image</p>
                  </div>
                )}
              </div>
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="hidden"
              onChange={handleImageUpload}
            />
            <div className="w-full md:w-3/6">
              <p className="text-sm text-center md:text-left font-normal text-grey italic ">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* input fields */}
      <div className="p-5 bg-white2 rounded-lg mb-6">
        {/* first name */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 h-16 md:h-10">
          <label
            htmlFor="firstname"
            className="text-sm font-normal text-grey w-full md:w-1/3"
          >
            First name{" "}
            <span className="text-base font-semibold text-red">*</span>
          </label>

          <div className="w-full md:w-2/3">
            <input
              type="text"
              name="firstname"
              className="bg-gray-50 border border-lightGrey rounded-lg focus:ring-primary focus:border-primary focus:outline-primary focus:shadow focus:shadow-primary block w-full p-2.5 text-sm text-grey"
              placeholder="e.g. John"
              onChange={handleInputs}
              defaultValue={profile?.firstname}
            />
          </div>
        </div>

        {/* last name */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 h-16 md:h-10">
          <label
            htmlFor="lastname"
            className="text-sm font-normal text-grey w-full md:w-1/3"
          >
            Last name{" "}
            <span className="text-base font-semibold text-red">*</span>
          </label>

          <div className="w-full md:w-2/3">
            <input
              type="text"
              name="lastname"
              className="bg-gray-50 border border-lightGrey rounded-lg focus:ring-primary focus:border-primary focus:outline-primary focus:shadow focus:shadow-primary block w-full p-2.5 text-sm text-grey"
              placeholder="e.g. Applesees"
              onChange={handleInputs}
              defaultValue={profile?.lastname}
            />
          </div>
        </div>

        {/* email address */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between h-16 md:h-10 mb-5">
          <label
            htmlFor="email"
            className="text-sm font-normal text-grey w-full md:w-1/3"
          >
            Email
          </label>

          <div className="w-full md:w-2/3">
            <input
              type="email"
              name="email"
              className="bg-gray-50 border border-lightGrey rounded-lg focus:ring-primary focus:border-primary focus:outline-primary focus:shadow focus:shadow-primary block w-full p-2.5 text-sm text-grey"
              placeholder="e.g. email@email.com"
              onChange={handleInputs}
              defaultValue={profile?.email}
              readOnly
            />
          </div>
        </div>

        {/* bio address */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between h-20">
          <label
            htmlFor="bio"
            className="w-full text-sm font-normal text-grey md:w-1/3"
          >
            Bio{" "}
            <sup>
              <em>(20 words max)</em>
            </sup>
          </label>

          <div className="w-full md:w-2/3">
            <textarea
              name="bio"
              className="bg-gray-50 border border-lightGrey rounded-lg focus:ring-primary focus:border-primary focus:outline-primary focus:shadow focus:shadow-primary block w-full  p-2.5 resize-none text-sm text-grey"
              placeholder="Frontend developer | website designer..."
              onChange={handleBioChange}
              defaultValue={profile?.bio}
            />
            <span
              className={`block text-xs text-right text-grey font-normal ${
                bioCount === 20 ? "text-green-500" : "text-grey"
              }`}
            >
              {bioCount}/20
            </span>
          </div>
        </div>
      </div>

      <Save loading={loading} />
    </form>
  );
};

export default Profile;
