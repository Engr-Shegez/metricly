"use client";

import { motion } from "framer-motion";

export default function FeatureVisual() {
  return (
    <div className="relative flex items-center justify-center">
      {/* BIG AMBIENT GLOW */}
      <div className="absolute w-125 h-125 bg-orange-500/20 blur-[10px] rounded-full" />

      {/* ROTATING RING */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear",
        }}
        className="absolute w-95 h-95 rounded-full
        bg-linear-to-r
        from-orange-500
        via-orange-300
        to-orange-600
        opacity-40 blur-xl"
      />

      {/* INNER RING */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 35,
          ease: "linear",
        }}
        className="absolute w-[320px] h-80 rounded-full
        border border-orange-500/40"
      />

      {/* GLASS PRODUCT CARD */}
      <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-8 w-[320px] shadow-2xl hover:scale-[1.02] transition">
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
