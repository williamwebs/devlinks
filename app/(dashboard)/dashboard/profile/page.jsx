import Profile from "@/components/forms/Profile";
import ProfileURL from "@/components/forms/ProfileURL";

const page = () => {
  return (
    <main className="w-full">
      <h2 className="text-dark font-semibold text-xl">Profile Details</h2>
      <p className="text-sm font-normal text-grey mb-8">
        Add your details to create a personal touch to your profile.
      </p>

      {/* update profile form */}
      <Profile />

      {/* URL form */}
      <ProfileURL />
    </main>
  );
};

export default page;
