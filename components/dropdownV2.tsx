import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaCheckCircle, FaInfo, FaPen, FaTrash, FaUndo } from "react-icons/fa";

interface Props {
  // state dropdown types
  open: boolean;
  handleComplete: any;
  handleReverse: any;
  done: any;
}
const DropDownV2 = ({ open, handleComplete, handleReverse, done }: Props) => {
  // dropdown menu for the eventcard component
  return (
    <Transition
      as={Fragment}
      show={open}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className="absolute right-0  bg-white dark:bg-bg_black px-3 py-2 rounded-xl shadow-md top-[9rem] flex flex-col gap-2 z-50">
        {done ? (
          <div
            className="flex gap-2 items-center  rounded-lg p-1 hover:text-green-300 cursor-pointer dark:hover:text-green-500  dark:text-gray-300"
            onClick={handleReverse}
          >
            <FaUndo />
            <span>{"undo"}</span>
          </div>
        ) : (
          <div
            className="flex gap-2 items-center rounded-lg p-1 hover:text-green-300 cursor-pointer dark:hover:text-green-500  dark:text-gray-300"
            onClick={handleComplete}
          >
            <FaCheckCircle />
            <span>{"Mark as done"}</span>
          </div>
        )}
      </div>
    </Transition>
  );
};

export default DropDownV2;
// end..
