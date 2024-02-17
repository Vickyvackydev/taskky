"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { FaPlus } from "react-icons/fa";
import Modal from "./modal";
import TaskComponent, { TaskProps } from "./TaskComponent";
import PageHeader from "./pageHeader";
import { maxWidth } from "./width";
import { useMediaQuery } from "@/hooks";
import {
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebase.config";
import { T_ICON } from "@/public";
import AddTaskModal from "./AddTaskModal";
import { useAuth } from "@/context/AuthContext";

const Tasks = () => {
  const { currentUser } = useAuth();
  const [modal, setModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const [tasks, setTasks] = useState<any>([]);
  const tasksCollectionRef = collection(db, "tasks");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [selectedTask, setSelectedTask] = useState<TaskProps | null | any>(
    null
  );

  const isSmallScreen = useMediaQuery("(max-width: (600px))");

  const createTask = async () => {
    setIsLoading(true);

    try {
      if (taskName && description && status) {
        await addDoc(tasksCollectionRef, {
          name: taskName,
          desc: description,
          status: status,
          userId: auth?.currentUser?.uid,
        });
        setModal(false);
      } else {
        console.log("no user authenticated");
      }
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(tasksCollectionRef);

      const getData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setTasks(getData);
    };

    getTasks();
  }, []);

  const handleSelectedTask = (task: any) => {
    setSelectedTask(task);
  };

  const handleDeleteTask = async (id: any) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
  };

  const handleUpdateSelected = (task: any) => {
    setSelectedTask(task);
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

  const handleClose = () => {
    setModal(false);
    setSelectedTask(null);
  };
  return (
    <div className={maxWidth}>
      <PageHeader
        text="Your Task Page"
        button={true}
        setState={setModal}
        btnText="Add task"
        btnStyle="border-2 border-border_color"
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
        taskName="task"
        modalCloseColor={"border-border_color border text-purple-400"}
        loading={isLoading}
        textColor="text-purple-400"
      />
    </div>
  );
};

export default Tasks;
