import React, { useMemo, useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import { useAuth } from "../contexts/AuthContext";
import { FaBookOpen, FaCalendarAlt, FaCheckCircle, FaClock, FaExternalLinkAlt, FaFileAlt, FaSearch } from "react-icons/fa";

const STORAGE_KEY = "classease_assignments_v2";
const DEFAULT_ASSIGNMENTS = [
  { id: 1, title: "Algebra Practice Paper", type: "Assignment", className: "Grade 10A", subject: "Mathematics", dueDate: "2026-06-22", maxMarks: 50, status: "Published", resourceLink: "", description: "Complete all algebra questions and upload answers before the deadline." },
  { id: 2, title: "Science Term Test Paper 01", type: "Term Test Paper", className: "Grade 11B", subject: "Science", dueDate: "2026-06-25", maxMarks: 100, status: "Published", resourceLink: "", description: "Revision paper for the upcoming term test." },
  { id: 3, title: "ICT Practical Worksheet", type: "Practical Paper", className: "Grade 12 ICT", subject: "ICT", dueDate: "2026-06-20", maxMarks: 40, status: "Published", resourceLink: "", description: "Spreadsheet formulas and database basics activity." },
];
function readAssignments(){ try { const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)); return saved?.length?saved:DEFAULT_ASSIGNMENTS; } catch { return DEFAULT_ASSIGNMENTS; } }
function dueInfo(date){ if(!date) return {label:"No deadline", cls:"sa-open"}; const today=new Date(); today.setHours(0,0,0,0); const due=new Date(date); due.setHours(0,0,0,0); const diff=Math.ceil((due-today)/86400000); if(diff<0) return {label:"Overdue", cls:"sa-low"}; if(diff<=2) return {label:`Due in ${diff} day${diff===1?"":"s"}`, cls:"sa-warn"}; return {label:`Due in ${diff} days`, cls:"sa-good"}; }
function niceDate(date){ return date ? new Date(date).toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"}) : "Not set"; }
function Stat({label,value,note}){return <div className="sa-stat"><p>{label}</p><h3>{value}</h3><span>{note}</span></div>}

export default function StudentAssignments(){
  const { userProfile } = useAuth();
  const studentClass = `${userProfile?.className || "Grade 10"}${userProfile?.section || "A"}`;
  const [assignments] = useState(readAssignments);
  const [search,setSearch]=useState("");
  const published = assignments.filter((item)=>item.status === "Published");
  const visible = useMemo(()=>published.filter((item)=>{
    const q=search.toLowerCase();
    const match = `${item.title} ${item.subject} ${item.type} ${item.className}`.toLowerCase().includes(q);
    return match && (item.className === studentClass || item.className === "Grade 10A" || !userProfile?.className);
  }),[published,search,studentClass,userProfile?.className]);
  const dueSoon = visible.filter((item)=>dueInfo(item.dueDate).cls === "sa-warn").length;
  const papers = visible.filter((item)=>item.type.includes("Paper") || item.type.includes("Test")).length;

  return <>
    <style>{`
      .sa-page{min-height:100vh;margin-left:16rem;background:#f1f5f9;font-family:'DM Sans',sans-serif}.sa-topbar{height:4rem;background:rgba(255,255,255,.96);border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;position:sticky;top:0;z-index:80}.sa-brand{font-family:'Syne',sans-serif;font-weight:800;background:linear-gradient(90deg,#302b63,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.sa-role{background:#eff6ff;color:#1d4ed8;padding:.35rem .8rem;border-radius:999px;font-weight:900;font-size:.75rem}.sa-content{padding:1.75rem 2rem}.sa-hero{background:linear-gradient(135deg,#1e3a8a,#312e81,#0f172a);border-radius:1.35rem;color:#fff;padding:1.8rem;margin-bottom:1rem}.sa-hero h1{font-family:'Syne',sans-serif;margin:.25rem 0}.sa-hero p{color:rgba(255,255,255,.68);max-width:850px}.sa-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem;margin-bottom:1rem}.sa-stat{background:#fff;border:1px solid #e8ecf0;border-radius:1rem;padding:1rem;box-shadow:0 4px 18px rgba(15,23,42,.06)}.sa-stat p{margin:0;color:#64748b;font-size:.72rem;text-transform:uppercase;font-weight:900}.sa-stat h3{margin:.2rem 0;color:#0f172a;font-size:1.45rem}.sa-stat span{font-size:.76rem;color:#94a3b8}.sa-search{display:flex;align-items:center;gap:.55rem;background:#fff;border:1px solid #e8ecf0;border-radius:999px;padding:.8rem 1rem;margin-bottom:1rem;box-shadow:0 4px 18px rgba(15,23,42,.04)}.sa-search input{border:0;outline:0;background:transparent;flex:1;font-family:inherit}.sa-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.sa-card{background:#fff;border:1px solid #e8ecf0;border-radius:1.1rem;padding:1.2rem;box-shadow:0 4px 18px rgba(15,23,42,.06)}.sa-card h3{margin:0 0 .35rem;color:#0f172a;font-size:1rem}.sa-meta{color:#64748b;font-size:.82rem;margin:.25rem 0}.sa-desc{color:#475569;font-size:.86rem;line-height:1.5}.sa-pill{display:inline-flex;align-items:center;gap:.35rem;border-radius:999px;padding:.27rem .65rem;font-size:.72rem;font-weight:900}.sa-good{background:#ecfdf5;color:#047857}.sa-warn{background:#fffbeb;color:#b45309}.sa-low{background:#fee2e2;color:#b91c1c}.sa-open{background:#f1f5f9;color:#475569}.sa-footer{display:flex;align-items:center;justify-content:space-between;gap:.75rem;margin-top:1rem;flex-wrap:wrap}.sa-link{border:0;border-radius:9px;background:#dbeafe;color:#1d4ed8;padding:.55rem .8rem;font-weight:900;display:flex;align-items:center;gap:.4rem}.sa-empty{background:#fff;border-radius:1rem;padding:2rem;text-align:center;color:#64748b;grid-column:1/-1}@media(max-width:900px){.sa-page{margin-left:0}.sa-topbar{padding-left:4.5rem;padding-right:1rem}.sa-content{padding:1rem}.sa-stats,.sa-grid{grid-template-columns:1fr}.sa-hero{padding:1.3rem}}
    `}</style>
    <Sidebar />
    <main className="sa-page"><header className="sa-topbar"><span className="sa-brand">My Assignments & Papers</span><span className="sa-role">Student Portal</span></header><section className="sa-content"><div className="sa-hero"><p>{studentClass} Learning Tasks</p><h1>View assignments, papers, and due dates</h1><p>Stay organized with your published classroom tasks, resource links, maximum marks, and deadline reminders.</p></div><div className="sa-stats"><Stat label="Visible Tasks" value={visible.length} note="Published for your class"/><Stat label="Due Soon" value={dueSoon} note="Need your attention"/><Stat label="Papers" value={papers} note="Term/revision/practical papers"/></div><div className="sa-search"><FaSearch style={{color:"#94a3b8"}}/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search assignment, paper or subject"/></div><div className="sa-grid">{visible.length===0?<div className="sa-empty">No published assignments are available for your class yet.</div>:visible.map((item)=>{ const due=dueInfo(item.dueDate); return <article className="sa-card" key={item.id}><h3><FaFileAlt /> {item.title}</h3><p className="sa-meta"><FaBookOpen /> {item.subject} · {item.className} · {item.type}</p><p className="sa-desc">{item.description}</p><p className="sa-meta"><FaCalendarAlt /> Due: {niceDate(item.dueDate)} · Marks: {item.maxMarks}</p><div className="sa-footer"><span className={`sa-pill ${due.cls}`}><FaClock /> {due.label}</span>{item.resourceLink ? <a className="sa-link" href={item.resourceLink} target="_blank" rel="noreferrer"><FaExternalLinkAlt /> Open Resource</a> : <span className="sa-pill sa-open"><FaCheckCircle /> Instructions included</span>}</div></article>})}</div></section></main>
  </>
}
