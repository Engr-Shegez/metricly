"use client";

import { ReactNode, useState } from "react";

import { CollaborativeCursors } from "@/components/dashboard/CollaborativeCursors";
import { CommandPalette } from "@/components/dashboard/CommandPalette";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen text-foreground">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="min-h-screen lg:pl-[19rem]">
        <Topbar onMenuClick={() => setOpen(true)} />

        <main className="px-4 pb-8 pt-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px]">{children}</div>
        </main>
      </div>

      <CommandPalette />
      <CollaborativeCursors />
    </div>
  );
}
