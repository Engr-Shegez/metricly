import React from "react";
import ScrollReveal from "../scroll-reveal";

const PricingSection = () => {
  return (
    <section id="pricing" className="px-6 py-20 mt-20  backdrop-blur-sm mb-30">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}

        <div className="text-center  mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 text-2xl max-w-2xl mx-auto">
            Choose the plan that fits your business size and growth stage
          </p>
        </div>

        {/* PRicing Grid */}
        <div className="grid md:grid-cols-3 gap-8 fade-up">
          {/* STARTER PLAN */}
          <ScrollReveal direction="left">
            <div className="border w-70 h-100 mt-15 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <h3 className="text-xl text-gray-500 font-semibold mb-2">
                Starter
              </h3>
              <p className="text-3xl text-gray-700  font-bold mb-6">
                $19<span className="text-sm text-gray-700">/month</span>
              </p>
              <ul className="space-y-3 text-sm text-gray-600 mb-3">
                <li>✓ Basic analytics dashboard</li>
                <li>✓ Up to 1,000 transactions</li>
                <li>✓ Email support</li>
              </ul>
              <button className="w-full text-black font-semibold bg-emerald-600 py-2 border rounded-md text-xl transition-all duration-300 hover:bg-emerald-800 hover:-translate-y-2 hover:shadow-lg">
                Get Started
              </button>
            </div>
          </ScrollReveal>

          {/* pro plan (highlighted) */}

          <div className="border-2 border-emerald-500 rounded-xl p-8 shadow-lg relative transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-gray-500 text-sm px-3 py-1 rounded-full">
              Most Popular
            </div>
            <h3 className="text-2xl text-gray-700 font-bold mb-6">Pro</h3>
            <p className="text-3xl  text-gray-700 font-bold mb-6">
              $49<span className="text-sm text-gray-700">/month</span>
            </p>
            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              <li>✓ Advanced analytics</li>
              <li>✓ Unlimited transactions</li>
              <li>✓ Priority support</li>
            </ul>
            <button className="w-full text-black font-semibold bg-emerald-600 py-2 border rounded-md text-xl transition-all duration-300 hover:bg-emerald-800 hover:-translate-y-2 hover:shadow-lg">
              Get Started
            </button>
          </div>

          {/* ENTERPRIZE */}
          <ScrollReveal direction="right">
            <div className="border w-70 mt-15 h-100 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <h3 className="text-lg text-gray-500 font-bold mb-6">
                Enterprise
              </h3>
              <p className="text-3xl text-gray-700 font-bold mb-6">Custom</p>
              <ul className="space-y-3 text-sm text-gray-600 mb-4">
                <li>✓ Dedictated infrastructure</li>
                <li>✓ Custom reporting</li>
                <li>✓ Dedicated account manager</li>
              </ul>
              <button className="w-full text-black font-semibold bg-orange-900 py-2 border rounded-md text-xl transition-all duration-300 hover:bg-orange-800 hover:-translate-y-2 hover:shadow-lg">
                Contact sales
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
