import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBUxzFTcDaT_YAPTUdb_pKpBy1qgpXWPPM",
  authDomain: "vedique-9e21f.firebaseapp.com",
  projectId: "vedique-9e21f",
  storageBucket: "vedique-9e21f.firebasestorage.app",
  messagingSenderId: "251860916927",
  appId: "1:251860916927:web:d371e3d2a3f87c9866440a",
  measurementId: "G-Z6RM6DDJJL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);