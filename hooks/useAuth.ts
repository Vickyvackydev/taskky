import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase.config";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null); // set user state to null at initial
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
    return () => unsubscribe(); // render on user auth
  }, []);

  return { user, loading }; // returns the state when it is rendered
};
