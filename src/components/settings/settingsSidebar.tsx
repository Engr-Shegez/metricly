// "use client";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Menu } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { useState } from "react";

// const navItems = [
//   { name: "Profile", href: "/dashboard/settings" },
//   { name: "Billing", href: "/dashboard/settings/billing" },
//   { name: "Team", href: "/dashboard/settings/team" },
//   { name: "Security", href: "/dashboard/settings/security" },
//   { name: "Notification", href: "/dashboard/settings/notifications" },
//   { name: "API Keys", href: "/dashboard/settings/api-keys" },
// ];

// type NavLinksProps = {
//   pathname: string;
//   onNavigate?: () => void;
// };

// const NavLinks = ({ pathname, onNavigate }: NavLinksProps) => (
//   <nav className="flex flex-col gap-1">
//     {navItems.map((item) => (
//       <Link
//         key={item.href}
//         href={item.href}
//         onClick={onNavigate}
//         className={cn(
//           "text-sm px-3 py-2 rounded-md transition-colors",
//           pathname.startsWith(item.href)
//             ? "bg-black text-white dark:bg-white dark:text-black"
//             : "text-muted-foreground hover:bg-muted hover:text-foreground",
//         )}
//       >
//         {item.name}
//       </Link>
//     ))}
//   </nav>
// );
// const SettingsSidebar = ({ children }: { children: React.ReactNode }) => {
//   const [open, setOpen] = useState(false);
//   const pathname = usePathname();

//   return (
//     <div className="flex min-h-screen">
//       {/* Desktop sidebar */}
//       <aside className="hidden md:flex w-64 border-r bg-white/60 dark:bg-background backdrop-blur p-6 flex-col">
//         <h2 className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wide">
//           Settings
//         </h2>
//         <NavLinks pathname={pathname} />
//       </aside>

//       {/* Right Content Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Mobile Top Bar */}
//         <div className="lg:hidden items-center justify-between p-4 py-3 border-b bg-background/80 backdrop-blur">
//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild>
//               <button className="px-4 py-2 rounded-md bg-black text-white text-sm hover:opacity-90 transition">
//                 <Menu className="w-5 h-5" />
//               </button>
//             </SheetTrigger>

//             <SheetContent side="left" className="w-64 p-6">
//               <h2 className="text-lg font-semibold mb-6">Settings</h2>
//               <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
//             </SheetContent>
//           </Sheet>
//         </div>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto">
//           <div className="max-w-3xl mx-auto w-full py-8 px-4 md:px-0">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default SettingsSidebar;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import { settingsNav } from "@/components/settings/settings-nav";

type Props = {
  onNavigate?: () => void; // 👈 for mobile close
};

export default function SettingsSidebar({ onNavigate }: Props) {
  const pathname = usePathname();

  return (
    <nav className="space-y-8">
      {settingsNav.map((section) => (
        <div key={section.label}>
          <p className="text-md font-semibold text-muted-foreground mb-3 uppercase">
            {section.label}
          </p>

          <div className="space-y-1">
            {section.items.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={clsx(
                    "flex items-center gap-3  rounded-md px-3 py-2 text-md transition",
                    isActive
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4 " />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
