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
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebase.config";
import { T_ICON } from "@/public";
import { useFetchFirestoreData } from "@/hooks";
import Deletemodal from "./Deletemodal";

type RightSideProps = {
  rightSide: boolean;
};

const RightHero = ({ rightSide }: RightSideProps) => {
  const [modal, setModal] = useState<boolean>(false);
  const [teamName, setTeamName] = useState("");
  const [teamTask, setTeamTask] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const teamCollectionRef = collection(db, "teams"); // collection for the team data from firestore
  const [hoverOption, setHoverOption] = useState(false);
  const [selectedModal, setSelectedModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { data: tasks } = useFetchFirestoreData("tasks");
  const doneTasks = tasks.map((task: any) => task.status);
  const { data: teams } = useFetchFirestoreData("teams");

  const createTeam = async () => {
    setIsLoading(true);

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        if (teamName && teamTask && department && status) {
          await addDoc(teamCollectionRef, {
            name: teamName,
            task: teamTask,
            dept: department,
            status: status,
            userId: currentUser?.uid,
          });
          setModal(false);
        } else {
          console.log("no details to display");
        }
      } else {
        console.log("no authenticated user");
      }
    } catch (error) {
      console.log("could not create task", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   setAuthGoogleImage(auth?.currentUser?.photoURL);
  // }, [auth?.currentUser]);
  // useEffect(() => {
  //   const getTeams = async () => {
  //     const data = await getDocs(teamCollectionRef);
  //     const allTeams = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     setItems(allTeams);
  //   };

  //   getTeams();
  // }, []);

  const handleSelectedTeam = (team: any) => {
    // select a team from the data
    setSelectedTeam(team);
  };

  const handleDeleteTeam = async (id: any) => {
    // delete a team from the data
    const teamDoc = doc(db, "teams", id);
    await deleteDoc(teamDoc);

    setSelectedModal(false);
  };

  const handleUpdate = (team: any) => {
    // select a team to update
    setSelectedTeam(team);
    setModal(true);
    setSelectedModal(false);
  };

  const handleUpdateSelected = async (id: any) => {
    // update the selected team
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
      className={`flex-none h-full w-80 lg:w-[20vw] fixed lg:right-0  top-0 lg:z-10 z-30 lg:mt-[8rem] mt-0 bg-white lg:px-0 px-5 lg:pt-0 pt-2 lg:mr-6 mr-0 shadow-md lg:shadow-none dark:bg-bg_black`}
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
          <span className="lg:text-xl text-sm dark:text-gray-400">
            My Team
            <span className="text-purple-400 font-medium">
              {`(${teams.length})`}
            </span>
          </span>
          <div
            className="tooltip  tooltip-bottom text-text_gray "
            data-tip="Add team"
          >
            <button
              className="text-sm border-2 border-border_color dark:border-gray-700 text-purple-400 font-medium w-10 h-10 flex item-center justify-center rounded-full  pt-3 hover:scale-90 transition-all duration-300"
              onClick={() => {
                setModal(true);
                setSelectedTeam(null);
              }}
            >
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="max-h-[200px] border-b-2 pb-4 dark:border-gray-700 overflow-y-scroll">
          {teams.length > 0 ? (
            teams.map((item: any, i: number) => (
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
                    <span className="text-[0.9rem] dark:text-gray-300">
                      {item.dept}
                    </span>
                    {/* <span>{item.task}</span>
                     */}
                    <span className="dark:text-gray-300">
                      {item.task.split(" ").length >= 5
                        ? `${item.task.slice(0, 10)}...`
                        : item.task}
                    </span>
                  </div>
                </div>
                <div className="">
                  <span
                    className={`text-[0.85rem] p-2 rounded-xl text-white ${
                      item.status === "active"
                        ? "bg-green-300 dark:bg-green-500"
                        : item.status === "disabled"
                        ? "bg-red-400 dark:bg-red-500"
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
              <span className="text-gray-300 text-lg dark:text-gray-700">
                no team to display
              </span>
            </div>
          )}
        </div>
        <Calendar />
        <div className="flex flex-col gap-5 ">
          <div className="stats shadow dark:bg-gray-900 ">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title dark:text-gray-300">Total Likes</div>
              <div className="stat-value text-primary">25.6K</div>
              <div className="stat-desc dark:text-gray-300">
                21% more than last month
              </div>
            </div>

            <div className="stat dark:bg-gray-900">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title dark:text-gray-300">Page Views</div>
              <div className="stat-value text-secondary">2.6M</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-value dark:text-gray-300">
                {doneTasks === "completed".length > 0
                  ? doneTasks === "completed".length
                  : 0}
              </div>
              <div className="stat-title dark:text-gray-300">Tasks done</div>
              <div className="stat-desc text-secondary ">
                {doneTasks === "active" + "pending".length || 0} tasks remaining
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modal}
        isClose={() => {
          setModal(false);
          setSelectedTeam(null);
        }}
        closeBtnColor=" text-purple-400 border border-border_color dark:border-gray-700"
        maxWidth="w-[450px]"
      >
        <div>
          <span className="dark:text-gray-300">
            Please fill in the details.
          </span>

          <form className="flex flex-col gap-5 mt-5">
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="" className="dark:text-gray-300">
                Team name
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter team name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTeamName(e.target.value)
                }
                className="w-full border h-12 outline-none rounded-lg pl-3 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
              />
            </div>

            <div className="flex flex-col items-start gap-1">
              <label htmlFor="" className="dark:text-gray-300">
                Team task
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter team task"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTeamTask(e.target.value)
                }
                className="w-full border h-12 outline-none rounded-lg pl-3 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="" className="dark:text-gray-300">
                Department
              </label>
              <select
                name="Select department"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setDepartment(e.target.value)
                }
                className="w-full border h-12 outline-none rounded-lg pl-3 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
              >
                <option value="">Select department </option>
                {departments.map((item) => (
                  <option value={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="" className="dark:text-gray-300">
                Status
              </label>

              <select
                name="status"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setStatus(e.target.value)
                }
                className="w-full border h-12 outline-none rounded-lg pl-3 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
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
              btnStyles="rounded-3xl border border-border_color py-3 mt-5 dark:border-gray-700"
              handleClick={() => handleUpdateSelected(selectedTeam)}
            />
          ) : (
            <Button
              text={`${isLoading ? "creating..." : "Add team"}`}
              textStyles=" text-purple-400"
              btnStyles="rounded-3xl border border-border_color py-3 mt-5 dark:border-gray-700"
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
        // handleDelete={() => handleDeleteTeam(selectedTeam?.id)}
        handleSelectToDelete={() => {
          setDeleteModal(true);

          setSelectedModal(false);
        }}
        actionBtns={true}
        modalname="Team"
        tasksdeatils={false}
      />

      <Deletemodal
        openModal={deleteModal}
        closeModal={() => setDeleteModal(false)}
        handleDelete={() => {
          handleDeleteTeam(selectedTeam?.id);
          setDeleteModal(false);
        }}
        componentText="team"
      />
    </Transition>
  );
};

export default RightHero;
//  end ..
