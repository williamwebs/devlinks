import Login from "@/components/forms/Login";
import Image from "next/image";

const page = () => {
  return (
    <main className="w-screen h-screen">
      <div className="flex items-center justify-center h-full w-full">
        <div className="max-w-lg w-full mx-auto">
          <div className="flex flex-col items-center gap-10">
            <Image
              src={"/images/devlinks-logo.png"}
              height={40}
              width={182.5}
              alt="devlinks logo"
            />
            <div className="bg-white rounded-xl p-10">
              <h2 className="text-dark font-semibold text-2xl mb-2">Login</h2>
              <p className="text-base font-normal text-grey mb-10">
                Add your details below to get back into the app
              </p>

              {/* form */}
              <Login />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
