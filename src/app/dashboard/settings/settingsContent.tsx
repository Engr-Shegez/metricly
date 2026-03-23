import SettingsSection from "@/components/layout/SettingsSection";
import React from "react";

const SettingsContent = () => {
  return (
    <div className="space-y-6">
      <SettingsSection
        title="Profile"
        description="Update your personal information"
      >
        <input
          className="w-full border rounded-md p-2"
          placeholder="Full name"
        />
        <input className="w-full border rounded-md p-2" placeholder="Email" />
      </SettingsSection>

      <SettingsSection title="Password" description="Change your password">
        <input
          className="w-full border rounded-md p-2"
          placeholder="New password"
        />
        <button className="px-4 py-2 bg-black text-white rounded-md">
          Update password
        </button>
      </SettingsSection>
    </div>
  );
};
export default SettingsContent;
