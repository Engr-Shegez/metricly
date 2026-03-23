"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import { settingsNav } from "@/components/settings/settings-nav";

type Props = {
  onNavigate?: () => void; //  for mobile close
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
