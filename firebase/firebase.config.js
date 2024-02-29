import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDF2dkYu5eofDX2MyL4WJn5IGQHMpYOa7w",
  authDomain: "task-management-92a29.firebaseapp.com",
  projectId: "task-management-92a29",
  storageBucket: "task-management-92a29.appspot.com",
  messagingSenderId: "306655590650",
  appId: "1:306655590650:web:6e7cabc9d1a92a9488b143",
  measurementId: "G-W5BXCZ14ML",

  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  // projectId: process.env.NEXT_PROJECT_ID,
  // storageBucket: process.env.NEXT_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_APP_ID,
  // measurementId: process.env.NEXT_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
