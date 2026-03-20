"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  direction?: "left" | "right";
};

const ScrollReveal = ({ children, direction = "left" }: Props) => {
  const ref = useRef(null);
  const yStart = direction === "left" ? 60 : 60;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yStart }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
