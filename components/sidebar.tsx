"use client";
import { useMediaQuery } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Transition } from "@headlessui/react";
import { FaSignOutAlt, FaTimes } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { usePathname, useRouter } from "next/navigation";
import { A_ICON, E_ICON, P_ICON, T_ICON } from "@/public";

const sidebarLinks = [
  // side bar links
  {
    id: 1,
    label: "Tasks",
    leadTo: "/Dashboard/tasks",
    icon: T_ICON,
  },
  {
    id: 2,
    label: "Planning",
    leadTo: "/Dashboard/plans",
    icon: P_ICON,
  },
  {
    id: 3,
    label: "Activities",
    leadTo: "/Dashboard/activities",
    icon: A_ICON,
  },
  {
    id: 4,
    label: "Events",
    leadTo: "/Dashboard/events",
    icon: E_ICON,
  },
];

type sideBaTypes = {
  // sidebar types
  isOpen: boolean;
  onClose: () => void;
};
const SidebarLg = ({ isOpen, onClose }: sideBaTypes) => {
  const router = useRouter();
  const pathname = usePathname();
  const smallScreen = useMediaQuery("(max-width: 600px)");

  const handleSidebarClose = () => {
    // closes the sidebar when triggered
    if (smallScreen) {
      onClose();
    } else {
      null;
    }
  };

  const handleLogOut = async () => {
    // log users out
    try {
      if (auth?.currentUser) {
        await signOut(auth);

        router.push("/login");
      } else {
        console.log("no user");
      }
    } catch (error) {
      console.log("could not log out");
    }
  };

  return (
    <Transition
      className={`flex-none h-full w-full lg:w-[18vw] fixed z-40 lg:z-0 dark:border-gray-700 transition-all duration-500`}
      as={"div"}
      show={isOpen}
      enter="transition-all ease-in duration-500"
      enterFrom="transform -translate-x-full"
      enterTo="transform -translate-x-0"
      leave="transition-all ease-out duration-500"
      leaveFrom="transform -translate-x-0"
      leaveTo="transform -translate-x-full"
    >
      <main>
        <div
          className="absolute lg:hidden  z-50 right-[5rem] w-10 h-10 rounded-full flex justify-center items-center border-2 top-3 "
          onClick={onClose}
        >
          <span className="text-lg dark:text-gray-300">
            <FaTimes />
          </span>
        </div>
        <div className="flex flex-col gap-10  bg-gray-50 h-screen fixed dark:bg-gray-900">
          <Link
            href="/Dashboard"
            className="flex justify-center items-center p-10"
            onClick={() => handleSidebarClose()}
          >
            <Image
              src="/logo.png"
              width={150}
              height={150}
              alt="dashboard logo"
            />
          </Link>
          <div className="flex flex-col pl-3 gap-16 text-xl pt-6">
            {sidebarLinks.map((item) => (
              <Link
                href={item.leadTo}
                onClick={() => handleSidebarClose()}
                className={` flex items-center gap-5 cursor-pointer  ${
                  pathname === item.leadTo && item.id === 1
                    ? "border-r-8 rounded-md border-purple-400 text-purple-400 "
                    : pathname === item.leadTo && item.id === 2
                    ? "border-r-8 rounded-md border-red-500 text-red-400"
                    : pathname === item.leadTo && item.id === 3
                    ? "border-r-8 rounded-md border-orange-400 text-orange-300"
                    : pathname === item.leadTo && item.id === 4
                    ? "border-r-8 rounded-md border-blue-400 text-blue-300"
                    : "text-gray-300"
                } transition-all duration-300`}
                key={item.id}
              >
                <div>
                  <Image
                    src={item.icon}
                    width={item.id === 1 ? 40 : 30}
                    height={30}
                    alt="icon"
                  />
                </div>
                <span className="ml-4">{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="absolute bottom-8 ml-4 flex items-center gap-5 hover:text-purple-400 cursor-pointer dark:text-gray-300 dark:hover:text-green-500">
            <span>
              <FaSignOutAlt />
            </span>
            <span onClick={handleLogOut}>Log out</span>
          </div>
        </div>
      </main>
    </Transition>
  );
};

export default SidebarLg;
// end..
