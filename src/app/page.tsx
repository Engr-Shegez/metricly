import FinalCta from "@/components/layout/final-cta";
import CtaSection from "@/components/layout/Cta";
import FeatureSection from "@/components/layout/Feature";
import FooterSection from "@/components/layout/Footer";
import Hero from "@/components/layout/Hero";
import Marquee from "@/components/layout/Marquee";
import PricingSection from "@/components/layout/Pricing";
import ScrollReveal from "@/components/scroll-reveal";
import { MarketingNavbar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white dark:bg-slate-950">
      <MarketingNavbar />

      <div className="pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24">
        <section className="px-5 sm:px-6 md:px-12 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <Hero />
            </ScrollReveal>
          </div>
        </section>

        <section className="mt-12 px-5 sm:mt-16 sm:px-6 md:px-12 lg:mt-20 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <Marquee />
          </div>
        </section>

        <section className="mt-16 sm:mt-20 lg:mt-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal direction="left">
              <FeatureSection />
            </ScrollReveal>
          </div>
        </section>

        <section className="mt-16 sm:mt-20 lg:mt-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal direction="right">
              <PricingSection />
            </ScrollReveal>
          </div>
        </section>

        <section className="mt-16 px-4 sm:mt-20 sm:px-6 lg:mt-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal direction="right">
              <CtaSection />
            </ScrollReveal>
          </div>
        </section>

        <section className="mt-16 px-4 sm:mt-20 sm:px-6 lg:mt-24">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal direction="right">
              <FinalCta />
            </ScrollReveal>
          </div>
        </section>

        <section className="mt-16 px-4 sm:mt-20 sm:px-6 lg:mt-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <FooterSection />
          </div>
        </section>
      </div>
    </main>
  );
}
