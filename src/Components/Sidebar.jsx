import React, { useEffect, useMemo, useState } from "react";
import logo from "../assets/logo.png";
import {
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaTachometerAlt,
  FaSchool,
  FaUsers,
  FaUserGraduate,
  FaBook,
  FaClipboardList,
  FaCalendarCheck,
  FaVideo,
  FaMoneyBill,
  FaCog,
  FaUserCircle,
  FaStickyNote,
  FaTasks,
  FaChartLine,
  FaChevronDown,
  FaPlusCircle,
  FaListAlt,
  FaEye,
  FaFileInvoiceDollar,
  FaWallet,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const roleLabels = {
  admin: "Administrator",
  teacher: "Teacher Workspace",
  student: "Student Portal",
};

const roleMenus = {
  admin: [
    {
      section: "Main",
      items: [
        { label: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
        { label: "Classes", path: "/classes", icon: <FaSchool /> },
      ],
    },
    {
      section: "People",
      items: [
        {
          label: "Students",
          icon: <FaUsers />,
          children: [
            { label: "Add Student", path: "/students/add", icon: <FaPlusCircle /> },
            { label: "Student List", path: "/students/list", icon: <FaListAlt /> },
            { label: "Student Profiles", path: "/students/view", icon: <FaEye /> },
          ],
        },
        {
          label: "Teachers",
          icon: <FaUserGraduate />,
          children: [
            { label: "Add Teacher", path: "/teachers/add", icon: <FaPlusCircle /> },
            { label: "Teacher Directory", path: "/teachers/list", icon: <FaListAlt /> },
          ],
        },
      ],
    },
    {
      section: "Academic",
      items: [
        {
          label: "Subjects",
          icon: <FaBook />,
          children: [
            { label: "Add Subject", path: "/subjects/add", icon: <FaPlusCircle /> },
            { label: "Subject List", path: "/subjects/list", icon: <FaListAlt /> },
          ],
        },
        { label: "Attendance", path: "/attendance", icon: <FaClipboardList /> },
        { label: "Timetable", path: "/timetable", icon: <FaCalendarCheck /> },
        { label: "Live Sessions", path: "/live-sessions", icon: <FaVideo /> },
      ],
    },
    {
      section: "Finance",
      items: [
        {
          label: "Accounts",
          icon: <FaMoneyBill />,
          children: [
            { label: "Fees Collection", path: "/fees/collection", icon: <FaFileInvoiceDollar /> },
            { label: "Expenses", path: "/fees/expenses", icon: <FaWallet /> },
          ],
        },
      ],
    },
    {
      section: "Account",
      items: [
        { label: "My Profile", path: "/profile", icon: <FaUserCircle /> },
        { label: "Settings", path: "/settings", icon: <FaCog /> },
      ],
    },
  ],
  teacher: [
    {
      section: "Workspace",
      items: [{ label: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> }],
    },
    {
      section: "My Classroom",
      items: [
        {
          label: "Classroom",
          icon: <FaSchool />,
          children: [
            { label: "My Classes", path: "/teacher/classes", icon: <FaSchool /> },
            { label: "My Students", path: "/teacher/students", icon: <FaUsers /> },
            { label: "Timetable", path: "/timetable", icon: <FaCalendarCheck /> },
          ],
        },
        { label: "Attendance", path: "/attendance", icon: <FaClipboardList /> },
      ],
    },
    {
      section: "Assessment Center",
      items: [
        { label: "Assignments & Papers", path: "/teacher/assignments", icon: <FaTasks /> },
        { label: "Marks & Term Tests", path: "/teacher/marks", icon: <FaChartLine /> },
        { label: "Support Notes", path: "/teacher/support-notes", icon: <FaStickyNote /> },
      ],
    },
    {
      section: "Online Learning",
      items: [{ label: "Live Sessions", path: "/live-sessions", icon: <FaVideo /> }],
    },
    {
      section: "Account",
      items: [
        { label: "My Profile", path: "/profile", icon: <FaUserCircle /> },
        { label: "Settings", path: "/settings", icon: <FaCog /> },
      ],
    },
  ],
  student: [
    {
      section: "Portal",
      items: [{ label: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> }],
    },
    {
      section: "My Learning",
      items: [
        {
          label: "Academics",
          icon: <FaBook />,
          children: [
            { label: "Class Timetable", path: "/student/timetable", icon: <FaCalendarCheck /> },
            { label: "Assignments & Papers", path: "/student/assignments", icon: <FaTasks /> },
            { label: "Marks & Progress", path: "/student/marks", icon: <FaChartLine /> },
            { label: "My Attendance", path: "/student/attendance", icon: <FaClipboardList /> },
          ],
        },
        { label: "Live Sessions", path: "/student/live-sessions", icon: <FaVideo /> },
      ],
    },
    {
      section: "Finance",
      items: [{ label: "My Fees", path: "/student/fees", icon: <FaMoneyBill /> }],
    },
    {
      section: "Account",
      items: [
        { label: "My Profile", path: "/profile", icon: <FaUserCircle /> },
        { label: "Settings", path: "/settings", icon: <FaCog /> },
      ],
    },
  ],
};

function hasActiveChild(item, pathname) {
  return item.children?.some((child) => pathname === child.path || pathname.startsWith(`${child.path}/`));
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, userRole, userName } = useAuth();
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const role = userRole || "student";
  const menuGroups = useMemo(() => roleMenus[role] || roleMenus.student, [role]);
  const initialOpen = useMemo(() => {
    const next = {};
    menuGroups.forEach((group) => group.items.forEach((item) => {
      if (item.children?.length) next[item.label] = hasActiveChild(item, location.pathname);
    }));
    return next;
  }, [menuGroups, location.pathname]);
  const [openGroups, setOpenGroups] = useState(initialOpen);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroups((current) => ({ ...current, ...initialOpen }));
  }, [location.pathname, initialOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  function goTo(path) {
    navigate(path);
    setMobileOpen(false);
  }

  async function handleSignOut() {
    localStorage.removeItem("token");
    await logout();
    navigate("/");
  }

  function toggleGroup(label) {
    setOpenGroups((current) => ({ ...current, [label]: !current[label] }));
  }

  return (
    <>
      <style>{`
        :root{--sb-bg:linear-gradient(180deg,#0f0c29 0%,#302b63 50%,#24243e 100%);--sb-text:#e2e8f0;--sb-muted:#94a3b8;--sb-border:rgba(255,255,255,.1);--sb-hover:rgba(255,255,255,.08);--sb-active:linear-gradient(90deg,#f59e0b,#ef4444)}
        [data-theme="dark"]{--sb-bg:linear-gradient(180deg,#020617 0%,#0f172a 60%,#020617 100%);--sb-hover:rgba(245,158,11,.1);--sb-border:rgba(245,158,11,.12)}
        .sb-wrap{width:16rem;height:100vh;background:var(--sb-bg);position:fixed;top:0;left:0;z-index:100;display:flex;flex-direction:column;border-right:1px solid var(--sb-border);font-family:'DM Sans','Segoe UI',sans-serif;overflow:hidden}.sb-logo{height:5.6rem;display:flex;align-items:center;justify-content:center;gap:10px;border-bottom:1px solid var(--sb-border);flex-shrink:0}.sb-logo img{width:3rem;filter:drop-shadow(0 0 8px rgba(245,158,11,.45))}.sb-logo-text{color:#f59e0b;font-weight:900;font-size:1.1rem;letter-spacing:.04em}.sb-logo-sub{color:rgba(255,255,255,.46);font-size:.58rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.sb-user{margin:.8rem .75rem 0;padding:.8rem;border:1px solid var(--sb-border);background:rgba(255,255,255,.06);border-radius:14px}.sb-user-name{color:#fff;font-weight:800;font-size:.86rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sb-user-role{display:inline-block;margin-top:.32rem;font-size:.64rem;text-transform:uppercase;letter-spacing:.08em;background:rgba(245,158,11,.18);color:#fbbf24;padding:.2rem .5rem;border-radius:999px;font-weight:900}.sb-nav{flex:1;overflow-y:auto;padding:.8rem .75rem}.sb-nav::-webkit-scrollbar{width:4px}.sb-nav::-webkit-scrollbar-thumb{background:rgba(245,158,11,.35);border-radius:999px}.sb-section-label{font-size:.65rem;text-transform:uppercase;letter-spacing:.12em;color:rgba(255,255,255,.38);padding:.9rem .5rem .3rem;font-weight:800}.sb-btn,.sb-parent{width:100%;display:flex;align-items:center;gap:.68rem;padding:.62rem .72rem;border-radius:.7rem;background:transparent;border:0;color:var(--sb-text);font-size:.86rem;cursor:pointer;margin-bottom:3px;text-align:left;font-weight:700;transition:all .18s}.sb-btn:hover,.sb-parent:hover{background:var(--sb-hover);transform:translateX(3px)}.sb-btn-active,.sb-parent-active{background:var(--sb-active)!important;color:#fff!important;box-shadow:0 4px 15px rgba(245,158,11,.35)}.sb-icon{font-size:1rem;flex-shrink:0;display:grid;place-items:center}.sb-label{flex:1}.sb-chevron{font-size:.72rem;transition:transform .2s;opacity:.75}.sb-chevron.open{transform:rotate(180deg)}.sb-submenu{margin:.15rem 0 .35rem 1.15rem;padding-left:.6rem;border-left:1px solid rgba(245,158,11,.3)}.sb-sub-btn{width:100%;display:flex;align-items:center;gap:.55rem;padding:.5rem .62rem;border-radius:.6rem;background:transparent;border:0;color:rgba(226,232,240,.78);font-size:.78rem;cursor:pointer;text-align:left;font-weight:700;margin:2px 0}.sb-sub-btn:hover{background:rgba(255,255,255,.08);color:#fff}.sb-sub-active{color:#fbbf24;background:rgba(245,158,11,.13)}.sb-bottom{padding:.75rem;border-top:1px solid var(--sb-border);display:flex;flex-direction:column;gap:8px;flex-shrink:0}.sb-theme-toggle{width:100%;display:flex;align-items:center;justify-content:space-between;padding:.55rem .75rem;border-radius:.7rem;background:rgba(255,255,255,.08);border:1px solid var(--sb-border);color:var(--sb-text);font-size:.8rem;cursor:pointer;font-weight:700}.sb-toggle-track{width:36px;height:20px;background:#334155;border-radius:999px;position:relative}.sb-toggle-thumb{width:14px;height:14px;background:#fff;border-radius:50%;position:absolute;top:3px;transition:left .25s}.sb-signout{width:100%;padding:.62rem .75rem;border-radius:.7rem;background:linear-gradient(90deg,#ef4444,#dc2626);color:#fff;font-size:.88rem;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.5rem;border:0}.sb-mobile-toggle,.sb-backdrop{display:none}
        @media(max-width:900px){html,body,#root{width:100%;max-width:100%;overflow-x:hidden}.sb-mobile-toggle{position:fixed;top:.75rem;left:.85rem;width:42px;height:42px;border:0;border-radius:12px;background:linear-gradient(135deg,#f59e0b,#ef4444);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.05rem;z-index:320;box-shadow:0 10px 22px rgba(245,158,11,.35);cursor:pointer}.sb-backdrop{position:fixed;inset:0;display:block;background:rgba(15,23,42,.48);backdrop-filter:blur(2px);opacity:0;pointer-events:none;z-index:280;transition:opacity .22s}.sb-backdrop.open{opacity:1;pointer-events:auto}.sb-wrap{width:min(82vw,19rem);max-width:19rem;transform:translateX(-105%);transition:transform .25s,box-shadow .25s;z-index:300}.sb-wrap.sb-open{transform:translateX(0);box-shadow:18px 0 38px rgba(15,23,42,.28)}.dash-page,.cls-page,.tc-page,.sl-page,.add-page,.sv-page,.sub-page,.tt-page,.atn-main,.live-main,.fee-main,.exp-main,.pr-page,.st-page,.cp-page,.ta-page,.tm-page,.sa-page,.sm-page,.slv-page,.role-page,.stu-page,.mini-page,.tbl-page,.support-page{margin-left:0!important;width:100%!important;max-width:100%!important;min-width:0!important;box-sizing:border-box!important}.dash-topbar,.cls-topbar,.tc-topbar,.sv-topbar,.sub-topbar,.tt-topbar,.atn-topbar,.live-topbar,.fee-topbar,.exp-topbar,.pr-topbar,.st-topbar,.cp-topbar,.ta-topbar,.tm-topbar,.sa-topbar,.sm-topbar,.slv-topbar,.role-topbar,.stu-topbar,.mini-top,.tbl-top,.support-top{padding-left:4.5rem!important;padding-right:1rem!important;height:4rem!important}.dash-content,.cls-content,.tc-content,.sl-page,.add-page,.sv-content,.sub-content,.tt-content,.atn-content,.live-content,.fee-content,.exp-content,.pr-content,.st-content,.cp-content,.ta-content,.tm-content,.sa-content,.sm-content,.slv-content,.role-content,.stu-content,.mini-content,.tbl-content,.support-content{padding:1rem!important;box-sizing:border-box!important}.dash-search{display:none!important}.stats-grid,.live-stats,.fee-stats,.exp-stats,.atn-stats{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:.8rem!important}.lower-grid,.live-form-grid,.fee-form-grid,.exp-form-grid,.atn-hero,.fee-hero,.exp-hero,.live-toolbar,.fee-toolbar,.exp-toolbar,.atn-toolbar{grid-template-columns:1fr!important;flex-direction:column!important;align-items:stretch!important}.cls-grid,.tc-grid,.sub-grid,.sv-grid,.live-grid{grid-template-columns:1fr!important}.cls-form-grid,.tc-form-grid,.sub-form-grid,.form-grid,.sv-detail-grid{grid-template-columns:1fr!important}.sl-card,.add-card,.tc-card,.cls-card,.sub-card,.sv-card,.atn-card,.live-card,.fee-card,.exp-card,.pr-card,.st-card,.cp-card{border-radius:1rem!important}.sl-table-wrap,.fee-table-wrap,.exp-table-wrap,.tt-table-wrap{overflow-x:auto!important}.sl-table,.fee-table,.exp-table,.tt-table{min-width:760px!important}.sb-logo{height:5.2rem}}
        @media(max-width:520px){.stats-grid,.live-stats,.fee-stats,.exp-stats,.atn-stats{grid-template-columns:1fr!important}}
      `}</style>

      <button type="button" className="sb-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`sb-backdrop ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(false)} />

      <aside className={`sb-wrap ${mobileOpen ? "sb-open" : ""}`}>
        <div className="sb-logo">
          <img src={logo} alt="ClassEase logo" />
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span className="sb-logo-text">ClassEase</span>
            <span className="sb-logo-sub">Intelligence</span>
          </span>
        </div>

        <div className="sb-user">
          <div className="sb-user-name">{userName || "ClassEase User"}</div>
          <span className="sb-user-role">{roleLabels[role] || "User"}</span>
        </div>

        <nav className="sb-nav">
          {menuGroups.map((group) => (
            <div key={group.section}>
              <div className="sb-section-label">{group.section}</div>
              {group.items.map((item) => {
                if (item.children?.length) {
                  const open = !!openGroups[item.label];
                  const activeParent = hasActiveChild(item, location.pathname);
                  return (
                    <div key={item.label}>
                      <button className={`sb-parent ${activeParent ? "sb-parent-active" : ""}`} onClick={() => toggleGroup(item.label)}>
                        <span className="sb-icon">{item.icon}</span>
                        <span className="sb-label">{item.label}</span>
                        <FaChevronDown className={`sb-chevron ${open ? "open" : ""}`} />
                      </button>
                      {open && (
                        <div className="sb-submenu">
                          {item.children.map((child) => (
                            <button key={child.path} className={`sb-sub-btn ${isActive(child.path) ? "sb-sub-active" : ""}`} onClick={() => goTo(child.path)}>
                              <span className="sb-icon">{child.icon}</span>
                              {child.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <button key={item.path} className={`sb-btn ${isActive(item.path) ? "sb-btn-active" : ""}`} onClick={() => goTo(item.path)}>
                    <span className="sb-icon">{item.icon}</span>
                    <span className="sb-label">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sb-bottom">
          <button className="sb-theme-toggle" onClick={() => setDark(!dark)}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>{dark ? <FaSun style={{ color: "#f59e0b" }} /> : <FaMoon style={{ color: "#818cf8" }} />}{dark ? "Light Mode" : "Dark Mode"}</span>
            <div className="sb-toggle-track" style={{ background: dark ? "#f59e0b" : "#334155" }}><div className="sb-toggle-thumb" style={{ left: dark ? "19px" : "3px" }} /></div>
          </button>
          <button className="sb-signout" onClick={handleSignOut}><FaSignOutAlt /> Sign Out</button>
        </div>
      </aside>
    </>
  );
}
