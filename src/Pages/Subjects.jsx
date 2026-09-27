import React, { useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaBook } from "react-icons/fa";

const COLORS = ["#f59e0b","#ef4444","#8b5cf6","#06b6d4","#10b981","#f97316"];

const SAMPLE = [
  { id:1, name:"Mathematics",        code:"MATH101", teacher:"Mr. Silva",      grade:"Grade 10-12", sessions:5, color:"#f59e0b" },
  { id:2, name:"Science",            code:"SCI202",  teacher:"Ms. Perera",     grade:"Grade 9-11",  sessions:4, color:"#ef4444" },
  { id:3, name:"English Language",   code:"ENG101",  teacher:"Ms. Fernando",   grade:"Grade 6-13",  sessions:6, color:"#8b5cf6" },
  { id:4, name:"ICT",                code:"ICT303",  teacher:"Mr. Jayasinghe", grade:"Grade 10-13", sessions:3, color:"#06b6d4" },
  { id:5, name:"History",            code:"HIS201",  teacher:"Ms. Kumari",     grade:"Grade 6-11",  sessions:3, color:"#10b981" },
];

export default function Subjects({ mode = "list" }) {
  const [subjects, setSubjects] = useState(SAMPLE);
  const [search, setSearch]     = useState("");
  const [view, setView]         = useState(mode);
  const [form, setForm]         = useState({ name:"", code:"", teacher:"", grade:"", sessions:0 });
  const [editId, setEditId]     = useState(null);

  const filtered = subjects.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase())
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      setSubjects(subjects.map(s => s.id === editId ? { ...form, id: editId, sessions: Number(form.sessions), color: subjects.find(x=>x.id===editId).color } : s));
      setEditId(null);
    } else {
      setSubjects([{ ...form, id: Date.now(), sessions: Number(form.sessions), color: COLORS[subjects.length % COLORS.length] }, ...subjects]);
    }
    setForm({ name:"", code:"", teacher:"", grade:"", sessions:0 });
    setView("list");
  }

  function startEdit(s) {
    setForm({ name:s.name, code:s.code, teacher:s.teacher, grade:s.grade, sessions:s.sessions });
    setEditId(s.id);
    setView("add");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        [data-theme="dark"] .sub-page  { background:#020617; }
        [data-theme="dark"] .sub-topbar{ background:rgba(15,23,42,0.95); border-color:rgba(245,158,11,0.1); }
        [data-theme="dark"] .sub-title { color:#e2e8f0; }
        [data-theme="dark"] .sub-card  { background:#0f172a; border-color:rgba(245,158,11,0.12); }
        [data-theme="dark"] .sub-card-name { color:#e2e8f0; }
        [data-theme="dark"] .sub-meta  { color:#94a3b8; }
        [data-theme="dark"] .sub-form  { background:#0f172a; border-color:rgba(245,158,11,0.15); }
        [data-theme="dark"] .sub-field input { background:rgba(255,255,255,0.05); border-color:rgba(255,255,255,0.1); color:#e2e8f0; }
        [data-theme="dark"] .sub-search{ background:rgba(30,41,59,0.8); border-color:rgba(245,158,11,0.2); }
        [data-theme="dark"] .sub-search input { color:#e2e8f0; }

        .sub-page   { min-height:100vh; margin-left:16rem; background:#f1f5f9; font-family:'DM Sans',sans-serif; }
        .sub-topbar { position:sticky; top:0; z-index:50; background:rgba(255,255,255,0.92); backdrop-filter:blur(12px); border-bottom:1px solid rgba(0,0,0,0.06); padding:0 2rem; height:4rem; display:flex; align-items:center; }
        .sub-topbar-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1.2rem; background:linear-gradient(90deg,#302b63,#f59e0b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .sub-content { padding:1.75rem 2rem; }
        .sub-header-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:12px; }
        .sub-title  { font-family:'Syne',sans-serif; font-weight:800; font-size:1.5rem; color:#0f172a; margin:0 0 2px; }
        .sub-sub    { color:#94a3b8; font-size:0.82rem; margin:0; }
        .sub-search { display:flex; align-items:center; gap:8px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:999px; padding:7px 14px; }
        .sub-search:focus-within { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,0.1); }
        .sub-search input { border:none; background:transparent; outline:none; font-size:0.82rem; width:170px; }
        .sub-add-btn { display:flex; align-items:center; gap:6px; background:linear-gradient(90deg,#f59e0b,#ef4444); color:#fff; border:none; padding:9px 18px; border-radius:10px; font-size:0.85rem; font-weight:700; cursor:pointer; font-family:'Syne',sans-serif; box-shadow:0 4px 14px rgba(245,158,11,0.35); transition:all 0.2s; }
        .sub-add-btn:hover { transform:translateY(-2px); }
        .sub-cancel-btn { background:#f1f5f9; color:#64748b; border:1px solid #e2e8f0; padding:9px 18px; border-radius:10px; font-size:0.85rem; cursor:pointer; }

        .sub-form { background:#fff; border:1px solid #e2e8f0; border-radius:1rem; padding:1.5rem; margin-bottom:1.5rem; box-shadow:0 4px 16px rgba(0,0,0,0.06); }
        .sub-form-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1rem; color:#0f172a; margin:0 0 1rem; }
        .sub-form-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
        .sub-field label { display:block; font-size:11px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:5px; }
        .sub-field input { width:100%; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px 12px; font-size:0.85rem; outline:none; transition:border-color 0.2s; box-sizing:border-box; }
        .sub-field input:focus { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,0.1); }

        .sub-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(270px,1fr)); gap:1.25rem; }
        .sub-card { background:#fff; border:1px solid #e8ecf0; border-radius:1rem; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05); transition:transform 0.25s,box-shadow 0.25s; }
        .sub-card:hover { transform:translateY(-4px); box-shadow:0 12px 28px rgba(0,0,0,0.1); }
        .sub-card-top { padding:1rem; display:flex; align-items:center; gap:12px; }
        .sub-icon { width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1rem; flex-shrink:0; }
        .sub-card-name { font-family:'Syne',sans-serif; font-weight:700; font-size:0.95rem; color:#0f172a; margin:0 0 2px; }
        .sub-code { font-size:0.72rem; color:#94a3b8; font-weight:600; margin:0; letter-spacing:0.06em; }
        .sub-card-body { padding:0 1rem 0.75rem; display:flex; flex-direction:column; gap:5px; }
        .sub-meta { font-size:0.78rem; color:#475569; }
        .sub-card-actions { display:flex; gap:6px; padding:0.75rem 1rem; border-top:1px solid #f1f5f9; }
        .sub-icon-btn { flex:1; display:flex; align-items:center; justify-content:center; gap:5px; padding:6px 0; border-radius:7px; font-size:0.78rem; cursor:pointer; border:none; transition:all 0.2s; font-weight:600; }
        .sub-icon-btn.edit { background:#f1f5f9; color:#302b63; } .sub-icon-btn.edit:hover { background:#e0e7ff; }
        .sub-icon-btn.del  { background:#fee2e2; color:#ef4444; } .sub-icon-btn.del:hover  { background:#fecaca; }
      `}</style>

      <div className="sub-page">
        <Sidebar />
        <div>
          <header className="sub-topbar">
            <span className="sub-topbar-title">Subjects</span>
          </header>
          <div className="sub-content">
            <div className="sub-header-row">
              <div>
                <h1 className="sub-title">{view === "add" ? (editId ? "Edit Subject" : "Add Subject") : "All Subjects"}</h1>
                {view === "list" && <p className="sub-sub">{filtered.length} subject{filtered.length !== 1 ? "s" : ""} registered</p>}
              </div>
              <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                {view === "list" && (
                  <div className="sub-search">
                    <FaSearch style={{ color:"#94a3b8", fontSize:"0.75rem" }} />
                    <input placeholder="Search subjects…" value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                )}
                <button className="sub-add-btn" onClick={() => { setView(view==="add"?"list":"add"); setEditId(null); setForm({name:"",code:"",teacher:"",grade:"",sessions:0}); }}>
                  {view === "add" ? "← Back" : <><FaPlus /> Add Subject</>}
                </button>
              </div>
            </div>

            {view === "add" && (
              <form className="sub-form" onSubmit={handleSubmit}>
                <h3 className="sub-form-title">{editId ? "Edit Subject" : "New Subject"}</h3>
                <div className="sub-form-grid">
                  <div className="sub-field"><label>Subject Name</label><input required placeholder="e.g. Mathematics" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
                  <div className="sub-field"><label>Subject Code</label><input required placeholder="e.g. MATH101" value={form.code} onChange={e=>setForm({...form,code:e.target.value})} /></div>
                  <div className="sub-field"><label>Teacher</label><input required placeholder="Teacher name" value={form.teacher} onChange={e=>setForm({...form,teacher:e.target.value})} /></div>
                  <div className="sub-field"><label>Grade Level</label><input placeholder="e.g. Grade 10-12" value={form.grade} onChange={e=>setForm({...form,grade:e.target.value})} /></div>
                  <div className="sub-field"><label>Sessions/Week</label><input type="number" min="0" value={form.sessions} onChange={e=>setForm({...form,sessions:e.target.value})} /></div>
                </div>
                <div style={{ display:"flex", gap:"10px", marginTop:"0.75rem" }}>
                  <button type="submit" className="sub-add-btn">{editId?"Update":"Save Subject"}</button>
                  <button type="button" className="sub-cancel-btn" onClick={() => { setView("list"); setEditId(null); }}>Cancel</button>
                </div>
              </form>
            )}

            {view === "list" && (
              <div className="sub-grid">
                {filtered.length === 0 && <p style={{ color:"#94a3b8", gridColumn:"1/-1", textAlign:"center", padding:"2rem" }}>No subjects found.</p>}
                {filtered.map(s => (
                  <div className="sub-card" key={s.id}>
                    <div className="sub-card-top" style={{ background:`linear-gradient(135deg,${s.color}18,${s.color}08)`, borderLeft:`4px solid ${s.color}` }}>
                      <div className="sub-icon" style={{ background:`${s.color}22`, color:s.color }}><FaBook /></div>
                      <div>
                        <p className="sub-card-name">{s.name}</p>
                        <p className="sub-code">{s.code}</p>
                      </div>
                    </div>
                    <div className="sub-card-body">
                      <p className="sub-meta">👨‍🏫 {s.teacher}</p>
                      <p className="sub-meta">🎓 {s.grade}</p>
                      <p className="sub-meta">📅 {s.sessions} sessions/week</p>
                    </div>
                    <div className="sub-card-actions">
                      <button className="sub-icon-btn edit" onClick={() => startEdit(s)}><FaEdit /> Edit</button>
                      <button className="sub-icon-btn del" onClick={() => setSubjects(subjects.filter(x=>x.id!==s.id))}><FaTrash /> Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
