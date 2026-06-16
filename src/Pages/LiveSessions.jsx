import React, { useMemo, useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import { FaCalendarPlus, FaCopy, FaExternalLinkAlt, FaPlus, FaSearch, FaTrash, FaVideo } from "react-icons/fa";

const STORAGE_KEY = "classease_live_sessions_v1";

const DEFAULT_SESSIONS = [
  { id: 1, title: "Grade 10 Science Revision", teacher: "Ms. Perera", className: "Grade 10A", date: "2026-06-16", time: "09:00", duration: 60, platform: "Google Meet", link: "https://meet.google.com/class-ease-demo", status: "Scheduled" },
  { id: 2, title: "ICT Practical Support", teacher: "Mr. Jayasinghe", className: "Grade 12 ICT", date: "2026-06-17", time: "14:00", duration: 90, platform: "Zoom", link: "https://zoom.us/j/class-ease-demo", status: "Scheduled" },
  { id: 3, title: "English Speaking Clinic", teacher: "Ms. Fernando", className: "Grade 9", date: "2026-06-12", time: "11:30", duration: 45, platform: "Google Meet", link: "https://meet.google.com/english-demo", status: "Completed" },
];

function readSessions() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_SESSIONS; }
  catch { return DEFAULT_SESSIONS; }
}

export default function LiveSessions() {
  const [sessions, setSessions] = useState(readSessions);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState("");
  const [form, setForm] = useState({ title:"", teacher:"", className:"", date:"", time:"", duration:60, platform:"Google Meet", link:"", status:"Scheduled" });

  const filtered = useMemo(() => sessions.filter((session) => {
    const q = search.toLowerCase();
    const matchSearch = `${session.title} ${session.teacher} ${session.className} ${session.platform}`.toLowerCase().includes(q);
    const matchStatus = status === "All" || session.status === status;
    return matchSearch && matchStatus;
  }), [sessions, search, status]);

  const stats = useMemo(() => ({
    total: sessions.length,
    scheduled: sessions.filter((s) => s.status === "Scheduled").length,
    live: sessions.filter((s) => s.status === "Live").length,
    completed: sessions.filter((s) => s.status === "Completed").length,
  }), [sessions]);

  function persist(next) {
    setSessions(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function addSession(e) {
    e.preventDefault();
    const next = [{ ...form, id: Date.now(), duration: Number(form.duration || 0) }, ...sessions];
    persist(next);
    setForm({ title:"", teacher:"", className:"", date:"", time:"", duration:60, platform:"Google Meet", link:"", status:"Scheduled" });
    setShowForm(false);
  }

  function deleteSession(id) {
    if (window.confirm("Delete this live session?")) persist(sessions.filter((session) => session.id !== id));
  }

  async function copyLink(link) {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(link);
      setTimeout(() => setCopied(""), 1800);
    } catch {
      alert("Unable to copy link. Please copy it manually.");
    }
  }

  return (
    <>
      <LiveStyles />
      <div className="live-page">
        <Sidebar />
        <main className="live-main">
          <header className="live-topbar"><span className="live-topbar-title">Live Learning Hub</span><button className="live-primary" onClick={() => setShowForm(!showForm)}><FaPlus /> Schedule Session</button></header>
          <section className="live-content">
            <div className="live-hero"><div><p className="live-kicker"><FaVideo /> Online Classroom Operations</p><h1>Live Sessions</h1><p>Schedule online classes, manage meeting links, and track session status from one place.</p></div></div>
            <div className="live-stats"><Stat label="Total Sessions" value={stats.total} /><Stat label="Scheduled" value={stats.scheduled} /><Stat label="Live Now" value={stats.live} /><Stat label="Completed" value={stats.completed} /></div>

            {showForm && <form className="live-form" onSubmit={addSession}>
              <h2><FaCalendarPlus /> New Live Session</h2>
              <div className="live-form-grid">
                <Field label="Title"><input required value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} placeholder="e.g. Grade 10 Science Revision" /></Field>
                <Field label="Teacher"><input required value={form.teacher} onChange={(e)=>setForm({...form,teacher:e.target.value})} placeholder="Teacher name" /></Field>
                <Field label="Class"><input required value={form.className} onChange={(e)=>setForm({...form,className:e.target.value})} placeholder="e.g. Grade 10A" /></Field>
                <Field label="Platform"><select value={form.platform} onChange={(e)=>setForm({...form,platform:e.target.value})}><option>Google Meet</option><option>Zoom</option><option>Microsoft Teams</option></select></Field>
                <Field label="Date"><input required type="date" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})} /></Field>
                <Field label="Time"><input required type="time" value={form.time} onChange={(e)=>setForm({...form,time:e.target.value})} /></Field>
                <Field label="Duration"><input type="number" min="15" step="15" value={form.duration} onChange={(e)=>setForm({...form,duration:e.target.value})} /></Field>
                <Field label="Status"><select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}><option>Scheduled</option><option>Live</option><option>Completed</option></select></Field>
                <Field label="Meeting Link" full><input required value={form.link} onChange={(e)=>setForm({...form,link:e.target.value})} placeholder="Paste meeting URL" /></Field>
              </div>
              <div className="live-form-actions"><button className="live-primary" type="submit">Save Session</button><button className="live-secondary" type="button" onClick={()=>setShowForm(false)}>Cancel</button></div>
            </form>}

            <div className="live-toolbar"><div className="live-search"><FaSearch /><input placeholder="Search sessions..." value={search} onChange={(e)=>setSearch(e.target.value)} /></div><select value={status} onChange={(e)=>setStatus(e.target.value)}><option>All</option><option>Scheduled</option><option>Live</option><option>Completed</option></select></div>

            <div className="live-grid">
              {filtered.map((session) => <article className="live-card" key={session.id}>
                <div className="live-card-top"><span className={`live-badge ${session.status.toLowerCase()}`}>{session.status}</span><button onClick={() => deleteSession(session.id)}><FaTrash /></button></div>
                <h3>{session.title}</h3>
                <p className="live-meta">{session.className} • {session.teacher}</p>
                <div className="live-details"><span>{session.date}</span><span>{session.time}</span><span>{session.duration} min</span><span>{session.platform}</span></div>
                <div className="live-link"><span>{session.link}</span><button onClick={() => copyLink(session.link)} title="Copy link"><FaCopy /></button><a href={session.link} target="_blank" rel="noreferrer" title="Open link"><FaExternalLinkAlt /></a></div>
                {copied === session.link && <small className="live-copied">Meeting link copied.</small>}
              </article>)}
              {filtered.length === 0 && <div className="live-empty">No live sessions found.</div>}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

