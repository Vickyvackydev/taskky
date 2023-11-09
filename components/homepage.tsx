import React, { Children } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

type ChildrenProps = {
  children: React.ReactNode;
};
const Homepage = ({ children }: ChildrenProps) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Homepage;
