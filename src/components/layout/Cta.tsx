"use client";

import { motion } from "framer-motion";
import CtaCard from "../cta-card";
import { Variants } from "framer-motion";
import ScrollReveal from "../scroll-reveal";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const CtaSection = () => {
  return (
    <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 mt-6 sm:mt-10">
      {/* HEADER */}

      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Insights & Inspiration</h2>
          <p className="text-gray-400 text-2xl max-w-2xl mx-auto">
            Dive into the heart of innovation with our Coding Chronicles blog
            section. Explore a rich tapestry of articles, tutorials and insights
            that unravel
          </p>
        </div>
      </ScrollReveal>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-15"
      >
        <ScrollReveal direction="left">
          <motion.div variants={cardVariants}>
            <CtaCard
              image="/images/productdesign.png"
              title="Product design"
              description="Design beautiful, intuitive product interfaces that combine clarity, functionality, and modern aesthetics. We focus on user-centered design principles, seamless interactions, and responsive layouts to deliver engaging digital experiences that enhance usability, strengthen brand identity, and improve overall customer satisfaction."
            />
          </motion.div>
        </ScrollReveal>

        <motion.div variants={cardVariants}>
          <CtaCard
            image="/images/webdesign.png"
            title="Web Design"
            description="Design and develop powerful, responsive websites that deliver seamless experiences across all devices and screen sizes. Our approach combines modern design principles with robust development practices to create fast, secure, and scalable digital platforms."
          />
        </motion.div>

        <ScrollReveal direction="right">
          <motion.div variants={cardVariants}>
            <CtaCard
              image="/images/analytics.png"
              title="Analytics"
              description="Monitor your product performance with real-time analytics, actionable insights, and clear reporting tools. Understand user behavior, measure growth metrics, and make data-driven decisions that drive continuous improvement and business success."
            />
          </motion.div>
        </ScrollReveal>
      </motion.div>
    </section>
  );
};

export default CtaSection;
