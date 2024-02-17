import { Transition } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import Button from "./Button";
import { Fa500Px, FaUpload } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  isClose: () => void;
}
const UploadDetailsPop = ({ isOpen, isClose }: Props) => {
  return (
    <Transition
      as={"div"}
      className={
        "absolute lg:flex hidden bg-white shadow-md rounded-lg w-[25vw] h-[60vh] right-0 top-[7rem] "
      }
      show={isOpen}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className="flex flex-col items-start py-5 px-6 gap-4">
        <div className="flex flex-col justify-center items-center z-10 text-center max-w-[20rem] h-24 pt-5  text-text_black border-2 border-gray-300 border-dashed">
          <label htmlFor="poster">{"choose an image"}</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="opacity-0 w-full h-full cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="text">Name</label>
          <input
            type="text"
            placeholder="name"
            className="outline-none  px-3 rounded-lg border-border_color bg-backgrd  w-[20rem] h-12"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="text">Profession</label>
          <input
            type="text"
            placeholder="e.g cyber security"
            className="outline-none  px-3 rounded-lg border-border_color bg-backgrd w-[20rem] h-12"
          />
        </div>

        <Button
          text="upload"
          icon={<FaUpload />}
          btnStyles=" justify-center w-full border border-border_color py-2 rounded-xl"
          textStyles="text-purple-400"
          iconStyles="text-purple-400 pt-[1.8px]"
        />
      </div>
    </Transition>
  );
};

export default UploadDetailsPop;
