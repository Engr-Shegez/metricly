import React from "react";
import CTAContent from "../CTAContent";
import DashboardPreview from "../DashboardPreview";

const FinalCta = () => {
  return (
    <div className="relative rounded-2xl border border-orange-500/20 overflow-hidden mt-30">
      <div className="absolute inset-0 bg-orange-500/10 blur-3xl" />
      {/* glow background */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center p-6 sm:p-8 md:p-16 text-center md:text-left">
        {/* left side */}
        <CTAContent />

        {/* right side */}
        <DashboardPreview />
      </div>
    </div>
  );
};

export default FinalCta;