function Field({ label, children, full }) { return <label className={`live-field ${full ? "full" : ""}`}><span>{label}</span>{children}</label>; }
function Stat({ label, value }) { return <div className="live-stat"><strong>{value}</strong><span>{label}</span></div>; }

function LiveStyles() { return <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
  [data-theme="dark"] .live-main{background:#020617;color:#e2e8f0}[data-theme="dark"] .live-topbar,[data-theme="dark"] .live-form,[data-theme="dark"] .live-card,[data-theme="dark"] .live-stat{background:#0f172a;border-color:rgba(245,158,11,.12)}[data-theme="dark"] .live-search,[data-theme="dark"] .live-toolbar select,[data-theme="dark"] .live-field input,[data-theme="dark"] .live-field select{background:#111827;border-color:#334155;color:#e2e8f0}[data-theme="dark"] .live-search input{color:#e2e8f0}[data-theme="dark"] .live-link{background:#111827}
  .live-main{margin-left:16rem;min-height:100vh;background:#f1f5f9;font-family:'DM Sans',sans-serif;color:#0f172a}.live-topbar{height:4rem;background:rgba(255,255,255,.95);backdrop-filter:blur(14px);border-bottom:1px solid rgba(15,23,42,.06);display:flex;align-items:center;justify-content:space-between;padding:0 2rem;position:sticky;top:0;z-index:40}.live-topbar-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;background:linear-gradient(90deg,#302b63,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.live-primary,.live-secondary{border:none;border-radius:10px;padding:.6rem 1rem;font-weight:800;cursor:pointer;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:8px}.live-primary{background:linear-gradient(90deg,#f59e0b,#ef4444);color:#fff;box-shadow:0 8px 18px rgba(245,158,11,.25)}.live-secondary{background:#eef2ff;color:#302b63}.live-content{padding:2rem}.live-hero{background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);border-radius:1.25rem;padding:1.7rem 2rem;color:white;margin-bottom:1rem}.live-kicker{color:#fbbf24;font-weight:800;display:flex;gap:8px;align-items:center;margin:0 0 .5rem}.live-hero h1{font-family:'Syne',sans-serif;font-size:2rem;margin:.2rem 0}.live-hero p{color:#cbd5e1}.live-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1rem}.live-stat{background:white;border:1px solid #e8ecf0;border-radius:1rem;padding:1rem;box-shadow:0 4px 16px rgba(15,23,42,.05)}.live-stat strong{display:block;font-family:'Syne';font-size:1.6rem;color:#f59e0b}.live-stat span{color:#64748b;font-weight:700}.live-form{background:white;border:1px solid #e8ecf0;border-radius:1.2rem;padding:1.2rem;margin-bottom:1rem;box-shadow:0 8px 24px rgba(15,23,42,.06)}.live-form h2{font-family:'Syne';font-size:1rem;display:flex;gap:8px;align-items:center;margin:0 0 1rem}.live-form-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}.live-field{display:flex;flex-direction:column;gap:5px}.live-field.full{grid-column:1/-1}.live-field span{font-size:.68rem;text-transform:uppercase;letter-spacing:.08em;color:#64748b;font-weight:800}.live-field input,.live-field select{border:1.5px solid #e2e8f0;border-radius:10px;padding:.65rem .8rem;background:#f8fafc;outline:none}.live-form-actions{display:flex;gap:.6rem;margin-top:1rem}.live-toolbar{display:flex;gap:1rem;margin-bottom:1rem;align-items:center}.live-search{display:flex;align-items:center;gap:8px;background:white;border:1.5px solid #e2e8f0;border-radius:999px;padding:.65rem .9rem;flex:1}.live-search input{border:none;outline:none;background:transparent;width:100%}.live-toolbar select{border:1.5px solid #e2e8f0;border-radius:10px;padding:.65rem .9rem;background:white}.live-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1rem}.live-card{background:white;border:1px solid #e8ecf0;border-radius:1.2rem;padding:1.15rem;box-shadow:0 8px 24px rgba(15,23,42,.06)}.live-card-top{display:flex;justify-content:space-between;align-items:center}.live-card-top button{border:none;background:#fee2e2;color:#ef4444;border-radius:8px;padding:.45rem;cursor:pointer}.live-badge{font-size:.72rem;font-weight:900;padding:.32rem .75rem;border-radius:999px}.live-badge.scheduled{background:#dbeafe;color:#1d4ed8}.live-badge.live{background:#dcfce7;color:#15803d}.live-badge.completed{background:#f1f5f9;color:#64748b}.live-card h3{font-family:'Syne';margin:1rem 0 .35rem;font-size:1.05rem}.live-meta{color:#64748b;font-weight:700}.live-details{display:grid;grid-template-columns:repeat(2,1fr);gap:.5rem;margin:1rem 0}.live-details span{background:#f8fafc;border-radius:10px;padding:.55rem;color:#475569;font-weight:700;font-size:.82rem}.live-link{display:flex;align-items:center;gap:.5rem;background:#f8fafc;border-radius:10px;padding:.6rem}.live-link span{flex:1;color:#64748b;font-size:.78rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.live-link button,.live-link a{border:none;background:#fff;color:#302b63;border-radius:8px;padding:.4rem;cursor:pointer;display:flex;text-decoration:none}.live-copied{display:block;color:#10b981;margin-top:.5rem;font-weight:800}.live-empty{grid-column:1/-1;text-align:center;color:#94a3b8;padding:2rem}@media(max-width:900px){.live-main{margin-left:0}.live-stats,.live-form-grid{grid-template-columns:1fr}.live-toolbar{flex-direction:column;align-items:stretch}}
`}</style>; }
