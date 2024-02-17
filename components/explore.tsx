import { whyChooseUs } from "@/constants";
import Image from "next/image";
import React from "react";

const Explore = () => {
  return (
    <main className="lg:px-24 px-10" id="services">
      <div className="flex flex-col gap-10">
        <span className="text-center lg:text-5xl text-3xl font-semibold">
          Why Choose Us.
        </span>
        <div className="flex gap-10 lg:flex-row flex-col">
          {whyChooseUs.map((item) => {
            return (
              <div className="flex flex-col justify-center items-center gap-8 border rounded-lg p-5 max-h-full">
                <div>
                  <Image src={item.icon} width={50} height={50} alt="image" />
                </div>
                <span className="text-2xl text-gray-500 font-semibold">
                  {item.title}
                </span>
                <p className="text-center">{item.details}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Explore;
