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
      <nav className="w-full border-b bg-white/60 backdrop-blur-md fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 py-2 border-gray-200 sm:sticky">
        <div className="max-w-6xl mx-auto px-2 sm:px-6 py-2 sm:py-4 flex items-center justify-between">
          {/* LOGO */}
          <div className="text-lg  text-gray-900 font-semibold">Ὡ Metricly</div>

          {/* LINKS */}
          <div className="hidden md:flex items-center gap-8 text-lg text-gray-900">
            <a href="#" className="hover:text-black">
              Home
            </a>
            <a href="#features" className="hover:text-black">
              Features
            </a>
            <a href="#pricing" className="hover:text-black">
              Pricing
            </a>
            <a href="/dashboard" className="hover:text-black">
              Dashboard
            </a>
            <a href="#about" className="hover:text-black">
              About
            </a>
          </div>
          {/* right action */}
          <div className="flex items-center justify-end gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
            <ThemeToggle />
            <button className="text-sm sm:text-lg text-gray-900 hover:text-gray-700">
              Login
            </button>
            <a
              href="/dashboard"
              className="px-3 sm:px-4 py-2 bg-black text-white rounded-md text-sm sm:text-base"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      <section className="px-4 sm:px-6 md:px-12 lg:px-16 py-32 relative overflow-hidden text-lg sm:text-xl tracking-tight">
        {/* hero wrapper */}
        <div className="max-w-6xl mx-auto text-center fade-up relative z-10 space-y-4 sm:space-y-0">
          {/* Hero */}
          <div className="relative overflow-hidden">
            <Hero />
          </div>
          {/* Marquee */}
          <Marquee />
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

          <section className="py-24 sm:py-32 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <FinalCta />
            </div>
          </section>

          {/* Footer */}

          <FooterSection />
        </div>
      </section>
    </main>
  );
}
