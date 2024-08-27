"use client";

import { dropdownList } from "@/constants/constants";
import {
  faChartSimple,
  faChevronDown,
  faEarthAfrica,
  faEquals,
  faEye,
  faLink,
  faTrash,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Save from "../button/Save";
import axios from "axios";
import toast from "react-hot-toast";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useSession } from "next-auth/react";
import {
  faBehance,
  faDev,
  faDribbble,
  faFacebook,
  faFreeCodeCamp,
  faGithub,
  faGitlab,
  faHashnode,
  faLinkedin,
  faStackOverflow,
  faTwitch,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Links = () => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    name: dropdownList?.[0].name,
    icon: dropdownList?.[0].icon,
  });
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState();

  const handleDropdown = ({ onSave }) => {
    setDropdownOpen((prev) => !prev);
  };

  // select dropdown option
  const handleSelectedOption = (option) => {
    // console.log(option);
    setSelectedOption(option);
    setDropdownOpen((prev) => !prev);
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(selectedOption);

    const data = {
      name: selectedOption.name,
      href: link,
    };
    console.log(data);

    try {
      setLoading(true);
      const res = await axios.post("/api/save-link", data);
      setLoading(false);

      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("An unexpected error occurred.Try again!");
      console.log(error);
    }
  };

  // fetch profile details
  useEffect(() => {
    if (session?.user?.email) {
      const unsubscribe = onSnapshot(
        doc(db, "pages", session.user.email),
        (doc) => {
          try {
            setProfile(doc.data());
            console.log(doc.data());
          } catch (error) {
            console.error("Error fetching profile data:", error);
          }
        }
      );

      return unsubscribe;
    }
  }, [session?.user?.email]);

  // delete a link
  const handleDelete = async (link) => {
    try {
      const userDocRef = doc(db, "pages", session?.user?.email);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const updatedLinks = userDoc
          .data()
          .links.filter((l) => l.name !== link.name);
        await updateDoc(userDocRef, { links: updatedLinks });
        toast.success("Link deleted successfully!");
      } else {
        console.log("User document not found!");
        toast.error("not deleted!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      {/* display the links from db here */}
      {profile?.links?.length > 0 &&
        profile.links.map((link, index) => (
          <div key={index} className="px-5 py-2 bg-white2 rounded-lg mb-6">
            <div className="select__menu h-full my-2">
              {/* delete button */}
              <div className="mb-3">
                <div
                  onClick={() => handleDelete(link)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow cursor-pointer ml-auto"
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-youtube w-3 h-3"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faEquals}
                    className="w-3 h-3 text-dark cursor-pointer"
                  />
                  <p className="text-dark text-sm font-normal capitalize">
                    Platform {index + 1}
                  </p>
                </div>

                <div className="flex items-center gap-8 mr-4">
                  <FontAwesomeIcon icon={faEye} className="text-dark w-3 h-3" />
                  <FontAwesomeIcon
                    icon={faChartSimple}
                    className="text-dark w-3 h-3"
                  />
                </div>
              </div>

              <div className="select__btn flex items-center justify-between py-3 px-4 text-sm font-medium rounded-lg bg-white border border-lightGrey mt-1 cursor-pointer shadow-sm">
                <div className="flex items-center">
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={
                        link.name === "Github"
                          ? faGithub
                          : link.name === "Facebook"
                          ? faFacebook
                          : link.name === "Youtube"
                          ? faYoutube
                          : link.name === "Linkedin"
                          ? faLinkedin
                          : link.name === "Twitch"
                          ? faTwitch
                          : link.name === "Twitter"
                          ? faXTwitter
                          : link.name === "Dev.to"
                          ? faDev
                          : link.name === "FreeCodeCamp"
                          ? faFreeCodeCamp
                          : link.name === "Gitlab"
                          ? faGitlab
                          : link.name === "Hashnode"
                          ? faHashnode
                          : link.name === "StackOverflow"
                          ? faStackOverflow
                          : link.name === "Behance"
                          ? faBehance
                          : link.name === "Dribble"
                          ? faDribbble
                          : link.name === "Portfolio"
                          ? faUserTie
                          : link.name === "Others"
                          ? faEarthAfrica
                          : faLink
                      }
                      className="w-3 h-3 border border-transparent"
                    />
                  </div>
                  <span className="text-sm inline-block">{link.name}</span>
                </div>

                <div className="flex items-center gap-9">
                  <p>0</p>
                  <p>0</p>
                </div>
              </div>
            </div>

            {/* input field starts here */}
            <div>
              <p className="text-dark text-sm font-normal capitalize">link</p>

              <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.52312 11.7207C8.59304 11.7903 8.64852 11.8731 8.68637 11.9643C8.72423 12.0555 8.74371 12.1532 8.74371 12.2519C8.74371 12.3506 8.72423 12.4484 8.68637 12.5395C8.64852 12.6307 8.59304 12.7135 8.52312 12.7832L8.15187 13.1544C7.44838 13.8579 6.49425 14.2531 5.49937 14.2531C4.50449 14.2531 3.55036 13.8579 2.84687 13.1544C2.14338 12.4509 1.74817 11.4968 1.74817 10.5019C1.74817 9.50702 2.14338 8.55289 2.84687 7.8494L4.35437 6.34253C5.0303 5.66493 5.93973 5.27142 6.89639 5.2426C7.85304 5.21378 8.78451 5.55184 9.5 6.18753C9.57386 6.25319 9.63408 6.33276 9.67719 6.42169C9.72031 6.51062 9.74549 6.60717 9.7513 6.70583C9.7571 6.8045 9.74341 6.90333 9.71102 6.99671C9.67863 7.09008 9.62816 7.17616 9.5625 7.25003C9.49683 7.3239 9.41727 7.38411 9.32834 7.42723C9.2394 7.47035 9.14285 7.49552 9.04419 7.50133C8.94553 7.50713 8.84669 7.49345 8.75331 7.46105C8.65994 7.42866 8.57386 7.37819 8.5 7.31253C8.07094 6.93148 7.51252 6.72877 6.93894 6.74584C6.36537 6.76292 5.81999 6.9985 5.41437 7.4044L3.90812 8.9094C3.48609 9.33143 3.249 9.90382 3.249 10.5007C3.249 11.0975 3.48609 11.6699 3.90812 12.0919C4.33015 12.5139 4.90254 12.751 5.49937 12.751C6.0962 12.751 6.66859 12.5139 7.09062 12.0919L7.46187 11.7207C7.53153 11.6509 7.61424 11.5956 7.70529 11.5579C7.79634 11.5201 7.89393 11.5007 7.9925 11.5007C8.09106 11.5007 8.18865 11.5201 8.2797 11.5579C8.37075 11.5956 8.45346 11.6509 8.52312 11.7207ZM13.1531 2.84565C12.4491 2.14325 11.4951 1.74878 10.5006 1.74878C9.5061 1.74878 8.55218 2.14325 7.84812 2.84565L7.47687 3.2169C7.33597 3.3578 7.25682 3.54889 7.25682 3.74815C7.25682 3.94741 7.33597 4.13851 7.47687 4.2794C7.61777 4.4203 7.80886 4.49945 8.00812 4.49945C8.20738 4.49945 8.39847 4.4203 8.53937 4.2794L8.91062 3.90815C9.33265 3.48613 9.90504 3.24903 10.5019 3.24903C11.0987 3.24903 11.6711 3.48613 12.0931 3.90815C12.5151 4.33018 12.7522 4.90257 12.7522 5.4994C12.7522 6.09624 12.5151 6.66863 12.0931 7.09065L10.5862 8.59815C10.1803 9.00388 9.63459 9.23912 9.06087 9.25574C8.48715 9.27235 7.92877 9.06908 7.5 8.68753C7.42613 8.62187 7.34005 8.5714 7.24668 8.539C7.1533 8.50661 7.05446 8.49292 6.9558 8.49873C6.85714 8.50453 6.76059 8.52971 6.67165 8.57283C6.58272 8.61595 6.50316 8.67616 6.4375 8.75003C6.37183 8.8239 6.32137 8.90997 6.28897 9.00335C6.25658 9.09672 6.24289 9.19556 6.24869 9.29422C6.2545 9.39288 6.27968 9.48944 6.3228 9.57837C6.36591 9.6673 6.42613 9.74687 6.5 9.81253C7.21498 10.4481 8.14583 10.7863 9.10203 10.7581C10.0582 10.7299 10.9675 10.3373 11.6437 9.66065L13.1512 8.15378C13.8545 7.44989 14.2496 6.49571 14.25 5.50073C14.2503 4.50575 13.8558 3.55129 13.1531 2.8469V2.84565Z"
                      fill="#737373"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="bg-white text-sm border border-lightGrey rounded-lg focus:ring-primary focus:border-primary focus:outline-primary block w-full ps-10 p-2.5"
                  placeholder="e.g. https://www.github.com/johnappleseed"
                  name="link"
                  defaultValue={link.href}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>
            {/* input field ends here */}
          </div>
        ))}
      {/* links from db ends here */}

      <div className="p-5 bg-white2 rounded-lg mb-6">
        <div className="select__menu h-full my-2">
          <p className="text-dark text-sm font-normal capitalize">platform</p>
          <div
            className="select__btn flex items-center justify-between py-3 px-4 text-sm font-medium rounded-lg bg-white border border-lightGrey mt-1 cursor-pointer shadow-sm"
            onClick={handleDropdown}
          >
            <div className="flex items-center">
              <div className="mr-2">
                <FontAwesomeIcon
                  icon={selectedOption.icon}
                  className="w-3 h-3 border border-transparent"
                />
              </div>
              <span className="text-sm inline-block">
                {selectedOption.name}
              </span>
            </div>
            <FontAwesomeIcon icon={faChevronDown} className="w-2 h-2" />
          </div>

          {/* dropdown lists */}
          {dropdownOpen && (
            <ul className="options relative p-4 bg-white rounded-lg mt-2 shadow-sm">
              {dropdownList.map((option, index) => (
                <li
                  className="option flex h-8 cursor-pointer items-center px-3 bg-white hover:bg-white2 border-b rounded"
                  onClick={() => handleSelectedOption(option)}
                  key={index}
                >
                  <div className="mr-2">
                    <FontAwesomeIcon
                      icon={option.icon}
                      className="w-3 h-3 text-dark"
                    />
                  </div>

                  <span className="option__text text-sm font-medium text-dark">
                    {option.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* input field starts here */}
        <div>
          <p className="text-dark text-sm font-normal capitalize">link</p>

          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.52312 11.7207C8.59304 11.7903 8.64852 11.8731 8.68637 11.9643C8.72423 12.0555 8.74371 12.1532 8.74371 12.2519C8.74371 12.3506 8.72423 12.4484 8.68637 12.5395C8.64852 12.6307 8.59304 12.7135 8.52312 12.7832L8.15187 13.1544C7.44838 13.8579 6.49425 14.2531 5.49937 14.2531C4.50449 14.2531 3.55036 13.8579 2.84687 13.1544C2.14338 12.4509 1.74817 11.4968 1.74817 10.5019C1.74817 9.50702 2.14338 8.55289 2.84687 7.8494L4.35437 6.34253C5.0303 5.66493 5.93973 5.27142 6.89639 5.2426C7.85304 5.21378 8.78451 5.55184 9.5 6.18753C9.57386 6.25319 9.63408 6.33276 9.67719 6.42169C9.72031 6.51062 9.74549 6.60717 9.7513 6.70583C9.7571 6.8045 9.74341 6.90333 9.71102 6.99671C9.67863 7.09008 9.62816 7.17616 9.5625 7.25003C9.49683 7.3239 9.41727 7.38411 9.32834 7.42723C9.2394 7.47035 9.14285 7.49552 9.04419 7.50133C8.94553 7.50713 8.84669 7.49345 8.75331 7.46105C8.65994 7.42866 8.57386 7.37819 8.5 7.31253C8.07094 6.93148 7.51252 6.72877 6.93894 6.74584C6.36537 6.76292 5.81999 6.9985 5.41437 7.4044L3.90812 8.9094C3.48609 9.33143 3.249 9.90382 3.249 10.5007C3.249 11.0975 3.48609 11.6699 3.90812 12.0919C4.33015 12.5139 4.90254 12.751 5.49937 12.751C6.0962 12.751 6.66859 12.5139 7.09062 12.0919L7.46187 11.7207C7.53153 11.6509 7.61424 11.5956 7.70529 11.5579C7.79634 11.5201 7.89393 11.5007 7.9925 11.5007C8.09106 11.5007 8.18865 11.5201 8.2797 11.5579C8.37075 11.5956 8.45346 11.6509 8.52312 11.7207ZM13.1531 2.84565C12.4491 2.14325 11.4951 1.74878 10.5006 1.74878C9.5061 1.74878 8.55218 2.14325 7.84812 2.84565L7.47687 3.2169C7.33597 3.3578 7.25682 3.54889 7.25682 3.74815C7.25682 3.94741 7.33597 4.13851 7.47687 4.2794C7.61777 4.4203 7.80886 4.49945 8.00812 4.49945C8.20738 4.49945 8.39847 4.4203 8.53937 4.2794L8.91062 3.90815C9.33265 3.48613 9.90504 3.24903 10.5019 3.24903C11.0987 3.24903 11.6711 3.48613 12.0931 3.90815C12.5151 4.33018 12.7522 4.90257 12.7522 5.4994C12.7522 6.09624 12.5151 6.66863 12.0931 7.09065L10.5862 8.59815C10.1803 9.00388 9.63459 9.23912 9.06087 9.25574C8.48715 9.27235 7.92877 9.06908 7.5 8.68753C7.42613 8.62187 7.34005 8.5714 7.24668 8.539C7.1533 8.50661 7.05446 8.49292 6.9558 8.49873C6.85714 8.50453 6.76059 8.52971 6.67165 8.57283C6.58272 8.61595 6.50316 8.67616 6.4375 8.75003C6.37183 8.8239 6.32137 8.90997 6.28897 9.00335C6.25658 9.09672 6.24289 9.19556 6.24869 9.29422C6.2545 9.39288 6.27968 9.48944 6.3228 9.57837C6.36591 9.6673 6.42613 9.74687 6.5 9.81253C7.21498 10.4481 8.14583 10.7863 9.10203 10.7581C10.0582 10.7299 10.9675 10.3373 11.6437 9.66065L13.1512 8.15378C13.8545 7.44989 14.2496 6.49571 14.25 5.50073C14.2503 4.50575 13.8558 3.55129 13.1531 2.8469V2.84565Z"
                  fill="#737373"
                />
              </svg>
            </div>
            <input
              type="text"
              className="bg-white text-sm border border-lightGrey rounded-lg focus:ring-primary focus:border-primary focus:outline-primary block w-full ps-10 p-2.5"
              placeholder="e.g. https://www.github.com/johnappleseed"
              name="link"
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
        </div>
        {/* input fields ends here */}
      </div>
      <Save loading={loading} />
    </form>
  );
};

export default Links;
