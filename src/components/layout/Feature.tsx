"use client";
import React from "react";
import FeatureText from "../feature-text";
import FeatureVisual from "../feature-visual";
import ScrollReveal from "../scroll-reveal";
import FeatureRow from "../feature-row";
import ChartsVisual from "../charts-visual";

const FeatureSection = () => {
  return (
    <section id="features" className="px-16 py-12 bg-linear-to-b min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mt-70 mb-5">
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

        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto text-left">
            <ScrollReveal direction="right">
              <FeatureRow
                title="Top Management to see the bigger picture"
                description="Track and visualize your date in real time "
                bullets={[
                  "  Customizable layouts for effective coding",
                  "Font preferences to match your style",
                  " Create multiple profiles for versatility",
                ]}
                visual={<FeatureVisual />}
              />
            </ScrollReveal>
            <ScrollReveal direction="left">
              <FeatureRow
                title="Helping you with fast-reading charts on the go"
                description="Advanced visual charts that helps you make descitions faster"
                bullets={[
                  "Charts always on",
                  "Real time updates",
                  "Smart insights",
                ]}
                reverse
                visual={<ChartsVisual />}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* Feature Grid */}
        {/* <div className="grid md:grid-cols-2 items-center rounded-xl gap-16 fade-up  ">
          Feature 1
          <ScrollReveal direction="left">
            <FeatureText />
          </ScrollReveal>

          FEATURE 2
          <ScrollReveal direction="right">
            <FeatureVisual />
          </ScrollReveal>
        </div> */}

        {/* <div className="grid md:grid-cols-2 items-center rounded-xl gap-16 fade-up mt-30 mb-50">
          <ScrollReveal direction="right">
            <FeatureVisual />
          </ScrollReveal>

      
          <ScrollReveal direction="left">
            <FeatureText />
          </ScrollReveal>
        </div> */}
      </div>
    </section>
  );
};

export default FeatureSection;
