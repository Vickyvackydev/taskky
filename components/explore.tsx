"use client";

import { whyChooseUs } from "@/constants";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const Explore = () => {
  return (
    <main className="lg:px-24 px-10" id="services">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 2 }}
        className="flex flex-col gap-10"
      >
        <span className="text-center lg:text-5xl text-3xl font-semibold text-text_black ">
          Why Choose Us.
        </span>
        <div className="flex gap-10 lg:flex-row flex-col">
          {whyChooseUs.map((item) => {
            return (
              <div className="flex flex-col justify-center items-center gap-8  rounded-lg p-5 max-h-full w-full bg-backgrd hover:-translate-y-10 transition-all duration-500 shadow-md">
                <div>
                  <Image src={item.icon} width={50} height={50} alt="image" />
                </div>
                <span className="text-2xl text-gray-500 font-semibold">
                  {item.title}
                </span>
                <p className="text-center text-text_black font-medium">
                  {item.details}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </main>
  );
};

export default Explore;
