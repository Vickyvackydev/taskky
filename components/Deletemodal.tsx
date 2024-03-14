import React from "react";
import Modal from "./modal";
import { FaTimes } from "react-icons/fa";
import Button from "./Button";

interface DeletemodalProps {
  openModal: boolean;
  closeModal: () => void;
  handleDelete: () => void;
  componentText: string;
}

//  resuable delete component to delete an todo data with the id
const Deletemodal = ({
  openModal,
  closeModal,
  handleDelete,
  componentText,
}: DeletemodalProps) => {
  return (
    <Modal
      isOpen={openModal}
      closeBtnColor="w-8 h-8 rounded-full hover:bg-backgrd text-gray-500 text-lg"
      isClose={closeModal}
      maxWidth="w-[450px]"
    >
      <div className="flex flex-col gap-4 items-center justify-center">
        <span className="flex justify-center items-center w-20 h-20 rounded-full border-4 border-red-400 text-5xl text-red-400">
          <FaTimes />
        </span>

        <span className="text-2xl font-medium dark:text-gray-300">
          Are You Sure?
        </span>
        <div className="dark:text-gray-300">
          <span>{`Do you really want to delete this ${componentText}?`} </span>
          <span>This process cannot be undone.</span>
        </div>

        <div className="flex gap-10 ">
          <Button
            text="cancel"
            textStyles="text-white"
            btnStyles={`rounded-md  py-3 mt-4 bg-gray-300 dark:bg-gray-900`}
            handleClick={closeModal}
          />
          <Button
            text={`Delete`}
            textStyles="text-white"
            btnStyles={`rounded-md  py-3 mt-4 bg-red-400 dark:bg-red-600`}
            handleClick={handleDelete}
          />
        </div>
      </div>
    </Modal>
  );
};

export default Deletemodal;
// end...
