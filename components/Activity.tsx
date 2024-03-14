"use client";
import React, { useState } from "react";
import PageHeader from "./pageHeader";
import { maxWidth } from "./width";
import TaskComponent from "./TaskComponent";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebase.config";
import { A_ICON } from "@/public";
import AddTaskModal from "./AddTaskModal";
import { useFetchFirestoreData } from "@/hooks";
import MarkAsDone from "@/utils/markasdone";

const Activity = () => {
  const [modal, setModal] = useState(false);
  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const activitiesCollectionRef = collection(db, "activities");
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: activities, loading } = useFetchFirestoreData("activities");
  const [updated, setUpdated] = useState(false);

  const createActivity = async () => {
    // create activity
    setIsLoading(true);

    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        if (activityName && description && status) {
          await addDoc(activitiesCollectionRef, {
            name: activityName,
            desc: description,
            status: status,
            createdDate: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
            createdTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
            userId: currentUser?.uid,
          });
          setModal(false);
        } else {
          console.log("no data to display");
        }
      } else {
        console.log("no authenticated user");
      }
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectedActivity = (act: any) => {
    // select an activity listed
    setSelectedActivity(act);
  };

  const handleDeleteAct = async (id: any) => {
    //  delete an activity
    const actDoc = doc(db, "activities", id.toString());
    await deleteDoc(actDoc);
  };

  const handleUpdate = (act: any) => {
    // select a particular activity to update
    setSelectedActivity(act);
    setModal(true);
  };

  const handleUpdateSelected = async (id: any) => {
    // update the selcted activity
    setIsLoading(true);
    if (id) {
      const activityDoc = doc(db, "activities", id.toString());

      const newAct = {
        name: activityName,
        desc: description,
        status: status,
        createdDate: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
        createdTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
      };

      try {
        await updateDoc(activityDoc, newAct);
        console.log("docs updated");
        setModal(false);
        setUpdated(true);
      } catch (error) {
        console.log("could not update docs");
      }
    } else {
      console.log("invalid ID", id);
    }
  };

  return (
    <div className={maxWidth}>
      {/* page-header component */}
      <PageHeader
        text="Your activities here"
        textStyle="dark:text-gray-300"
        button={true}
        setState={() => {
          setModal(true);
          setSelectedActivity(null);
        }}
        btnText="Add activity"
        btnStyle="border-2 border-border_color dark:border-gray-700"
        btnIconStyle="text-orange-400"
        btnTextStyle="text-orange-400"
      />

      {/* task component mapping activities data */}

      <TaskComponent
        tasks={activities}
        emptyText={"activities"}
        deleteText="activity"
        handleDelete={() => handleDeleteAct(selectedActivity?.id)}
        handleSelector={handleSelectedActivity}
        handleUpdate={handleUpdate}
        iconType={A_ICON}
        deleteContentColor="bg-orange-400"
        modalCloseColor="bg-orange-400"
        modalname="Activity"
        updated={updated}
        loading={loading}
        markAsDone={() => MarkAsDone("activities", selectedActivity?.id)}
      />

      {/* task modal to add task and update task */}

      <AddTaskModal
        openModal={modal}
        closeModal={() => {
          setModal(false);
          setSelectedActivity(null);
        }}
        createTask={createActivity}
        setTaskName={(e: React.ChangeEvent<HTMLInputElement>) =>
          setActivityName(e.target?.value)
        }
        setDescription={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target?.value)
        }
        setStatus={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setStatus(e.target?.value)
        }
        selectedTask={selectedActivity?.id}
        handleSelectedToUpdate={() =>
          handleUpdateSelected(selectedActivity?.id)
        }
        taskName="activity"
        btnStyle="border-border_color border"
        modalCloseColor={
          " border border-border_color text-red-400 dark:border-gray-700"
        }
        loading={isLoading}
        textColor="text-orange-400"
      />
    </div>
  );
};

export default Activity;

// end..
