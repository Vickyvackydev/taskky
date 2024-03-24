import { db } from "@/firebase/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ReverseStatus = async (collectionName: string, taskId: string) => {
  try {
    const taskDocRef = doc(db, collectionName, taskId);

    const taskDocSnapShot = await getDoc(taskDocRef);

    const previousStatus = taskDocSnapShot.data()?.prevStatus || "active";

    await updateDoc(taskDocRef, { status: previousStatus });

    console.log("task has being reverted to it old state");
  } catch (error) {
    console.log("could not revert status", error);
  }
};

export default ReverseStatus;
