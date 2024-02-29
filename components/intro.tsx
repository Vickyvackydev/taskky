"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const Intro = () => {
  return (
    <main
      className="flex lg:flex-row flex-col justify-evenly lg:px-24 px-10 my-24 lg:gap-0 gap-5"
      id="about"
    >
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1 }}
        className="lg:w-[500px] lg:h-[500px] w-auto h-full justify-center items-start flex flex-col shadow-sm  rounded-xl px-5 py-6 bg-backgrd hover:scale-105 transition-all duration-200"
      >
        <span className="text-3xl text-green-500 font-semibold">
          What We Do
        </span>

        <p>
          In today's fast-paced digital world, staying organized and productive
          is paramount for individuals and businesses alike. Task management
          systems have emerged as indispensable tools, particularly in the realm
          of web applications, offering streamlined solutions to manage tasks
          effectively. These systems provide users with a plethora of features
          designed to enhance efficiency, collaboration, and organization. One
          of the primary functions of a task management system is to centralize
          all tasks in one location. Users can create, view, prioritize, and
          update tasks conveniently from within the web application. This
          centralized approach eliminates the need for scattered lists or
          multiple tools, ensuring that all tasks are easily accessible and
          manageable.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1 }}
      >
        <Image src="/ui_1.jpg" width={500} height={500} alt="image" />
      </motion.div>
    </main>
  );
};

export default Intro;
