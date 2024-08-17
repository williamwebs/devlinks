"use client";

import { faArrowRight, faEarthAfrica, faLink, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const Link = ({ link, index }) => {
  return (
    <a
      href={link.href}
      key={index}
      className={`mb-2 w-full h-10 rounded-lg flex items-center px-2 ${
        link.name === "Github"
          ? "bg-github"
          : link.name === "Facebook"
          ? "bg-facebook"
          : link.name === "Youtube"
          ? "bg-youtube"
          : link.name === "Linkedin"
          ? "bg-linkedin"
          : link.name === "Twitch"
          ? "bg-twitch"
          : link.name === "Twitter"
          ? "bg-twitter"
          : link.name === "Dev.to"
          ? "bg-devto"
          : link.name === "codewars"
          ? "bg-codewars"
          : link.name === "FreeCodeCamp"
          ? "bg-freecodecamp"
          : link.name === "Gitlab"
          ? "bg-gitlab"
          : link.name === "Hashnode"
          ? "bg-hashnode"
          : link.name === "StackOverflow"
          ? "bg-stackoverflow"
          : link.name === "Behance"
          ? "bg-[#053eff]"
          : link.name === "Dribble"
          ? "bg-[#ea4c89]"
          : link.name === "Portfolio"
          ? "bg-[#5ccc78]"
          : link.name === "Others"
          ? "bg-[#479fd7]"
          : "bg-bgGrey"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
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
            className="w-3 h-3 mr-1 text-white"
          />
          <h4 className="text-sm font-medium text-white2">{link.name}</h4>
        </div>
        <FontAwesomeIcon icon={faArrowRight} className="w-2 text-white2" />
      </div>
    </a>
  );
};

export default Link;
