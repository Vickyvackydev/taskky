"use client";
import { navLinks } from "@/constants";
import Link from "next/link";
import React, { useState } from "react";
import Button from "./Button";
import "./navbar.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();
  const [navopen, setNavOpen] = useState(false);

  return (
    <nav className="p-10 sticky flex justify-between transition-all duration-500">
      <Link href="/">
        <Image src="/logo.png" width={150} height={150} alt="logo image" />
      </Link>

      <div>
        <ul
          className={`flex flex-col gap-12 text-2xl text-center pt-10 w-full overflow-hidden transition-all duration-500   ${
            navopen ? "navopen" : "navclose"
          }`}
        >
          {navLinks.map((links) => (
            <li className="hover:text-green-500 transition-all duration-300 cursor-pointer">
              {links.label}
            </li>
          ))}
        </ul>
        <hr />
      </div>
      <div className="flex gap-5">
        <div>
          <Button
            text="My Dashboard"
            textStyles="text-white text-lg"
            btnStyles="rounded-xl bg-green-500 px-5 py-3 float-right"
            handleClick={() => router.push("/Dashboard")}
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
