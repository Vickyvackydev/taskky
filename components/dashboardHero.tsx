"use client";
import { boxesDetails } from "@/constants";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import TaskComponent, { TaskProps } from "./TaskComponent";
import { A_ICON, P_ICON, T_ICON } from "@/public";
import PageHeader from "./pageHeader";
import { useFetchFirestoreData } from "@/hooks";
import { useSearchQuery } from "@/context/searchContext";
import { Transition } from "@headlessui/react";

const DashboardHero = () => {
  const { showTopContent, searchQuery } = useSearchQuery();
  const [modal, setModal] = useState<boolean>(false);

  const [selectedTask, setSelectedTask] = useState<TaskProps | null | any>(
    null
  );
  const { data: plans } = useFetchFirestoreData("plans");
  const { data: tasks } = useFetchFirestoreData("tasks");
  const { data: activities } = useFetchFirestoreData("activities");

  const filteredTasks = tasks.filter((task: any) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectedTask = (task: any) => {
    setSelectedTask(task);
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
              
              flex flex-col justify-between lg:w-[280px] w-[300px] h-[200px] rounded-xl bg-opacity-50 pt-7 px-5 border-2 border-gray-100 text-`}
                key={item.id}
              >
                <div className="flex justify-between items-center">
                  <div
                    className={`flex justify-center items-center w-12 h-12 rounded-full border-2 border-border_color shadow-sm`}
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
                  <span className="text-xl text-black">{item.title}</span>
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
                  <span className="text-3xl text-text_black">
                    {item.id === 1
                      ? tasks.length
                      : item.id === 2
                      ? plans.length
                      : item.id === 3
                      ? activities.length
                      : item.num}
                  </span>
                  <span>{item.when}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <Transition
          show={filteredTasks.length > 0}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <PageHeader
            text="Tasks"
            btnText="Add task"
            setState={setModal}
            button={false}
            textStyle="text-xl"
            style="pt-16"
            btnStyle="border-2 border-border_color"
            btnIconStyle="text-purple-400"
            btnTextStyle="text-purple-400"
            pathname="/Dashboard/tasks"
          />

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
            // allTasks={allTaskies}
          />
        </Transition>
      </div>
    </div>
  );
};

export default DashboardHero;
