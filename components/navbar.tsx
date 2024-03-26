"use client";
import { navLinks } from "@/constants";
import Link from "next/link";
import React, { useState } from "react";
import Button from "./Button";
import "./navbar.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { useMediaQuery } from "@/hooks";
import { motion } from "framer-motion";
import { scrollToComponent } from "@/utils";

const Navbar = () => {
  const router = useRouter();
  const [navopen, setNavOpen] = useState(false);
  const isMobileScreen = useMediaQuery("(max-width: 640px)");

  return (
    <nav
      className="lg:p-10 p-4 sticky flex justify-between transition-all duration-500"
      id="navbar"
    >
      <Link href="/">
        <Image
          src="/logo.png"
          width={isMobileScreen ? 70 : 150}
          height={150}
          alt="logo image"
        />
      </Link>

      <div
        className={`lg:relative absolute lg:top-0 top-24 z-auto ${
          navopen && isMobileScreen ? " bg-white left-0 shadow-md" : "bg-none"
        } lg:w-32 w-full `}
      >
        <ul
          className={`flex flex-col gap-12 lg:text-2xl text-xl lg:text-center text-start text-text_black font-medium lg:pl-0 pl-3 pt-10 lg:pr-0 pr-10 w-full overflow-hidden transition-all duration-500  ${
            navopen ? "navopen" : "navclose"
          } ${navopen && isMobileScreen ? "" : "border-none max-w-[10rem]"}`}
        >
          {navLinks.map((links) => {
            if (links.href === "/contactUs") {
              return (
                <Link href={links.href} onClick={() => setNavOpen(false)}>
                  Contact
                </Link>
              );
            } else
              return (
                <li
                  className="hover:text-green-500 transition-all duration-300 cursor-pointer "
                  onClick={() => {
                    scrollToComponent(links.href);
                    setNavOpen(false);
                  }}
                >
                  {links.label}
                </li>
              );
          })}
        </ul>
        <hr className={`lg:block hidden`} />
      </div>

      <div className="flex gap-5">
        <div>
          <Button
            text="My Dashboard"
            textStyles="text-white lg:text-lg text-sm"
            btnStyles="rounded-xl bg-green-500 lg:px-5 px-2 py-3 float-right shadow-md"
            handleClick={() => router.push("/login")}
          />
        </div>
        {/* displays navigation bar */}
        <div
          onClick={() => setNavOpen((prev) => !prev)}
          className={`arrow bg-gray-50 w-12 h-12 rounded-full flex justify-center items-center shadow-sm ${
            navopen ? "rotateDown" : "rotateUp"
          }`}
        >
          <span className="text-gray-300">
            {navopen ? <FaTimes /> : <FaBars />}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// end..
