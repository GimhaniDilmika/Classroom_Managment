import React, { useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaUsers, FaBookOpen, FaClock } from "react-icons/fa";

const SAMPLE_CLASSES = [
  { id: 1, name: "Grade 10 – Science", teacher: "Ms. Perera", students: 32, subject: "Science", schedule: "Mon / Wed  8:00 AM", room: "Lab 1",   color: "#f59e0b" },
  { id: 2, name: "Grade 11 – Maths",   teacher: "Mr. Silva",  students: 28, subject: "Maths",   schedule: "Tue / Thu  9:30 AM", room: "Room 3", color: "#ef4444" },
  { id: 3, name: "Grade 9 – English",  teacher: "Ms. Fernando",students: 35, subject: "English", schedule: "Mon / Fri  11:00 AM",room: "Room 5", color: "#8b5cf6" },
  { id: 4, name: "Grade 12 – ICT",     teacher: "Mr. Jayasinghe",students:22,subject: "ICT",    schedule: "Wed / Fri  2:00 PM", room: "Lab 2",  color: "#06b6d4" },
];

export default function Classes({ stub }) {
  const [classes, setClasses]   = useState(SAMPLE_CLASSES);
  const [search, setSearch]     = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState({ name:"", teacher:"", subject:"", schedule:"", room:"", students:0 });

  // ── Stub / Coming-Soon screen ──────────────────────────────────────────────
  if (stub) {
    return (
      <>
        <PageStyles />
        <div className="cls-page">
          <Sidebar />
          <div className="cls-main">
            <TopBar title={stub} />
            <div className="cls-content" style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"60vh" }}>
              <div style={{ fontSize:"4rem", marginBottom:"1rem" }}>🚧</div>
              <h2 style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"1.6rem", color:"#302b63", marginBottom:"8px" }}>{stub}</h2>
              <p style={{ color:"#94a3b8", fontSize:"0.9rem" }}>This section is coming soon. Check back later!</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Helpers ────────────────────────────────────────────────────────────────
  const colors = ["#f59e0b","#ef4444","#8b5cf6","#06b6d4","#10b981","#f97316"];
  const filtered = classes.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.teacher.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd(e) {
    e.preventDefault();
    const newClass = { ...form, id: Date.now(), students: Number(form.students), color: colors[classes.length % colors.length] };
    setClasses([newClass, ...classes]);
    setForm({ name:"", teacher:"", subject:"", schedule:"", room:"", students:0 });
    setShowForm(false);
  }

  function handleDelete(id) {
    setClasses(classes.filter(c => c.id !== id));
  }

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <>
      <PageStyles />
      <div className="cls-page">
        <Sidebar />
        <div className="cls-main">
          <TopBar title="Classes" />

          <div className="cls-content">
            {/* Header row */}
            <div className="cls-header-row">
              <div>
                <h1 className="cls-title">All Classes</h1>
                <p className="cls-sub">{filtered.length} class{filtered.length !== 1 ? "es" : ""} found</p>
              </div>
              <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                <div className="cls-search">
                  <FaSearch style={{ color:"#94a3b8", fontSize:"0.75rem" }} />
                  <input placeholder="Search classes…" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <button className="cls-add-btn" onClick={() => setShowForm(!showForm)}>
                  <FaPlus /> Add Class
                </button>
              </div>
            </div>

            {/* Add Class form */}
            {showForm && (
              <form className="cls-form" onSubmit={handleAdd}>
                <h3 className="cls-form-title">New Class</h3>
                <div className="cls-form-grid">
                  <div className="cls-field"><label>Class Name</label><input required placeholder="e.g. Grade 10 – Science" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
                  <div className="cls-field"><label>Teacher</label><input required placeholder="Teacher name" value={form.teacher} onChange={e=>setForm({...form,teacher:e.target.value})} /></div>
                  <div className="cls-field"><label>Subject</label><input required placeholder="Subject" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} /></div>
                  <div className="cls-field"><label>Schedule</label><input placeholder="e.g. Mon / Wed  8:00 AM" value={form.schedule} onChange={e=>setForm({...form,schedule:e.target.value})} /></div>
                  <div className="cls-field"><label>Room</label><input placeholder="e.g. Room 4" value={form.room} onChange={e=>setForm({...form,room:e.target.value})} /></div>
                  <div className="cls-field"><label>No. of Students</label><input type="number" min="0" value={form.students} onChange={e=>setForm({...form,students:e.target.value})} /></div>
                </div>
                <div style={{ display:"flex", gap:"10px", marginTop:"0.75rem" }}>
                  <button type="submit" className="cls-add-btn">Save Class</button>
                  <button type="button" className="cls-cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            )}

            {/* Cards grid */}
            <div className="cls-grid">
              {filtered.length === 0 && (
                <p style={{ color:"#94a3b8", gridColumn:"1/-1", textAlign:"center", padding:"2rem" }}>No classes found.</p>
              )}
              {filtered.map(cls => (
                <div className="cls-card" key={cls.id}>
                  <div className="cls-card-top" style={{ background:`linear-gradient(135deg, ${cls.color}22, ${cls.color}11)`, borderLeft:`4px solid ${cls.color}` }}>
                    <div className="cls-card-icon" style={{ background:`${cls.color}22`, color:cls.color }}>
                      <FaBookOpen />
                    </div>
                    <div style={{ flex:1 }}>
                      <h3 className="cls-card-name">{cls.name}</h3>
                      <p className="cls-card-teacher">👨‍🏫 {cls.teacher}</p>
                    </div>
                    <div style={{ display:"flex", gap:"6px" }}>
                      <button className="cls-icon-btn edit" title="Edit"><FaEdit /></button>
                      <button className="cls-icon-btn del" title="Delete" onClick={() => handleDelete(cls.id)}><FaTrash /></button>
                    </div>
                  </div>
                  <div className="cls-card-body">
                    <div className="cls-meta"><FaUsers style={{ color:cls.color }} /><span>{cls.students} Students</span></div>
                    <div className="cls-meta"><FaClock style={{ color:cls.color }} /><span>{cls.schedule}</span></div>
                    <div className="cls-meta"><FaBookOpen style={{ color:cls.color }} /><span>{cls.subject} · {cls.room}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Shared sub-components ──────────────────────────────────────────────────
function TopBar({ title }) {
  return (
    <header className="cls-topbar">
      <span className="cls-topbar-title">{title}</span>
    </header>
  );
}

function PageStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

      [data-theme="dark"] .cls-page  { background:#020617; }
      [data-theme="dark"] .cls-topbar{ background:rgba(15,23,42,0.95); border-color:rgba(245,158,11,0.1); }
      [data-theme="dark"] .cls-topbar-title { color:#e2e8f0; }
      [data-theme="dark"] .cls-title { color:#e2e8f0; }
      [data-theme="dark"] .cls-card  { background:#0f172a; border-color:rgba(245,158,11,0.12); }
      [data-theme="dark"] .cls-card-name { color:#e2e8f0; }
      [data-theme="dark"] .cls-form  { background:#0f172a; border-color:rgba(245,158,11,0.15); }
      [data-theme="dark"] .cls-field input { background:rgba(255,255,255,0.05); border-color:rgba(255,255,255,0.1); color:#e2e8f0; }
      [data-theme="dark"] .cls-search { background:rgba(30,41,59,0.8); border-color:rgba(245,158,11,0.2); }
      [data-theme="dark"] .cls-search input { color:#e2e8f0; }

      .cls-page  { min-height:100vh; margin-left:16rem; background:#f1f5f9; font-family:'DM Sans',sans-serif; transition:background 0.4s; }
      .cls-main  { display:flex; flex-direction:column; min-height:100vh; }
      .cls-topbar{ position:sticky; top:0; z-index:50; background:rgba(255,255,255,0.92); backdrop-filter:blur(12px); border-bottom:1px solid rgba(0,0,0,0.06); padding:0 2rem; height:4rem; display:flex; align-items:center; }
      .cls-topbar-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1.2rem; background:linear-gradient(90deg,#302b63,#f59e0b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
      .cls-content { padding:1.75rem 2rem; }
      .cls-header-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:12px; }
      .cls-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1.5rem; color:#0f172a; margin:0 0 2px; }
      .cls-sub   { color:#94a3b8; font-size:0.82rem; margin:0; }

      .cls-search { display:flex; align-items:center; gap:8px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:999px; padding:7px 14px; font-size:0.8rem; transition:all 0.2s; }
      .cls-search:focus-within { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,0.1); }
      .cls-search input { border:none; background:transparent; outline:none; font-size:0.82rem; width:170px; }

      .cls-add-btn { display:flex; align-items:center; gap:6px; background:linear-gradient(90deg,#f59e0b,#ef4444); color:#fff; border:none; padding:9px 18px; border-radius:10px; font-size:0.85rem; font-weight:700; cursor:pointer; font-family:'Syne',sans-serif; box-shadow:0 4px 14px rgba(245,158,11,0.35); transition:all 0.2s; }
      .cls-add-btn:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(245,158,11,0.45); }
      .cls-cancel-btn { background:#f1f5f9; color:#64748b; border:1px solid #e2e8f0; padding:9px 18px; border-radius:10px; font-size:0.85rem; cursor:pointer; transition:all 0.2s; }
      .cls-cancel-btn:hover { background:#e2e8f0; }

      .cls-form { background:#fff; border:1px solid #e2e8f0; border-radius:1rem; padding:1.5rem; margin-bottom:1.5rem; box-shadow:0 4px 16px rgba(0,0,0,0.06); }
      .cls-form-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1rem; color:#0f172a; margin:0 0 1rem; }
      .cls-form-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
      @media(max-width:800px){ .cls-form-grid { grid-template-columns:1fr 1fr; } }
      .cls-field label { display:block; font-size:11px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:5px; }
      .cls-field input { width:100%; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px 12px; font-size:0.85rem; outline:none; transition:border-color 0.2s; box-sizing:border-box; }
      .cls-field input:focus { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,0.1); }

      .cls-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:1.25rem; }
      .cls-card { background:#fff; border:1px solid #e8ecf0; border-radius:1rem; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05); transition:transform 0.25s,box-shadow 0.25s; }
      .cls-card:hover { transform:translateY(-4px); box-shadow:0 12px 28px rgba(0,0,0,0.1); }
      .cls-card-top { display:flex; align-items:center; gap:12px; padding:1rem 1rem 0.75rem; }
      .cls-card-icon { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1rem; flex-shrink:0; }
      .cls-card-name { font-family:'Syne',sans-serif; font-weight:700; font-size:0.95rem; color:#0f172a; margin:0 0 2px; }
      .cls-card-teacher { font-size:0.78rem; color:#64748b; margin:0; }
      .cls-card-body { padding:0.75rem 1rem 1rem; display:flex; flex-direction:column; gap:6px; border-top:1px solid #f1f5f9; }
      .cls-meta { display:flex; align-items:center; gap:8px; font-size:0.8rem; color:#475569; }
      .cls-icon-btn { background:none; border:none; cursor:pointer; padding:5px; border-radius:6px; font-size:0.85rem; transition:all 0.2s; }
      .cls-icon-btn.edit { color:#64748b; } .cls-icon-btn.edit:hover { background:#f1f5f9; color:#302b63; }
      .cls-icon-btn.del  { color:#94a3b8; } .cls-icon-btn.del:hover  { background:#fee2e2; color:#ef4444; }
    `}</style>
  );
}
