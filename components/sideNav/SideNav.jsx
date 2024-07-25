import Image from "next/image";

const SideNav = () => {
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

          <div className="absolute top-0 left-0 w-full h-full p-5">
            <div className="flex items-center justify-center w-full h-full">
              <div className="mb-5">
                {/* picture */}
                <div className="w-24 h-24 mx-auto rounded-full bg-bgGrey mb-4"></div>
                <div className="w-32 h-9 mx-auto mb-10">
                  <div className="w-full h-4 mb-2 bg-bgGrey rounded-full"></div>
                  <div className="h-2 w-20 mx-auto bg-bgGrey rounded-full"></div>
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
