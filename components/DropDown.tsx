import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaCheckCircle, FaInfo, FaPen, FaTrash } from "react-icons/fa";

interface Props {
  open: boolean;
  close?: () => void;
  handleView: () => void;
  handleDelete: () => void;
  handleUpdate: () => void;
  handleComplete: any;
  complete: any;
}
const DropDown = ({
  open,
  close,
  handleView,
  handleDelete,
  handleComplete,
  handleUpdate,
  complete,
}: Props) => {
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
      <div className="absolute right-1 bg-white px-3 py-2 rounded-xl shadow-md top-10 flex flex-col gap-2 z-50">
        <div
          className={`flex gap-2 items-center hover:bg-green-100 rounded-lg p-1 cursor-pointer`}
          onClick={handleView}
        >
          <FaInfo className={`text-gray-500 text-sm hover:text-green-500`} />
          <span>Info</span>
        </div>
        <div
          className={`flex gap-2 items-center hover:bg-green-100 rounded-lg p-1 cursor-pointer`}
          onClick={handleUpdate}
        >
          <FaPen className={`text-gray-500 text-sm hover:text-green-500`} />
          <span>Update</span>
        </div>
        <div
          className={`flex gap-2 items-center hover:bg-green-100 rounded-lg p-1 cursor-pointer`}
          onClick={handleDelete}
        >
          <FaTrash className={`text-gray-500 text-sm hover:text-green-500`} />
          <span>Delete</span>
        </div>
        <div
          className={`flex gap-2 items-center  rounded-lg p-1  ${
            complete
              ? "hover:bg-none cursor-default"
              : "hover:bg-green-100 cursor-pointer"
          }`}
          onClick={handleComplete}
        >
          <FaCheckCircle
            className={`${complete ? "text-green-300" : "text-gray-500"}`}
          />
          <span className={`${complete ? "text-green-300" : ""}`}>
            {complete ? "Marked as done" : "Mark as done"}
          </span>
        </div>
      </div>
    </Transition>
  );
};

export default DropDown;
