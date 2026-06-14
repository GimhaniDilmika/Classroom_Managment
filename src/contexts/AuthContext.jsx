import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole]       = useState(null);
  const [userName, setUserName]       = useState("");
  const [loading, setLoading]         = useState(true);

  async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const snap   = await getDoc(doc(db, "users", result.user.uid));
    if (snap.exists()) {
      setUserRole(snap.data().role);
      setUserName(snap.data().name);
    }
    return result;
  }

  async function register(name, email, password) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", result.user.uid), {
      name,
      email,
      role: "teacher",
      createdAt: serverTimestamp(),
    });
    setUserRole("teacher");
    setUserName(name);
    return result;
  }

  async function logout() {
    await signOut(auth);
    setUserRole(null);
    setUserName("");
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          setUserRole(snap.data().role);
          setUserName(snap.data().name);
        }
      } else {
        setUserRole(null);
        setUserName("");
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = { currentUser, userRole, userName, login, register, logout, resetPassword, loading };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
