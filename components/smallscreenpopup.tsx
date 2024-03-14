import { useMediaQuery } from "@/hooks";
import { Transition } from "@headlessui/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

interface Props {
  // state smallpopup params types
  openPopUp: boolean;
  profileimage: any;
  userName: string;
  userEmail: string;
  userProfession: string;
}
const SmallScreenPopup = ({
  openPopUp,
  profileimage,
  userName,
  userEmail,
  userProfession,
}: Props) => {
  const { resolvedTheme, setTheme } = useTheme(); // set states of the dashboard theme
  return (
    <Transition
      show={openPopUp}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className="absolute right-0 top-16 bg-white dark:bg-gray-900 shadow-md flex justify-center items-center flex-col p-5 rounded-lg">
        <div>
          {profileimage && (
            <Image
              src={profileimage}
              width={50}
              height={50}
              alt="profile image"
              className="rounded-full"
            />
          )}
        </div>
        <div className="flex justify-between ">
          <div className="flex flex-col gap-3 dark:text-gray-300">
            <span className="text-xs">usermane:</span>
            <span className="text-xs">Email:</span>
            <span className="text-xs">Profession:</span>
          </div>
          <div className="flex flex-col gap-3 text-right dark:text-gray-300">
            <span className="text-xs font-medium">{userName}</span>
            <span className="text-xs font-medium">{userEmail}</span>
            <span className="text-xs font-medium">
              {userProfession === null
                ? "you'll need a larger screen to add profession"
                : userProfession}
            </span>
          </div>
        </div>
        <div className="flex gap-2 rounded-2xl border dark:border-gray-700 border-border_color px-1 py-2 mt-4">
          <button
            onClick={() => setTheme("dark")}
            className={`text-lg dark:text-green-300 text-gray-300`}
          >
            <FaMoon />
          </button>
          <button
            onClick={() => setTheme("light")}
            className={`text-lg ${
              resolvedTheme === "light" ? "text-green-300" : ""
            } `}
          >
            <FaSun />
          </button>
        </div>
      </div>
    </Transition>
  );
};

export default SmallScreenPopup;
