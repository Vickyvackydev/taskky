"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/Button";
import { FaInfo, FaKey, FaUser, FaUserNinja } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="flex justify-around items-center mb-9 ">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 2 }}
        className="lg:flex hidden font-medium mt-8 flex-col items-start"
      >
        <span className="text-green-400 text-6xl">Contact us 📞 </span>
        <span className="ml-2">Kindly send us a message.</span>
      </motion.div>
      <motion.main
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 2 }}
        className="flex justify-center items-center bg-backgrd w-fit h-full rounded-xl  px-5 pb-10"
      >
        <div className="mt-7">
          <span className="text-3xl flex justify-center font-medium text-green-400">
            Contact us
          </span>
          <p className="text-center mt-3 text-gray-500">
            Kindly fill in the details.
          </p>

          <div className="flex flex-col gap-4 mt-7 relative">
            <label htmlFor="" className="text-gray-500">
              Username
            </label>
            <div className="flex items-center lg:w-[25rem] w-full rounded-xl shadow-sm h-12 outline-none pl-3 bg-white">
              <span className="text-gray-400">
                <FaUserNinja />
              </span>
              <input type="text" className="outline-none ml-3  pl-3" />
            </div>
            <label htmlFor="" className="text-gray-500">
              Email
            </label>
            <div className="flex items-center lg:w-[25rem] w-full rounded-xl shadow-sm h-12 outline-none pl-3 bg-white">
              <span className="text-gray-400">
                <FaUser />
              </span>
              <input type="email" className="outline-none ml-3 pl-3 w-full" />
            </div>
            <label htmlFor="password" className="text-gray-500">
              Message
            </label>

            {/* <input className="ml-3 border-l outline-none pl-3" /> */}
            <textarea
              name=""
              id=""
              cols={5}
              rows={10}
              placeholder="your message..."
              className="outline-none rounded-lg placeholder:italic p-3 shadow-md"
            />

            <Button
              text="Send message"
              loadingText="sending"
              loadingTextColor="text-white"
              loaderColor="#fff"
              textStyles="text-white"
              btnStyles="bg-green-500 w-full flex justify-center py-3 rounded-lg"
              //   handleClick={handleLogin}
              //   loading={loading}
            />
          </div>
        </div>
      </motion.main>
    </section>
  );
};

export default ContactUs;
