"use client";
import { boxesDetails } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import TaskComponent, { TaskProps } from "./TaskComponent";
import { A_ICON, P_ICON, T_ICON } from "@/public";
import PageHeader from "./pageHeader";
import { useFetchFirestoreData, useMediaQuery } from "@/hooks";
import { useSearchQuery } from "@/context/searchContext";
import { Transition } from "@headlessui/react";

const DashboardHero = () => {
  const { showTopContent, searchQuery } = useSearchQuery(); // coming from useQueryContext to handle search from navbar to the dashboardHero
  const [modal, setModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TaskProps | null | any>(
    null
  );
  const { data: plans } = useFetchFirestoreData("plans"); // fetching data from the plans data from firebase firestore
  const { data: tasks } = useFetchFirestoreData("tasks"); // fetching data from the tasks data from firebase firestore
  const { data: activities } = useFetchFirestoreData("activities"); // fetching data from the activitiess data from firebase firestore

  const mobileScreen = useMediaQuery("(max-width: 640px)");

  // filter the task data when searched by task name
  const filteredTasks = tasks.filter((task: any) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectedTask = (task: any) => {
    setSelectedTask(task);
  };

  // function to in use but generated to detect time task was created
  const formatTimeElapsed = (timestamp: any) => {
    const now: any = new Date();
    const taskDate: any = new Date(timestamp);

    const diffInMs = now - taskDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInMinutes < 1) {
      return "just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else if (diffInMinutes < 2880) {
      return "yesterday";
    } else {
      const diffInDays = Math.floor(diffInMinutes / 1440);
      return `${diffInDays} days ago`;
    }
  };

  return (
    <div
      className={`flex justify-between lg:pl-2 pl-0 lg:pr-6 pr-0 lg:pt-6 pt-0 lg:flex-row flex-col items-center `}
    >
      <div>
        {showTopContent && (
          <div className="flex gap-5 lg:flex-row flex-col">
            {boxesDetails.map((item) => (
              <div
                className={`
              
              flex flex-col justify-between lg:w-[280px] w-[300px] h-[200px] rounded-xl bg-opacity-50 pt-7 px-5 border-2 border-gray-100 dark:border-gray-700 dark:bg-gray-900 text-`}
                key={item.id}
              >
                <div className="flex justify-between items-center">
                  <div
                    className={`flex justify-center items-center w-12 h-12 rounded-full border-2 border-border_color dark:border-gray-700  shadow-sm`}
                  >
                    <Image
                      src={
                        item.id === 1
                          ? T_ICON
                          : item.id === 2
                          ? P_ICON
                          : item.id === 3
                          ? A_ICON
                          : item.icon
                      }
                      width={item.id === 1 ? 30 : 20}
                      height={20}
                      alt="image"
                    />
                  </div>
                  <span className="text-xl text-black dark:text-gray-300">
                    {item.title}
                  </span>
                  <span
                    className={
                      item.id === 1
                        ? "text-purple-400"
                        : item.id === 2
                        ? "text-red-500"
                        : item.id === 3
                        ? "text-orange-400"
                        : ""
                    }
                  >
                    <FaDotCircle />
                  </span>
                </div>
                <div className="flex-1 mt-16 flex gap-4 items-center">
                  <span className="text-3xl text-text_black dark:text-green-500">
                    {item.id === 1
                      ? tasks.length
                      : item.id === 2
                      ? plans.length
                      : item.id === 3
                      ? activities.length
                      : item.num}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        {searchQuery === "" && ( //component mounts if search is empty
          <PageHeader
            text="Tasks"
            btnText="Add task"
            setState={setModal}
            button={false}
            textStyle="text-xl dark:text-gray-300"
            style="pt-16"
            btnStyle="border-2 border-border_color"
            btnIconStyle="text-purple-400"
            btnTextStyle="text-purple-400"
            pathname="/Dashboard/tasks"
          />
        )}

        <Transition
          show={filteredTasks.length > 0} // would show the filtered task when there is filteredtask
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <TaskComponent
            tasks={filteredTasks.slice(0, 4)}
            emptyText={"tasks"}
            deleteText="task"
            // handleDelete={() => handleDeleteTask(selectedTask?.id)}
            handleSelector={handleSelectedTask}
            // handleUpdate={handleUpdateSelected}
            iconType={T_ICON}
            deleteContentColor="bg-purple-400"
            modalCloseColor="bg-purple-400"
            handleDelete={function (id: any): void {
              throw new Error("Function not implemented.");
            }}
            handleUpdate={function (task: any): void {
              throw new Error("Function not implemented.");
            }}
            updated={undefined}
            loading={false}
            markAsDone={undefined} // allTasks={allTaskies}
          />
        </Transition>

        <Transition // displays when there is no task found
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          show={filteredTasks.length === 0}
          className={`flex justify-center items-center flex-col gap-3 ${
            !showTopContent ? "w-[55rem]" : ""
          }`}
        >
          <Image
            src={"/no_tasks_found.png"}
            width={mobileScreen ? 50 : 200}
            height={200}
            alt="no task"
            className="opacity-25"
          />
          <span className="lg:text-2xl text-lg  text-gray-400 ">
            Oops!! No Task Found
          </span>
        </Transition>
      </div>
    </div>
  );
};

export default DashboardHero;

// end..
