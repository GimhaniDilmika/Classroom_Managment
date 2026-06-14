import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRSbgvOJHIIw0grEo2Aegvo7h6NS_74Ns",
  authDomain: "classease-85853.firebaseapp.com",
  projectId: "classease-85853",
  storageBucket: "classease-85853.firebasestorage.app",
  messagingSenderId: "302666806135",
  appId: "1:302666806135:web:13377d9e4ca140f59ba772",
  measurementId: "G-P0CBB39TPJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);
export default app;
