"use client";
import React from "react";
import Button from "./Button";

import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <main className="flex flex-col justify-center items-center mt-10 gap-10">
      <div className="text-center flex flex-col gap-5">
        <span className="lg:text-7xl text-4xl font-semibold">
          Manage Your Tasks.
        </span>
        <p className="max-w-xl lg:ml-10 ml-0 lg:px-0 px-3">
          Welcome to{" "}
          <span className="text-green-500 font-semibold">taskky</span> here
          you'll manage all your task, save your tasks, edit your undone task
          and even delete them, lots of existing feateres are here in our
          website. Explore the new generated of maintaining your task
        </p>
      </div>
      <div className="flex gap-10">
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
      </div>
    </main>
  );
};

export default Hero;
