"use client";
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { useCurrentUser } from "@/lib/auth-client";

const Hero = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const currentUser = useCurrentUser();

  return (
    <section
      className="relative overflow-hidden px-1 pt-4 text-center"
      onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-emerald-500 opacity-10 blur-3xl transition-transform duration-300 sm:h-52 sm:w-52"
        style={{
          transform: `translate(${position.x - 100}px, ${position.y - 100}px)`,
        }}
      />

      <div className="inline-block rounded-full bg-orange-300 px-4 py-2 text-sm font-semibold text-black dark:bg-orange-900 dark:text-orange-100 sm:text-base">
        Modern Business Analytics Platform
      </div>

      <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
        Turn Your Business Data{" "}
        <span className="text-orange-600 bg-clip-text">Into Smart Growth Decision</span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:text-lg">
        Track revenue,monitor transactions, and gain actionable insights with a
        powerful analytics dashboard built for modern business
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href={currentUser ? "/dashboard" : "/register"}
          className="px-6 py-3 bg-orange-400 text-white rounded-lg text-sm font-bold transition-all duration-300 hover:bg-gray-800 hover:-translate-y-2 hover:shadow-lg"
        >
          {currentUser ? "Open Dashboard" : "Get Started"}
        </Link>
        <Link href="/dashboard">
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg text-sm font-bold transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-700 hover:-translate-y-2 hover:shadow-lg">
            View Demo
          </button>
        </Link>
      </div>

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative mx-auto mt-12 max-w-6xl sm:mt-16 lg:mt-20">
          <div className="absolute inset-0 opacity-40  bg-linear-to-r from-emerald-500/20  to-red-500/20 blur-3xl -z-10" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/80 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            <div className="relative z-10 mx-auto aspect-[16/10] w-full overflow-hidden">
              <iframe
                src="/dashboard"
                className="h-full w-full border-0 pointer-events-none md:scale-[0.9]"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-transparent to-black opacity-60" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
