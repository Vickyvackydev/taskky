"use client";
import React, { useEffect, useState } from "react";
import PageHeader from "./pageHeader";
import { maxWidth } from "./width";
import TaskComponent from "./TaskComponent";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebase.config";
import { A_ICON } from "@/public";
import AddTaskModal from "./AddTaskModal";

const Activity = () => {
  const [modal, setModal] = useState(false);
  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [activities, setActivities] = useState<any>([]);
  const activitiesCollectionRef = collection(db, "activities");
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createActivity = async () => {
    setIsLoading(true);
    try {
      await addDoc(activitiesCollectionRef, {
        name: activityName,
        desc: description,
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

  const handleSelectedActivity = (act: any) => {
    setSelectedActivity(act);
  };

  const handleDeleteAct = async (id: any) => {
    const actDoc = doc(db, "activities", id.toString());
    await deleteDoc(actDoc);
  };

  const handleUpdate = (act: any) => {
    setSelectedActivity(act);
    setModal(true);
  };
  const handleUpdateSelected = async (id: any) => {
    setIsLoading(true);
    if (id) {
      const activityDoc = doc(db, "activities", id.toString());

      const newAct = {
        name: activityName,
        desc: description,
        status: status,
      };

      try {
        await updateDoc(activityDoc, newAct);
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
    <div className={maxWidth}>
      <PageHeader
        text="Your activities here"
        button={true}
        setState={setModal}
        btnText="Add activity"
        btnStyle="border-2 border-border_color"
        btnIconStyle="text-orange-400"
        btnTextStyle="text-orange-400"
      />

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
      />

      <AddTaskModal
        openModal={modal}
        closeModal={() => {
          setModal(false);
          setSelectedActivity(null);
        }}
        createTask={createActivity}
        setTaskName={(e: React.ChangeEvent<HTMLInputElement>) =>
          setActivityName(e.target.value)
        }
        setDescription={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        setStatus={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setStatus(e.target.value)
        }
        selectedTask={selectedActivity?.id}
        handleSelectedToUpdate={() =>
          handleUpdateSelected(selectedActivity?.id)
        }
        taskName="activity"
        btnStyle="border-border_color border"
        modalCloseColor={"border-border_color text-orange-400 border"}
        loading={isLoading}
        textColor="text-orange-400"
      />
    </div>
  );
};

export default Activity;
