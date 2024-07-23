import Image from "next/image";

const page = () => {
  return (
    <main className="flex items-stretch gap-6 justify-between">
      {/* image */}
      <div className="w-full md:w-2/5 bg-white rounded-lg">
        <div className="flex items-center justify-center h-full">
          <Image
            src={"/images/preview-section.png"}
            width={250}
            height={400}
            alt="phone preview"
          />
        </div>
      </div>
      {/* content section */}
      <div className="w-full md:w-3/5 bg-white p-10 rounded-lg">
        <h2 className="text-dark font-semibold text-2xl mb-2">
          Customize your links
        </h2>
        <p className="text-base font-normal text-grey mb-10">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>

        <button className="block w-full px-6 py-2 rounded-lg border border-primary text-primary font-medium text-base mb-6">
          + Add new link
        </button>

        <div className="p-5 bg-white2 rounded-lg">
          <div className="w-fit mx-auto">
            <Image
              src={"/images/swipe-phone-illustration.png"}
              width={220}
              height={160}
              alt="swipe phone illustration"
            />
          </div>
          <div className="my-8 max-w-lg mx-auto text-center">
            <h3 className="text-dark font-semibold text-2xl mb-2">
              Let’s get you started
            </h3>
            <p className="text-base font-normal text-grey mb-10">
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We’re here to help
              you share your profiles with everyone!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
