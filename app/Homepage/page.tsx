import Blogs from "@/components/Blogs";
import Explore from "@/components/explore";
import Hero from "@/components/hero";
import Intro from "@/components/intro";
import FaQ from "@/components/faqs";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <Intro />
      <Explore />
      <Blogs />
      <FaQ />
    </div>
  );
};

export default Home;
