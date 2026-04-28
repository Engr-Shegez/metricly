"use client";
import React from "react";
// import FeatureText from "../feature-text";
import FeatureVisual from "../feature-visual";
import ScrollReveal from "../scroll-reveal";
import FeatureRow from "../feature-row";
import ChartsVisual from "../charts-visual";

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="px-4 py-12 sm:px-6 sm:py-16 md:px-12 lg:px-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
            Everything You Need to
            <span className="bg-linear-to-r from-emerald-500 to-red-600 bg-clip-text text-transparent">
              {" "}
              Scale Smarter
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base font-bold text-gray-500 sm:text-lg">
            Powerful analytics tools designed to help you understand
            performance,tract growth, and make confident business decisions.
          </p>
        </div>

        <section className="px-2 sm:px-4 md:px-6">
          <div className="mx-auto max-w-7xl text-left">
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
      </div>
    </section>
  );
};

export default FeatureSection;
