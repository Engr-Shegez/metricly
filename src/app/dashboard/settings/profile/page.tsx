import ProfileForm from "@/components/layout/profile-form";
import React from "react";

const SettingsContent = () => {
  const user = {
    name: "Engr Shegez",
    email: "shegez@gmail.com",
  };
  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-4xl font-semibold">Profiles</h1>
        <p className="text-muted-foreground text-xl mt-1">
          Update your personal information
        </p>
      </div>
      <ProfileForm user={user} />
    </div>
  );
};
export default SettingsContent;

{
  /* <div className="space-y-6  ">
  <SettingsSection
    title="Profile"
    description="Update your personal information"
  >
    <input
      className=" border shadow-2xl rounded-lg p-2"
      placeholder="Full name"
    />
    <input className=" border rounded-md p-2 ml-5 " placeholder="Email" />
  </SettingsSection>

  <SettingsSection title="Password" description="Change your password">
    <input className=" border rounded-md p-2" placeholder="New password" />
    <button className="px-4 py-2 bg-black ml-5 text-white rounded-md">
      Update password
    </button>
  </SettingsSection>
</div>; */
}
