"use client";
import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  bullets: string[];
  visual: ReactNode;
  reverse?: boolean;
};

const FeatureRow = ({
  title,
  description,
  bullets,
  visual,
  reverse = false,
}: Props) => {
  return (
    <div
      className={`grid md:grid-cols-2 gap-20 items-center py-24 ${reverse ? "md:flex-row-reverse" : ""}`}
    >
      {/* TEXT */}
      <div>
        <h3 className="text-3xl font-semibold leading-tight">{title}</h3>
        <p className="text-muted-foreground mt-6 max-w-md">{description}</p>
        <ul className="mt-8 space-y-3">
          {bullets.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="bg-orange-500 w-5 h-5 rounded flex items-center justify-center text-white text-xs">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      {/* Visual */}
      <div>{visual}</div>
    </div>
  );
};

export default FeatureRow;
