import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
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

const VALID_ROLES = ["admin", "teacher", "student"];

function normalizeRole(role) {
  return VALID_ROLES.includes(role) ? role : "student";
}

function buildDefaultProfile(user) {
  const email = user?.email || "";
  const name = user?.displayName || email.split("@")[0] || "ClassEase User";
  const role = email.toLowerCase().includes("admin")
    ? "admin"
    : email.toLowerCase().includes("teacher")
      ? "teacher"
      : "student";

  return {
    name,
    email,
    role,
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUserProfile(user) {
    if (!user) {
      setUserProfile(null);
      return null;
    }

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      const data = snap.data();
      const profile = {
        uid: user.uid,
        name: data.name || user.displayName || user.email?.split("@")[0] || "ClassEase User",
        email: data.email || user.email,
        role: normalizeRole(data.role),
        status: data.status || "active",
        teacherId: data.teacherId || "",
        studentId: data.studentId || "",
        className: data.className || "",
        section: data.section || "",
        ...data,
      };
      setUserProfile(profile);
      return profile;
    }

    const profile = buildDefaultProfile(user);
    await setDoc(userRef, profile);
    const completedProfile = { uid: user.uid, ...profile };
    setUserProfile(completedProfile);
    return completedProfile;
  }

  async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await loadUserProfile(result.user);
    return result;
  }

  async function register(name, email, password, role = "student") {
    const safeRole = normalizeRole(role);
    const result = await createUserWithEmailAndPassword(auth, email, password);

    const profile = {
      name,
      email,
      role: safeRole,
      status: "active",
      teacherId: safeRole === "teacher" ? `T-${Date.now().toString().slice(-5)}` : "",
      studentId: safeRole === "student" ? `S-${Date.now().toString().slice(-5)}` : "",
      className: safeRole === "student" ? "Grade 10" : "",
      section: safeRole === "student" ? "A" : "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", result.user.uid), profile);
    setUserProfile({ uid: result.user.uid, ...profile });
    return result;
  }

  async function logout() {
    await signOut(auth);
    setUserProfile(null);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await loadUserProfile(user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = useMemo(() => ({
    currentUser,
    userProfile,
    userRole: userProfile?.role || null,
    userName: userProfile?.name || "",
    userEmail: userProfile?.email || currentUser?.email || "",
    isAdmin: userProfile?.role === "admin",
    isTeacher: userProfile?.role === "teacher",
    isStudent: userProfile?.role === "student",
    login,
    register,
    logout,
    resetPassword,
    loading,
  }), [currentUser, userProfile, loading]);

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
