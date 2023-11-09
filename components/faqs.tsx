"use client";
import { faqs } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
// import "./navbar.css";

const faQs = () => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const handleSelected = (index: number) => {
    setSelectedFaq(index);
  };
  return (
    <main className="px-20 my-10">
      <div className="flex flex-col">
        <span className="text-center text-4xl font-semibold">
          Frequently Asked Questions.
        </span>
        <div className="flex justify-around mt-14 items-center ">
          <div>
            <span>Here are some questions you may want to ask.</span>
            <div className="flex flex-col gap-5 mt-5 max-w-[700px]">
              {faqs.map((item, index) => (
                <div className="border-b-2">
                  <div className="flex justify-between overflow-hidden">
                    <span>{item.question}</span>
                    {selectedFaq === index ? (
                      <span onClick={() => setSelectedFaq(null)}>
                        {/* {selectedFaq === index ? <FaArrowDown /> : <FaArrowUp />}
                         */}

                        <FaArrowUp />
                      </span>
                    ) : (
                      <span onClick={() => handleSelected(index)}>
                        <FaArrowDown />
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
