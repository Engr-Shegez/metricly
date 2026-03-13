"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
};

const ScrollSection = ({ children }: Props) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const scale = useTransform(scrollYProgress, [0.3, 1], [1.2, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 5], [0, -30]);
  return (
    <section ref={ref} className=" flex items-center justify-center relative">
      <motion.div
        style={{
          scale,
          opacity,
          y,
        }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default ScrollSection;
