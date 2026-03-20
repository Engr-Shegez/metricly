import React from "react";

const CTAContent = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold leading-tight">
        Transform Your Work with Metricly
      </h2>

      <p className="text-muted-foreground mt-4 max-w-md">
        Emback on a transformative journey of coding excellence with Metricly
      </p>

      {/* email form */}
      <div className="flex mt-8 gap-3 justify-center sm:justify-start">
        <input
          placeholder="Enter email here"
          className="bg-zinc-9000 border border-white/10 px-4 py-3 rounded-md flex-1"
        />

        <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-md font-medium">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default CTAContent;
