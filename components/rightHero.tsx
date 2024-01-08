"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Calendar from "./calendar";
import { useMediaQuery } from "@/hooks";
import { FaArrowAltCircleLeft, FaBars, FaPlus } from "react-icons/fa";
import { Transition } from "@headlessui/react";
import Modal from "./modal";
import Button from "./Button";
import { departments } from "@/constants";
import DetailsBox from "./detailsBox";

type RightSideProps = {
  rightSide: boolean;
};
const RightHero = ({ rightSide }: RightSideProps) => {
  const [modal, setModal] = useState<boolean>(false);
  const [teamName, setTeamName] = useState("");
  const [teamTask, setTeamTask] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [items, setItems] = useState<any>([]);
  const [hoverOption, setHoverOption] = useState(false);
  const [selectedModal, setSelectedModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<any | null>(null);

  const handleSelectedDetails = (id: any) => {
    setSelectedDetails(items[id]);
  };

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleAddItems = () => {
    const formData = {
      input1: teamName,
      input2: teamTask,
      depart: department,
      stat: status,
    };

    setItems([...items, formData]);
    setModal(false);
  };
  return (
    <Transition
      className={`flex-none h-full w-80 lg:w-[20vw] fixed lg:static lg:z-10 z-30 lg:mt-[8rem] mt-0 bg-white lg:px-0 px-5 lg:pt-0 pt-2`}
      as={"div"}
      show={rightSide}
      enter="transition-all ease-in duration-500"
      enterFrom="transform -translate-x-full"
      enterTo="transform -translate-x-0"
      leave="transition-all ease-out duration-500"
      leaveFrom="transform -translate-x-0"
      leaveTo="transform -translate-x-full"
    >
      <div className="">
        {/* <div className="lg:hidden block absolute left-5">
        <FaArrowAltCircleLeft />
      </div> */}
        <div className="flex justify-between ">
          <span className="lg:text-xl text-sm">
            My Team{" "}
            <span className="text-purple-400 font-semibold">
              {`(${items.length})`}
            </span>
          </span>
          <button
            className="text-sm bg-purple-400 font-medium w-10 h-10 flex item-center justify-center rounded-full text-white pt-3 hover:scale-90 transition-all duration-300"
            onClick={() => setModal(true)}
          >
            <FaPlus />
          </button>
        </div>
        <div className="max-h-[400px] border-b-2 pb-4">
          {items.length > 0 ? (
            items.map((item: any, i) => (
              <div
                className="mt-5 flex justify-between items-center hover:bg-purple-400 hover:bg-opacity-25 hover:opacity-20 hover:rounded-xl hover:px-2 transition-all duration-150 relative overflow-hidden"
                onMouseEnter={() => setHoverOption(true)}
                onMouseLeave={() => setHoverOption(false)}
              >
                <div className="flex gap-5">
                  <div>
                    <Image
                      src="/speed.png"
                      width={40}
                      height={40}
                      alt="image"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.9rem]">{item.depart}</span>
                    <span>{item.input2}</span>
                  </div>
                </div>
                <div className="">
                  <span
                    className={`text-[0.85rem] p-2 rounded-xl text-white ${
                      item.stat === "Active"
                        ? "bg-green-300"
                        : item.stat === "Disabled"
                        ? "bg-red-300"
                        : ""
                    }`}
                  >
                    {item.stat}
                  </span>
                </div>
                {hoverOption && (
                  <div className="absolute items-center justify-center inset-0 flex opacity-0 hover:opacity-100">
                    <div
                      className="bg-purple-900 px-2 rounded-xl cursor-pointer"
                      onClick={() => {
                        handleSelectedDetails(i);
                        setSelectedModal(true);
                      }}
                    >
                      <span className="text-white text-sm">See more</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <span>no items to display</span>
          )}
        </div>
        <Calendar />
      </div>
      <Modal isOpen={modal} isClose={() => setModal(false)}>
        <div>
          <span>Please fill in the details</span>

          <form className="flex flex-col gap-5 mt-5">
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="">Team name</label>
              <input
                type="text"
                name="title"
                placeholder="Enter team name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTeamName(e.target.value)
                }
                className="w-full border h-12 outline-none rounded-lg pl-3"
              />
            </div>

            <div className="flex flex-col items-start gap-1">
              <label htmlFor="">Team task</label>
              <input
                type="text"
                name="title"
                placeholder="Enter team task"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTeamTask(e.target.value)
                }
                className="w-full border h-12 outline-none rounded-lg pl-3"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="">Department</label>
              <select
                name="Select department"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setDepartment(e.target.value)
                }
                className="w-full border h-12 outline-none rounded-lg pl-3"
              >
                <option value="">Select department </option>
                {departments.map((item) => (
                  <option value={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="">Status</label>

              <select
                name="status"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setStatus(e.target.value)
                }
                className="w-full border h-12 outline-none rounded-lg pl-3"
              >
                <option value="Select status">Select status</option>
                <option value="Active">Active</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>
          </form>
          <Button
            text="Add team"
            textStyles="text-white"
            btnStyles="rounded-lg bg-purple-400 py-3 mt-5"
            handleClick={handleAddItems}
          />
        </div>
      </Modal>
      <DetailsBox
        open={selectedModal}
        close={() => setSelectedModal(false)}
        items={selectedDetails}
      />
    </Transition>
  );
};

export default RightHero;
