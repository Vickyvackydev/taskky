"use client";
import { faqs } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import {
  FaArrowDown,
  FaArrowUp,
  FaMinus,
  FaMinusCircle,
  FaPlus,
  FaPlusCircle,
} from "react-icons/fa";
import ScrollBtn from "./ScrollBtn";
// import "./navbar.css";

const faQs = () => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const handleSelected = (index: number) => {
    setSelectedFaq(index);
  };
  return (
    <main className="lg:px-20 px-10 my-10" id="faq">
      <div className="flex flex-col">
        <span className="text-center lg:text-4xl text-2xl font-semibold">
          Frequently Asked Questions.
        </span>
        <div className="flex lg:flex-row flex-col justify-around mt-14 items-center">
          <div>
            <span className="text-xl">
              Here are some questions you may want to ask.
            </span>
            <div className="flex flex-col gap-5 mt-5">
              {faqs.map((item, index) => (
                <div
                  className={`border-b-2 ${
                    selectedFaq === index
                      ? "h-auto transition-all duration-500"
                      : "h-[30px]"
                  }  overflow-hidden`}
                >
                  <div className="flex justify-between overflow-hidden  lg:min-w-[750px] min-w-[300px]">
                    <span className="text-lg">{item.question}</span>
                    {selectedFaq === index ? (
                      <span onClick={() => setSelectedFaq(null)}>
                        <FaMinusCircle />
                      </span>
                    ) : (
                      <span
                        onClick={() => handleSelected(index)}
                        className="text-green-400"
                      >
                        <FaPlusCircle />
                      </span>
                    )}
                  </div>
                  {selectedFaq === index && (
                    <div className="max-w-[750px]">
                      <span>{item.answer}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <Image src="/faq.png" width={500} height={500} alt="image" />
          </div>
        </div>
      </div>
      <ScrollBtn />
    </main>
  );
};
export default faQs;
