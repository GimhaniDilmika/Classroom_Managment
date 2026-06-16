import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaUserGraduate, FaClipboardList, FaVideo, FaBookOpen, FaBell, FaSearch, FaSignOutAlt, FaUserCircle, FaCog, FaCheckCircle } from "react-icons/fa";
import Sidebar from "../Components/Sidebar.jsx";
import StatCard from "../Components/StatCard.jsx";
import AttendanceOverview from "../Components/AttendanceOverview.jsx";
import UpcomingClasses from "../Components/UpcomingClasses.jsx";
import ServerTimeCard from "../Components/ServerTimeCard.jsx";
import SmartInsights from "../Components/SmartInsights.jsx";
import "./Dashboard.css";

const NOTIFICATIONS = [
  { id:1, icon:"📋", title:"New assignment submitted", desc:"Kamal Silva submitted Maths homework", time:"2 min ago", read:false, color:"#f59e0b" },
  { id:2, icon:"👤", title:"New student registered", desc:"Nishani Perera joined Grade 10", time:"15 min ago", read:false, color:"#8b5cf6" },
  { id:3, icon:"⚠️", title:"Attendance alert", desc:"3 students absent in Science class", time:"1 hr ago", read:false, color:"#ef4444" },
  { id:4, icon:"✅", title:"Timetable updated", desc:"Friday schedule changed for Grade 11", time:"3 hr ago", read:true, color:"#10b981" },
  { id:5, icon:"💬", title:"Parent message", desc:"Asha Fernando's parent sent a message", time:"Yesterday", read:true, color:"#06b6d4" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [time, setTime]             = useState(new Date());
  const [showNotif, setShowNotif]   = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifs, setNotifs]         = useState(NOTIFICATIONS);
  const notifRef   = useRef(null);
  const profileRef = useRef(null);

  const { currentUser, userRole, userName, logout } = useAuth();
  const userEmail = currentUser?.email || "admin@classease.lk";
  const initials  = (userName || userEmail).slice(0, 2).toUpperCase();
  const unread   = notifs.filter(n => !n.read).length;

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e) {
      if (notifRef.current && !notifRef.current.contains(e.target))   setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function markAllRead() { setNotifs(notifs.map(n => ({ ...n, read: true }))); }
  function markRead(id)  { setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n)); }

  async function handleSignOut() {
    await logout();
    navigate("/");
  }

  const formattedTime = time.toLocaleTimeString("en-GB", { hour12: false });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        [data-theme="dark"] .dash-page     { background:#020617; }
        [data-theme="dark"] .dash-topbar   { background:rgba(15,23,42,0.97); border-color:rgba(245,158,11,0.1); }
        [data-theme="dark"] .dash-topbar-title { color:#e2e8f0; }
        [data-theme="dark"] .dash-search   { background:rgba(30,41,59,0.8); border-color:rgba(245,158,11,0.2); }
        [data-theme="dark"] .dash-search input { color:#e2e8f0; }
        [data-theme="dark"] .dash-icon-btn { background:rgba(30,41,59,0.8); border-color:rgba(245,158,11,0.15); color:#94a3b8; }
        [data-theme="dark"] .notif-panel   { background:#0f172a; border-color:rgba(245,158,11,0.15); }
        [data-theme="dark"] .notif-header  { border-color:rgba(255,255,255,0.06); }
        [data-theme="dark"] .notif-title   { color:#e2e8f0; }
        [data-theme="dark"] .notif-item    { border-color:rgba(255,255,255,0.05); }
        [data-theme="dark"] .notif-item:hover { background:rgba(245,158,11,0.05); }
        [data-theme="dark"] .notif-item-title { color:#e2e8f0; }
        [data-theme="dark"] .notif-item-desc  { color:#64748b; }
        [data-theme="dark"] .notif-item-time  { color:#475569; }
        [data-theme="dark"] .notif-unread  { background:rgba(245,158,11,0.08); }
        [data-theme="dark"] .notif-footer  { border-color:rgba(255,255,255,0.06); }
        [data-theme="dark"] .profile-panel { background:#0f172a; border-color:rgba(245,158,11,0.15); }
        [data-theme="dark"] .profile-divider { border-color:rgba(255,255,255,0.06); }
        [data-theme="dark"] .profile-menu-item { color:#94a3b8; }
        [data-theme="dark"] .profile-menu-item:hover { background:rgba(245,158,11,0.08); color:#e2e8f0; }
        [data-theme="dark"] .dash-section-label { color:#475569; }
        [data-theme="dark"] .dash-welcome  { color:rgba(255,255,255,0.55); }

        /* ── Page ── */
        .dash-page { min-height:100vh; margin-left:16rem; background:#f1f5f9; font-family:'DM Sans',sans-serif; transition:background 0.4s; }

        /* ── Topbar ── */
        .dash-topbar {
          position:sticky; top:0; z-index:100;
          background:rgba(255,255,255,0.95);
          backdrop-filter:blur(16px);
          border-bottom:1px solid rgba(0,0,0,0.06);
          padding:0 2rem; height:4rem;
          display:flex; align-items:center; justify-content:space-between;
          box-shadow:0 1px 12px rgba(0,0,0,0.06);
        }
        .dash-topbar-title {
          font-family:'Syne',sans-serif; font-weight:800; font-size:1.25rem;
          background:linear-gradient(90deg,#302b63,#f59e0b);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .dash-topbar-right { display:flex; align-items:center; gap:10px; }

        /* ── Search ── */
        .dash-search {
          display:flex; align-items:center; gap:8px;
          background:#f8fafc; border:1px solid #e2e8f0;
          border-radius:999px; padding:7px 16px; transition:all 0.2s;
        }
        .dash-search:focus-within { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,0.1); }
        .dash-search input { border:none; background:transparent; outline:none; font-size:0.82rem; width:180px; font-family:'DM Sans',sans-serif; }

        /* ── Icon buttons ── */
        .dash-icon-btn {
          width:38px; height:38px;
          background:#f8fafc; border:1px solid #e2e8f0;
          border-radius:50%; display:flex; align-items:center; justify-content:center;
          cursor:pointer; color:#64748b; font-size:0.95rem;
          position:relative; transition:all 0.2s; flex-shrink:0;
        }
        .dash-icon-btn:hover { border-color:#f59e0b; color:#f59e0b; background:#fffbeb; }
        .notif-badge {
          position:absolute; top:5px; right:5px;
          width:16px; height:16px; background:#ef4444;
          border-radius:50%; border:2px solid #fff;
          display:flex; align-items:center; justify-content:center;
          font-size:9px; font-weight:800; color:#fff; line-height:1;
        }

        /* ── Avatar ── */
        .dash-avatar {
          width:38px; height:38px;
          background:linear-gradient(135deg,#302b63,#f59e0b);
          border-radius:50%; display:flex; align-items:center; justify-content:center;
          color:#fff; font-weight:800; font-size:0.82rem;
          cursor:pointer; border:2px solid transparent;
          transition:all 0.2s; flex-shrink:0;
          box-shadow:0 2px 8px rgba(48,43,99,0.3);
        }
        .dash-avatar:hover { border-color:#f59e0b; transform:scale(1.05); }

        /* ── Notification panel ── */
        .notif-panel {
          position:absolute; top:calc(100% + 10px); right:0;
          width:340px; background:#fff;
          border:1px solid #e8ecf0; border-radius:1rem;
          box-shadow:0 20px 50px rgba(0,0,0,0.15);
          z-index:200; overflow:hidden;
          animation:dropIn 0.18s ease;
        }
        @keyframes dropIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        .notif-header { padding:1rem 1.25rem 0.75rem; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #f1f5f9; }
        .notif-title  { font-family:'Syne',sans-serif; font-weight:800; font-size:0.95rem; color:#0f172a; }
        .notif-mark   { font-size:0.72rem; color:#f59e0b; font-weight:700; cursor:pointer; background:none; border:none; }
        .notif-mark:hover { text-decoration:underline; }
        .notif-list   { max-height:320px; overflow-y:auto; }
        .notif-item   { display:flex; align-items:flex-start; gap:10px; padding:10px 1.25rem; border-bottom:1px solid #f8fafc; cursor:pointer; transition:background 0.15s; }
        .notif-item:last-child { border-bottom:none; }
        .notif-item:hover { background:#fffbeb; }
        .notif-unread { background:#fefce8; }
        .notif-icon-wrap { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1rem; flex-shrink:0; }
        .notif-item-body { flex:1; min-width:0; }
        .notif-item-title { font-size:0.8rem; font-weight:700; color:#0f172a; margin-bottom:2px; }
        .notif-item-desc  { font-size:0.72rem; color:#64748b; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .notif-item-time  { font-size:0.65rem; color:#94a3b8; margin-top:3px; }
        .notif-dot { width:7px; height:7px; background:#ef4444; border-radius:50%; flex-shrink:0; margin-top:6px; }
        .notif-footer { padding:0.75rem 1.25rem; border-top:1px solid #f1f5f9; text-align:center; }
        .notif-footer a { font-size:0.78rem; color:#f59e0b; font-weight:700; text-decoration:none; }
        .notif-footer a:hover { text-decoration:underline; }

        /* ── Profile panel ── */
        .profile-panel {
          position:absolute; top:calc(100% + 10px); right:0;
          width:240px; background:#fff;
          border:1px solid #e8ecf0; border-radius:1rem;
          box-shadow:0 20px 50px rgba(0,0,0,0.15);
          z-index:200; overflow:hidden;
          animation:dropIn 0.18s ease;
        }
        .profile-head { padding:1rem 1.25rem; display:flex; align-items:center; gap:10px; }
        .profile-avatar-lg {
          width:44px; height:44px; border-radius:12px;
          background:linear-gradient(135deg,#302b63,#f59e0b);
          display:flex; align-items:center; justify-content:center;
          color:#fff; font-weight:800; font-size:1rem; flex-shrink:0;
        }
        .profile-email { font-size:0.72rem; color:#94a3b8; margin-top:1px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:140px; }
        .profile-name  { font-size:0.85rem; font-weight:700; color:#0f172a; }
        .profile-role  { display:inline-block; font-size:0.62rem; font-weight:700; background:linear-gradient(90deg,#302b63,#f59e0b); color:#fff; padding:2px 8px; border-radius:999px; margin-top:4px; }
        .profile-divider { border:none; border-top:1px solid #f1f5f9; margin:0; }
        .profile-menu  { padding:6px 0; }
        .profile-menu-item { display:flex; align-items:center; gap:10px; padding:9px 1.25rem; font-size:0.82rem; color:#475569; cursor:pointer; transition:all 0.15s; border:none; background:none; width:100%; text-align:left; }
        .profile-menu-item:hover { background:#f8fafc; color:#0f172a; }
        .profile-menu-item.danger { color:#ef4444; }
        .profile-menu-item.danger:hover { background:#fee2e2; }

        /* ── Content ── */
        .dash-content { padding:1.75rem 2rem; }

        /* ── Hero ── */
        .dash-hero {
          margin-bottom:1.75rem; padding:1.75rem 2rem;
          background:linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%);
          border-radius:1.25rem; color:#fff;
          position:relative; overflow:hidden;
        }
        .dash-hero::before { content:''; position:absolute; top:-40px; right:-40px; width:200px; height:200px; background:rgba(245,158,11,0.15); border-radius:50%; }
        .dash-hero::after  { content:''; position:absolute; bottom:-60px; right:100px; width:150px; height:150px; background:rgba(239,68,68,0.1); border-radius:50%; }
        .dash-welcome   { font-size:0.85rem; color:rgba(255,255,255,0.6); margin-bottom:4px; }
        .dash-hero-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1.6rem; margin-bottom:6px; position:relative; z-index:1; }
        .dash-hero-sub  { font-size:0.85rem; color:rgba(255,255,255,0.55); position:relative; z-index:1; }
        .dash-hero-badge { display:inline-flex; align-items:center; gap:6px; margin-top:12px; padding:5px 12px; background:rgba(245,158,11,0.2); border:1px solid rgba(245,158,11,0.4); border-radius:999px; font-size:0.75rem; color:#fbbf24; font-weight:600; position:relative; z-index:1; }
        .dash-hero-badge-dot { width:6px; height:6px; background:#22c55e; border-radius:50%; animation:pulse 1.5s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .dash-section-label { font-size:0.7rem; text-transform:uppercase; letter-spacing:0.1em; color:#94a3b8; font-weight:700; margin-bottom:0.75rem; margin-top:1.5rem; }
        .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; }
        @media(max-width:1200px){ .stats-grid { grid-template-columns:repeat(2,1fr); } }
        .lower-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:1.25rem; margin-top:1.25rem; }
        @media(max-width:1100px){ .lower-grid { grid-template-columns:1fr 1fr; } }
        @media(max-width:700px) { .lower-grid { grid-template-columns:1fr; } }
        .stat-card { border-radius:1rem !important; transition:transform 0.25s,box-shadow 0.25s !important; }
        .stat-card:hover { transform:translateY(-5px) !important; box-shadow:0 16px 32px rgba(0,0,0,.12) !important; }
      `}</style>

      <div className="dash-page">
        <Sidebar />

        {/* ── TOP BAR ── */}
        <header className="dash-topbar">
          <span className="dash-topbar-title">ClassEase Intelligence</span>

          <div className="dash-topbar-right">
            {/* Search */}
            <div className="dash-search">
              <FaSearch style={{ color:"#94a3b8", fontSize:"0.8rem" }} />
              <input placeholder="Search students, classes…" />
            </div>

            {/* Notification bell */}
            <div style={{ position:"relative" }} ref={notifRef}>
              <button className="dash-icon-btn" onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}>
                <FaBell />
                {unread > 0 && <span className="notif-badge">{unread}</span>}
              </button>

              {showNotif && (
                <div className="notif-panel">
                  <div className="notif-header">
                    <span className="notif-title">Notifications {unread > 0 && <span style={{ fontSize:"0.7rem", color:"#ef4444", fontWeight:800 }}>({unread} new)</span>}</span>
                    {unread > 0 && <button className="notif-mark" onClick={markAllRead}>Mark all read</button>}
                  </div>
                  <div className="notif-list">
                    {notifs.map(n => (
                      <div key={n.id} className={`notif-item${!n.read ? " notif-unread" : ""}`} onClick={() => markRead(n.id)}>
                        <div className="notif-icon-wrap" style={{ background:`${n.color}18` }}>{n.icon}</div>
                        <div className="notif-item-body">
                          <p className="notif-item-title">{n.title}</p>
                          <p className="notif-item-desc">{n.desc}</p>
                          <p className="notif-item-time">{n.time}</p>
                        </div>
                        {!n.read && <span className="notif-dot" />}
                      </div>
                    ))}
                  </div>
                  <div className="notif-footer"><a href="#">View all notifications →</a></div>
                </div>
              )}
            </div>

            {/* Profile avatar */}
            <div style={{ position:"relative" }} ref={profileRef}>
              <div className="dash-avatar" onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}>
                {initials}
              </div>

              {showProfile && (
                <div className="profile-panel">
                  <div className="profile-head">
                    <div className="profile-avatar-lg">{initials}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p className="profile-name">{userName || "User"}</p>
                      <p className="profile-email">{userEmail}</p>
                      <span className="profile-role">{userRole === "admin" ? "Admin" : "Teacher"}</span>
                    </div>
                  </div>
                  <hr className="profile-divider" />
                  <div className="profile-menu">
                    <button className="profile-menu-item" onClick={() => { setShowProfile(false); navigate("/profile"); }}><FaUserCircle style={{ color:"#f59e0b" }} /> My Profile</button>
                    <button className="profile-menu-item" onClick={() => { setShowProfile(false); navigate("/settings"); }}><FaCog style={{ color:"#8b5cf6" }} /> Settings</button>
                    <button className="profile-menu-item" onClick={() => { setShowProfile(false); navigate("/change-password"); }}><FaCheckCircle style={{ color:"#10b981" }} /> Change Password</button>
                    <hr className="profile-divider" />
                    <button className="profile-menu-item danger" onClick={handleSignOut}><FaSignOutAlt /> Sign Out</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="dash-content">
          {/* ── HERO ── */}
          <div className="dash-hero">
            <p className="dash-welcome">{getGreeting()} 👋</p>
            <h1 className="dash-hero-title">Smart Classroom Intelligence System</h1>
            <p className="dash-hero-sub">Track students, attendance, timetable flow, and support actions from one intelligent dashboard.</p>
            <div className="dash-hero-badge">
              <span className="dash-hero-badge-dot" />
              Intelligence Dashboard Online · {new Date().toLocaleDateString("en-GB", { month:"long", year:"numeric" })}
            </div>
          </div>

          {/* ── STATS ── */}
          <p className="dash-section-label">Overview</p>
          <div className="stats-grid">
            <StatCard label="Students" value="184" sub="Student profiles monitored" icon={FaUserGraduate} variant="stat-card-students" />
            <StatCard label="Classes" value="12" sub="Active class groups" icon={FaBookOpen} variant="stat-card-classes" />
            <StatCard label="Support Actions" value="18" sub="Teacher follow-ups this week" icon={FaClipboardList} variant="stat-card-assignments" />
            <StatCard label="Timetable Alerts" value="2" sub="Conflicts to review" icon={FaVideo} variant="stat-card-live" />
          </div>

          <p className="dash-section-label">Intelligence</p>
          <SmartInsights />

          {/* ── LOWER ── */}
          <p className="dash-section-label">Classroom Operations</p>
          <div className="lower-grid">
            <AttendanceOverview />
            <UpcomingClasses />
            <ServerTimeCard formattedTime={formattedTime} />
          </div>
        </div>
      </div>
    </>
  );
}
