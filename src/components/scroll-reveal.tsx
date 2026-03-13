"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  direction?: "left" | "right";
};

const ScrollReveal = ({ children, direction = "left" }: Props) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 50%"],
  });

  const xStart = direction === "left" ? -100 : 100;

  const x = useTransform(scrollYProgress, [0, 1], [xStart, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity }}
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
