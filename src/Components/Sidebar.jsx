import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import {
  FaUsers, FaUserGraduate, FaClipboardList, FaVideo,
  FaBookOpen, FaChevronDown, FaChevronRight, FaSchool,
  FaBook, FaMoneyBill, FaSun, FaMoon, FaSignOutAlt,
  FaTachometerAlt,
  FaCalendarAlt,
  FaCalendarCheck, FaBars, FaTimes,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();

  const [openStudents, setOpenStudents] = useState(false);
  const [openTeachers, setOpenTeachers] = useState(false);
  const [openSubjects, setOpenSubjects] = useState(false);
  const [openAccounts, setOpenAccounts] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  function handleSignOut() {
    localStorage.removeItem("token");
    logout().then(() => navigate("/"));
  }

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function goTo(path) {
    navigate(path);
    setMobileOpen(false);
  }

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
        .sb-logo-sub { color: rgba(255,255,255,0.45); font-size: 0.58rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-top: -3px; }

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


        .sb-mobile-toggle,
        .sb-backdrop { display: none; }

        @media (max-width: 900px) {
          html, body, #root { width: 100%; max-width: 100%; overflow-x: hidden; }

          .sb-mobile-toggle {
            position: fixed;
            top: 0.75rem;
            left: 0.85rem;
            width: 42px;
            height: 42px;
            border: none;
            border-radius: 12px;
            background: linear-gradient(135deg, #f59e0b, #ef4444);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.05rem;
            z-index: 320;
            box-shadow: 0 10px 22px rgba(245, 158, 11, 0.35);
            cursor: pointer;
          }

          .sb-backdrop {
            position: fixed;
            inset: 0;
            display: block;
            background: rgba(15, 23, 42, 0.48);
            backdrop-filter: blur(2px);
            opacity: 0;
            pointer-events: none;
            z-index: 280;
            transition: opacity 0.22s ease;
          }
          .sb-backdrop.open {
            opacity: 1;
            pointer-events: auto;
          }

          .sb-wrap {
            width: min(82vw, 19rem);
            max-width: 19rem;
            transform: translateX(-105%);
            transition: transform 0.25s ease, box-shadow 0.25s ease;
            z-index: 300;
            box-shadow: none;
          }
          .sb-wrap.sb-open {
            transform: translateX(0);
            box-shadow: 18px 0 38px rgba(15, 23, 42, 0.28);
          }

          .dash-page,
          .cls-page,
          .tc-page,
          .sl-page,
          .add-page,
          .sv-page,
          .sub-page,
          .tt-page,
          .atn-main,
          .live-main,
          .fee-main,
          .exp-main,
          .pr-page,
          .st-page,
          .cp-page {
            margin-left: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            box-sizing: border-box !important;
          }

          .dash-topbar,
          .cls-topbar,
          .tc-topbar,
          .sv-topbar,
          .sub-topbar,
          .tt-topbar,
          .atn-topbar,
          .live-topbar,
          .fee-topbar,
          .exp-topbar,
          .pr-topbar,
          .st-topbar,
          .cp-topbar {
            padding-left: 4.5rem !important;
            padding-right: 1rem !important;
            height: 4rem !important;
          }

          .dash-content,
          .cls-content,
          .tc-content,
          .sl-page,
          .add-page,
          .sv-content,
          .sub-content,
          .tt-content,
          .atn-content,
          .live-content,
          .fee-content,
          .exp-content,
          .pr-content,
          .st-content,
          .cp-content {
            padding: 1rem !important;
            box-sizing: border-box !important;
          }

          .dash-topbar-title,
          .cls-topbar-title,
          .tc-topbar-title,
          .sv-topbar-title,
          .sub-topbar-title,
          .tt-topbar-title,
          .atn-topbar-title,
          .live-topbar-title,
          .fee-topbar-title,
          .exp-topbar-title,
          .pr-topbar-title,
          .st-topbar-title,
          .cp-topbar-title {
            font-size: 1rem !important;
            line-height: 1.15 !important;
          }

          .dash-search { display: none !important; }
          .dash-topbar-right { gap: 0.45rem !important; }
          .profile-panel, .notif-panel { right: 0 !important; left: auto !important; width: min(92vw, 330px) !important; }

          .dash-hero,
          .atn-hero,
          .live-hero,
          .fee-hero,
          .exp-hero {
            border-radius: 1rem !important;
            padding: 1.2rem !important;
          }
          .dash-hero-title,
          .atn-hero h1,
          .live-hero h1,
          .fee-hero h1,
          .exp-hero h1 {
            font-size: 1.45rem !important;
            line-height: 1.15 !important;
          }

          .stats-grid,
          .live-stats,
          .fee-stats,
          .exp-stats,
          .atn-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 0.8rem !important;
          }
          .lower-grid,
          .live-form-grid,
          .fee-form-grid,
          .exp-form-grid,
          .atn-hero,
          .fee-hero,
          .exp-hero,
          .live-toolbar,
          .fee-toolbar,
          .exp-toolbar,
          .atn-toolbar {
            grid-template-columns: 1fr !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .cls-grid,
          .tc-grid,
          .sub-grid,
          .sv-grid,
          .live-grid {
            grid-template-columns: 1fr !important;
          }

          .cls-header-row > div:last-child,
          .tc-header-row > div:last-child,
          .sub-header-row > div:last-child,
          .sv-filter-bar,
          .sl-filter-bar,
          .sl-filter-left,
          .sl-filter-right,
          .add-page-header,
          .form-submit-wrapper {
            width: 100% !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .cls-search,
          .tc-search,
          .sub-search,
          .sv-search,
          .sl-search-wrap,
          .atn-search,
          .live-search,
          .fee-search,
          .exp-search {
            width: 100% !important;
            min-width: 0 !important;
            box-sizing: border-box !important;
          }
          .cls-search input,
          .tc-search input,
          .sub-search input,
          .sv-search input,
          .sl-search,
          .atn-search input,
          .live-search input,
          .fee-search input,
          .exp-search input {
            width: 100% !important;
            min-width: 0 !important;
          }

          .cls-add-btn,
          .tc-add-btn,
          .sub-add-btn,
          .sv-add-btn,
          .sl-add-btn,
          .atn-export,
          .atn-save,
          .live-primary,
          .fee-primary,
          .exp-primary,
          .form-submit-btn {
            width: 100% !important;
            justify-content: center !important;
          }

          .cls-form-grid,
          .tc-form-grid,
          .sub-form-grid,
          .form-grid,
          .sv-detail-grid {
            grid-template-columns: 1fr !important;
          }

          .sl-card,
          .add-card,
          .tc-card,
          .cls-card,
          .sub-card,
          .sv-card,
          .atn-card,
          .live-card,
          .fee-card,
          .exp-card,
          .pr-card,
          .st-card,
          .cp-card {
            border-radius: 1rem !important;
          }

          .sl-table-wrap,
          .atn-table-wrap,
          .fee-table-wrap,
          .exp-table-wrap,
          .tt-table-wrap {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
          }
          .sl-footer,
          .atn-footer,
          .fee-form-actions,
          .exp-form-actions {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .sl-pagination { flex-wrap: wrap !important; justify-content: center !important; }
        }

        @media (max-width: 520px) {
          .stats-grid,
          .live-stats,
          .fee-stats,
          .exp-stats,
          .atn-stats {
            grid-template-columns: 1fr !important;
          }
          .dash-topbar-title { max-width: 180px !important; }
          .dash-hero-sub { font-size: 0.82rem !important; }
          .stat-card { min-height: auto !important; }
          .sb-logo { justify-content: flex-start; padding-left: 1.25rem; }
        }
      `}</style>

      <button type="button" className="sb-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`sb-backdrop ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(false)} />

      <aside className={`sb-wrap ${mobileOpen ? "sb-open" : ""}`}>
        {/* LOGO */}
        <div className="sb-logo">
          <img src={logo} alt="logo" />
          <span style={{ display:"flex", flexDirection:"column", lineHeight:1.1 }}><span className="sb-logo-text">ClassEase</span><span className="sb-logo-sub">Intelligence</span></span>
        </div>

        {/* NAV */}
        <nav className="sb-nav">
          <div className="sb-section-label">Main</div>

          <button className={`sb-btn ${isActive("/dashboard") ? "sb-btn-active" : ""}`} onClick={() => goTo("/dashboard")}>
            <FaTachometerAlt className="sb-icon" /> Dashboard
          </button>

          <button className={`sb-btn ${isActive("/classes") ? "sb-btn-active" : ""}`} onClick={() => goTo("/classes")}>
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
                <div className="sb-subitem" onClick={() => goTo("/students/list")}>Student List</div>
                <div className="sb-subitem" onClick={() => goTo("/students/add")}>Add Student</div>
                <div className="sb-subitem" onClick={() => goTo("/students/view")}>Student View</div>
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
                <div className="sb-subitem" onClick={() => goTo("/teachers/list")}>Teacher List</div>
                <div className="sb-subitem" onClick={() => goTo("/teachers/add")}>Add Teacher</div>
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
                <div className="sb-subitem" onClick={() => goTo("/subjects/list")}>Subject List</div>
                <div className="sb-subitem" onClick={() => goTo("/subjects/add")}>Add Subject</div>
              </div>
            )}
          </div>

          <button className={`sb-btn ${isActive("/attendance") ? "sb-btn-active" : ""}`} onClick={() => goTo("/attendance")}>
            <FaClipboardList className="sb-icon" /> Attendance
          </button>

          <button className={`sb-btn ${isActive("/timetable") ? "sb-btn-active" : ""}`} onClick={() => goTo("/timetable")}>
            <FaCalendarCheck className="sb-icon" /> Timetable
          </button>

          <button className={`sb-btn ${isActive("/live-sessions") ? "sb-btn-active" : ""}`} onClick={() => goTo("/live-sessions")}>
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
                <div className="sb-subitem" onClick={() => goTo("/fees/collection")}>Fees Collection</div>
                <div className="sb-subitem" onClick={() => goTo("/fees/expenses")}>Expenses</div>
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
