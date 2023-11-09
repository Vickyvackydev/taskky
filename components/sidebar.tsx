"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const sidebarLinks = [""];
const Sidebar = () => {
  const [smallScreen, setSmallScreen] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      const mobile = window.innerWidth <= 400;
      setSmallScreen(mobile);
    }
  }, []);

  return (
    <main
      className={`xxs:absolute lg:relative transition-all duration-500  ${
        smallScreen || sidebar ? "w-[250px]" : "w-0"
      } `}
    >
      <div
        className="hidden xxs:block lg:hidden absolute right-[-2rem] top-6"
        onClick={() => setSidebar((prev) => !prev)}
      >
        <span>{smallScreen || sidebar ? <FaTimes /> : <FaBars />}</span>
      </div>
      <div className="flex flex-col gap-10 p-10 bg-gray-50 h-screen">
        <Link href="/Homepage">
          <Image
            src="/logo.png"
            width={150}
            height={150}
            alt="dashboard logo"
          />
        </Link>
        <div>{}</div>
      </div>
    </main>
  );
};

export default Sidebar;
