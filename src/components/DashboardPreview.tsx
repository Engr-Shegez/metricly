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
      {/* RESPONSIVE CONTAINER */}
      <div className="relative w-full h-70 sm:h-72 md:h-105 lg:h-120  overflow-hidden rounded-xl border border-white/10 bg-black transition-transform duration-500 hover:-translate-y-2">
        {/* glow */}
        <div className="absolute -inset-10 bg-orange-500/20 blur-3xl rounded-full" />

        {/* iframe wrapper */}
        <div className="absolute inset-0 scale-[0.50] origin-top-left w-[200%] h-[253%]">
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
