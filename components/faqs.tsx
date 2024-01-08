"use client";
import { faqs } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import { FaArrowDown, FaArrowUp, FaPlus } from "react-icons/fa";
// import "./navbar.css";

const faQs = () => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const handleSelected = (index: number) => {
    setSelectedFaq(index);
  };
  return (
    <main className="lg:px-20 px-10 my-10">
      <div className="flex flex-col">
        <span className="text-center text-4xl font-semibold">
          Frequently Asked Questions.
        </span>
        <div className="flex lg:flex-row flex-col justify-around mt-14 items-center ">
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
                  <div className="flex justify-between overflow-hidden lg:min-w-[800px] min-w-[300px]">
                    <span className="text-lg">{item.question}</span>
                    {selectedFaq === index ? (
                      <span onClick={() => setSelectedFaq(null)}>
                        <FaPlus />
                      </span>
                    ) : (
                      <span onClick={() => handleSelected(index)}>
                        <FaPlus />
                      </span>
                    )}
                  </div>
                  {selectedFaq === index && <span>{item.answer}</span>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <Image src="/faq.png" width={500} height={500} alt="image" />
          </div>
        </div>
      </div>
    </main>
  );
};
export default faQs;
