import Image from "next/image";

const SideNav = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Image
        src={"/images/preview-section.png"}
        width={250}
        height={400}
        alt="phone preview"
      />
    </div>
  );
};

export default SideNav;
