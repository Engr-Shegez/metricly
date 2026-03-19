import React from "react";
import Image from "next/image";

const Marquee = () => {
  const logos = [
    "/logos/stripe.svg",
    "/logos/notion.svg",
    "/logos/linear.svg",
    "/logos/vercel.svg",
    "/logos/adobe.svg",
    "/logos/loom.svg",
    "/logos/microsoft.svg",
    "/logos/Nvidia.svg",

    "/logos/shopify.svg",
  ];
  return (
    <section className="md:px-6 hidden md:flex md:py-16 ">
      <div className="max-w-6xl mx-auto text-center">
        <div className="relative overflow-hidden w-full py-4 mt-15">
          <div className="flex animate-marquee whitespace-nowrap min-w-max  gap-16 opacity-60 will-change-transform ">
            {[...logos, ...logos].map((logo, i) => (
              <Image
                key={i}
                alt="company logo"
                src={logo}
                width={80}
                height={20}
                className="h-15 w-auto opacity-100 hover:opacity-700 hover:grayscale-0 transition"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
