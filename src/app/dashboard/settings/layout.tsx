import SettingsMobileNav from "@/components/settings/settings-mobile-nav";

import SettingsSidebar from "../../../components/settings/settingsSidebar";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex ">
      {/* desktop sidebar */}
      <div className="border-r w-44">
        <SettingsSidebar />
      </div>
      <div className=" flex flex-col">
        {/* mobile header */}
        {/* <div className="flex items-center gap-3 p-4 border-b lg:hidden">
          <SettingsMobileNav />
          <h2 className="font-semibold">Settings</h2>
        </div> */}
        {/* coontent */}
      </div>
      <div className="p-6 w-full">{children}</div>
    </div>
  );
};

export default SettingsLayout;
