import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar.jsx";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { FaUserGraduate, FaPhone, FaSchool, FaSearch, FaEye, FaEdit, FaTrash, FaPlus, FaFilter } from "react-icons/fa";

const AVATAR_COLORS = [
  "linear-gradient(135deg,#f59e0b,#ef4444)",
  "linear-gradient(135deg,#3b82f6,#8b5cf6)",
  "linear-gradient(135deg,#10b981,#06b6d4)",
  "linear-gradient(135deg,#ec4899,#f43f5e)",
  "linear-gradient(135deg,#8b5cf6,#3b82f6)",
  "linear-gradient(135deg,#f97316,#eab308)",
];

const SAMPLE = [
  { id:"s1", admNo:"ADM-001", name:"Aisha Perera",       gender:"Female", className:"Grade 10", section:"A", mobile:"077-111-2233", joiningDate:"2023-01-10", fatherName:"Rohan Perera", fatherMobile:"071-100-2200", presentAddress:"Colombo 07" },
  { id:"s2", admNo:"ADM-002", name:"Kavindu Silva",      gender:"Male",   className:"Grade 11", section:"B", mobile:"076-222-3344", joiningDate:"2023-01-15", fatherName:"Nimal Silva",  fatherMobile:"072-200-3300", presentAddress:"Kandy" },
  { id:"s3", admNo:"ADM-003", name:"Nethmi Fernando",    gender:"Female", className:"Grade 10", section:"A", mobile:"075-333-4455", joiningDate:"2023-02-01", fatherName:"Asela Fernando",fatherMobile:"070-300-4400",presentAddress:"Galle" },
  { id:"s4", admNo:"ADM-004", name:"Tharindu Mendis",   gender:"Male",   className:"Grade 12", section:"C", mobile:"071-444-5566", joiningDate:"2022-09-01", fatherName:"Sunil Mendis", fatherMobile:"077-400-5500", presentAddress:"Matara" },
  { id:"s5", admNo:"ADM-005", name:"Dinali Wickrama",   gender:"Female", className:"Grade 11", section:"A", mobile:"072-555-6677", joiningDate:"2022-09-05", fatherName:"Priya Wickrama",fatherMobile:"076-500-6600",presentAddress:"Negombo" },
  { id:"s6", admNo:"ADM-006", name:"Yasith Bandara",    gender:"Male",   className:"Grade 10", section:"B", mobile:"077-666-7788", joiningDate:"2023-03-01", fatherName:"Ajith Bandara",fatherMobile:"075-600-7700", presentAddress:"Kurunegala" },
];

const GRADES = ["All","Grade 9","Grade 10","Grade 11","Grade 12","Grade 13"];

function initials(name) {
  return (name||"").split(" ").filter(Boolean).slice(0,2).map(w=>w[0]).join("").toUpperCase() || "?";
}

