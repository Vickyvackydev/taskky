"use client";
import { navLinks } from "@/constants";
import Link from "next/link";
import React, { useState } from "react";
import Button from "./Button";
import "./navbar.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useMediaQuery } from "@/hooks";

const Navbar = () => {
  const router = useRouter();
  const [navopen, setNavOpen] = useState(false);
  const isMobileScreen = useMediaQuery("(max-width: 640px)");

  return (
    <nav className="lg:p-10 p-4 sticky flex justify-between transition-all duration-500">
      <Link href="/Homepage">
        <Image src="/logo.png" width={150} height={150} alt="logo image" />
      </Link>

      <div
        className={`lg:relative absolute lg:top-0 top-24 ${
          navopen || isMobileScreen ? "lg:bg-none bg-white" : "bg-none"
        } lg:w-32 w-full `}
      >
        <ul
          className={`flex flex-col gap-12 text-2xl text-center pt-10 w-full overflow-hidden transition-all duration-500  ${
            navopen ? "navopen" : "navclose"
          }`}
        >
          {navLinks.map((links) => (
            <li className="hover:text-green-500 transition-all duration-300 cursor-pointer ">
              {links.label}
            </li>
          ))}
        </ul>
        <hr className={`lg:block hidden`} />
      </div>
      <div className="flex gap-5">
        <div>
          <Button
            text="My Dashboard"
            textStyles="text-white lg:text-lg text-sm"
            btnStyles="rounded-xl bg-green-500 lg:px-5 px-2 py-3 float-right"
            handleClick={() => router.push("/login")}
          />
        </div>
        <div
          onClick={() => setNavOpen((prev) => !prev)}
          className={`arrow bg-gray-50 w-12 h-12 rounded-full flex justify-center items-center ${
            navopen ? "rotateDown" : "rotateUp"
          }`}
        >
          <span className="text-gray-300">
            {navopen ? <FaArrowDown /> : <FaArrowUp />}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
