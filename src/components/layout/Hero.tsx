"use client";
import React from "react";
import { useState } from "react";

const Hero = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  return (
    <div onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}>
      <div
        className="pointer-events-none absolute w-50 h-50 bg-emerald-500 opacity-10 blur-3xl rounded-full transition-transform duration-300  "
        style={{
          transform: `translate(${position.x - 100}px, ${position.y - 100}px)`,
        }}
      ></div>

      {/* Badge */}
      <div className="inline-block mb-6 px-4 py-2 text-md bg-orange-300 text-black font-semibold rounded-full">
        Modern Business Analytics Platform
      </div>

      {/* Headlines */}
      <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
        Turn Your Business Data{" "}
        <span className=" text-orange-600 bg-clip-text ">
          {" "}
          Into Smart Growth Decision
        </span>
      </h1>

      {/* Subheading */}
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
        Track revenue,monitor transactions, and gain actionable insights with a
        powerful analytics dashboard built for modern business
      </p>

      {/* CTA BUTTONS */}
      <div className="flex justify-center gap-4">
        <a
          href="/dashboard"
          className="px-6 py-3 bg-orange-400 text-white rounded-lg text-sm font-bold transition-all duration-300 hover:bg-gray-800 hover:-translate-y-2 hover:shadow-lg"
        >
          Get Started
        </a>
        <button className="px-6 py-3 border rounded-lg text-sm font-bold transition-all duration-300 hover:bg-gray-800 hover:-translate-y-2 hover:shadow-lg">
          View Demo
        </button>
      </div>

      {/* PRODUCT PREVIEW */}
      <div className="mt-20 relative">
        <div className="absolute inset-0 bg-linear-to-r from-emerald-500/20 to-red-500/20 blur-3xl -z-10" />

        <div className="rounded-2xl relative z-10 overflow-hidden border shadow-2xl">
          <iframe src="/dashboard" className="w-full h-120 " />
        </div>
      </div>
    </div>
  );
};

export default Hero;
