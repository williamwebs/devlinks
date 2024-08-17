import Register from "@/components/forms/Register";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <main className="w-screen h-screen">
      <div className="flex items-center justify-center h-full w-full">
        <div className="max-w-lg w-full mx-auto">
          <div className="flex flex-col items-center gap-5">
            <Link href={"/"}>
              <Image
                src={"/images/devlinks-logo.png"}
                height={40}
                width={120}
                alt="devlinks logo"
              />
            </Link>
            <div className="bg-white rounded-xl p-5 md:p-10">
              <h2 className="text-dark font-semibold text-xl ">
                Create account
              </h2>
              <p className="text-sm font-normal text-grey mb-10">
                Let’s get you started sharing your links!
              </p>

              {/* form */}
              <Register />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
