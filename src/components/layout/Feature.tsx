"use client";
import React from "react";
import FeatureText from "../feature-text";
import FeatureVisual from "../feature-visual";
import ScrollReveal from "../scroll-reveal";

const FeatureSection = () => {
  return (
    <section id="features" className="px-16 py-12 bg-linear-to-b min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mt-70 mb-16 ">
          <h2 className="text-5xl font-bold mb-4">
            Everything You Need to
            <span className="bg-linear-to-r from-emerald-500 to-red-600 bg-clip-text text-transparent">
              {" "}
              Scale Smarter
            </span>
          </h2>
          <p className="text-gray-500 text-md font-bold max-w-2xl mx-auto">
            Powerful analytics tools designed to help you understand
            performance,tract growth, and make confident business decisions.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 items-center rounded-xl gap-16 fade-up  ">
          {/* Feature 1*/}
          <ScrollReveal direction="left">
            <FeatureText />
          </ScrollReveal>

          {/* FEATURE 2 */}
          <ScrollReveal direction="right">
            <FeatureVisual />
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 items-center rounded-xl gap-16 fade-up mt-30 mb-50">
          <ScrollReveal direction="right">
            <FeatureVisual />
          </ScrollReveal>

          {/* Feature 4*/}
          <ScrollReveal direction="left">
            <FeatureText />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
