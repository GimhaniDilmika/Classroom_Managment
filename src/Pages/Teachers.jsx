import React, { useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaEnvelope, FaPhone, FaBookOpen } from "react-icons/fa";

const COLORS = ["#f59e0b","#ef4444","#8b5cf6","#06b6d4","#10b981","#f97316"];

const SAMPLE = [
  { id:1, name:"Ms. Nishani Perera",    subject:"Science",  phone:"071-234-5678", email:"nperera@school.lk",  classes:3, joined:"Jan 2023" },
  { id:2, name:"Mr. Kamal Silva",       subject:"Maths",    phone:"077-345-6789", email:"ksilva@school.lk",   classes:4, joined:"Mar 2022" },
  { id:3, name:"Ms. Asha Fernando",     subject:"English",  phone:"070-456-7890", email:"afernando@school.lk",classes:2, joined:"Aug 2023" },
  { id:4, name:"Mr. Lahiru Jayasinghe", subject:"ICT",      phone:"076-567-8901", email:"ljaya@school.lk",    classes:3, joined:"Jan 2024" },
];

export default function Teachers({ mode = "list" }) {
  const [teachers, setTeachers] = useState(SAMPLE);
  const [search, setSearch]     = useState("");
  const [view, setView]         = useState(mode); // "list" | "add"
  const [form, setForm]         = useState({ name:"", subject:"", phone:"", email:"", classes:0, joined:"" });
  const [editId, setEditId]     = useState(null);

  const filtered = teachers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  function initials(name) {
    return name.split(" ").filter(Boolean).slice(0,2).map(w=>w[0]).join("").toUpperCase();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      setTeachers(teachers.map(t => t.id === editId ? { ...form, id:editId, classes:Number(form.classes) } : t));
      setEditId(null);
    } else {
      setTeachers([{ ...form, id:Date.now(), classes:Number(form.classes), joined: new Date().toLocaleDateString("en-GB",{month:"short",year:"numeric"}) }, ...teachers]);
    }
    setForm({ name:"", subject:"", phone:"", email:"", classes:0, joined:"" });
    setView("list");
  }

  function startEdit(t) {
    setForm({ name:t.name, subject:t.subject, phone:t.phone, email:t.email, classes:t.classes, joined:t.joined });
    setEditId(t.id);
    setView("add");
  }

  function handleDelete(id) {
    setTeachers(teachers.filter(t => t.id !== id));
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        [data-theme="dark"] .tc-page   { background:#020617; }
        [data-theme="dark"] .tc-topbar { background:rgba(15,23,42,0.95); border-color:rgba(245,158,11,0.1); }
        [data-theme="dark"] .tc-topbar-title { color:#e2e8f0; }
        [data-theme="dark"] .tc-title  { color:#e2e8f0; }
        [data-theme="dark"] .tc-card   { background:#0f172a; border-color:rgba(245,158,11,0.12); }
        [data-theme="dark"] .tc-card-name { color:#e2e8f0; }
        [data-theme="dark"] .tc-meta   { color:#94a3b8; }
        [data-theme="dark"] .tc-form   { background:#0f172a; border-color:rgba(245,158,11,0.15); }
        [data-theme="dark"] .tc-field input { background:rgba(255,255,255,0.05); border-color:rgba(255,255,255,0.1); color:#e2e8f0; }
        [data-theme="dark"] .tc-search { background:rgba(30,41,59,0.8); border-color:rgba(245,158,11,0.2); }
        [data-theme="dark"] .tc-search input { color:#e2e8f0; }

        .tc-page   { min-height:100vh; margin-left:16rem; background:#f1f5f9; font-family:'DM Sans',sans-serif; transition:background 0.4s; }
        .tc-topbar { position:sticky; top:0; z-index:50; background:rgba(255,255,255,0.92); backdrop-filter:blur(12px); border-bottom:1px solid rgba(0,0,0,0.06); padding:0 2rem; height:4rem; display:flex; align-items:center; justify-content:space-between; }
        .tc-topbar-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1.2rem; background:linear-gradient(90deg,#302b63,#f59e0b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .tc-content { padding:1.75rem 2rem; }
        .tc-header-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:12px; }
        .tc-title  { font-family:'Syne',sans-serif; font-weight:800; font-size:1.5rem; color:#0f172a; margin:0 0 2px; }
        .tc-sub    { color:#94a3b8; font-size:0.82rem; margin:0; }
        .tc-search { display:flex; align-items:center; gap:8px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:999px; padding:7px 14px; }
        .tc-search:focus-within { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,0.1); }
        .tc-search input { border:none; background:transparent; outline:none; font-size:0.82rem; width:170px; }
        .tc-add-btn { display:flex; align-items:center; gap:6px; background:linear-gradient(90deg,#f59e0b,#ef4444); color:#fff; border:none; padding:9px 18px; border-radius:10px; font-size:0.85rem; font-weight:700; cursor:pointer; font-family:'Syne',sans-serif; box-shadow:0 4px 14px rgba(245,158,11,0.35); transition:all 0.2s; }
        .tc-add-btn:hover { transform:translateY(-2px); }
        .tc-cancel-btn { background:#f1f5f9; color:#64748b; border:1px solid #e2e8f0; padding:9px 18px; border-radius:10px; font-size:0.85rem; cursor:pointer; }

        .tc-form { background:#fff; border:1px solid #e2e8f0; border-radius:1rem; padding:1.5rem; margin-bottom:1.5rem; box-shadow:0 4px 16px rgba(0,0,0,0.06); }
        .tc-form-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1rem; color:#0f172a; margin:0 0 1rem; }
        .tc-form-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
        @media(max-width:800px){ .tc-form-grid { grid-template-columns:1fr 1fr; } }
        .tc-field label { display:block; font-size:11px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:5px; }
        .tc-field input { width:100%; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px 12px; font-size:0.85rem; outline:none; transition:border-color 0.2s; box-sizing:border-box; }
        .tc-field input:focus { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,0.1); }

        .tc-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(270px,1fr)); gap:1.25rem; }
        .tc-card { background:#fff; border:1px solid #e8ecf0; border-radius:1rem; padding:1.25rem; box-shadow:0 2px 8px rgba(0,0,0,0.05); transition:transform 0.25s,box-shadow 0.25s; }
        .tc-card:hover { transform:translateY(-4px); box-shadow:0 12px 28px rgba(0,0,0,0.1); }
        .tc-card-top { display:flex; align-items:center; gap:12px; margin-bottom:1rem; }
        .tc-avatar { width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1rem; color:#fff; flex-shrink:0; font-family:'Syne',sans-serif; }
        .tc-card-name { font-family:'Syne',sans-serif; font-weight:700; font-size:0.95rem; color:#0f172a; margin:0 0 2px; }
        .tc-subject  { font-size:0.78rem; color:#f59e0b; font-weight:600; margin:0; }
        .tc-meta { display:flex; align-items:center; gap:7px; font-size:0.78rem; color:#64748b; margin-bottom:5px; }
        .tc-card-actions { display:flex; gap:6px; margin-top:0.75rem; padding-top:0.75rem; border-top:1px solid #f1f5f9; }
        .tc-icon-btn { flex:1; display:flex; align-items:center; justify-content:center; gap:5px; padding:6px 0; border-radius:7px; font-size:0.78rem; cursor:pointer; border:none; transition:all 0.2s; font-weight:600; }
        .tc-icon-btn.edit { background:#f1f5f9; color:#302b63; } .tc-icon-btn.edit:hover { background:#e0e7ff; }
        .tc-icon-btn.del  { background:#fee2e2; color:#ef4444; } .tc-icon-btn.del:hover  { background:#fecaca; }
      `}</style>

      <div className="tc-page">
        <Sidebar />
        <div>
          <header className="tc-topbar">
            <span className="tc-topbar-title">Teachers</span>
          </header>

          <div className="tc-content">
            <div className="tc-header-row">
              <div>
                <h1 className="tc-title">{view === "add" ? (editId ? "Edit Teacher" : "Add Teacher") : "All Teachers"}</h1>
                {view === "list" && <p className="tc-sub">{filtered.length} teacher{filtered.length !== 1 ? "s" : ""} registered</p>}
              </div>
              <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                {view === "list" && (
                  <div className="tc-search">
                    <FaSearch style={{ color:"#94a3b8", fontSize:"0.75rem" }} />
                    <input placeholder="Search teachers…" value={search} onChange={e=>setSearch(e.target.value)} />
                  </div>
                )}
                <button className="tc-add-btn" onClick={() => { setView(view==="add"?"list":"add"); setEditId(null); setForm({name:"",subject:"",phone:"",email:"",classes:0,joined:""}); }}>
                  {view === "add" ? "← Back" : <><FaPlus /> Add Teacher</>}
                </button>
              </div>
            </div>

            {/* Form */}
            {view === "add" && (
              <form className="tc-form" onSubmit={handleSubmit}>
                <h3 className="tc-form-title">{editId ? "Edit Teacher Details" : "New Teacher"}</h3>
                <div className="tc-form-grid">
                  <div className="tc-field"><label>Full Name</label><input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
                  <div className="tc-field"><label>Subject</label><input required placeholder="Subject taught" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} /></div>
                  <div className="tc-field"><label>Phone</label><input placeholder="07X-XXX-XXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></div>
                  <div className="tc-field"><label>Email</label><input type="email" placeholder="teacher@school.lk" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
                  <div className="tc-field"><label>No. of Classes</label><input type="number" min="0" value={form.classes} onChange={e=>setForm({...form,classes:e.target.value})} /></div>
                </div>
                <div style={{ display:"flex", gap:"10px", marginTop:"0.75rem" }}>
                  <button type="submit" className="tc-add-btn">{editId?"Update Teacher":"Save Teacher"}</button>
                  <button type="button" className="tc-cancel-btn" onClick={() => { setView("list"); setEditId(null); }}>Cancel</button>
                </div>
              </form>
            )}

            {/* Grid */}
            {view === "list" && (
              <div className="tc-grid">
                {filtered.length === 0 && <p style={{ color:"#94a3b8", gridColumn:"1/-1", textAlign:"center", padding:"2rem" }}>No teachers found.</p>}
                {filtered.map((t, i) => (
                  <div className="tc-card" key={t.id}>
                    <div className="tc-card-top">
                      <div className="tc-avatar" style={{ background:`linear-gradient(135deg,${COLORS[i%COLORS.length]},${COLORS[(i+2)%COLORS.length]})` }}>{initials(t.name)}</div>
                      <div>
                        <p className="tc-card-name">{t.name}</p>
                        <p className="tc-subject">{t.subject}</p>
                      </div>
                    </div>
                    <div className="tc-meta"><FaEnvelope style={{ color:"#94a3b8" }}/>{t.email}</div>
                    <div className="tc-meta"><FaPhone style={{ color:"#94a3b8" }}/>{t.phone}</div>
                    <div className="tc-meta"><FaBookOpen style={{ color:"#94a3b8" }}/>{t.classes} Classes · Joined {t.joined}</div>
                    <div className="tc-card-actions">
                      <button className="tc-icon-btn edit" onClick={() => startEdit(t)}><FaEdit /> Edit</button>
                      <button className="tc-icon-btn del"  onClick={() => handleDelete(t.id)}><FaTrash /> Delete</button>
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
