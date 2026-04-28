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
      className={`grid items-center gap-10 py-12 md:grid-cols-2 md:gap-16 md:py-20 ${reverse ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""}`}
    >
      <div className="min-w-0">
        <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">
          {title}
        </h3>
        <p className="mt-6 max-w-md text-muted-foreground">{description}</p>
        <ul className="mt-8 space-y-3">
          {bullets.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-orange-500 text-xs text-white">
                +
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="min-w-0">{visual}</div>
    </div>
  );
};

export default FeatureRow;
