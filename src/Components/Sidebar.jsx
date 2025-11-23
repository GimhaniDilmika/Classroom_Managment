import React from "react";
import logo from "../assets/logo.png";
import {
  FaUsers,
  FaUserGraduate,
  FaClipboardList,
  FaVideo,
  FaBookOpen,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // 👈 IMPORT THIS

export default function Sidebar() {
  const navigate = useNavigate(); // 👈 INITIALIZE

  return (
    <aside className="w-64 bg-indigo-900 text-indigo-50 flex flex-col">
      {/* TOP LOGO AREA */}
      <div className="h-16 flex items-center justify-center border-b border-indigo-700">
        <div className="flex flex-col items-center mt-4 mb-3">
          <img src={logo} alt="logo" className="login-logo" />
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
        {/* Dashboard */}
        <button
          className="sidebar-btn sidebar-btn-active"
          onClick={() => navigate("/dashboard")}   // 👈 ROUTE
        >
          <FaBookOpen className="sidebar-icon" />
          <span>Dashboard</span>
        </button>

        {/* Classes */}
        <button
          className="sidebar-btn"
          onClick={() => navigate("/classes")}
        >
          <FaClipboardList className="sidebar-icon" />
          <span>Classes</span>
        </button>

        {/* Teachers */}
        <button
          className="sidebar-btn"
          onClick={() => navigate("/teachers")}
        >
          <FaUserGraduate className="sidebar-icon" />
          <span>Teachers</span>
        </button>

        {/* Students */}
        <button
          className="sidebar-btn"
          onClick={() => navigate("/students")}   // 👈 STUDENT PAGE
        >
          <FaUsers className="sidebar-icon" />
          <span>Students</span>
        </button>

        {/* Assignments */}
        <button
          className="sidebar-btn"
          onClick={() => navigate("/assignments")}
        >
          <FaClipboardList className="sidebar-icon" />
          <span>Assignments</span>
        </button>

        {/* Live Sessions */}
        <button
          className="sidebar-btn"
          onClick={() => navigate("/live-sessions")}
        >
          <FaVideo className="sidebar-icon" />
          <span>Live Sessions</span>
        </button>

        {/* Attendance */}
        <button
          className="sidebar-btn"
          onClick={() => navigate("/attendance")}
        >
          <FaClipboardList className="sidebar-icon" />
          <span>Attendance</span>
        </button>

        {/* Admin section label */}
        <div className="pt-4 mt-4 border-t border-indigo-800 text-xs uppercase tracking-wide text-indigo-300">
          Admin
        </div>

        {/* Settings */}
        <button
          className="sidebar-btn"
          onClick={() => navigate("/settings")}
        >
          <FaClipboardList className="sidebar-icon" />
          <span>Settings</span>
        </button>

        {/* Users */}
        <button
          className="sidebar-btn"
          onClick={() => navigate("/users")}
        >
          <FaUsers className="sidebar-icon" />
          <span>Users</span>
        </button>
      </nav>

      {/* Sign Out */}
      <button className="m-3 mt-auto flex items-center gap-3 px-3 py-2 rounded-lg bg-red-500/90 text-sm font-medium hover:bg-red-600">
        <span>Sign Out</span>
      </button>
    </aside>
  );
}

