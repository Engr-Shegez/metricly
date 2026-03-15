import React from "react";

const ChartsVisual = () => {
  return (
    <div className="relative">
      {/* glow */}
      <div className="absolute -inset-10 bg-orange-500/20 blur-3xl rounded-full" />
      {/* card */}
      <div className="relative bg-zinc-900/80 border border-white/10 rounded-xl p-8 shadow-2xl">
        <div className="bg-orange-500 rounded-lg p-6 shadow-lg">
          <p className="text-white font-medium">Charts always ON</p>
          <div className="mt-4 h-16 bg-white/20 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default ChartsVisual;
