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
      closeBtnColor="w-8 h-8 rounded-full hover:bg-backgrd text-text_gray"
      maxWidth="w-[450px]"
    >
      <div>
        <div className="w-full bg-backgrd rounded-lg  h-16 items-center flex justify-center">
          <span className="text-2xl font-medium text-gray-400  py-5 rounded-lg">
            {`${modalname}'s Details`}
          </span>
        </div>
        {items && tasksdeatils === false ? (
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
        ) : tasksdeatils === true ? (
          <div className="flex justify-between px-5 mt-3">
            <div className="flex flex-col gap-5 items-start">
              <span>Name:</span>
              <span>Description:</span>
              <span>Team Status:</span>
            </div>
            <div className="flex flex-col gap-5 text-right font-medium">
              <span>{items?.name}</span>
              <span>{items?.desc}</span>
              <div>
                <span
                  className={`text-[0.85rem] p-2 rounded-xl text-white ${
                    items?.status === "active"
                      ? "bg-green-300"
                      : items?.status === "disabled"
                      ? "bg-red-300"
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
              textStyles="text-text_gray"
              btnStyles=" py-3 mt-5"
              handleClick={handleUpdate}
            />
            <Button
              text="Delete"
              textStyles="text-red-400"
              btnStyles=" py-3 mt-5"
              handleClick={handleSelectToDelete}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Button
              text="Close"
              textStyles="text-red_400"
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
