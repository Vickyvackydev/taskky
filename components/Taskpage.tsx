"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Button from "./Button";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { useMediaQuery } from "@/hooks";
import Modal from "./modal";
import { log } from "console";
import { DeleteTask, createTask, getTask } from "@/API";

const tasknav = [
  {
    label: "Pending",
    leadTo: "",
  },
  {
    label: "New assigned",
    leadTo: "",
  },
  {
    label: "Completed",
    leadTo: "",
  },
];

type dataProps = {
  id: string;
  title: string;
  description: string;
  status: string;
};
const Taskpage = () => {
  const [modal, setModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [data, setData] = useState<any>([]);
  const smallScreen = useMediaQuery("(max-width: 640px)");

  const [tasks, setTasks] = useState({
    title: "",
    description: "",
    status: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTasks((prevTasks) => ({
      ...prevTasks,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTask();
        if (fetchedTasks) {
          console.log("tasks gotten");

          setData(fetchedTasks);
        } else {
          console.log("failed to get task");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  // console.log(data);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsCreating(true);
    try {
      const createdTask = await createTask(tasks);
      if (createdTask) {
        console.log("task created");
      } else {
        console.log("task not created");
      }
    } catch (error) {
      console.log('"error', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await DeleteTask(id);
    } catch (error) {
      console.log("didnt delete");
    }
  };
  return (
    <div className="mt-20">
      <div className="flex justify-between">
        <span className="text-2xl">My Tasks</span>
        <Button
          text="Add task"
          textStyles="text-white"
          btnStyles="rounded-3xl bg-purple-400 shadow-md shadow-purple-300 py-3"
          icon={<FaPlus />}
          iconStyles="pt-[0.125rem] text-white"
          handleClick={() => setModal(true)}
        />
      </div>
      <div className="mt-8">
        <div className="flex lg:gap-10 gap-2 lg:text-lg text-sm overflow-x-auto">
          {tasknav.map((item) => (
            <span>{item.label}</span>
          ))}
        </div>
        <hr className="mt-4" />
        {data?.data?.length > 0 &&
          data?.data?.map((item: any) => (
            <div
              className="mt-8 flex justify-between items-center bg-white shadow-lg py-3 px-3 rounded-lg"
              key={item.id}
            >
              <div className="flex gap-5">
                <div>
                  <Image src="/speed.png" width={60} height={60} alt="" />
                </div>
              </div>
              <div className="flex-col flex">
                <span>Task name:</span>
                <span>{item.title}</span>
              </div>
              <div className="flex-col flex">
                <span>Description:</span>
                <span>{item.description}</span>
              </div>
              <div className="flex-col flex">
                <span>status:</span>
                <span>{item.status}</span>
              </div>
              <div className="flex gap-5">
                <Button
                  text={`${smallScreen ? "" : "Update"}`}
                  textStyles="text-white"
                  btnStyles="rounded-3xl bg-purple-400 shadow-md shadow-purple-300 py-3"
                  icon={<FaPencilAlt />}
                  iconStyles="pt-[0.125rem] text-white"
                />
                <Button
                  text={`${smallScreen ? "" : "Delete"}`}
                  textStyles="text-white"
                  btnStyles="rounded-3xl bg-purple-400 shadow-md shadow-purple-300 py-3"
                  icon={<FaTrash />}
                  iconStyles="pt-[0.125rem] text-white"
                  handleClick={() => handleDelete(item.id)}
                />
              </div>
            </div>
          ))}
      </div>
      <Modal isOpen={modal} isClose={() => setModal(false)}>
        <div>
          <span>Please fill in the details</span>

          <form className="flex flex-col gap-5 mt-5">
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="">Title</label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Enter task name"
                className="w-full border h-12 outline-none rounded-lg pl-3"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="">Description</label>
              <input
                type="text"
                name="description"
                onChange={handleChange}
                placeholder="Enter description"
                className="w-full border h-12 outline-none rounded-lg pl-3"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="">Status</label>
              {/* <input
                type="text"
                name="status"
                onChange={handleChange}
                placeholder="Enter status"
                className="w-full border h-12 outline-none rounded-lg pl-3"
              /> */}
              <select
                name="status"
                value={tasks.status}
                onChange={handleChange}
                className="w-full border h-12 outline-none rounded-lg pl-3"
              >
                <option value="pendiente">pendiente</option>
                <option value="completada">completada</option>
              </select>
            </div>
          </form>
          <Button
            text="Create"
            loadingText="creating"
            loading={isCreating}
            textStyles="text-white"
            btnStyles="rounded-lg bg-purple-400 py-3 mt-5"
            handleClick={handleSubmit}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Taskpage;
