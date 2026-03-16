"use client";
import { motion } from "framer-motion";

const DashboardPreview = () => {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative w-full h-105 overflow-hidden rounded-xl border border-white/10 bg-black">
        {/* glow */}
        <div className="absolute -inset-10 bg-orange-500/20 blur-3xl rounded-full" />

        {/* iframe wrapper */}
        <div className="adsolute inset-0 scale-[0.50] origin-top-left w-[200%] h-[253%]">
          <iframe
            src="/dashboard"
            className="w-full h-full border-0 pointer-events-none"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPreview;