export default function StudentView() {
  const navigate = useNavigate();
  const [students, setStudents]   = useState(SAMPLE);
  const [search, setSearch]       = useState("");
  const [grade, setGrade]         = useState("All");
  const [gender, setGender]       = useState("All");
  const [selected, setSelected]   = useState(null);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    const q = query(collection(db, "students"), orderBy("createdAt","desc"));
    const unsub = onSnapshot(q, snap => {
      if (!snap.empty) {
        setStudents(snap.docs.map(d => ({ id:d.id, ...d.data(), name: d.data().name || `${d.data().firstName||""} ${d.data().lastName||""}`.trim() })));
      }
      setLoading(false);
    }, () => setLoading(false));
    return unsub;
  }, []);

  const filtered = students.filter(s => {
    const q = search.toLowerCase();
    const matchQ = s.name?.toLowerCase().includes(q) || s.admNo?.toLowerCase().includes(q) || s.mobile?.includes(q);
    const matchG = grade  === "All" || s.className === grade;
    const matchGn= gender === "All" || s.gender === gender;
    return matchQ && matchG && matchGn;
  });

  async function handleDelete(id) {
    if (!window.confirm("Delete this student?")) return;
    try { await deleteDoc(doc(db, "students", id)); setSelected(null); }
    catch { setStudents(s => s.filter(x => x.id !== id)); setSelected(null); }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        [data-theme="dark"] .sv-page   { background:#020617; }
        [data-theme="dark"] .sv-topbar { background:rgba(15,23,42,0.97); border-color:rgba(245,158,11,0.1); }
        [data-theme="dark"] .sv-panel  { background:#0f172a; border-color:rgba(245,158,11,0.1); }
        [data-theme="dark"] .sv-card   { background:#0f172a; border-color:rgba(245,158,11,0.1); }
        [data-theme="dark"] .sv-card:hover { border-color:rgba(245,158,11,0.3); }
        [data-theme="dark"] .sv-name   { color:#e2e8f0; }
        [data-theme="dark"] .sv-meta   { color:#64748b; }
        [data-theme="dark"] .sv-search { background:rgba(30,41,59,0.8); border-color:rgba(245,158,11,0.2); }
        [data-theme="dark"] .sv-search input { color:#e2e8f0; }
        [data-theme="dark"] .sv-filter { background:#1e293b; border-color:rgba(255,255,255,0.08); color:#e2e8f0; }
        [data-theme="dark"] .sv-detail-label { color:#64748b; }
        [data-theme="dark"] .sv-detail-val   { color:#e2e8f0; }
        [data-theme="dark"] .sv-section-title { color:#94a3b8; }
        [data-theme="dark"] .sv-title  { color:#e2e8f0; }
        [data-theme="dark"] .sv-overlay-panel { background:#0f172a; border-color:rgba(245,158,11,0.15); }

        .sv-page   { min-height:100vh; margin-left:16rem; background:#f1f5f9; font-family:'DM Sans',sans-serif; }
        .sv-topbar { position:sticky; top:0; z-index:50; background:rgba(255,255,255,0.95); backdrop-filter:blur(16px); border-bottom:1px solid rgba(0,0,0,0.06); padding:0 2rem; height:4rem; display:flex; align-items:center; justify-content:space-between; box-shadow:0 1px 12px rgba(0,0,0,0.06); }
        .sv-topbar-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1.2rem; background:linear-gradient(90deg,#302b63,#f59e0b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .sv-content { padding:1.75rem 2rem; }
        .sv-header-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:12px; }
        .sv-title  { font-family:'Syne',sans-serif; font-weight:800; font-size:1.5rem; color:#0f172a; margin:0 0 2px; }
        .sv-sub    { color:#94a3b8; font-size:0.82rem; margin:0; }
        .sv-add-btn { display:flex; align-items:center; gap:6px; background:linear-gradient(90deg,#f59e0b,#ef4444); color:#fff; border:none; padding:9px 18px; border-radius:10px; font-size:0.85rem; font-weight:700; cursor:pointer; font-family:'Syne',sans-serif; box-shadow:0 4px 14px rgba(245,158,11,0.35); transition:all 0.2s; }
        .sv-add-btn:hover { transform:translateY(-2px); }

        /* Filter bar */
        .sv-filter-bar { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:1.5rem; align-items:center; }
        .sv-search { display:flex; align-items:center; gap:8px; background:#fff; border:1px solid #e2e8f0; border-radius:999px; padding:8px 16px; flex:1; min-width:200px; transition:all 0.2s; }
        .sv-search:focus-within { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,0.1); }
        .sv-search input { border:none; background:transparent; outline:none; font-size:0.82rem; width:100%; }
        .sv-filter { background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:8px 12px; font-size:0.82rem; outline:none; cursor:pointer; font-family:'DM Sans',sans-serif; }
        .sv-count  { background:linear-gradient(90deg,#302b63,#f59e0b); color:#fff; font-size:0.75rem; font-weight:700; padding:5px 12px; border-radius:999px; }

        /* Grid */
        .sv-grid   { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:1.1rem; }
        .sv-card   { background:#fff; border:1.5px solid #e8ecf0; border-radius:1rem; padding:1.25rem; cursor:pointer; transition:all 0.22s; box-shadow:0 2px 8px rgba(0,0,0,0.05); }
        .sv-card:hover { transform:translateY(-4px); box-shadow:0 12px 28px rgba(0,0,0,0.1); border-color:#f59e0b44; }
        .sv-card-top { display:flex; align-items:center; gap:12px; margin-bottom:0.875rem; }
        .sv-avatar { width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-family:'Syne',sans-serif; font-weight:800; font-size:1rem; color:#fff; flex-shrink:0; }
        .sv-name   { font-family:'Syne',sans-serif; font-weight:700; font-size:0.9rem; color:#0f172a; margin:0 0 2px; }
        .sv-admno  { font-size:0.7rem; color:#94a3b8; font-family:'Courier New',monospace; }
        .sv-divider{ border:none; border-top:1px solid #f1f5f9; margin:0 0 0.75rem; }
        .sv-info   { display:flex; flex-direction:column; gap:5px; }
        .sv-meta   { display:flex; align-items:center; gap:7px; font-size:0.76rem; color:#475569; }
        .sv-badge  { display:inline-block; font-size:0.67rem; font-weight:700; padding:2px 8px; border-radius:999px; }
        .sv-badge-f { background:#fce7f3; color:#be185d; }
        .sv-badge-m { background:#dbeafe; color:#1d4ed8; }
        .sv-card-actions { display:flex; gap:6px; margin-top:0.875rem; padding-top:0.75rem; border-top:1px solid #f1f5f9; }
        .sv-icon-btn { flex:1; display:flex; align-items:center; justify-content:center; gap:5px; padding:6px 0; border-radius:7px; font-size:0.75rem; cursor:pointer; border:none; transition:all 0.2s; font-weight:600; }
        .sv-icon-btn.view { background:#f1f5f9; color:#302b63; } .sv-icon-btn.view:hover { background:#ede9fe; }
        .sv-icon-btn.edit { background:#fef3c7; color:#d97706; } .sv-icon-btn.edit:hover { background:#fde68a; }
        .sv-icon-btn.del  { background:#fee2e2; color:#ef4444; } .sv-icon-btn.del:hover  { background:#fecaca; }

        /* Detail overlay */
        .sv-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:200; display:flex; align-items:center; justify-content:center; padding:1rem; }
        .sv-overlay-panel { background:#fff; border-radius:1.25rem; width:100%; max-width:540px; max-height:90vh; overflow-y:auto; box-shadow:0 25px 60px rgba(0,0,0,0.3); }
        .sv-detail-hero { background:linear-gradient(135deg,#0f0c29,#302b63,#24243e); padding:1.5rem; display:flex; align-items:center; gap:1rem; border-radius:1.25rem 1.25rem 0 0; }
        .sv-detail-avatar { width:64px; height:64px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-family:'Syne',sans-serif; font-weight:800; font-size:1.4rem; color:#fff; border:2px solid rgba(255,255,255,0.2); flex-shrink:0; }
        .sv-detail-name  { font-family:'Syne',sans-serif; font-weight:800; font-size:1.2rem; color:#fff; margin:0 0 3px; }
        .sv-detail-admno { font-size:0.72rem; color:rgba(255,255,255,0.5); font-family:'Courier New',monospace; }
        .sv-detail-body  { padding:1.25rem; }
        .sv-section-title { font-size:0.68rem; text-transform:uppercase; letter-spacing:0.1em; color:#94a3b8; font-weight:700; margin:1rem 0 0.75rem; }
        .sv-detail-grid  { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .sv-detail-field { }
        .sv-detail-label { font-size:0.68rem; color:#94a3b8; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:2px; }
        .sv-detail-val   { font-size:0.85rem; color:#0f172a; font-weight:600; }
        .sv-detail-val.empty { color:#cbd5e1; font-weight:400; font-style:italic; }
        .sv-detail-actions { display:flex; gap:8px; padding:0 1.25rem 1.25rem; }
        .sv-detail-edit { flex:1; background:linear-gradient(90deg,#f59e0b,#ef4444); color:#fff; border:none; padding:10px; border-radius:9px; font-weight:700; cursor:pointer; font-family:'Syne',sans-serif; }
        .sv-detail-del  { background:#fee2e2; color:#ef4444; border:none; padding:10px 16px; border-radius:9px; font-weight:600; cursor:pointer; }
        .sv-detail-close { background:#f1f5f9; color:#64748b; border:none; padding:10px 16px; border-radius:9px; font-weight:600; cursor:pointer; }
        .sv-loading { text-align:center; padding:3rem; color:#94a3b8; }
        .sv-empty  { text-align:center; padding:3rem; color:#94a3b8; grid-column:1/-1; }
      `}</style>

      <div className="sv-page">
        <Sidebar />

        <header className="sv-topbar">
          <span className="sv-topbar-title">Student View</span>
          <button className="sv-add-btn" onClick={() => navigate("/students/add")}><FaPlus /> Add Student</button>
        </header>

        <div className="sv-content">
          <div className="sv-header-row">
            <div>
              <h1 className="sv-title">Student Profiles</h1>
              <p className="sv-sub">View and manage all student profiles in your institution</p>
            </div>
          </div>

          {/* Filter bar */}
          <div className="sv-filter-bar">
            <div className="sv-search">
              <FaSearch style={{ color:"#94a3b8", fontSize:"0.75rem", flexShrink:0 }} />
              <input placeholder="Search by name, ID or mobile…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="sv-filter" value={grade} onChange={e => setGrade(e.target.value)}>
              {GRADES.map(g => <option key={g}>{g}</option>)}
            </select>
            <select className="sv-filter" value={gender} onChange={e => setGender(e.target.value)}>
              {["All","Male","Female"].map(g => <option key={g}>{g}</option>)}
            </select>
            <span className="sv-count">{filtered.length} students</span>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="sv-loading">⏳ Loading students…</div>
          ) : (
            <div className="sv-grid">
              {filtered.length === 0 && <div className="sv-empty">No students found.</div>}
              {filtered.map((s, i) => (
                <div className="sv-card" key={s.id}>
                  <div className="sv-card-top">
                    <div className="sv-avatar" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                      {initials(s.name)}
                    </div>
                    <div>
                      <p className="sv-name">{s.name}</p>
                      <p className="sv-admno">{s.admNo || s.studentId || "—"}</p>
                    </div>
                  </div>
                  <hr className="sv-divider" />
                  <div className="sv-info">
                    <div className="sv-meta">
                      <span className={`sv-badge ${s.gender==="Female"?"sv-badge-f":"sv-badge-m"}`}>{s.gender||"—"}</span>
                      <span>•</span>
                      <FaSchool style={{ color:"#94a3b8" }} />
                      <span>{s.className || s.class || "—"} {s.section ? `· ${s.section}`:""}</span>
                    </div>
                    <div className="sv-meta"><FaPhone style={{ color:"#94a3b8" }} />{s.mobile||"—"}</div>
                  </div>
                  <div className="sv-card-actions">
                    <button className="sv-icon-btn view" onClick={() => setSelected(s)}><FaEye /> View</button>
                    <button className="sv-icon-btn edit" onClick={() => navigate("/students/add")}><FaEdit /> Edit</button>
                    <button className="sv-icon-btn del"  onClick={() => handleDelete(s.id)}><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail overlay */}
      {selected && (
        <div className="sv-overlay" onClick={e => { if (e.target===e.currentTarget) setSelected(null); }}>
          <div className="sv-overlay-panel">
            <div className="sv-detail-hero">
              <div className="sv-detail-avatar" style={{ background: AVATAR_COLORS[filtered.indexOf(selected) % AVATAR_COLORS.length] || AVATAR_COLORS[0] }}>
                {initials(selected.name)}
              </div>
              <div>
                <p className="sv-detail-name">{selected.name}</p>
                <p className="sv-detail-admno">{selected.admNo || selected.studentId || "—"}</p>
                <span className={`sv-badge ${selected.gender==="Female"?"sv-badge-f":"sv-badge-m"}`} style={{ marginTop:4, display:"inline-block" }}>{selected.gender||"—"}</span>
              </div>
            </div>

            <div className="sv-detail-body">
              <p className="sv-section-title">📚 Academic Info</p>
              <div className="sv-detail-grid">
                {[
                  ["Class",    selected.className || selected.class],
                  ["Section",  selected.section],
                  ["Student ID", selected.studentId],
                  ["Joining Date", selected.joiningDate || selected.joining],
                  ["Date of Birth", selected.dob],
                  ["Religion", selected.religion],
                ].map(([l,v]) => (
                  <div className="sv-detail-field" key={l}>
                    <p className="sv-detail-label">{l}</p>
                    <p className={`sv-detail-val${!v?" empty":""}`}>{v || "Not provided"}</p>
                  </div>
                ))}
              </div>

              <p className="sv-section-title">📞 Contact Info</p>
              <div className="sv-detail-grid">
                {[
                  ["Mobile", selected.mobile],
                  ["Present Address", selected.presentAddress],
                  ["Permanent Address", selected.permanentAddress],
                ].map(([l,v]) => (
                  <div className="sv-detail-field" key={l}>
                    <p className="sv-detail-label">{l}</p>
                    <p className={`sv-detail-val${!v?" empty":""}`}>{v || "Not provided"}</p>
                  </div>
                ))}
              </div>

              <p className="sv-section-title">👨‍👩‍👧 Parent Info</p>
              <div className="sv-detail-grid">
                {[
                  ["Father's Name",   selected.fatherName],
                  ["Father's Mobile", selected.fatherMobile],
                  ["Father's Email",  selected.fatherEmail],
                  ["Father's Job",    selected.fatherOccupation],
                  ["Mother's Name",   selected.motherName],
                  ["Mother's Mobile", selected.motherMobile],
                  ["Mother's Email",  selected.motherEmail],
                  ["Mother's Job",    selected.motherOccupation],
                ].map(([l,v]) => (
                  <div className="sv-detail-field" key={l}>
                    <p className="sv-detail-label">{l}</p>
                    <p className={`sv-detail-val${!v?" empty":""}`}>{v || "Not provided"}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="sv-detail-actions">
              <button className="sv-detail-edit" onClick={() => navigate("/students/add")}>✏️ Edit Student</button>
              <button className="sv-detail-del"  onClick={() => handleDelete(selected.id)}>🗑️ Delete</button>
              <button className="sv-detail-close" onClick={() => setSelected(null)}>✕ Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
