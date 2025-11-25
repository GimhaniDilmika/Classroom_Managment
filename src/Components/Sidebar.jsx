import React, { useState } from "react";
import logo from "../assets/logo.png";
import {
  FaUsers,
  FaUserGraduate,
  FaClipboardList,
  FaVideo,
  FaBookOpen,
  FaChevronDown,
  FaChevronRight,
  FaSchool,
  FaBook,
  FaMoneyBill,
  FaCog,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const [openStudents, setOpenStudents] = useState(false);
  const [openTeachers, setOpenTeachers] = useState(false);
  const [openSubjects, setOpenSubjects] = useState(false);
  const [openAccounts, setOpenAccounts] = useState(false);

  // ---------- SIGN OUT HANDLER ----------
  function handleSignOut() {
    localStorage.removeItem("token");   // remove token if exists
    navigate("/");                 // redirect to sign-in page
  }

  return (
    <aside className="sidebar-wrapper">
      {/* LOGO */}
      <div className="sidebar-logo">
        <img src={logo} alt="logo" />
      </div>

      {/* NAVIGATION */}
      <nav className="sidebar-nav">

        {/* Dashboard */}
        <button
          className="sidebar-btn sidebar-btn-active"
          onClick={() => navigate("/dashboard")}
        >
          <FaBookOpen className="sidebar-icon" />
          Dashboard
        </button>

        {/* Classes */}
        <button className="sidebar-btn" onClick={() => navigate("/classes")}>
          <FaSchool className="sidebar-icon" />
          Classes
        </button>

        {/* STUDENTS */}
        <div>
          <button
            className="sidebar-dropdown-toggle"
            onClick={() => setOpenStudents(!openStudents)}
          >
            <span className="sidebar-dropdown-toggle-left">
              <FaUsers className="sidebar-icon" />
              Students
            </span>

            {openStudents ? (
              <FaChevronDown className="sidebar-dropdown-chevron" />
            ) : (
              <FaChevronRight className="sidebar-dropdown-chevron" />
            )}
          </button>

          {openStudents && (
            <div className="sidebar-submenu">
             <div className="sidebar-subitem"
              onClick={() => navigate("/students/list")}>
              Student List
             </div>


              <div
                className="sidebar-subitem"
                onClick={() => navigate("/students/add")}
              >
                Add Student
              </div>

              <div
                className="sidebar-subitem"
                onClick={() => navigate("/students/view")}
              >
                Student View
              </div>
            </div>
          )}
        </div>

        {/* TEACHERS */}
        <div>
          <button
            className="sidebar-dropdown-toggle"
            onClick={() => setOpenTeachers(!openTeachers)}
          >
            <span className="sidebar-dropdown-toggle-left">
              <FaUserGraduate className="sidebar-icon" />
              Teachers
            </span>

            {openTeachers ? (
              <FaChevronDown className="sidebar-dropdown-chevron" />
            ) : (
              <FaChevronRight className="sidebar-dropdown-chevron" />
            )}
          </button>

          {openTeachers && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => navigate("/teachers/list")}
              >
                Teacher List
              </div>

              <div
                className="sidebar-subitem"
                onClick={() => navigate("/teachers/add")}
              >
                Add Teacher
              </div>
            </div>
          )}
        </div>

        {/* SUBJECTS */}
        <div>
          <button
            className="sidebar-dropdown-toggle"
            onClick={() => setOpenSubjects(!openSubjects)}
          >
            <span className="sidebar-dropdown-toggle-left">
              <FaBook className="sidebar-icon" />
              Subjects
            </span>

            {openSubjects ? (
              <FaChevronDown className="sidebar-dropdown-chevron" />
            ) : (
              <FaChevronRight className="sidebar-dropdown-chevron" />
            )}
          </button>

          {openSubjects && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => navigate("/subjects/list")}
              >
                Subject List
              </div>

              <div
                className="sidebar-subitem"
                onClick={() => navigate("/subjects/add")}
              >
                Add Subject
              </div>
            </div>
          )}
        </div>

        {/* ACCOUNTS */}
        <div>
          <button
            className="sidebar-dropdown-toggle"
            onClick={() => setOpenAccounts(!openAccounts)}
          >
            <span className="sidebar-dropdown-toggle-left">
              <FaMoneyBill className="sidebar-icon" />
              Accounts
            </span>

            {openAccounts ? (
              <FaChevronDown className="sidebar-dropdown-chevron" />
            ) : (
              <FaChevronRight className="sidebar-dropdown-chevron" />
            )}
          </button>

          {openAccounts && (
            <div className="sidebar-submenu">
              <div
                className="sidebar-subitem"
                onClick={() => navigate("/fees/collection")}
              >
                Fees Collection
              </div>

              <div
                className="sidebar-subitem"
                onClick={() => navigate("/fees/expenses")}
              >
                Expenses
              </div>
            </div>
          )}
        </div>

        {/* LIVE SESSIONS */}
        <button
          className="sidebar-btn"
          onClick={() => navigate("/live-sessions")}
        >
          <FaVideo className="sidebar-icon" />
          Live Sessions
        </button>

        {/* ATTENDANCE */}
        <button
          className="sidebar-btn"
          onClick={() => navigate("/attendance")}
        >
          <FaClipboardList className="sidebar-icon" />
          Attendance
        </button>

       
      </nav>

      {/* SIGN OUT */}
      <button className="sidebar-signout" onClick={handleSignOut}>
        Sign Out
      </button>
    </aside>
  );
}
