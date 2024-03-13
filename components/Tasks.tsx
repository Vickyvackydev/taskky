"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { FaPlus } from "react-icons/fa";
import Modal from "./modal";
import TaskComponent, { TaskProps } from "./TaskComponent";
import PageHeader from "./pageHeader";
import { maxWidth } from "./width";
import { useFetchFirestoreData } from "@/hooks";
import {
  FieldValue,
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebase.config";
import { T_ICON } from "@/public";
import AddTaskModal from "./AddTaskModal";
import MarkAsDone from "@/utils/markasdone";

const Tasks = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const tasksCollectionRef = collection(db, "tasks");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [selectedTask, setSelectedTask] = useState<TaskProps | null | any>(
    null
  );
  const { data: tasks, loading } = useFetchFirestoreData("tasks");

  const createTask = async () => {
    setIsLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        if (taskName && description && status) {
          await addDoc(tasksCollectionRef, {
            name: taskName,
            desc: description,
            status: status,
            createdDate: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
            createdTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
            userId: currentUser.uid,
            createdAt: serverTimestamp(),
          });
          setModal(false);
        } else {
          console.log("Please fill in all fields.");
        }
      } else {
        console.log("No user authenticated.");
      }
    } catch (error) {
      console.log("Something went wrong:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectedTask = (task: any) => {
    setSelectedTask(task);
  };

  const handleDeleteTask = async (id: any) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
  };

  const handleUpdateSelected = (task: any) => {
    setSelectedTask(task);

    setDescription(description);
    setTaskName(taskName);
    setStatus(status);

    setModal(true);
  };

  const handleSelectedToUpdate = async (id: any) => {
    setIsLoading(true);

    if (id) {
      const taskDoc = doc(db, "tasks", id.toString());
      const newFields = {
        name: taskName,
        desc: description,
        status: status,
        createdDate: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
        createdTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
        updatedTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
        createdAt: serverTimestamp(),
      };

      try {
        await updateDoc(taskDoc, newFields);
        setUpdated(true);
        console.log("docs updated");
      } catch (error) {
        console.log("error updating docs", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("Invalid ID:", id);
    }
    setModal(false);
  };

  const handleClose = () => {
    setModal(false);
    setSelectedTask(null);
  };

  // const markAsDone = async (taskId: any) => {
  //   try {
  //     const taskDocRef = doc(db, "tasks", taskId);
  //     await updateDoc(taskDocRef, { status: "completed" });

  //     console.log("status has being updated");
  //   } catch (error) {
  //     console.log("error marking task as done", error);
  //   }
  // };
  return (
    <div className={maxWidth}>
      <PageHeader
        text="Your Task Page"
        textStyle="dark:text-gray-300"
        button={true}
        setState={setModal}
        btnText="Add task"
        btnStyle="border-2 border-border_color dark:border-gray-700"
        btnIconStyle="text-purple-400"
        btnTextStyle="text-purple-400"
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
        modalname="Task"
        updated={updated}
        loading={loading}
        markAsDone={() => MarkAsDone("tasks", selectedTask?.id)}
      />
      <AddTaskModal
        openModal={modal}
        closeModal={handleClose}
        handleSelectedToUpdate={() => handleSelectedToUpdate(selectedTask?.id)}
        createTask={createTask}
        setDescription={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target?.value)
        }
        setTaskName={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTaskName(e.target?.value)
        }
        setStatus={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setStatus(e.target?.value)
        }
        btnStyle="border-border_color border"
        selectedTask={selectedTask?.id}
        taskName="Task"
        modalCloseColor={
          "border-border_color border text-purple-400 dark:border-gray-700"
        }
        loading={isLoading}
        textColor="text-purple-400"
      />
    </div>
  );
};

export default Tasks;
