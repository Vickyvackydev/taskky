import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase.config";

export const useFetchFirestoreData = (collectionName: string) => {
  const [data, setData] = useState<any>([]);
  const collectionRef = collection(db, collectionName);
  const [loading, setLoading] = useState(true);

  // this hooks render to fetch the data from a specific authenticated user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = auth.currentUser; // get the currentuser
        if (currentUser?.uid) {
          // render when there is a user uid from firebase
          const userTasksQuery = query(
            collectionRef,
            where("userId", "==", currentUser.uid) // query and render the data that has the userId
          );
          const querySnapshot = await getDocs(userTasksQuery);
          const tasksData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setData(tasksData); // get the data from the authenticated userId
        } else {
          console.log("no data");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionRef]);

  return { data, loading }; // return the state to fetch the data and loading state when data is fetching
};
