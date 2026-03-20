import React from "react";

const ChartsVisual = () => {
  // Static sample series for the marketing page.
  // Replace this with real data later if/when the backend provides it.
  const series = [18, 21, 19, 26, 24, 29, 31, 28, 34, 36, 33, 41];

  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = Math.max(1, max - min);

  // SVG coordinates (viewBox: 0..100 x 0..60)
  const leftPad = 6;
  const rightPad = 4;
  const topPad = 6;
  const bottomPad = 8;
  const chartW = 100 - leftPad - rightPad;
  const chartH = 60 - topPad - bottomPad;

  const points = series.map((v, i) => {
    const x = leftPad + (i * chartW) / (series.length - 1);
    const t = (v - min) / range; // 0..1
    const y = topPad + chartH * (1 - t);
    return { x, y, v };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(
    2
  )} ${(topPad + chartH).toFixed(2)} L ${points[0].x.toFixed(2)} ${(
    topPad + chartH
  ).toFixed(2)} Z`;

  const trendPct = ((series[series.length - 1] - series[0]) / series[0]) * 100;
  const best = Math.max(...series);
  const bestIndex = series.indexOf(best);
  const bestLabel = `W${bestIndex + 1}`;

  return (
    <div className="relative">
      {/* glow */}
      <div className="absolute -inset-10 bg-orange-500/20 blur-3xl rounded-full" />
      {/* card */}
      <div className="relative bg-zinc-900/80 border border-white/10 rounded-xl p-8 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-white font-medium">Live trend analytics</p>
            <p className="mt-1 text-sm text-white/70">
              12-week growth • updated in real-time
            </p>
          </div>

          <div className="text-right">
            <p className="text-white font-semibold">
              {Math.round(series[series.length - 1])}k
            </p>
            <p className="text-sm text-emerald-400">
              +{trendPct.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* chart */}
        <div className="mt-6">
          <svg
            viewBox="0 0 100 60"
            className="w-full h-44 sm:h-48 md:h-56"
            role="img"
            aria-label="Weekly revenue trend"
          >
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="trendLine" x1="0" y1="0" x2="100" y2="0">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* grid */}
            {[0, 0.25, 0.5, 0.75, 1].map((t) => {
              const y = topPad + chartH * t;
              return (
                <line
                  key={t}
                  x1={leftPad}
                  x2={leftPad + chartW}
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="0.5"
                />
              );
            })}

            {/* area + line */}
            <path d={areaPath} fill="url(#trendFill)" />
            <path
              d={linePath}
              fill="none"
              stroke="url(#trendLine)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* last point emphasis */}
            <circle
              cx={points[points.length - 1].x}
              cy={points[points.length - 1].y}
              r="2.2"
              fill="#34d399"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="0.6"
            />
          </svg>

          {/* x labels (lightweight, mobile friendly) */}
          <div className="flex justify-between text-xs text-white/50 -mt-2 px-1">
            <span>W1</span>
            <span>W6</span>
            <span>W12</span>
          </div>
        </div>

        {/* details */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/60">Best week</p>
            <p className="text-sm text-white font-semibold">{bestLabel}</p>
            <p className="text-xs text-emerald-400 mt-1">
              {best}k transactions
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/60">Average</p>
            <p className="text-sm text-white font-semibold">
              {Math.round(series.reduce((a, b) => a + b, 0) / series.length)}k
            </p>
            <p className="text-xs text-white/60 mt-1">steady improvement</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/60">Momentum</p>
            <p className="text-sm text-white font-semibold">
              {trendPct >= 0 ? "Uptrend" : "Downtrend"}
            </p>
            <p className="text-xs text-white/60 mt-1">
              based on the first vs last week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsVisual;
