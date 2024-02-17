"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Calendar from "./calendar";

import { FaPlus } from "react-icons/fa";
import { Transition } from "@headlessui/react";
import Modal from "./modal";
import Button from "./Button";
import { departments } from "@/constants";
import DetailsBox from "./detailsBox";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebase.config";
import { T_ICON } from "@/public";

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
  const teamCollectionRef = collection(db, "teams");
  const [hoverOption, setHoverOption] = useState(false);
  const [selectedModal, setSelectedModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createTeam = async () => {
    setIsLoading(true);

    try {
      await addDoc(teamCollectionRef, {
        name: teamName,
        task: teamTask,
        dept: department,
        status: status,
        userId: auth?.currentUser?.uid,
      });
      setModal(false);
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getTeams = async () => {
      const data = await getDocs(teamCollectionRef);
      const allTeams = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setItems(allTeams);
    };

    getTeams();
  }, []);

  const handleSelectedTeam = (team: any) => {
    setSelectedTeam(team);
  };

  const handleDeleteTeam = async (id: any) => {
    const teamDoc = doc(db, "teams", id);
    await deleteDoc(teamDoc);

    setSelectedModal(false);
  };

  const handleUpdate = (team: any) => {
    setSelectedTeam(team);
    setModal(true);
    setSelectedModal(false);
  };

  const handleUpdateSelected = async (id: any) => {
    setIsLoading(true);
    if (id) {
      const teamDoc = doc(db, "teams", id.toString());
      const newTeams = {
        name: teamName,
        task: teamTask,
        dept: department,
        status: status,
      };

      try {
        await updateDoc(teamDoc, newTeams);

        console.log("docs updated");
      } catch (error) {
        console.log("could not update docs");
      }
    } else {
      console.log("invalid ID", id);
    }

    setModal(false);
  };
  return (
    <Transition
      className={`flex-none h-full w-80 lg:w-[20vw] fixed lg:right-0  top-0 lg:z-10 z-30 lg:mt-[8rem] mt-0 bg-white lg:px-0 px-5 lg:pt-0 pt-2 lg:mr-6 mr-0 shadow-md lg:shadow-none`}
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
        <div className="flex justify-between ">
          <span className="lg:text-xl text-sm">
            My Team{" "}
            <span className="text-purple-400 font-medium">
              {`(${items.length})`}
            </span>
          </span>
          <button
            className="text-sm border-2 border-border_color text-purple-400 font-medium w-10 h-10 flex item-center justify-center rounded-full  pt-3 hover:scale-90 transition-all duration-300"
            onClick={() => {
              setModal(true);
            }}
          >
            <FaPlus />
          </button>
        </div>
        <div className="max-h-[200px] border-b-2 pb-4  overflow-y-scroll">
          {items.length > 0 ? (
            items.map((item: any, i: number) => (
              <div
                className="mt-5 flex justify-between items-center hover:bg-purple-400 hover:bg-opacity-25 hover:opacity-20 hover:rounded-xl hover:px-2 transition-all duration-150 relative overflow-hidden"
                onMouseEnter={() => setHoverOption(true)}
                onMouseLeave={() => setHoverOption(false)}
              >
                <div className="flex gap-5">
                  <div>
                    <Image src={T_ICON} width={40} height={40} alt="image" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.9rem]">{item.dept}</span>
                    <span>{item.task}</span>
                  </div>
                </div>
                <div className="">
                  <span
                    className={`text-[0.85rem] p-2 rounded-xl text-white ${
                      item.status === "active"
                        ? "bg-green-300"
                        : item.status === "disabled"
                        ? "bg-red-300"
                        : ""
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                {hoverOption && (
                  <div className="absolute items-center justify-center inset-0 flex opacity-0 hover:opacity-100">
                    <div
                      className="bg-purple-900 px-2 rounded-xl cursor-pointer"
                      onClick={() => {
                        handleSelectedTeam(item);
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
            <div className="flex justify-center items-center ">
              <span className="text-gray-300 text-lg">no team to display</span>
            </div>
          )}
        </div>
        <Calendar />
      </div>
      <Modal
        isOpen={modal}
        isClose={() => {
          setModal(false);
          setSelectedTeam(null);
        }}
        closeBtnColor=" text-purple-400 border border-border_color"
      >
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
                <option value="active">active</option>
                <option value="disabled">disabled</option>
              </select>
            </div>
          </form>
          {selectedTeam ? (
            <Button
              text={`${isLoading ? "updating..." : "Update team"}`}
              textStyles=" text-purple-400 "
              btnStyles="rounded-3xl border-border_color py-3 mt-5"
              handleClick={() => handleUpdateSelected(selectedTeam)}
            />
          ) : (
            <Button
              text={`${isLoading ? "creating..." : "Add team"}`}
              textStyles=" text-purple-400"
              btnStyles="rounded-3xl border-border_color border py-3 mt-5"
              handleClick={createTeam}
            />
          )}
        </div>
      </Modal>
      <DetailsBox
        open={selectedModal}
        close={() => setSelectedModal(false)}
        items={selectedTeam}
        handleUpdate={() => handleUpdate(selectedTeam?.id)}
        handleDelete={() => handleDeleteTeam(selectedTeam?.id)}
      />
    </Transition>
  );
};

export default RightHero;
