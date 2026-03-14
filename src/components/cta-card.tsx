"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

type Props = {
  image: string;
  title: string;
  description: string;
};

const CtaCard = ({ image, title, description }: Props) => {
  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg hover:shadow-2xl transition-shadow  duration-500 hover:-translate-y-2"
      variants={{
        initial: { y: 0 },
        hover: { y: -6 },
      }}
      transition={{ duration: 0.3 }}
    >
      {/* IMAGE */}
      <Image
        src={image}
        alt={title}
        width={500}
        height={500}
        className="w-full h-170 object-cover border transition-transform duration-700 group-hover:scale-110 rounded-xl"
      />
      {/* {TOPRIGHT ICON} */}
      <motion.div
        variants={{
          initial: { rotate: 0 },
          hover: { rotate: 45 },
        }}
        className="absolute top-4 right-4 bg-black/50 backdrop-blur rounded-md p-2"
      >
        <ArrowUpRight className="w-4 h-4 text-white" />
      </motion.div>

      <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-60" />

      {/* Hover panel */}
      <motion.div
        variants={{
          initial: { y: 120, opacity: 0 },
          hover: { y: 0, opacity: 1 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 p-6 bg-black/70 backdrop-blur-md"
      >
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-300 mt-2"> {description}</p>
      </motion.div>
    </motion.div>
  );
};

export default CtaCard;
