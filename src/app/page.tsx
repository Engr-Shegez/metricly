import FinalCta from "@/components/layout/final-cta";
import CtaSection from "@/components/layout/Cta";
import FeatureSection from "@/components/layout/Feature";
import FooterSection from "@/components/layout/Footer";
import Hero from "@/components/layout/Hero";
import Marquee from "@/components/layout/Marquee";
import PricingSection from "@/components/layout/Pricing";
import ScrollReveal from "@/components/scroll-reveal";
import StackedScrollSection from "@/components/StackedScrollSection";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-[150vh] overflow-x-hidden pt-12 sm:pt-0">
      {/* NAVBAR */}
      <nav className="w-full border-b bg-white/60 dark:bg-slate-900/60 backdrop-blur-md fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 py-2 border-gray-200 dark:border-slate-700 sm:sticky">
        <div className="max-w-6xl mx-auto px-2 sm:px-6 py-2 sm:py-4 flex items-center justify-between">
          {/* LOGO */}
          <div className="text-lg mt-2 text-gray-900 dark:text-white font-semibold">
            Ὡ Metricly
          </div>

          {/* LINKS */}
          <div className="hidden md:flex items-center gap-8 text-lg text-gray-900 dark:text-gray-200">
            <a href="#" className="hover:text-black dark:hover:text-white">
              Home
            </a>
            <a
              href="#features"
              className="hover:text-black dark:hover:text-white"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="hover:text-black dark:hover:text-white"
            >
              Pricing
            </a>
            <a
              href="/dashboard"
              className="hover:text-black dark:hover:text-white"
            >
              Dashboard
            </a>
            <a href="#about" className="hover:text-black dark:hover:text-white">
              About
            </a>
          </div>
          {/* right action */}
          <div className="flex items-center mt-4 justify-end gap-3  sm:gap-4 flex-wrap sm:flex-nowrap">
            <div className="flex md:flex">
              <ThemeToggle />
            </div>
            <button className="text-sm sm:text-lg  text-gray-900 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-300">
              Login
            </button>
            <a
              href="/register"
              className="px-3 sm:px-4 py-2 bg-black text-white rounded-md text-sm sm:text-base"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      <section className="px-4 sm:px-6 md:px-12 lg:px-16 py-25 relative overflow-hidden text-lg sm:text-xl tracking-tight bg-white dark:bg-slate-950">
        {/* hero wrapper */}
        <div className="max-w-6xl mx-auto text-center fade-up relative z-10 space-y-6 sm:space-y-0">
          {/* Hero */}
          <div className="relative overflow-hidden">
            <Hero />
          </div>
          {/* Marquee */}
          <div className="mb-32 sm:mb-70">
            <Marquee />
          </div>
          {/* Features Section */}

          <StackedScrollSection>
            <ScrollReveal direction="left">
              <FeatureSection />
            </ScrollReveal>
          </StackedScrollSection>

          {/* Pricing section */}
          <StackedScrollSection>
            <ScrollReveal direction="right">
              <PricingSection />
            </ScrollReveal>
          </StackedScrollSection>
          {/* Final Cta */}

          <StackedScrollSection>
            <ScrollReveal direction="right">
              <CtaSection />
            </ScrollReveal>
          </StackedScrollSection>

          <StackedScrollSection>
            <ScrollReveal direction="right">
              <section className="py-24 sm:py-32 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                  <FinalCta />
                </div>
              </section>
            </ScrollReveal>
          </StackedScrollSection>

          {/* Footer */}
          <FooterSection />
        </div>
      </section>
    </main>
  );
}
