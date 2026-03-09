import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import {
  FaUsers, FaUserGraduate, FaClipboardList, FaVideo,
  FaBookOpen, FaChevronDown, FaChevronRight, FaSchool,
  FaBook, FaMoneyBill, FaSun, FaMoon, FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [openStudents, setOpenStudents] = useState(false);
  const [openTeachers, setOpenTeachers] = useState(false);
  const [openSubjects, setOpenSubjects] = useState(false);
  const [openAccounts, setOpenAccounts] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  function handleSignOut() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        :root {
          --sb-bg: linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
          --sb-text: #e2e8f0;
          --sb-text-muted: #94a3b8;
          --sb-active-bg: linear-gradient(90deg, #f59e0b, #ef4444);
          --sb-active-text: #fff;
          --sb-hover-bg: rgba(255,255,255,0.08);
          --sb-border: rgba(255,255,255,0.08);
          --sb-section: rgba(255,255,255,0.35);
          --sb-logo-border: rgba(255,255,255,0.12);
          --sb-signout-bg: linear-gradient(90deg, #ef4444, #dc2626);
          --sb-toggle-bg: rgba(255,255,255,0.1);
          --sb-sub-hover: #f59e0b;
        }
        [data-theme="dark"] {
          --sb-bg: linear-gradient(180deg, #020617 0%, #0f172a 60%, #020617 100%);
          --sb-text: #cbd5e1;
          --sb-text-muted: #64748b;
          --sb-hover-bg: rgba(245,158,11,0.1);
          --sb-border: rgba(245,158,11,0.1);
          --sb-logo-border: rgba(245,158,11,0.15);
          --sb-toggle-bg: rgba(245,158,11,0.15);
        }

        .sb-wrap {
          width: 16rem;
          height: 100vh;
          background: var(--sb-bg);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; left: 0;
          overflow: hidden;
          z-index: 100;
          border-right: 1px solid var(--sb-border);
          font-family: 'Segoe UI', sans-serif;
          transition: background 0.4s ease;
        }

        .sb-logo {
          height: 5.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid var(--sb-logo-border);
          flex-shrink: 0;
          gap: 10px;
        }
        .sb-logo img { width: 3rem; height: auto; filter: drop-shadow(0 0 8px rgba(245,158,11,0.5)); }
        .sb-logo-text { color: #f59e0b; font-weight: 800; font-size: 1.1rem; letter-spacing: 0.05em; }

        .sb-nav {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 0.75rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(245,158,11,0.3) transparent;
        }
        .sb-nav::-webkit-scrollbar { width: 4px; }
        .sb-nav::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.3); border-radius: 999px; }

        .sb-section-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--sb-section);
          padding: 0.75rem 0.5rem 0.25rem;
          font-weight: 600;
        }

        .sb-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.55rem 0.75rem;
          border-radius: 0.6rem;
          background: transparent;
          border: none;
          color: var(--sb-text);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 2px;
          text-align: left;
          font-weight: 500;
        }
        .sb-btn:hover { background: var(--sb-hover-bg); transform: translateX(3px); }
        .sb-btn-active {
          background: var(--sb-active-bg) !important;
          color: var(--sb-active-text) !important;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(245,158,11,0.35);
        }
        .sb-icon { font-size: 1rem; flex-shrink: 0; }

        .sb-dropdown-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.55rem 0.75rem;
          border-radius: 0.6rem;
          border: none;
          font-size: 0.875rem;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--sb-text);
          margin-bottom: 2px;
          font-weight: 500;
        }
        .sb-dropdown-btn:hover { background: var(--sb-hover-bg); transform: translateX(3px); }
        .sb-dropdown-left { display: flex; align-items: center; gap: 0.65rem; }
        .sb-chevron { font-size: 0.65rem; color: var(--sb-text-muted); transition: transform 0.2s; }
        .sb-chevron-open { transform: rotate(0deg); color: #f59e0b; }

        .sb-submenu {
          margin: 4px 0 4px 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1px;
          border-left: 2px solid rgba(245,158,11,0.3);
          padding-left: 0.75rem;
          animation: slideDown 0.2s ease;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sb-subitem {
          padding: 0.3rem 0.25rem;
          font-size: 0.82rem;
          color: var(--sb-text-muted);
          cursor: pointer;
          transition: all 0.15s;
          border-radius: 4px;
        }
        .sb-subitem:hover { color: var(--sb-sub-hover); padding-left: 0.5rem; }

        .sb-bottom {
          padding: 0.75rem;
          border-top: 1px solid var(--sb-border);
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-shrink: 0;
        }

        .sb-theme-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.75rem;
          border-radius: 0.6rem;
          background: var(--sb-toggle-bg);
          border: 1px solid var(--sb-border);
          color: var(--sb-text);
          font-size: 0.8rem;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }
        .sb-theme-toggle:hover { background: rgba(245,158,11,0.15); }
        .sb-toggle-track {
          width: 36px; height: 20px;
          background: ${`var(--t, #334155)`};
          border-radius: 999px;
          position: relative;
          transition: background 0.3s;
          flex-shrink: 0;
        }
        .sb-toggle-thumb {
          width: 14px; height: 14px;
          background: #fff;
          border-radius: 50%;
          position: absolute;
          top: 3px;
          transition: left 0.3s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }

        .sb-signout {
          width: 100%;
          padding: 0.55rem 0.75rem;
          border-radius: 0.6rem;
          background: var(--sb-signout-bg);
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border: none;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(239,68,68,0.3);
        }
        .sb-signout:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(239,68,68,0.4); }
      `}</style>

      <aside className="sb-wrap">
        {/* LOGO */}
        <div className="sb-logo">
          <img src={logo} alt="logo" />
          <span className="sb-logo-text">ClassEase</span>
        </div>

        {/* NAV */}
        <nav className="sb-nav">
          <div className="sb-section-label">Main</div>

          <button className={`sb-btn ${isActive("/dashboard") ? "sb-btn-active" : ""}`} onClick={() => navigate("/dashboard")}>
            <FaTachometerAlt className="sb-icon" /> Dashboard
          </button>

          <button className={`sb-btn ${isActive("/classes") ? "sb-btn-active" : ""}`} onClick={() => navigate("/classes")}>
            <FaSchool className="sb-icon" /> Classes
          </button>

          <div className="sb-section-label">People</div>

          {/* Students */}
          <div>
            <button className="sb-dropdown-btn" onClick={() => setOpenStudents(!openStudents)}>
              <span className="sb-dropdown-left"><FaUsers className="sb-icon" /> Students</span>
              <FaChevronDown className={`sb-chevron ${openStudents ? "sb-chevron-open" : ""}`} />
            </button>
            {openStudents && (
              <div className="sb-submenu">
                <div className="sb-subitem" onClick={() => navigate("/students/list")}>Student List</div>
                <div className="sb-subitem" onClick={() => navigate("/students/add")}>Add Student</div>
                <div className="sb-subitem" onClick={() => navigate("/students/view")}>Student View</div>
              </div>
            )}
          </div>

          {/* Teachers */}
          <div>
            <button className="sb-dropdown-btn" onClick={() => setOpenTeachers(!openTeachers)}>
              <span className="sb-dropdown-left"><FaUserGraduate className="sb-icon" /> Teachers</span>
              <FaChevronDown className={`sb-chevron ${openTeachers ? "sb-chevron-open" : ""}`} />
            </button>
            {openTeachers && (
              <div className="sb-submenu">
                <div className="sb-subitem" onClick={() => navigate("/teachers/list")}>Teacher List</div>
                <div className="sb-subitem" onClick={() => navigate("/teachers/add")}>Add Teacher</div>
              </div>
            )}
          </div>

          <div className="sb-section-label">Academic</div>

          {/* Subjects */}
          <div>
            <button className="sb-dropdown-btn" onClick={() => setOpenSubjects(!openSubjects)}>
              <span className="sb-dropdown-left"><FaBook className="sb-icon" /> Subjects</span>
              <FaChevronDown className={`sb-chevron ${openSubjects ? "sb-chevron-open" : ""}`} />
            </button>
            {openSubjects && (
              <div className="sb-submenu">
                <div className="sb-subitem" onClick={() => navigate("/subjects/list")}>Subject List</div>
                <div className="sb-subitem" onClick={() => navigate("/subjects/add")}>Add Subject</div>
              </div>
            )}
          </div>

          <button className={`sb-btn ${isActive("/attendance") ? "sb-btn-active" : ""}`} onClick={() => navigate("/attendance")}>
            <FaClipboardList className="sb-icon" /> Attendance
          </button>

          <button className={`sb-btn ${isActive("/live-sessions") ? "sb-btn-active" : ""}`} onClick={() => navigate("/live-sessions")}>
            <FaVideo className="sb-icon" /> Live Sessions
          </button>

          <div className="sb-section-label">Finance</div>

          {/* Accounts */}
          <div>
            <button className="sb-dropdown-btn" onClick={() => setOpenAccounts(!openAccounts)}>
              <span className="sb-dropdown-left"><FaMoneyBill className="sb-icon" /> Accounts</span>
              <FaChevronDown className={`sb-chevron ${openAccounts ? "sb-chevron-open" : ""}`} />
            </button>
            {openAccounts && (
              <div className="sb-submenu">
                <div className="sb-subitem" onClick={() => navigate("/fees/collection")}>Fees Collection</div>
                <div className="sb-subitem" onClick={() => navigate("/fees/expenses")}>Expenses</div>
              </div>
            )}
          </div>
        </nav>

        {/* BOTTOM */}
        <div className="sb-bottom">
          <button className="sb-theme-toggle" onClick={() => setDark(!dark)}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {dark ? <FaSun style={{ color: "#f59e0b" }} /> : <FaMoon style={{ color: "#818cf8" }} />}
              {dark ? "Light Mode" : "Dark Mode"}
            </span>
            <div className="sb-toggle-track" style={{ background: dark ? "#f59e0b" : "#334155" }}>
              <div className="sb-toggle-thumb" style={{ left: dark ? "19px" : "3px" }} />
            </div>
          </button>
          <button className="sb-signout" onClick={handleSignOut}>
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
