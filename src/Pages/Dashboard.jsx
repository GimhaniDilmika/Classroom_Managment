import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import {
  FaUserGraduate,
  FaClipboardList,
  FaVideo,
  FaBookOpen,
} from "react-icons/fa";

import Sidebar from "../Components/Sidebar.jsx";
import StatCard from "../Components/StatCard.jsx";
import AttendanceOverview from "../Components/AttendanceOverview.jsx";
import UpcomingClasses from "../Components/UpcomingClasses.jsx";
import ServerTimeCard from "../Components/ServerTimeCard.jsx";




export default function Dashboard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-GB", { hour12: false });

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-slate-800">
             Classroom Management System
          </h1>
        </header>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">
          ClassEase Dashboard
        </h2>

        {/* Stat cards row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Students"
            value="184"
            sub="Active today"
            icon={FaUserGraduate}
            variant="stat-card-students"
          />
          <StatCard
            label="Classes"
            value="12"
            sub="Ongoing"
            icon={FaBookOpen}
            variant="stat-card-classes"
          />
          <StatCard
            label="Assignments"
            value="23"
            sub="Pending grading"
            icon={FaClipboardList}
            variant="stat-card-assignments"
          />
          <StatCard
            label="Live Sessions"
            value="3"
            sub="In progress / upcoming"
            icon={FaVideo}
            variant="stat-card-live"
          />
        </section>

        {/* Lower section */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <AttendanceOverview />
          <UpcomingClasses />
          <ServerTimeCard formattedTime={formattedTime} />
        </section>
        

        

      </main>
    </div>
  );
}
