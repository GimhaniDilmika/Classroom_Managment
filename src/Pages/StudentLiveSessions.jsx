import React, { useMemo, useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import { useAuth } from "../contexts/AuthContext";
import { FaCalendarAlt, FaExternalLinkAlt, FaSearch, FaVideo } from "react-icons/fa";

const STORAGE_KEY = "classease_live_sessions_v1";
const DEFAULT_SESSIONS = [
  { id: 1, title: "Grade 10 Science Revision", teacher: "Ms. Perera", className: "Grade 10A", date: "2026-06-16", time: "09:00", duration: 60, platform: "Google Meet", link: "https://meet.google.com/class-ease-demo", status: "Scheduled" },
  { id: 2, title: "Mathematics Term Test Preparation", teacher: "Mr. Silva", className: "Grade 10A", date: "2026-06-18", time: "18:00", duration: 90, platform: "Zoom", link: "https://zoom.us/j/class-ease-demo", status: "Scheduled" },
  { id: 3, title: "ICT Practical Support", teacher: "Mr. Jayasinghe", className: "Grade 12 ICT", date: "2026-06-17", time: "14:00", duration: 90, platform: "Zoom", link: "https://zoom.us/j/class-ease-demo", status: "Scheduled" },
];
function readSessions(){ try { const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)); return saved?.length?saved:DEFAULT_SESSIONS; } catch { return DEFAULT_SESSIONS; } }
function niceDate(date){ return date ? new Date(date).toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric"}) : "Date not set"; }
function Stat({label,value,note}){return <div className="slv-stat"><p>{label}</p><h3>{value}</h3><span>{note}</span></div>}

export default function StudentLiveSessions(){
  const { userProfile } = useAuth();
  const studentClass = `${userProfile?.className || "Grade 10"}${userProfile?.section || "A"}`;
  const [sessions] = useState(readSessions);
  const [search,setSearch]=useState("");
  const visible = useMemo(()=>sessions.filter((item)=>{
    const q=search.toLowerCase();
    const belongs = item.className === studentClass || item.className === "Grade 10A" || !userProfile?.className;
    const match = `${item.title} ${item.teacher} ${item.platform}`.toLowerCase().includes(q);
    return belongs && match && item.status !== "Cancelled";
  }),[sessions,search,studentClass,userProfile?.className]);
  const upcoming = visible.filter((s)=>s.status === "Scheduled" || s.status === "Live").length;
  const live = visible.filter((s)=>s.status === "Live").length;
  return <>
    <style>{`
      .slv-page{min-height:100vh;margin-left:16rem;background:#f1f5f9;font-family:'DM Sans',sans-serif}.slv-topbar{height:4rem;background:rgba(255,255,255,.96);border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;position:sticky;top:0;z-index:80}.slv-brand{font-family:'Syne',sans-serif;font-weight:800;background:linear-gradient(90deg,#302b63,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.slv-role{background:#eff6ff;color:#1d4ed8;padding:.35rem .8rem;border-radius:999px;font-weight:900;font-size:.75rem}.slv-content{padding:1.75rem 2rem}.slv-hero{background:linear-gradient(135deg,#1e3a8a,#312e81,#0f172a);border-radius:1.35rem;color:#fff;padding:1.8rem;margin-bottom:1rem}.slv-hero h1{font-family:'Syne',sans-serif;margin:.25rem 0}.slv-hero p{color:rgba(255,255,255,.68);max-width:850px}.slv-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem;margin-bottom:1rem}.slv-stat{background:#fff;border:1px solid #e8ecf0;border-radius:1rem;padding:1rem;box-shadow:0 4px 18px rgba(15,23,42,.06)}.slv-stat p{margin:0;color:#64748b;font-size:.72rem;text-transform:uppercase;font-weight:900}.slv-stat h3{margin:.2rem 0;color:#0f172a;font-size:1.45rem}.slv-stat span{font-size:.76rem;color:#94a3b8}.slv-search{display:flex;align-items:center;gap:.55rem;background:#fff;border:1px solid #e8ecf0;border-radius:999px;padding:.8rem 1rem;margin-bottom:1rem;box-shadow:0 4px 18px rgba(15,23,42,.04)}.slv-search input{border:0;outline:0;background:transparent;flex:1;font-family:inherit}.slv-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.slv-card{background:#fff;border:1px solid #e8ecf0;border-radius:1.1rem;padding:1.2rem;box-shadow:0 4px 18px rgba(15,23,42,.06)}.slv-card h3{margin:0 0 .35rem;color:#0f172a;font-size:1rem}.slv-meta{color:#64748b;font-size:.84rem;margin:.3rem 0}.slv-pill{display:inline-flex;align-items:center;gap:.35rem;border-radius:999px;padding:.28rem .65rem;font-size:.72rem;font-weight:900}.slv-live{background:#fee2e2;color:#b91c1c}.slv-scheduled{background:#ecfdf5;color:#047857}.slv-completed{background:#f1f5f9;color:#475569}.slv-footer{display:flex;justify-content:space-between;align-items:center;gap:.7rem;margin-top:1rem;flex-wrap:wrap}.slv-join{border:0;border-radius:9px;background:linear-gradient(90deg,#3b82f6,#8b5cf6);color:#fff;padding:.6rem .9rem;font-weight:900;display:flex;align-items:center;gap:.4rem;text-decoration:none}.slv-empty{background:#fff;border-radius:1rem;padding:2rem;text-align:center;color:#64748b;grid-column:1/-1}@media(max-width:900px){.slv-page{margin-left:0}.slv-topbar{padding-left:4.5rem;padding-right:1rem}.slv-content{padding:1rem}.slv-stats,.slv-grid{grid-template-columns:1fr}.slv-hero{padding:1.3rem}}
    `}</style>
    <Sidebar />
    <main className="slv-page"><header className="slv-topbar"><span className="slv-brand">My Live Sessions</span><span className="slv-role">Student Portal</span></header><section className="slv-content"><div className="slv-hero"><p>{studentClass} Online Learning</p><h1>View class live sessions and meeting links</h1><p>Students can see only their class sessions, check the platform, time, teacher, and join the meeting when available.</p></div><div className="slv-stats"><Stat label="Class Sessions" value={visible.length} note="Available for your class"/><Stat label="Upcoming" value={upcoming} note="Scheduled or live"/><Stat label="Live Now" value={live} note="Currently active"/></div><div className="slv-search"><FaSearch style={{color:"#94a3b8"}}/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search sessions, teacher or platform"/></div><div className="slv-grid">{visible.length===0?<div className="slv-empty">No live sessions are available for your class yet.</div>:visible.map((item)=><article className="slv-card" key={item.id}><h3><FaVideo /> {item.title}</h3><p className="slv-meta">Teacher: {item.teacher} · {item.className}</p><p className="slv-meta"><FaCalendarAlt /> {niceDate(item.date)} · {item.time} · {item.duration} minutes</p><p className="slv-meta">Platform: {item.platform}</p><div className="slv-footer"><span className={`slv-pill ${item.status === "Live" ? "slv-live" : item.status === "Scheduled" ? "slv-scheduled" : "slv-completed"}`}>{item.status}</span>{item.link && <a className="slv-join" href={item.link} target="_blank" rel="noreferrer"><FaExternalLinkAlt /> Join Class</a>}</div></article>)}</div></section></main>
  </>
}
