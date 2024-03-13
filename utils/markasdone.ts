import { db } from "@/firebase/firebase.config";
import { doc, updateDoc } from "firebase/firestore";

const MarkAsDone = async (collectionName: string, taskId: any) => {
  try {
    const taskDocRef = doc(db, collectionName, taskId);
    await updateDoc(taskDocRef, { status: "completed" });
    console.log("Status has been updated");
  } catch (error) {
    console.log("Error marking task as done:", error);
  }
};

export default MarkAsDone;
