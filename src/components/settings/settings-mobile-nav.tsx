"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SettingsSidebar from "@/components/settings/settingsSidebar";

export default function SettingsMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden">
          <Menu size={24} />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 p-6">
        <SettingsSidebar onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
