import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaCheckCircle, FaInfo, FaPen, FaTrash, FaUndo } from "react-icons/fa";

interface Props {
  // state dropdown types
  open: boolean;
  handleView: () => void;
  handleDelete: () => void;
  handleUpdate: () => void;
  handleComplete: any;
  handleReverse: any;
  complete: any;
}
const DropDown = ({
  open,
  handleView,
  handleDelete,
  handleComplete,
  handleUpdate,
  handleReverse,
  complete,
}: Props) => {
  // dropdown menu for the taskcomponent
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
      <div className="absolute right-1 bg-white dark:bg-bg_black px-3 py-2 rounded-xl shadow-md top-10 flex flex-col gap-2 z-50">
        <div
          className={`flex gap-2 items-center hover:bg-green-300 dark:hover:bg-green-500 rounded-lg p-1 cursor-pointer hover:text-white dark:hover:text-white  text-bg_black dark:text-gray-300`}
          onClick={handleView}
        >
          <FaInfo className={` text-sm `} />
          <span className="">Info</span>
        </div>
        <div
          className={`flex gap-2 items-center hover:bg-green-300 dark:hover:bg-green-500 rounded-lg p-1 cursor-pointer hover:text-white dark:hover:text-white  text-bg_black dark:text-gray-300`}
          onClick={handleUpdate}
        >
          <FaPen />
          <span>Update</span>
        </div>
        <div
          className={`flex gap-2 items-center hover:bg-green-300 dark:hover:bg-green-500 rounded-lg p-1 cursor-pointer hover:text-white dark:hover:text-white  text-bg_black dark:text-gray-300`}
          onClick={handleDelete}
        >
          <FaTrash />
          <span>Delete</span>
        </div>
        {complete ? (
          <div
            className="flex gap-2 items-center  rounded-lg p-1 hover:bg-green-100 cursor-pointer dark:hover:bg-green-500 dark:hover:text-white "
            onClick={handleReverse}
          >
            <FaUndo />
            <span>{"undo completed"}</span>
          </div>
        ) : (
          <div
            className="flex gap-2 items-center  rounded-lg p-1 hover:bg-green-100 cursor-pointer dark:hover:bg-green-500 dark:hover:text-white"
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

export default DropDown;
// end..
