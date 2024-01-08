"use client";
import { useMediaQuery } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import {
  FaBars,
  FaBook,
  FaList,
  FaSignOutAlt,
  FaTasks,
  FaTimes,
} from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { useRouter } from "next/navigation";

const sidebarLinks = [
  {
    id: 1,
    label: "Tasks",
    leadTo: "",
    icon: <FaTasks />,
  },
  {
    id: 2,
    label: "Planning",
    leadTo: "",
    icon: <FaBook />,
  },
  {
    id: 3,
    label: "Activities",
    leadTo: "",
    icon: <FaList />,
  },
];

type sideBaTypes = {
  isOpen: boolean;
};
const SidebarLg = ({ isOpen }: sideBaTypes) => {
  const router = useRouter();

  const [path, setPath] = useState<number | null>(null);

  const handlepath = (id: number) => {
    setPath(id);
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.log("could not log out");
    }
  };

  return (
    <Transition
      className={`flex-none h-full w-full lg:w-[18vw] fixed lg:static z-40 lg:z-0`}
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
        <div className="flex flex-col gap-10  bg-gray-50 h-screen fixed">
          <Link
            href="/Homepage"
            className="flex justify-center items-center p-10"
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
              <div
                className={` flex items-center gap-5 cursor-pointer ${
                  path === item.id
                    ? "border-r-8 rounded-md border-purple-400 text-purple-400"
                    : "text-gray-300"
                }`}
                key={item.id}
              >
                <span>{item.icon}</span>
                <span className="ml-4" onClick={() => handlepath(item.id)}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-8 ml-4 flex items-center gap-5 hover:text-purple-400 cursor-pointer">
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
