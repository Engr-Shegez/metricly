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
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-black transition-transform duration-500 hover:-translate-y-2">
        <div className="absolute -inset-10 bg-orange-500/20 blur-3xl rounded-full" />

        <div className="absolute inset-0 h-[200%] w-[200%] origin-top-left scale-[0.5]">
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
