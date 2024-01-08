"use client";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FaArrowCircleDown,
  FaArrowLeft,
  FaArrowRight,
  FaBars,
  FaBell,
  FaBook,
  FaCommentDots,
  FaListUl,
  FaSearch,
  FaTimes,
  FaUser,
} from "react-icons/fa";

const navlinks = [
  {
    link: "My Task",
    href: "",
  },
  {
    link: "Planning",
    href: "",
  },
  {
    link: "Activities",
    href: "",
  },
];

type navBarType = {
  isOpen: () => void;
  onClose: () => void;
  Open: () => void;
  Close: () => void;
  mobileView: boolean;
  isVisible: boolean;
  isRightSide: boolean;
};
const Dashboardnav = ({
  onClose,
  isOpen,
  Close,
  Open,
  isRightSide,
  mobileView,
  isVisible,
}: navBarType) => {
  // const { fullName } = useAuth();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getCurrentTime = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        return "Good Morning";
      } else if (currentHour >= 12 && currentHour < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    };

    setGreeting(getCurrentTime());
  }, []);
  // const userName = localStorage.getItem("userName");
  const maainName = () => {
    if (localStorage !== undefined) {
      const userName = localStorage.getItem("userName");
      return userName;
    }
  };

  return (
    <nav className="border-b-2 lg:w-full max-w-full lg:p-5 lg:fixed relative bg-white z-30 shadow-sm lg:left-[14.4rem] left-0 lg:block flex p-5">
      {mobileView &&
        (isVisible ? (
          <div onClick={() => onClose()}>
            <span>
              <FaTimes />
            </span>
          </div>
        ) : (
          <div onClick={() => isOpen()}>
            <span>
              <FaBars />
            </span>
          </div>
        ))}
      <div className="flex justify-between items-center ">
        <span className="pl-4">
          {greeting} {`${maainName()}`}
        </span>
        <div className="flex-1 flex ml-16 bg-gray-100 px-6 rounded-lg max-w-[30rem] ">
          <span className="pt-[0.9rem] text-gray-300 lg:block hidden">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder={`Search task name`}
            className="py-3 outline-none px-3 placeholder:text-lg bg-transparent placeholder:text-gray-300 lg:block hidden"
          />
        </div>
        <div className="lg:block hidden flex-1 ml-[10rem]">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Image src="/speed.png" width={50} height={50} alt="profile" />
              <div className="flex flex-col">
                <span>Obioma Victor</span>
                <span>Software Engineer</span>
              </div>
              <span className="pt-6 ">
                <FaArrowCircleDown />
              </span>
            </div>
          </div>
        </div>
        <div className="lg:hidden  flex gap-4">
          <div>
            <span>
              <FaUser />
            </span>
          </div>
          <div>
            <span onClick={() => Open()}>
              <FaListUl />
            </span>
          </div>
        </div>

        {/* {mobileView &&
          (isRightSide ? (
            <div onClick={() => Open()}>
              <span>
                <FaArrowRight />
              </span>
            </div>
          ) : (
            <div onClick={() => Close()}>
              <span>
                <FaArrowLeft />
              </span>
            </div>
          ))} */}
      </div>
    </nav>
  );
};

export default Dashboardnav;
