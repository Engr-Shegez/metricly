"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { MousePointer2, Users2 } from "lucide-react";

import { useCurrentUser } from "@/lib/auth-client";
import { useRealtimePresence } from "@/hooks/use-realtime-presence";
import { cn } from "@/lib/utils";

export function CollaborativeCursors() {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const currentUser = useCurrentUser();
  const { localUser, remoteCursors } = useRealtimePresence(currentUser);

  if (!isMounted || !localUser) {
    return null;
  }

  return (
    <>
      <div
        aria-label="Real-time collaboration status"
        className="glass-panel fixed bottom-5 right-5 z-40 hidden items-center gap-3 rounded-full px-4 py-3 text-xs font-medium text-foreground shadow-[0_12px_36px_rgba(32,24,14,0.14)] md:flex"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
          <Users2 className="h-4 w-4" />
        </span>
        <div>
          <p>{Math.max(remoteCursors.length + 1, 1)} people in view</p>
          <p className="text-[11px] text-muted-foreground">
            You are signed in as {localUser.name}
          </p>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 z-[60]">
        {remoteCursors.map((cursor) => (
          <motion.div
            key={cursor.id}
            animate={{ x: cursor.x, y: cursor.y }}
            className="absolute left-0 top-0"
            transition={{ type: "spring", stiffness: 340, damping: 30, mass: 0.35 }}
          >
            <div className="-translate-x-1 -translate-y-1">
              <MousePointer2
                className={cn(
                  "h-5 w-5 drop-shadow-[0_8px_16px_rgba(15,23,42,0.35)]",
                  cursor.color,
                )}
                fill="currentColor"
              />
              <div className="mt-1 rounded-full bg-slate-950 px-2 py-1 text-[10px] font-semibold text-white shadow-lg">
                {cursor.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
