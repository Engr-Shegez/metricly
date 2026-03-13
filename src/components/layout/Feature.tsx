"use client";
import React from "react";
import FeatureText from "../feature-text";
import FeatureVisual from "../feature-visual";

const FeatureSection = () => {
  return (
    <section id="features" className="px-16 py-12 bg-linear-to-b  mt-10   ">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mt-10 mb-16">
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
        <div className="grid md:grid-cols-2 items-center rounded-xl gap-16 fade-up">
          {/* Feature 1*/}
          <FeatureText />
          {/* <div className="bg-amber-400 p-8 rounded-xl border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
            <h3 className="text-lg text-blue-950 font-semibold mb-3">
              Real-Time Insights
            </h3>
            <p className="text-gray-600 text-sm">
              Monitor revenue, transactions, and KPIs instantly with live data
              visualization and intelligent summaries.
            </p>
          </div> */}

          {/* FEATURE 2 */}
          <FeatureVisual />
          {/* <div className="bg-blue-400 p-8 rounded-xl border shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <h3 className="text-lg text-black font-semibold mb-3">
              Advance Filtering
            </h3>
            <p className="text-gray-600 text-lg">
              Slice and analyse data by category, status, or timeframe to
              uncover patterns that drive growth.
            </p>
          </div> */}

          {/* FEATURE 3 */}
          {/* <div className="bg-emerald-600 p-8 rounded-xl border shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <h3 className="text-lg text-amber-950 font-semibold mb-3">
              Actionable Reports
            </h3>
            <p className="text-gray-600 text-lg">
              Transform raw numbers into clear reports that help you optimize
              operations and improve profitability
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
