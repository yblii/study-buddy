import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8gp7PgF68PhLfbbcNJoHO999IBmcUiu4",
  authDomain: "study-ducky-9ca1b.firebaseapp.com",
  projectId: "study-ducky-9ca1b",
  storageBucket: "study-ducky-9ca1b.firebasestorage.app",
  messagingSenderId: "172628798765",
  appId: "1:172628798765:web:af70662080032383f137a4",
  measurementId: "G-TTJ5K2BHEQ"
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);