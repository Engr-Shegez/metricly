import CtaSection from "@/components/layout/Cta";
import FeatureSection from "@/components/layout/Feature";
import FooterSection from "@/components/layout/Footer";
import Hero from "@/components/layout/Hero";
import Marquee from "@/components/layout/Marquee";
import PricingSection from "@/components/layout/Pricing";
import ScrollReveal from "@/components/scroll-reveal";
import ScrollSection from "@/components/scroll-section";
import StackedScrollSection from "@/components/StackedScrollSection";
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
            <a href="/dashboard" className="hover:text-black">
              Dashboard
            </a>
          </div>
          {/* right action */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
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
        {/* hero wrapper */}
        <div className="max-w-6xl mx-auto text-center fade-up relative z-10 space-y-0">
          {/* Hero */}

          <Hero />

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

          {/* Footer */}

          <FooterSection />
        </div>
      </section>
    </main>
  );
}
