import React, { useEffect, useState } from "react";
import { FaUserGraduate, FaClipboardList, FaVideo, FaBookOpen, FaBell, FaSearch } from "react-icons/fa";
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        [data-theme="dark"] .dash-page { background: #020617; }
        [data-theme="dark"] .dash-topbar { background: rgba(15,23,42,0.95); border-color: rgba(245,158,11,0.1); }
        [data-theme="dark"] .dash-topbar-title { color: #e2e8f0; }
        [data-theme="dark"] .dash-search-wrap { background: rgba(30,41,59,0.8); border-color: rgba(245,158,11,0.2); }
        [data-theme="dark"] .dash-search-wrap input { color: #e2e8f0; }
        [data-theme="dark"] .dash-search-wrap input::placeholder { color: #475569; }
        [data-theme="dark"] .dash-welcome { color: #94a3b8; }
        [data-theme="dark"] .dash-section-label { color: #475569; }
        [data-theme="dark"] .dash-notif { background: rgba(30,41,59,0.8); color: #94a3b8; border-color: rgba(245,158,11,0.2); }

        .dash-page {
          min-height: 100vh;
          margin-left: 16rem;
          background: #f1f5f9;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.4s;
        }

        .dash-topbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          padding: 0 2rem;
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .dash-topbar-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.2rem;
          background: linear-gradient(90deg, #302b63, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .dash-topbar-right { display: flex; align-items: center; gap: 12px; }
        .dash-search-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 0.8rem;
          transition: all 0.2s;
        }
        .dash-search-wrap:focus-within { border-color: #f59e0b; box-shadow: 0 0 0 3px rgba(245,158,11,0.1); }
        .dash-search-wrap input { border: none; background: transparent; outline: none; font-size: 0.82rem; width: 160px; }
        .dash-notif {
          width: 36px; height: 36px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #64748b;
          font-size: 0.9rem;
          position: relative;
          transition: all 0.2s;
        }
        .dash-notif:hover { border-color: #f59e0b; color: #f59e0b; }
        .dash-notif-dot {
          position: absolute;
          top: 6px; right: 7px;
          width: 7px; height: 7px;
          background: #ef4444;
          border-radius: 50%;
          border: 1.5px solid white;
        }
        .dash-avatar {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #302b63, #f59e0b);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
        }

        .dash-content { padding: 1.75rem 2rem; }

        .dash-hero {
          margin-bottom: 1.75rem;
          padding: 1.75rem 2rem;
          background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
          border-radius: 1.25rem;
          color: white;
          position: relative;
          overflow: hidden;
        }
        .dash-hero::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 200px; height: 200px;
          background: rgba(245,158,11,0.15);
          border-radius: 50%;
        }
        .dash-hero::after {
          content: '';
          position: absolute;
          bottom: -60px; right: 100px;
          width: 150px; height: 150px;
          background: rgba(239,68,68,0.1);
          border-radius: 50%;
        }
        .dash-welcome { font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 4px; }
        .dash-hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          margin-bottom: 6px;
        }
        .dash-hero-sub { font-size: 0.85rem; color: rgba(255,255,255,0.55); }
        .dash-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          padding: 5px 12px;
          background: rgba(245,158,11,0.2);
          border: 1px solid rgba(245,158,11,0.4);
          border-radius: 999px;
          font-size: 0.75rem;
          color: #fbbf24;
          font-weight: 600;
        }
        .dash-hero-badge-dot { width: 6px; height: 6px; background: #22c55e; border-radius: 50%; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

        .dash-section-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #94a3b8;
          font-weight: 700;
          margin-bottom: 0.75rem;
          margin-top: 1.5rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        @media (max-width: 1200px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .stats-grid { grid-template-columns: 1fr; } }

        .lower-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.25rem;
          margin-top: 1.25rem;
        }
        @media (max-width: 1100px) { .lower-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 700px) { .lower-grid { grid-template-columns: 1fr; } }

        /* Override stat card styles */
        .stat-card { border-radius: 1rem !important; transition: transform 0.25s, box-shadow 0.25s !important; }
        .stat-card:hover { transform: translateY(-5px) !important; box-shadow: 0 16px 32px rgba(0,0,0,0.12) !important; }
      `}</style>

      <div className="dash-page">
        <Sidebar />

        {/* TOP BAR */}
        <header className="dash-topbar">
          <span className="dash-topbar-title">ClassEase</span>
          <div className="dash-topbar-right">
            <div className="dash-search-wrap">
              <FaSearch style={{ color: "#94a3b8", fontSize: "0.8rem" }} />
              <input placeholder="Search anything..." />
            </div>
            <div className="dash-notif">
              <FaBell />
              <span className="dash-notif-dot" />
            </div>
            <div className="dash-avatar">AD</div>
          </div>
        </header>

        <div className="dash-content">
          {/* HERO */}
          <div className="dash-hero">
            <p className="dash-welcome">Good morning 👋</p>
            <h1 className="dash-hero-title">Classroom Management System</h1>
            <p className="dash-hero-sub">Here's what's happening today across your institution.</p>
            <div className="dash-hero-badge">
              <span className="dash-hero-badge-dot" />
              System Online · March 2026
            </div>
          </div>

          {/* STAT CARDS */}
          <p className="dash-section-label">Overview</p>
          <div className="stats-grid">
            <StatCard label="Students" value="184" sub="Active today" icon={FaUserGraduate} variant="stat-card-students" />
            <StatCard label="Classes" value="12" sub="Ongoing" icon={FaBookOpen} variant="stat-card-classes" />
            <StatCard label="Assignments" value="23" sub="Pending grading" icon={FaClipboardList} variant="stat-card-assignments" />
            <StatCard label="Live Sessions" value="3" sub="In progress / upcoming" icon={FaVideo} variant="stat-card-live" />
          </div>

          {/* LOWER */}
          <p className="dash-section-label">Details</p>
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
