"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
};

const StackedScrollSection = ({ children }: Props) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.9], [1, 0]);

  // Mobile: normal document flow to avoid sticky-section stacking overlaps.
  // Desktop (sm+): keep the sticky "stacked" effect.
  return (
    <section ref={ref} className="h-auto sm:h-[95vh] relative">
      <motion.div
        style={{ scale, opacity }}
        className="flex items-center justify-center sm:sticky sm:top-0 sm:h-[95vh] sm:z-0"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default StackedScrollSection;
