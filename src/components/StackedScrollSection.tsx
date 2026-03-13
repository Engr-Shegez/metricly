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

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="h-[120vh] relative">
      <motion.div
        style={{ scale, opacity }}
        className="sticky top-0 h-screen flex items-center justify-center"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default StackedScrollSection;
