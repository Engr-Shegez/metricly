import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen ">
      {/* NAVBAR */}
      <nav className=" w-full border-b bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* LOGO */}
          <div className="text-lg  text-gray-900 font-semibold">Metricly</div>

          {/* LINKS */}
          <div className="hidden md:flex items-center gap-8 text-lg text-gray-900">
            <a href="#features" className="hover:text-black">
              Features
            </a>
            <a href="#Pricing" className="hover:text-black">
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
      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block mb-6 px-4 py-2 text-sm bg-gray-700 rounded-full">
            Modern Business Analytics Platform
          </div>

          {/* Headlines */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Turn Your Business Data{" "}
            <span className="bg-linear-to-r from-emerald-500 to-red-600 bg-clip-text text-transparent">
              {" "}
              Into Smart Growth Decision
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Track revenue,monitor transactions, and gain actionable insights
            with a powerful analytics dashboard built for modern business
          </p>

          {/* CTA BUTTONS */}
          <div className="flex justify-center gap-4">
            <a
              href="/dashboard"
              className="px-6 py-3 bg-black text-white rounded-lg text-sm font-medium"
            >
              Get Started
            </a>
            <button className="px-6 py-3 border rounded-lg text-sm font-medium">
              View Demo
            </button>
          </div>

          {/* PRODUCT PREVIEW */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500/20 to-red-500/20 blur-3xl -z-10" />

            <div className="rounded-2xl overflow-hidden border shadow-2xl">
              <iframe src="/dashboard" className="w-full h-120 bg-white" />
            </div>
          </div>

          {/* Features Section */}
          <section id="features" className="px-6 py-28 border-orange-500">
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
              <div className="grid md:grid-cols-3 border rounded-xl gap-9">
                {/* Feature 1*/}
                <div className="bg-amber-400 p-8 rounded-xl border shadow-sm">
                  <h3 className="text-lg text-blue-950 font-semibold mb-3">
                    Real-Time Insights
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Monitor revenue, transactions, and KPIs instantly with live
                    data visualization and intelligent summaries.
                  </p>
                </div>

                {/* FEATURE 2 */}
                <div className="bg-blue-400 p-8 rounded-xl border shadow-md">
                  <h3 className="text-lg text-black font-semibold mb-3">
                    Advance Filtering
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Slice and analyse data by category, status, or timeframe to
                    uncover patterns that drive growth.
                  </p>
                </div>

                {/* FEATURE 3 */}
                <div className="bg-emerald-600 p-8 rounded-xl border shadow-md">
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
          <section id="pricing" className="px-6 py-24 border-orange-500">
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

              {/* PRiicing Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {/* STARTER PLAN */}
                <div className="border rounded-xl p-8">
                  <h3 className="text-xl text-gray-500 font-semibold mb-2">
                    Starter
                  </h3>
                  <p className="text-3xl text-black  font-bold mb-6">
                    $19<span className="text-sm text-gray-700">/month</span>
                  </p>
                  <ul className="space-y-3 text-sm text-gray-600 mb-3">
                    <li>✓ Basic analytics dashboard</li>
                    <li>✓ Up to 1,000 transactions</li>
                    <li>✓ Email support</li>
                  </ul>
                  <button className="w-full text-black font-semibold bg-emerald-600 py-2 border rounded-md text-xl">
                    Get Started
                  </button>
                </div>

                {/* pro plan (highlighted) */}
                <div className="border-2 border-emerald-500 rounded-xl p-8 shadow-lg relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-gray-500 text-sm px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                  <h3 className="text-lg text-black font-bold mb-6">Pro</h3>
                  <p className="text-3xl text-black font-bold mb-6">
                    $49<span className="text-sm text-gray-700">/month</span>
                  </p>
                  <ul className="space-y-3 text-sm text-gray-600 mb-8">
                    <li>✓ Advanced analytics</li>
                    <li>✓ Unlimited transactions</li>
                    <li>✓ Priority support</li>
                  </ul>
                  <button className="w-full text-black font-semibold bg-emerald-600 py-2 border rounded-md text-xl">
                    Get Started
                  </button>
                </div>

                {/* ENTERPRIZE */}
                <div className="border rounded-xl p-8">
                  <h3 className="text-lg text-gray-500 font-bold mb-6">
                    Enterprise
                  </h3>
                  <p className="text-3xl text-black font-bold mb-6">Custom</p>
                  <ul className="space-y-3 text-sm text-gray-600 mb-4">
                    <li>✓ Dedictated infrastructure</li>
                    <li>✓ Custom reporting</li>
                    <li>✓ Dedicated account manager</li>
                  </ul>
                  <button className="w-full text-black font-semibold bg-orange-900 py-2 border rounded-md text-xl">
                    Contact sales
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
