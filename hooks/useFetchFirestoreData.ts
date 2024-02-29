import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase.config";

export const useFetchFirestoreData = (collectionName: string) => {
  const [data, setData] = useState<any>([]);
  const collectionRef = collection(db, collectionName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser?.uid) {
          const userTasksQuery = query(
            collectionRef,
            where("userId", "==", currentUser.uid)
          );
          const querySnapshot = await getDocs(userTasksQuery);
          const tasksData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(tasksData);
        } else {
          console.log("no data");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [collectionRef]);

  return data;
};
