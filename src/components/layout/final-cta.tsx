import React from "react";
import CTAContent from "../CTAContent";
import DashboardPreview from "../DashboardPreview";

const FinalCta = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-orange-500/20">
      <div className="absolute inset-0 bg-orange-500/10 blur-3xl" />
      <div className="relative grid grid-cols-1 items-center gap-6 p-6 text-center sm:gap-8 sm:p-8 md:grid-cols-2 md:gap-12 md:p-16 md:text-left">
        <CTAContent />
        <DashboardPreview />
      </div>
    </div>
  );
};

export default FinalCta;
