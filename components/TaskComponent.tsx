import Image from "next/image";
import React, { useState } from "react";
import { FaInfo, FaPencilAlt, FaTrash } from "react-icons/fa";

import { usePathname } from "next/navigation";
import DetailsBox from "./detailsBox";
import Deletemodal from "./Deletemodal";
import { useMediaQuery } from "@/hooks";

export interface TaskProps {
  id: number;
  name: string;
  desc: string;
  status: string;
  createdDate: string;
  createdTime: string;
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
  modalname?: any;
  allTasks?: any;
  updated: any;
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

  modalname,
  allTasks,
  updated,
}: tasksMainProps) => {
  const [hoverOption, setHoverOption] = useState<boolean | number>(false);
  const [actionModal, setActionModal] = useState<boolean>(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const pathnname = usePathname();
  const mobileScreen = useMediaQuery("(max-width: 640px)");
  const laptopScreen = useMediaQuery("(max-width: 800px)");

  const handleSelectedTask = (task: any) => {
    setSelectedTask(task);
  };

  const justCreated = `${new Date().getHours()}:${new Date().getMinutes()}`;
  // const allTasks = tasks.splice(0, 4);

  const truncateSentence = (sentence: any) => {
    const words = sentence.split(" ");
    if (words.length >= 4) {
      // On mobile screen, show only the first word with three dots
      return `${words[0]}...`;
    } else if (words.length === 3 && laptopScreen) {
      // On laptop screen, show first two words with three dots
      return `${words.slice(0, 2).join(" ")}...`;
    } else if (words.length === 2 && laptopScreen) {
      // On laptop screen, show the two words without dots
      return words.join(" ");
    } else {
      // For longer sentences or on mobile, no truncation needed
      return sentence;
    }
  };

  return (
    <div className="mt-4 max-h-[500px] overflow-y-scroll">
      {tasks?.length > 0 ? (
        tasks?.map((task: TaskProps) => (
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
              <span className="lg:text-lg text-sm">
                {task.name.split(" ").length > 3
                  ? `${task.name.split(" ")[0]}...`
                  : ` ${task.name}`}
              </span>
            </div>
            <div>
              <span className="lg:text-lg text-sm">
                {truncateSentence(task.desc)}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <div>
                <span
                  className={`lg:text-[0.85rem] text-xs  lg:p-2 p-1 rounded-xl text-white  ${
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

              <div className="lg:flex hidden items-center gap-5  text-text_gray font-medium ">
                {updated ? (
                  <span className="lg:text-lg text-xs">{`${
                    new Date().getHours() || new Date().getMinutes() > updated
                      ? "Last updated: "
                      : "updated at:"
                  }`}</span>
                ) : (
                  <span className="lg:text-lg text-xs">{`${
                    justCreated === task.createdTime
                      ? "Just now"
                      : "Date created:"
                  }   `}</span>
                )}

                <span className="lg:text-sm text-xs">{task.createdDate}</span>
                <span className="lg:text-sm text-xs">{task.createdTime}</span>
              </div>
            </div>
            {hoverOption === task.id && (
              <div className="bg-black hover:bg-opacity-5 hover:opacity-50 opacity-0 absolute w-full h-full left-0 overflow-hidden">
                <div className="hover:opacity-100 flex justify-center mt-9 gap-5 ">
                  <span
                    className={`flex justify-center items-center ${deleteContentColor} rounded-full text-white w-10 h-10 text-lg pl-1 cursor-pointer tooltip tooltip-top"  ${
                      pathnname === "/Dashboard" ||
                      (pathnname !== "/Dashboard/tasks" &&
                        pathnname !== "/Dashboard/plans" &&
                        pathnname !== "/Dashboard/activities")
                        ? "hidden"
                        : "block"
                    }`}
                    onClick={() => handleUpdate(task)}
                    data-tip="update"
                  >
                    <FaPencilAlt />
                  </span>
                  <span
                    className={`flex justify-center items-center ${deleteContentColor} rounded-full text-white w-10 h-10 text-lg pl-1 cursor-pointer tooltip tooltip-top `}
                    onClick={() => {
                      handleSelectedTask(task);
                      setDetailsModal(true);
                    }}
                    data-tip="details"
                  >
                    <FaInfo />
                  </span>
                  <span
                    className={`flex justify-center items-center ${deleteContentColor} rounded-full text-white w-10 h-10 text-lg pl-1 cursor-pointer ${
                      pathnname === "/Dashboard" ||
                      (pathnname !== "/Dashboard/tasks" &&
                        pathnname !== "/Dashboard/plans" &&
                        pathnname !== "/Dashboard/activities")
                        ? "hidden"
                        : "block"
                    } tooltip tooltip-top `}
                    onClick={() => {
                      setActionModal(true);
                      handleSelector(task);
                    }}
                    data-tip="delete"
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

      <Deletemodal
        openModal={actionModal}
        closeModal={() => setActionModal(false)}
        componentText={deleteText}
        handleDelete={() => {
          handleDelete(tasks.find((name) => name.id));
          setActionModal(false);
        }}
      />

      <DetailsBox
        open={detailsModal}
        close={() => setDetailsModal(false)}
        items={selectedTask}
        actionBtns={false}
        modalname={modalname}
        tasksdeatils={true}
      />
    </div>
  );
};

export default TaskComponent;
