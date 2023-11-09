import Image from "next/image";
import React from "react";

const blogPosts = ["/ui_1.jpg", "/ui_2.png", "/ui_3.png", "/taskky.png"];
const Blogs = () => {
  return (
    <main className="px-24 my-10">
      <div className="flex flex-col">
        <span className="text-center text-5xl font-semibold">Our Blog</span>
        <p className="text-center">
          Exciting <span className="text-green-500 text-lg">Updates</span>{" "}
          Everyday
        </p>
        <div className="flex justify-around mt-20">
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
        </div>
      </div>
    </main>
  );
};

export default Blogs;
