import Hero from "@/components/layout/Hero";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen ">
      {/* NAVBAR */}
      <nav className=" w-full border-b bg-white/60 backdrop-blur-md sticky top-0 z-50 px-4 py-2 border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* LOGO */}
          <div className="text-lg  text-gray-900 font-semibold">Ὡ Metricly</div>

          {/* LINKS */}
          <div className="hidden md:flex items-center gap-8 text-lg text-gray-900">
            <a href="#features" className="hover:text-black">
              Features
            </a>
            <a href="#pricing" className="hover:text-black">
              Pricing
            </a>
            <a href="#dashboard" className="hover:text-black">
              Dashboard
            </a>
          </div>
          {/* right action */}
          <div className="flex items-center gap-4">
            <button className="text-lg text-gray-900 hover:text-gray-700">
              Login
            </button>
            <a
              href="/dashboard"
              className="px-4 py-2 bg-black text-white rounded-md text-md"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      <section className="px-6 py-32 relative overflow-hidden text-xl tracking-tight">
        {/* glow element */}
        {/* <div className="absolute inset-0 flex justify-center">
          <div className="w-100 h-100 bg-emerald-500 opacity-15 blur-3xl rounded-full"></div>
        </div> */}

        {/* hero wrapper */}
        <div className="max-w-6xl mx-auto text-center fade-up relative z-10">
          <Hero />
          <section className="px-6 py-16">
            <div className="max-w-6xl mx-auto text-center">
              <p className="text-md text-gray-500 mb-8 tracking-wide uppercase">
                Trusted by innovative teams Worldwide
              </p>

              <div className="flex flex-wrap items-center justify-center gap-10 opacity-60">
                <span className="text-xl font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                  Strips
                </span>
                <span className="text-xl font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                  Notion
                </span>
                <span className="text-xl font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                  Vercel
                </span>
                <span className="text-xl font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                  Linear
                </span>
                <span className="text-xl font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                  Supabase
                </span>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section
            id="features"
            className="px-6 py-5 bg-linear-to-b from-orange-200 mt-10 border rounded-4xl  to-black"
          >
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
                  performance,tract growth, and make confident business
                  decisions.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid md:grid-cols-3 rounded-xl gap-9 fade-up">
                {/* Feature 1*/}
                <div className="bg-amber-400 p-8 rounded-xl border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                  <h3 className="text-lg text-blue-950 font-semibold mb-3">
                    Real-Time Insights
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Monitor revenue, transactions, and KPIs instantly with live
                    data visualization and intelligent summaries.
                  </p>
                </div>

                {/* FEATURE 2 */}
                <div className="bg-blue-400 p-8 rounded-xl border shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <h3 className="text-lg text-black font-semibold mb-3">
                    Advance Filtering
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Slice and analyse data by category, status, or timeframe to
                    uncover patterns that drive growth.
                  </p>
                </div>

                {/* FEATURE 3 */}
                <div className="bg-emerald-600 p-8 rounded-xl border shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <h3 className="text-lg text-amber-950 font-semibold mb-3">
                    Actionable Reports
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Transform raw numbers into clear reports that help you
                    optimize operations and improve profitability
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing section */}
          <section
            id="pricing"
            className="px-6 py-20 mt-20 border rounded-4xl bg-orange-50/60 backdrop-blur-sm"
          >
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
                <div className="border rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
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
                <div className="border rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <h3 className="text-lg text-gray-500 font-bold mb-6">
                    Enterprise
                  </h3>
                  <p className="text-3xl text-gray-700 font-bold mb-6">
                    Custom
                  </p>
                  <ul className="space-y-3 text-sm text-gray-600 mb-4">
                    <li>✓ Dedictated infrastructure</li>
                    <li>✓ Custom reporting</li>
                    <li>✓ Dedicated account manager</li>
                  </ul>
                  <button className="w-full text-black font-semibold bg-orange-900 py-2 border rounded-md text-xl transition-all duration-300 hover:bg-orange-800 hover:-translate-y-2 hover:shadow-lg">
                    Contact sales
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Final Cta */}
          <section className="px-6 py-20 mt-20 rounded-4xl border bg-emerald-50/70 backdrop-blur-sm text-gray-700">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">
                Start Making Smarter Business Decisions Today
              </h2>
              <p className="text-emerald-100 mb-100">
                Join modern businesses using data to drive growth, improve
                efficiency, and maximize profitability.
              </p>
              <a
                href="/dashboard"
                className="inline-block px-8 py-3 bg-cyan-600 text-black rounded-lg font-medium transition-all duration-300 hover:bg-gray-800 hover:-translate-y-2 hover:shadow-lg"
              >
                Get Started Now
              </a>
            </div>
          </section>
          {/* Footer */}

          <footer className="border-orange-500 mt-14  px-6 ">
            <div className="border-t border-gray-200"></div>
            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
              {/* BRAND */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Metricly</h3>
                <p className="text-sm text-gray-600">
                  A modearn business analytics platform designed to help you
                  turn data into confident growth decisions.
                </p>
              </div>
              {/* product links */}
              <div>
                <h4 className="font-medium mb-4"> Product</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#features" className="hover:text-black">
                      {" "}
                      Features
                    </a>
                    <a href="#pricing" className="hover:text-black">
                      {" "}
                      Pricing
                    </a>
                    <a href="/dashboard" className="hover:text-black">
                      {" "}
                      Dashboard
                    </a>
                  </li>
                </ul>
              </div>
              {/* Company Links */}
              <div>
                <h4 className="font-medium mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#" className="hover:text-black">
                      {" "}
                      About
                    </a>
                    <a href="#" className="hover:text-black">
                      {" "}
                      Careers
                    </a>
                    <a href="#" className="hover:text-black">
                      {" "}
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              {/* Legal Links */}
              <div>
                <h4 className="font-medium mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#" className="hover:text-black">
                      {" "}
                      Privacy Policy
                    </a>
                    <a href="#" className="hover:text-black">
                      {" "}
                      Terms of service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* Bottom Bar */}
            <div className="mt-10 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Metricly. All rights reserved.
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
