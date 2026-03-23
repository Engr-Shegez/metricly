import SettingsContent from "./settingsContent";
import SettingsSidebar from "./settingsSidebar";

const SettingsPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SettingsSidebar>
        {children}
        <SettingsContent />
      </SettingsSidebar>
      ;
    </div>
  );
};

export default SettingsPage;
