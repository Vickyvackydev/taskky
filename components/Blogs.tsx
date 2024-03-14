"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const blogPosts = ["/ui_1.jpg", "/ui_2.png", "/ui_3.png", "/taskky.png"];

// Blogs Component
const Blogs = () => {
  return (
    <main className="lg:px-24 px-10 my-10" id="blogs">
      <div className="flex flex-col">
        <span className="text-center lg:text-5xl text-3xl font-semibold text-text_black">
          Our Blog
        </span>
        <p className="text-center">
          Exciting <span className="text-green-500 text-lg">Updates</span>{" "}
          Everyday
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 2 }}
          className="flex justify-around mt-20"
        >
          <div>
            <Image
              src="/phone.png"
              width={500}
              height={500}
              alt="phone image"
            />
          </div>
          <div className="grid grid-cols-2">
            {blogPosts.map((item) => {
              return (
                <Image
                  src={item}
                  width={300}
                  height={300}
                  alt="blog posts "
                  className="rounded-lg"
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Blogs;
// end..
