import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import DetailsBox from "./detailsBox";
import Deletemodal from "./Deletemodal";
import { useMediaQuery } from "@/hooks";
import Preloader from "./preloader";
import { THREE_DOTS, THREE_DOTS_GRAY } from "@/public";
import DropDown from "./DropDown";
import { useSearchQuery } from "@/context/searchContext";
import { useTheme } from "next-themes";

export interface TaskProps {
  id: number;
  name: string;
  desc: string;
  status: string;
  createdDate: string;
  createdTime: string;
  updatedTime: string;
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
  loading: boolean;
  markAsDone: any;
}
const TaskComponent = ({
  tasks,
  emptyText,
  deleteText,
  handleDelete,
  handleSelector,
  handleUpdate,
  iconType,
  modalname,
  updated,
  loading,
  markAsDone,
}: tasksMainProps) => {
  const { resolvedTheme } = useTheme();
  const { showTopContent } = useSearchQuery();
  const [hoverOption, setHoverOption] = useState<boolean | number>(false);
  const [actionModal, setActionModal] = useState<boolean>(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const pathnname = usePathname();
  const mobileScreen = useMediaQuery("(max-width: 640px)");
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [click, setClick] = useState<number>(0);

  const handleSelectedTask = (task: any) => {
    setSelectedTask(task);
  };

  const justCreated = `${new Date().getHours()}:${new Date().getMinutes()}`;

  return (
    <div
      className={`mt-4 max-h-[500px] overflow-y-scroll ${
        !showTopContent ? "w-[55rem]" : ""
      }`}
    >
      {loading ? (
        <Preloader />
      ) : tasks?.length > 0 ? (
        tasks?.map((task: TaskProps) => (
          <div className="flex flex-col">
            <div
              key={task.id}
              className="flex flex-auto mt-6 rounded-xl bg-backgrd dark:bg-gray-900 dark:text-gray-300 py-4 relative justify-between items-center pr-3"
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
                  {!mobileScreen
                    ? task.desc.split(" ").length >= 5
                      ? `${task.desc.slice(0, 20)}...`
                      : task.desc
                    : mobileScreen
                    ? task.desc.length >= 2
                      ? `${task.desc.slice(0, 10)}...`
                      : task.desc
                    : null}
                </span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span
                  className={`lg:text-[0.85rem] text-xs  lg:p-2 p-1 rounded-xl text-white  ${
                    task.status === "active"
                      ? "bg-green-300 dark:bg-green-500"
                      : task.status === "pending"
                      ? "bg-orange-300 dark:bg-orange-500"
                      : task.status === "completed"
                      ? "bg-green-300 dark:bg-green-500"
                      : ""
                  }`}
                >
                  {task.status}
                </span>
              </div>

              {pathnname !== "/Dashboard" && (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    handleSelector(task);
                    setDropDown((prev) => !prev);
                    setClick(task.id);
                  }}
                >
                  {resolvedTheme === "dark" ? (
                    <Image
                      src={THREE_DOTS_GRAY}
                      width={25}
                      height={25}
                      alt="dots icon"
                    />
                  ) : (
                    <Image
                      src={THREE_DOTS}
                      width={25}
                      height={25}
                      alt="dots icon"
                    />
                  )}
                  {click === task.id && (
                    <DropDown
                      open={dropDown}
                      handleDelete={() => {
                        setActionModal(true);
                        handleSelector(task);
                      }}
                      handleUpdate={() => handleUpdate(task)}
                      handleView={() => {
                        handleSelectedTask(task);
                        setDetailsModal(true);
                      }}
                      handleComplete={() => {
                        markAsDone(task?.id);
                      }}
                      complete={task.status !== "completed" ? null : task.id}
                    />
                  )}
                </div>
              )}
            </div>

            <div className="lg:flex hidden items-center gap-5  text-gray-300 dark:text-gray-500 font-medium ">
              {updated ? (
                <span>
                  {`${new Date().getHours}:${new Date().getMinutes()}` !==
                  task.updatedTime
                    ? "Last updated"
                    : "just updated"}
                </span>
              ) : (
                <span className="lg:text-sm text-xs">{`${
                  justCreated === task.createdTime
                    ? "Just now"
                    : "Date created:"
                }   `}</span>
              )}

              <span className="lg:text-sm text-xs">{task.createdDate}</span>
              <span className="lg:text-sm text-xs">{task.createdTime}</span>
            </div>
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
