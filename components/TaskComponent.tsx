import Image from "next/image";
import React, { useState } from "react";
import { FaEdit, FaInfo, FaPencilAlt, FaTrash } from "react-icons/fa";
import Modal from "./modal";
import Button from "./Button";

export interface TaskProps {
  id: number;
  name: string;
  desc: string;
  status: string;
}

interface tasksMainProps {
  tasks: TaskProps[];
  emptyText: string;
  deleteText: string;
  handleDelete: (id: any) => void;
  handleSelector: (task: any) => void;
  handleUpdate: (task: any) => void;
  deleteContentColor: string;
  iconType: any;
  modalCloseColor: string;
  allTasks?: any;
}
const TaskComponent = ({
  tasks,
  emptyText,
  deleteText,
  handleDelete,
  handleSelector,
  handleUpdate,
  deleteContentColor,
  iconType,
  modalCloseColor,
  allTasks,
}: tasksMainProps) => {
  const [hoverOption, setHoverOption] = useState<boolean | number>(false);
  const [actionModal, setActionModal] = useState<boolean>(false);

  // const allTasks = tasks.splice(0, 4);

  return (
    <div className="mt-4 max-h-[500px] overflow-y-scroll">
      {tasks.length > 0 && !allTasks ? (
        tasks.map((task: TaskProps) => (
          <div
            key={task.id}
            className="flex justify-between items-center mt-6 rounded-xl bg-backgrd p-5 relative"
            onMouseEnter={() => setHoverOption(task.id)}
            onMouseLeave={() => setHoverOption(false)}
          >
            <div>
              <Image src={iconType} width={50} height={50} alt="task image" />
            </div>
            <div className="">
              <span>{task.name}</span>
            </div>
            <div>
              <span>{task.desc}</span>
            </div>
            <div>
              <span
                className={`text-[0.85rem] p-2 rounded-xl text-white ${
                  task.status === "active"
                    ? "bg-green-300"
                    : task.status === "disabled"
                    ? "bg-red-300"
                    : ""
                }`}
              >
                {task.status}
              </span>
            </div>
            {hoverOption === task.id && (
              <div className="bg-black hover:bg-opacity-5 hover:opacity-50 opacity-0 absolute w-full h-full left-0 overflow-hidden">
                <div className="hover:opacity-100 flex justify-center mt-9 gap-5">
                  <span
                    className={`flex justify-center items-center ${deleteContentColor} rounded-full text-white w-10 h-10 text-lg pl-1 cursor-pointer`}
                    onClick={() => handleUpdate(task)}
                  >
                    <FaPencilAlt />
                  </span>
                  <span
                    className={`flex justify-center items-center ${deleteContentColor} rounded-full text-white w-10 h-10 text-lg pl-1 cursor-pointer`}
                    onClick={() => {
                      setActionModal(true);
                      handleSelector(task);
                    }}
                  >
                    <FaTrash />
                  </span>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center text-gray-300 lg:text-3xl text-xl">
          <span className="text-center">
            {`You don't have any active ${emptyText}`}
          </span>
        </div>
      )}
      <Modal
        isOpen={actionModal}
        isClose={() => setActionModal(false)}
        closeBtnColor={modalCloseColor}
      >
        <div className="flex justify-center items-center flex-col">
          <span
            className={`text-3xl w-16 h-16 rounded-full ${deleteContentColor} flex justify-center items-center text-white`}
          >
            <FaInfo />
          </span>
          <div className="mt-5">
            <span className="text-2xl text-gray-600 ">
              Are you sure <br /> you want to delete this {deleteText}?
            </span>
          </div>
          <Button
            text="Delete"
            textStyles="text-white"
            btnStyles={`rounded-lg ${deleteContentColor} py-3 mt-4`}
            handleClick={() => {
              handleDelete(tasks.find((name) => name.id));
              setActionModal(false);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default TaskComponent;
