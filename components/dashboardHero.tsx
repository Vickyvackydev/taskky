"use client";

import { boxesDetails } from "@/constants";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { FaCommentDots, FaDotCircle, FaInfo } from "react-icons/fa";

import TaskComponent, { TaskProps } from "./TaskComponent";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { A_ICON, P_ICON, T_ICON } from "@/public";
import PageHeader from "./pageHeader";

const DashboardHero = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [plans, setPlans] = useState<any>([]);
  const [activities, setActivities] = useState<any>([]);
  const tasksCollectionRef = collection(db, "tasks");
  const plansCollectionRef = collection(db, "plans");
  const activitiesCollectionRef = collection(db, "activities");
  const [modal, setModal] = useState<boolean>(false);

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [selectedTask, setSelectedTask] = useState<TaskProps | null | any>(
    null
  );
  const [allTasks] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = getDocs(tasksCollectionRef);
      const allTask = (await data).docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setTasks(allTask);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const getPlans = async () => {
      const data = await getDocs(plansCollectionRef);
      const allPlans = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setPlans(allPlans);
    };
    getPlans();
  }, []);

  useEffect(() => {
    const getActivity = async () => {
      const data = await getDocs(activitiesCollectionRef);
      const allActivity = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setActivities(allActivity);
    };

    getActivity();
  }, []);

  const handleSelectedTask = (task: any) => {
    setSelectedTask(task);
  };

  const handleDeleteTask = async (id: any) => {
    const userDoc = doc(db, "Tasks", id);
    await deleteDoc(userDoc);
  };

  const handleUpdateSelected = (task: any) => {
    setSelectedTask(task);
    setModal(true);
  };

  const handleSelectedToUpdate = async (id: any) => {
    if (id) {
      const taskDoc = doc(db, "Tasks", id.toString());
      const newFields = {
        name: taskName,
        desc: description,
        status: status,
      };

      try {
        await updateDoc(taskDoc, newFields);
        console.log("docs updated");
      } catch (error) {
        console.log("error updating docs", error);
      }
    } else {
      console.error("Invalid ID:", id);
    }
    setModal(false);
  };

  const allTaskies = allTasks ? tasks : tasks.slice(0, 4);

  return (
    <div className="flex justify-between lg:pl-2 pl-9 lg:pr-6 pr-5 lg:pt-6 pt-0 lg:flex-row flex-col items-center ">
      <div>
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
        {/* <Taskpage /> */}

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
          tasks={tasks}
          emptyText={"tasks"}
          deleteText="task"
          handleDelete={() => handleDeleteTask(selectedTask?.id)}
          handleSelector={handleSelectedTask}
          handleUpdate={handleUpdateSelected}
          iconType={T_ICON}
          deleteContentColor="bg-purple-400"
          modalCloseColor="bg-purple-400"
          // allTasks={allTaskies}
        />
      </div>
    </div>
  );
};

export default DashboardHero;
