"use client";
import React, { useEffect, useState } from "react";
import PageHeader from "./pageHeader";
import { maxWidth } from "./width";
import Modal from "./modal";
import Button from "./Button";
import TaskComponent, { TaskProps } from "./TaskComponent";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebase.config";
import { P_ICON } from "@/public";
import AddTaskModal from "./AddTaskModal";

const Plans = () => {
  const [modal, setModal] = useState(false);
  const [planName, setPlanName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [plans, setPlans] = useState<any>([]);
  const plansCollectionRef = collection(db, "plans");
  const [selectedPlan, setSelectedPlan] = useState<TaskProps | null | any>(
    null
  );

  const [isLoading, setIsLoading] = useState(false);

  const createPlan = async () => {
    setIsLoading(true);
    try {
      await addDoc(plansCollectionRef, {
        name: planName,
        desc: description,
        status: status,
        userId: auth?.currentUser?.uid,
      });
      setModal(true);
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setIsLoading(false);
    }

    setModal(false);
  };
  useEffect(() => {
    const getPlans = async () => {
      const data = await getDocs(plansCollectionRef);
      const allPlans = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setPlans(allPlans);
    };
    getPlans();
  }, []);

  const handleSelectedPlan = (plan: any) => {
    setSelectedPlan(plan);
  };

  const handleDeletePlan = async (id: any) => {
    const planDoc = doc(db, "plans", id);
    await deleteDoc(planDoc);
  };

  const handleUpdate = (plan: any) => {
    setSelectedPlan(plan);
    setModal(true);
  };

  const handleUpdateSelected = async (id: any) => {
    setIsLoading(true);
    if (id) {
      const planDoc = doc(db, "plans", id.toString());
      const newPlans = {
        name: planName,
        desc: description,
        status: status,
      };

      try {
        await updateDoc(planDoc, newPlans);
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
        text="Your plans here"
        button={true}
        setState={setModal}
        btnText="Add plan"
        btnStyle="border-2 border-border_color"
        btnIconStyle="text-red-400"
        btnTextStyle="text-red-400"
      />

      <TaskComponent
        tasks={plans}
        emptyText={"plans"}
        deleteText="plan"
        handleDelete={() => handleDeletePlan(selectedPlan?.id)}
        handleSelector={handleSelectedPlan}
        handleUpdate={handleUpdate}
        iconType={P_ICON}
        deleteContentColor="bg-red-400"
        modalCloseColor="bg-red-400"
      />

      <AddTaskModal
        openModal={modal}
        closeModal={() => {
          setModal(false);
          setSelectedPlan(null);
        }}
        handleSelectedToUpdate={() => handleUpdateSelected(selectedPlan?.id)}
        createTask={createPlan}
        selectedTask={selectedPlan?.id}
        setTaskName={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPlanName(e.target?.value)
        }
        setDescription={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target?.value)
        }
        setStatus={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setStatus(e.target?.value)
        }
        taskName="plan"
        btnStyle="border border-border_color"
        modalCloseColor={"border border-border_color text-red-400"}
        loading={isLoading}
        textColor="text-red-400"
      />
    </div>
  );
};

export default Plans;