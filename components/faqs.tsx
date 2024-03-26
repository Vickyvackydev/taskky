"use client";
import { faqs } from "@/constants";
import Image from "next/image";
import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { FaMinus, FaPlus } from "react-icons/fa";
import ScrollBtn from "./ScrollBtn";
import { motion } from "framer-motion";

const faQs = () => {
  return (
    <main className=" lg:px-20 px-10 my-10 relative" id="faq">
      <div className="flex flex-col">
        <span className="text-center lg:text-4xl text-2xl font-semibold text-text_black">
          Frequently Asked Questions.
        </span>
        <div className="flex lg:flex-row flex-col justify-around lg:mt-10 mt-0 items-center overflow-hidden">
          <div className="w-full lg:px-4 px-0 pt-16">
            <span className="ml-3 lg:text-xl text-lg font-medium text-green-300 flex lg:justify-start justify-center">
              Questions you may want to ask
            </span>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 1 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 2 }}
              className="max-w-full lg:max-w-2xl rounded-2xl bg-white p-2 flex flex-col gap-5"
            >
              {faqs.map((faq) => (
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded-lg bg-backgrd px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-green-100 focus:outline-none ">
                        <span>{faq.question}</span>
                        {open ? (
                          <FaMinus className={`text-sm text-purple-900 `} />
                        ) : (
                          <FaPlus className={`text-sm text-purple-900 `} />
                        )}
                      </Disclosure.Button>
                      <Transition
                        show={open}
                        enter="transition duration-300 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-100 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel
                          static
                          className="px-4 pb-2 pt-4 text-sm text-gray-500"
                        >
                          {faq.answer}
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              ))}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 1 }}
            whileInView={{ opacity: 1, x: -100 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 2 }}
          >
            <Image src="/faq.png" width={700} height={700} alt="image" />
          </motion.div>
        </div>
      </div>
      <ScrollBtn />
    </main>
  );
};
export default faQs;
