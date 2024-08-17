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
import { faCircleUser, faEarthAfrica, faLink, faUserTie } from "@fortawesome/free-solid-svg-icons";

export const navigationLinks = [
  {
    name: "Links",
    href: "/dashboard",
    icon: faLink,
  },
  {
    name: "Profile Details",
    href: "/dashboard/profile",
    icon: faCircleUser,
  },
];

export const dropdownList = [
  {
    name: "Github",
    icon: faGithub,
  },
  {
    name: "Behance",
    icon: faBehance,
  },
  {
    name: "Dribble",
    icon: faDribbble,
  },
  {
    name: "Youtube",
    icon: faYoutube,
  },
  {
    name: "Linkedin",
    icon: faLinkedin,
  },
  {
    name: "Facebook",
    icon: faFacebook,
  },
  {
    name: "Twitter",
    icon: faXTwitter,
  },
  {
    name: "Twitch",
    icon: faTwitch,
  },
  {
    name: "Dev.to",
    icon: faDev,
  },
  {
    name: "FreeCodeCamp",
    icon: faFreeCodeCamp,
  },
  {
    name: "Gitlab",
    icon: faGitlab,
  },
  {
    name: "Hashnode",
    icon: faHashnode,
  },
  {
    name: "StackOverflow",
    icon: faStackOverflow,
  },
  {
    name: "Portfolio",
    icon: faUserTie,
  },
  {
    name: "Others",
    icon: faEarthAfrica,
  },
];
