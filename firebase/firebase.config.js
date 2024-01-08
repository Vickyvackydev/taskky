import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDF2dkYu5eofDX2MyL4WJn5IGQHMpYOa7w",
  authDomain: "task-management-92a29.firebaseapp.com",
  projectId: "task-management-92a29",
  storageBucket: "task-management-92a29.appspot.com",
  messagingSenderId: "306655590650",
  appId: "1:306655590650:web:6e7cabc9d1a92a9488b143",
  measurementId: "G-W5BXCZ14ML",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

// export const firestore = app.firestore();
