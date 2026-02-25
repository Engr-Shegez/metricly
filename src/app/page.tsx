import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen ">
      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block mb-6 px-4 py-2 text-sm bg-gray-700 rounded-full">
            Modern Business Analytics Platform
          </div>

          {/* Headlines */}
          <h1 className="text-5xl md:text-6xl font-bold loading-tight mb-6">
            Turn Your Business Data <br /> Into Smart Growth Decision
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
        </div>
      </section>
    </main>
  );
}
