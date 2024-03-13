"use client";
import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";

const Hero = () => {
  const router = useRouter();
  return (
    <main className="flex flex-col justify-center items-center mt-10 gap-10 ">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="text-center flex flex-col gap-5 w-full"
      >
        <ReactTyped
          strings={[
            "Welcome to Task.",
            "Manage All Your Tasks.",
            "Fast And Secure.",
            "Easy to Use.",
          ]}
          typeSpeed={40}
          backSpeed={50}
          className="lg:text-7xl text-2xl font-semibold text-text_black"
          loop
        />

        <div className="justify-center items-center flex">
          <p className="max-w-xl lg:ml-10 ml-0 lg:px-0 px-3">
            Welcome to
            <span className="text-green-500 font-semibold"> {"taskky"} </span>
            here you'll manage all your task, save your tasks, edit your undone
            task and even delete them, lots of existing features here on our
            website. Explore the new generated of maintaining your task
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="flex gap-10 "
      >
        <Button
          text="Get started"
          textStyles="text-white"
          btnStyles="bg-green-500 px-3 py-2 rounded-lg shadow-md"
          handleClick={() => router.push("/signup")}
        />
        <Button
          text="Learn more"
          textStyles="text-green-500"
          btnStyles="bg-white px-3 py-2 rounded-lg shadow-md"
        />
      </motion.div>
    </main>
  );
};

export default Hero;
