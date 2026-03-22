import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navItems = [
  { name: "Profile", href: "/dashboard/settings" },
  { name: "Billing", href: "/dashboard/settings/billing" },
  { name: "Team", href: "/dashboard/settings/team" },
  { name: "Security", href: "/dashboard/settings/security" },
  { name: "Notification", href: "/dashboard/settings/notifications" },
  { name: "API Keys", href: "/dashboard/settings/api-keyys" },
];

const SettingsLayouts = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const NavLinks = () => (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm px-3 py-2 rounded-md transition-colors",
            pathname === item.href ? "bg-muted font-medium" : "hover:bg-muted",
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
  return (
    <div className="flex h-full">
      {/*Desktop sidebar */}
      <aside className="hidden md:flex w-64 border-r p-6 flex-col">
        <h2 className="text-lg font-semibold mb-6">Settings</h2>
        <NavLinks />
      </aside>

      {/* Main content bar */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex  items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Settings</h2>

          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64 p-6">
              <h2 className="text-lg font-semibold mb-6">Settings</h2>
              <NavLinks />
            </SheetContent>
          </Sheet>
        </div>
        {/* Content Area */}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default SettingsLayouts;
