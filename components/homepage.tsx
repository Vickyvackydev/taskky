import React, { Children } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import ScrollBtn from "./ScrollBtn";

type ChildrenProps = {
  children: React.ReactNode;
};
const Homepage = ({ children }: ChildrenProps) => {
  return (
    <div className="overflow-auto">
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Homepage;
