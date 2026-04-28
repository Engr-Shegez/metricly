import React from "react";
import ScrollReveal from "../scroll-reveal";
import Link from "next/link";

const PricingSection = () => {
  return (
    <section id="pricing" className="px-4 py-16 sm:px-6 sm:py-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="mb-4 text-4xl font-bold">Simple, Transparent Pricing</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 sm:text-2xl">
            Choose the plan that fits your business size and growth stage
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:items-stretch lg:gap-8">
          <ScrollReveal direction="left">
            <div className="mx-auto flex h-full w-full max-w-sm flex-col rounded-xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8">
              <h3 className="mb-2 text-xl font-semibold">Starter</h3>
              <p className="mb-6 text-3xl font-bold">
                $19<span className="text-sm">/month</span>
              </p>
              <ul className="mb-6 space-y-3 text-sm">
                <li>Basic analytics dashboard</li>
                <li>Up to 1,000 transactions</li>
                <li>Email support</li>
              </ul>
              <Link
                href="/register"
                className="mt-auto block w-full rounded-md border bg-emerald-600 py-2 text-center text-xl font-semibold text-black transition-all duration-300 hover:-translate-y-2 hover:bg-emerald-800 hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </ScrollReveal>

          <div className="relative flex h-full flex-col rounded-xl border-2 border-emerald-500 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 px-3 py-1 text-sm">
              Most Popular
            </div>
            <h3 className="mb-6 text-2xl font-bold">Pro</h3>
            <p className="mb-6 text-3xl font-bold">
              $49<span className="text-sm">/month</span>
            </p>
            <ul className="mb-8 space-y-3 text-sm">
              <li>Advanced analytics</li>
              <li>Unlimited transactions</li>
              <li>Priority support</li>
            </ul>
            <Link
              href="/register"
              className="mt-auto block w-full rounded-md border bg-emerald-600 py-2 text-center text-xl font-semibold text-black transition-all duration-300 hover:-translate-y-2 hover:bg-emerald-800 hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>

          <ScrollReveal direction="right">
            <div className="mx-auto flex h-full w-full max-w-sm flex-col rounded-xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8">
              <h3 className="mb-6 text-lg font-bold">Enterprise</h3>
              <p className="mb-6 text-3xl font-bold">Custom</p>
              <ul className="mb-6 space-y-3 text-sm">
                <li>Dedicated infrastructure</li>
                <li>Custom reporting</li>
                <li>Dedicated account manager</li>
              </ul>
              <button className="mt-auto w-full rounded-md border bg-orange-900 py-2 text-xl font-semibold text-black transition-all duration-300 hover:-translate-y-2 hover:bg-orange-800 hover:shadow-lg">
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
