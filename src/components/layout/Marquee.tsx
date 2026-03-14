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
    <section className="px-6 py-16 mt-10 mb-40">
      <div className="max-w-6xl mx-auto text-center">
        {/* <p className="text-md  mt-20 tracking-wide font-bold uppercase">
          Trusted by innovative teams Worldwide
        </p> */}

        <div className="relative overflow-hidden w-full py-4 mt-15">
          {/* <div className="absolute left-0 top-0 h-full w-20 bg-linear-to-r from-background to-transparent z-10" /> */}
          {/* <div className="absolute right-0 top-0 h-full w-20 bg-linear-to-l from-background to-transparent z-10" /> */}
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
