import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQ3XAHXCRuSB840fgTS2IMpqkjYSG2oSQ",
  authDomain: "task-system-2c396.firebaseapp.com",
  projectId: "task-system-2c396",
  storageBucket: "task-system-2c396.appspot.com",
  messagingSenderId: "53220620278",
  appId: "1:53220620278:web:e52b78d178f59670d8b9d7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
