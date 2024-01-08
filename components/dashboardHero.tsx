import { boxesDetails } from "@/constants";
import Image from "next/image";

import React from "react";
import { FaInfo } from "react-icons/fa";

import Taskpage from "./Taskpage";

const DashboardHero = () => {
  const bgcolors = (id: number) => {
    if (id === 1) {
      return "bg-orange-500 shadow-lg shadow-orange-400";
    } else if (id === 2) {
      return "bg-blue-500 shadow-lg shadow-blue-300";
    } else if (id === 3) {
      return "bg-green-500 shadow-lg shadow-green-500";
    }
  };
  const iconBg = (id: number) => {
    if (id === 1) {
      return "bg-orange-500 ";
    } else if (id === 2) {
      return "bg-blue-500 ";
    } else if (id === 3) {
      return "bg-green-500 ";
    }
  };
  return (
    <div className="flex justify-between lg:pl-2 pl-9 lg:pr-6 pr-0 lg:pt-6 pt-0 lg:flex-row flex-col items-center">
      <div>
        <div className="flex gap-5 lg:flex-row flex-col">
          {boxesDetails.map((item) => (
            <div
              className={`${bgcolors(
                item.id
              )} flex flex-col justify-between lg:w-[280px] w-[300px] h-[200px] rounded-xl bg-opacity-50 pt-7 px-5`}
              key={item.id}
            >
              <div className="flex justify-between items-center">
                <div
                  className={`flex justify-center items-center w-12 h-12 rounded-full ${iconBg(
                    item.id
                  )} shadow-sm`}
                >
                  <Image src={item.icon} width={20} height={20} alt="image" />
                </div>
                <span className="text-xl text-white">{item.title}</span>
                <span>
                  <FaInfo />
                </span>
              </div>
              <div className="flex-1 mt-16 flex gap-4 items-center">
                <span className="text-3xl text-white">{item.num}</span>
                <span>{item.when}</span>
              </div>
            </div>
          ))}
        </div>
        <Taskpage />
      </div>

      {/* <RightHero /> */}
    </div>
  );
};

export default DashboardHero;
