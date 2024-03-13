import React from "react";
import Modal from "./modal";
import Button from "./Button";

type Props = {
  open: boolean;
  close: () => void;
  items: any;

  handleUpdate?: (team: any) => void;
  handleDelete?: any;
  actionBtns: boolean;
  modalname: string;
  tasksdeatils: boolean;
  handleSelectToDelete?: any;
};
const DetailsBox = ({
  open,
  close,
  items,
  handleUpdate,
  modalname,
  actionBtns,
  tasksdeatils,
  handleSelectToDelete,
}: Props) => {
  return (
    <Modal
      isOpen={open}
      isClose={close}
      closeBtnColor="w-8 h-8 rounded-full hover:bg-backgrd dark:hover:bg-gray-700 text-text_gray dark:text-gray-500"
      maxWidth="w-[550px]"
    >
      <div>
        <div className="w-full bg-backgrd dark:bg-gray-900 rounded-lg  h-16 items-center flex justify-center">
          <span className="text-2xl font-medium text-gray-400 dark:text-gray-300  py-5 rounded-lg">
            {`${modalname}'s Details`}
          </span>
        </div>
        {items && tasksdeatils === false ? (
          <div className="flex justify-between px-5 mt-3">
            <div className="flex flex-col gap-5 items-start ">
              <span className="dark:text-gray-300">Team Name:</span>
              <span className="dark:text-gray-300">Team Task:</span>
              <span className="dark:text-gray-300">Team Department:</span>
              <span className="dark:text-gray-300">Team Status:</span>
            </div>
            <div className="flex flex-col gap-5 text-right font-medium">
              <span className="dark:text-gray-300">{items.name}</span>
              <span className="dark:text-gray-300">{items.task}</span>
              <span className="dark:text-gray-300">{items.dept}</span>

              <div>
                <span
                  className={`text-[0.85rem] p-2 rounded-xl text-white ${
                    items.status === "active"
                      ? "bg-green-300 dark:bg-green-500"
                      : items.status === "pending"
                      ? "bg-red-400 dark:bg-red-500"
                      : ""
                  }`}
                >
                  {items.status}
                </span>
              </div>
            </div>
          </div>
        ) : tasksdeatils === true ? (
          <div className="flex justify-between px-5 mt-3">
            <div className="flex flex-col gap-5 items-start">
              <span className="dark:text-gray-300">Name:</span>
              <span className="dark:text-gray-300">Description:</span>
              <span className="dark:text-gray-300">Task Status:</span>
            </div>
            <div className="flex flex-col gap-5 text-right font-medium">
              <span className="dark:text-gray-300">{items?.name}</span>
              <span className="dark:text-gray-300">{items?.desc}</span>
              <div>
                <span
                  className={`text-[0.85rem] p-2 rounded-xl text-white ${
                    items?.status === "active"
                      ? "bg-green-300 dark:bg-green-500"
                      : items?.status === "pending"
                      ? "bg-orange-300 dark:bg-orange-500"
                      : items?.status === "completed"
                      ? "bg-green-300 dark:bg-green-500"
                      : ""
                  }`}
                >
                  {items?.status}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        {actionBtns ? (
          <div className="flex justify-evenly items-center mt-5">
            <Button
              text="Update"
              textStyles="text-text_gray dark:text-gray-300 "
              btnStyles=" py-3 mt-5"
              handleClick={handleUpdate}
            />
            <Button
              text="Delete"
              textStyles="text-red-400 dark:text-red-500"
              btnStyles=" py-3 mt-5"
              handleClick={handleSelectToDelete}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Button
              text="Close"
              textStyles="text-red-400 dark:text-red-500"
              btnStyles=" py-3 mt-5"
              handleClick={close}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DetailsBox;
