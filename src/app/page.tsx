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
import { MarketingNavbar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="min-h-[150vh]">
      {/* NAVBAR */}
      <MarketingNavbar />

      <section className="px-5 sm:px-6 md:px-12 lg:px-16 py-10 relative overflow-hidden text-lg sm:text-xl tracking-tight bg-white dark:bg-slate-950">
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
