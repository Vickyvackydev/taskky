import React from "react";
import Modal from "./modal";
import Button from "./Button";
import { FaEdit, FaPencilAlt, FaTrash } from "react-icons/fa";

type Props = {
  open: boolean;
  close: () => void;
  items: any;
  //   handleUpdateItems: any;
  handleUpdate: (team: any) => void;
  handleDelete: (id: any) => void;
};
const DetailsBox = ({
  open,
  close,
  items,
  handleDelete,
  handleUpdate,
}: Props) => {
  return (
    <Modal isOpen={open} isClose={close} closeBtnColor="bg-purple-400">
      <div>
        <span className="text-2xl font-semibold text-purple-300">
          Team's Details
        </span>
        {items && (
          <div className="flex justify-between px-5 mt-3">
            <div className="flex flex-col gap-5 items-start">
              <span>Team Name:</span>
              <span>Team Task:</span>
              <span>Team Department:</span>
              <span>Team Status:</span>
            </div>
            <div className="flex flex-col gap-5 text-right font-medium">
              <span>{items.name}</span>
              <span>{items.task}</span>
              <span>{items.dept}</span>

              <div>
                <span
                  className={`text-[0.85rem] p-2 rounded-xl text-white ${
                    items.status === "active"
                      ? "bg-green-300"
                      : items.status === "disabled"
                      ? "bg-red-300"
                      : ""
                  }`}
                >
                  {items.status}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-evenly items-center mt-5">
          <Button
            text="Update"
            textStyles="text-white"
            icon={<FaPencilAlt />}
            iconStyles="pt-[0.125rem] text-white"
            btnStyles="rounded-lg bg-purple-400 py-3 mt-5"
            // handleClick={handleUpdateItems}
            handleClick={handleUpdate}
          />
          <Button
            text="Delete"
            textStyles="text-white"
            icon={<FaTrash />}
            iconStyles="pt-[0.125rem] text-white"
            btnStyles="rounded-lg bg-purple-400 py-3 mt-5"
            handleClick={handleDelete}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DetailsBox;
