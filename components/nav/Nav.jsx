import { faCircleUser, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="py-4 m-4 bg-white rounded-lg">
      <div className="container flex items-center justify-between">
        {/* logo */}
        <div className="w-fit">
          <Image
            src={"/images/devlinks-logo.png"}
            height={30}
            width={130}
            alt="devlinks logo"
          />
        </div>
        {/* links */}
        <div className="flex items-center gap-4">
          <Link
            href={"/links"}
            className="flex items-center gap-1 border px-6 py-2 rounded-lg text-grey font-medium text-base"
          >
            <FontAwesomeIcon icon={faLink} className="w-5 h-5" />
            Links
          </Link>
          <Link
            href={"/links"}
            className="flex items-center gap-1 border px-6 py-2 rounded-lg text-grey font-medium text-base"
          >
            <FontAwesomeIcon icon={faCircleUser} className="w-5 h-5" />
            Profile Details
          </Link>
        </div>
        {/* cta */}
        <div>
          <Link
            href={"/"}
            className="px-6 py-2 rounded-lg border border-primary text-primary font-medium text-base"
          >
            Preview
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
