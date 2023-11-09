import { whyChooseUs } from "@/constants";
import Image from "next/image";
import React from "react";

const Explore = () => {
  return (
    <main className="px-24">
      <div className="flex flex-col gap-10">
        <span className="text-center text-5xl font-semibold">
          Why Choose Us.
        </span>
        <div className="flex gap-10 ">
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
