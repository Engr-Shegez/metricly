import React from "react";

const CtaSection = () => {
  return (
    <section className="px-6 py-20 mt-20 rounded-4xl border bg-emerald-50/70 backdrop-blur-sm text-gray-700">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          Start Making Smarter Business Decisions Today
        </h2>
        <p className="text-emerald-100 mb-100">
          Join modern businesses using data to drive growth, improve efficiency,
          and maximize profitability.
        </p>
        <a
          href="/dashboard"
          className="inline-block px-8 py-3 bg-cyan-600 text-black rounded-lg font-medium transition-all duration-300 hover:bg-gray-800 hover:-translate-y-2 hover:shadow-lg"
        >
          Get Started Now
        </a>
      </div>
    </section>
  );
};

export default CtaSection;
