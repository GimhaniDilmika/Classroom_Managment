import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import logo from "../assets/logo.png";


import {
  FaUsers,
  FaUserGraduate,
  FaClipboardList,
  FaVideo,
  FaBookOpen,
} from "react-icons/fa";




function StatCard({ label, value, sub, icon: Icon, variant }) {
  return (
    <div className={`stat-card ${variant}`}>
      <div className="stat-card-top">
        <div className="stat-card-icon">
          <Icon />
        </div>
        <div className="stat-card-text">
          <span className="stat-card-label">{label}</span>
          <span className="stat-card-value">{value}</span>
        </div>
      </div>
      <div className="stat-card-sub">{sub}</div>
      <div className="stat-card-bar" />
    </div>
  );
}

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
      <aside className="w-64 bg-indigo-900 text-indigo-50 flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-indigo-700">
          <div className="flex flex-col items-center gap-1">
            {/* Logo / avatar */}
            {
            <img src={logo} alt="logo" className="login-logo" />
            }
            
            <span className="text-xs text-indigo-200">Online Classroom</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          <button className="sidebar-btn sidebar-btn-active">
            <FaBookOpen className="sidebar-icon" />
            <span>Dashboard</span>
          </button>
          <button className="sidebar-btn">
            <FaClipboardList className="sidebar-icon" />
            <span>Classes</span>
          </button>
          <button className="sidebar-btn">
            <FaUserGraduate className="sidebar-icon" />
            <span>Teachers</span>
          </button>
          <button className="sidebar-btn">
            <FaUsers className="sidebar-icon" />
            <span>Students</span>
          </button>
          <button className="sidebar-btn">
            <FaClipboardList className="sidebar-icon" />
            <span>Assignments</span>
          </button>
          <button className="sidebar-btn">
            <FaVideo className="sidebar-icon" />
            <span>Live Sessions</span>
          </button>
          <button className="sidebar-btn">
            <FaClipboardList className="sidebar-icon" />
            <span>Attendance</span>
          </button>

          <div className="pt-4 mt-4 border-t border-indigo-800 text-xs uppercase tracking-wide text-indigo-300">
            Admin
          </div>
          <button className="sidebar-btn">
            <FaClipboardList className="sidebar-icon" />
            <span>Settings</span>
          </button>
          <button className="sidebar-btn">
            <FaUsers className="sidebar-icon" />
            <span>Users</span>
          </button>
        </nav>

       <button className="m-3 mt-auto flex items-center gap-3 px-3 py-2 rounded-lg bg-red-500/90 text-sm font-medium hover:bg-red-600">
         <span>Sign Out</span>
       </button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-slate-800">
            Online Classroom Management
          </h1>
        </header>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">
          ClassEase Dashboard
        </h2>

        {/* Stat cards row – like hostel screenshot */}
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

        {/* Lower section (same as before) */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Attendance donut */}
          <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col">
            <h3 className="font-semibold text-slate-700 mb-4">
              Overall Attendance
            </h3>
            <div className="flex items-center gap-8">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full border-[12px] border-emerald-500 border-t-slate-200 rotate-45"></div>
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-slate-800">86%</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-emerald-500" />
                  <span>Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-slate-300" />
                  <span>Absent</span>
                </div>
                <p className="text-xs text-slate-500 mt-4">
                  Attendance rate across all classes for today.
                </p>
              </div>
            </div>
          </div>

          {/* Upcoming classes */}
          <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col">
            <h3 className="font-semibold text-slate-700 mb-4">
              Upcoming Classes (Today)
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Structures</p>
                  <p className="text-xs text-slate-500">Room: CS-201 - Zoom</p>
                </div>
                <span className="time-chip">09:00 - 10:30</span>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Database Systems</p>
                  <p className="text-xs text-slate-500">
                    Room: CS-305 - Google Meet
                  </p>
                </div>
                <span className="time-chip">11:00 - 12:30</span>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Software Engineering</p>
                  <p className="text-xs text-slate-500">Room: CS-108 - Teams</p>
                </div>
                <span className="time-chip">14:00 - 15:30</span>
              </li>
            </ul>
          </div>

          {/* Time + quick stats */}
          <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center justify-center">
            <h3 className="font-semibold text-slate-700 mb-4">Server Time</h3>
            <div className="border border-indigo-300 rounded-xl px-8 py-4 text-3xl font-mono text-indigo-700 tracking-[0.2em] mb-6 time-box">
              {formattedTime}
            </div>
            <div className="w-full grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-slate-50 px-3 py-2">
                <p className="text-slate-500">Active Live Sessions</p>
                <p className="font-semibold text-slate-800">1</p>
              </div>
              <div className="rounded-lg bg-slate-50 px-3 py-2">
                <p className="text-slate-500">New Messages</p>
                <p className="font-semibold text-slate-800">8</p>
              </div>
              <div className="rounded-lg bg-slate-50 px-3 py-2">
                <p className="text-slate-500">Submissions Today</p>
                <p className="font-semibold text-slate-800">57</p>
              </div>
              <div className="rounded-lg bg-slate-50 px-3 py-2">
                <p className="text-slate-500">Pending Approvals</p>
                <p className="font-semibold text-slate-800">4</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
