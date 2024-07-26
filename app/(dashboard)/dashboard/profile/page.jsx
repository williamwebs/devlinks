import Profile from "@/components/forms/Profile";

const page = () => {
  return (
    <main className="w-full">
      <h2 className="text-dark font-semibold text-2xl mb-2">Profile Details</h2>
      <p className="text-base font-normal text-grey mb-10">
        Add your details to create a personal touch to your profile.
      </p>

      {/* update profile form */}
      <Profile />
    </main>
  );
};

export default page;
