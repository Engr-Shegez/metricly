"use client";

import { motion } from "framer-motion";

export default function FeatureVisual() {
  return (
    <div className="relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-2xl px-4">
      <div className="absolute h-72 w-72 rounded-full bg-orange-500/20 blur-[10px] sm:h-96 sm:w-96" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear",
        }}
        className="absolute h-64 w-64 rounded-full
        bg-linear-to-r
        from-orange-500
        via-orange-300
        to-orange-600
        opacity-40 blur-xl sm:h-80 sm:w-80"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 35,
          ease: "linear",
        }}
        className="absolute h-64 w-64 rounded-full border border-orange-500/40 sm:h-80 sm:w-80"
      />

      <div className="relative w-full max-w-[320px] rounded-xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl transition hover:scale-[1.02] sm:p-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-500 rounded-lg" />
            <div>
              <p className="font-medium">Sessions</p>
              <p className="text-sm text-muted-foreground">
                Manage coding sessions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 opacity-70">
            <div className="w-10 h-10 bg-zinc-700 rounded-lg" />
            <div>
              <p className="font-medium">Live Chat</p>
              <p className="text-sm text-muted-foreground">
                Collaborate with your team
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 opacity-50">
            <div className="w-10 h-10 bg-zinc-700 rounded-lg" />
            <div>
              <p className="font-medium">Analytics</p>
              <p className="text-sm text-muted-foreground">Track progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
