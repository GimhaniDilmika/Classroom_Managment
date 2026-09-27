import React, { useMemo, useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import { useAuth } from "../contexts/AuthContext";
import { FaBook, FaCalendarAlt, FaCheckCircle, FaEdit, FaFileAlt, FaLightbulb, FaPlus, FaSearch, FaTrash } from "react-icons/fa";

const STORAGE_KEY = "classease_assignments_v2";
const DEFAULT_ASSIGNMENTS = [
  { id: 1, title: "Algebra Practice Paper", type: "Assignment", className: "Grade 10A", subject: "Mathematics", dueDate: "2026-06-22", maxMarks: 50, status: "Published", resourceLink: "", description: "Complete all algebra questions and upload answers before the deadline.", createdBy: "Teacher" },
  { id: 2, title: "Science Term Test Paper 01", type: "Term Test Paper", className: "Grade 11B", subject: "Science", dueDate: "2026-06-25", maxMarks: 100, status: "Published", resourceLink: "", description: "Revision paper for the upcoming term test.", createdBy: "Teacher" },
  { id: 3, title: "ICT Practical Worksheet", type: "Practical Paper", className: "Grade 12 ICT", subject: "ICT", dueDate: "2026-06-20", maxMarks: 40, status: "Draft", resourceLink: "", description: "Spreadsheet formulas and database basics activity.", createdBy: "Teacher" },
];

function readAssignments() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved?.length ? saved : DEFAULT_ASSIGNMENTS;
  } catch {
    return DEFAULT_ASSIGNMENTS;
  }
}

function formatDate(date) {
  if (!date) return "No due date";
  return new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function dueState(date) {
  if (!date) return "Open";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(date);
  due.setHours(0, 0, 0, 0);
  const diff = Math.ceil((due - today) / 86400000);
  if (diff < 0) return "Overdue";
  if (diff <= 2) return "Due Soon";
  return "Open";
}

function Stat({ label, value, note }) {
  return <div className="ta-stat"><p>{label}</p><h3>{value}</h3><span>{note}</span></div>;
}

function Field({ label, children, full }) {
  return <label className={full ? "ta-field ta-full" : "ta-field"}><span>{label}</span>{children}</label>;
}

export default function TeacherAssignments() {
  const { userName } = useAuth();
  const [assignments, setAssignments] = useState(readAssignments);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", type: "Assignment", className: "Grade 10A", subject: "Mathematics", dueDate: "", maxMarks: 50, status: "Draft", resourceLink: "", description: "" });

  const filtered = useMemo(() => assignments.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch = `${item.title} ${item.type} ${item.className} ${item.subject}`.toLowerCase().includes(q);
    const matchType = filterType === "All" || item.type === filterType;
    return matchSearch && matchType;
  }), [assignments, search, filterType]);

  const stats = useMemo(() => ({
    total: assignments.length,
    published: assignments.filter((a) => a.status === "Published").length,
    dueSoon: assignments.filter((a) => dueState(a.dueDate) === "Due Soon").length,
    papers: assignments.filter((a) => a.type.includes("Paper") || a.type.includes("Test")).length,
  }), [assignments]);

  function persist(next) {
    setAssignments(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function resetForm() {
    setForm({ title: "", type: "Assignment", className: "Grade 10A", subject: "Mathematics", dueDate: "", maxMarks: 50, status: "Draft", resourceLink: "", description: "" });
    setEditingId(null);
    setShowForm(false);
  }

  function submitAssignment(e) {
    e.preventDefault();
    const payload = { ...form, maxMarks: Number(form.maxMarks || 0), updatedAt: new Date().toISOString(), createdBy: userName || "Teacher" };
    if (editingId) {
      persist(assignments.map((item) => item.id === editingId ? { ...item, ...payload } : item));
    } else {
      persist([{ ...payload, id: Date.now(), createdAt: new Date().toISOString() }, ...assignments]);
    }
    resetForm();
  }

  function editAssignment(item) {
    setEditingId(item.id);
    setForm({ title: item.title, type: item.type, className: item.className, subject: item.subject, dueDate: item.dueDate, maxMarks: item.maxMarks, status: item.status, resourceLink: item.resourceLink || "", description: item.description || "" });
    setShowForm(true);
  }

  function deleteAssignment(id) {
    if (window.confirm("Delete this assignment or paper?")) persist(assignments.filter((item) => item.id !== id));
  }

  function publishAssignment(id) {
    persist(assignments.map((item) => item.id === id ? { ...item, status: "Published" } : item));
  }

  return (
    <>
      <style>{`
        .ta-page{min-height:100vh;margin-left:16rem;background:#f1f5f9;font-family:'DM Sans',sans-serif}.ta-topbar{height:4rem;background:rgba(255,255,255,.96);border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;position:sticky;top:0;z-index:80}.ta-brand{font-family:'Syne',sans-serif;font-weight:800;background:linear-gradient(90deg,#302b63,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.ta-primary{border:0;border-radius:10px;padding:.65rem 1rem;background:linear-gradient(90deg,#f59e0b,#ef4444);color:#fff;font-weight:800;display:flex;gap:.45rem;align-items:center;cursor:pointer}.ta-content{padding:1.75rem 2rem}.ta-hero{background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);border-radius:1.35rem;color:#fff;padding:1.8rem;margin-bottom:1rem}.ta-hero p{color:rgba(255,255,255,.68);max-width:850px}.ta-hero h1{font-family:'Syne',sans-serif;margin:.3rem 0}.ta-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem;margin-bottom:1rem}.ta-stat{background:#fff;border:1px solid #e8ecf0;border-radius:1rem;padding:1rem;box-shadow:0 4px 18px rgba(15,23,42,.06)}.ta-stat p{margin:0;color:#64748b;font-size:.72rem;text-transform:uppercase;font-weight:800}.ta-stat h3{margin:.2rem 0;color:#0f172a;font-size:1.45rem}.ta-stat span{color:#94a3b8;font-size:.76rem}.ta-toolbar{display:flex;gap:.75rem;align-items:center;justify-content:space-between;background:#fff;border:1px solid #e8ecf0;border-radius:1rem;padding:1rem;margin-bottom:1rem}.ta-search{display:flex;align-items:center;gap:.5rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:999px;padding:.65rem 1rem;flex:1}.ta-search input,.ta-toolbar select{border:0;background:transparent;outline:0;font-family:inherit}.ta-toolbar select{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:.65rem}.ta-form{background:#fff;border:1px solid #e8ecf0;border-radius:1rem;padding:1.2rem;margin-bottom:1rem;box-shadow:0 4px 18px rgba(15,23,42,.06)}.ta-form h2{font-size:1rem;margin:0 0 1rem;color:#0f172a}.ta-form-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.9rem}.ta-field{display:flex;flex-direction:column;gap:.35rem}.ta-field span{font-size:.72rem;text-transform:uppercase;font-weight:800;color:#64748b}.ta-field input,.ta-field select,.ta-field textarea{border:1px solid #e2e8f0;border-radius:10px;padding:.75rem;font-family:inherit;outline:0}.ta-field textarea{min-height:90px;resize:vertical}.ta-full{grid-column:1/-1}.ta-actions{display:flex;gap:.65rem;margin-top:1rem}.ta-secondary{border:1px solid #e2e8f0;background:#fff;border-radius:10px;padding:.65rem 1rem;font-weight:800;cursor:pointer}.ta-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.ta-card{background:#fff;border:1px solid #e8ecf0;border-radius:1.1rem;padding:1.2rem;box-shadow:0 4px 18px rgba(15,23,42,.06)}.ta-card-top{display:flex;justify-content:space-between;gap:.75rem}.ta-title{font-size:1rem;font-weight:900;color:#0f172a;margin:0}.ta-meta{color:#64748b;font-size:.82rem;margin:.25rem 0}.ta-desc{color:#475569;font-size:.85rem;line-height:1.5}.ta-pill{display:inline-flex;align-items:center;gap:.3rem;border-radius:999px;padding:.28rem .65rem;font-size:.72rem;font-weight:900}.ta-pub{background:#ecfdf5;color:#047857}.ta-draft{background:#f1f5f9;color:#475569}.ta-over{background:#fee2e2;color:#b91c1c}.ta-soon{background:#fffbeb;color:#b45309}.ta-card-actions{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem}.ta-small{border:0;border-radius:8px;padding:.48rem .75rem;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:.35rem}.ta-edit{background:#dbeafe;color:#1d4ed8}.ta-delete{background:#fee2e2;color:#dc2626}.ta-publish{background:#ecfdf5;color:#047857}.ta-intel{background:#fff7ed;border:1px solid #fed7aa;color:#9a3412;border-radius:1rem;padding:1rem;margin-top:1rem;display:flex;gap:.7rem}.ta-empty{grid-column:1/-1;background:#fff;border-radius:1rem;padding:2rem;text-align:center;color:#64748b}@media(max-width:900px){.ta-page{margin-left:0}.ta-topbar{padding-left:4.5rem;padding-right:1rem}.ta-content{padding:1rem}.ta-stats,.ta-grid,.ta-form-grid{grid-template-columns:1fr}.ta-toolbar{flex-direction:column;align-items:stretch}.ta-hero{padding:1.3rem}.ta-primary{width:100%;justify-content:center}}
      `}</style>
      <Sidebar />
      <main className="ta-page">
        <header className="ta-topbar"><span className="ta-brand">Assignment & Paper Management</span><button className="ta-primary" onClick={() => setShowForm(!showForm)}><FaPlus /> {showForm ? "Close" : "Create New"}</button></header>
        <section className="ta-content">
          <div className="ta-hero"><p>Teacher Workspace</p><h1>Create assignments, papers, and term-test resources</h1><p>Teachers can publish learning tasks, attach resource links, set due dates, and prepare structured assessment work for assigned classes.</p></div>
          <div className="ta-stats"><Stat label="Total Tasks" value={stats.total} note="Assignments and papers"/><Stat label="Published" value={stats.published} note="Visible to students"/><Stat label="Due Soon" value={stats.dueSoon} note="Need reminder"/><Stat label="Papers" value={stats.papers} note="Test/practical papers"/></div>
          <div className="ta-toolbar"><div className="ta-search"><FaSearch style={{color:"#94a3b8"}}/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search by title, subject or class"/></div><select value={filterType} onChange={(e)=>setFilterType(e.target.value)}><option>All</option><option>Assignment</option><option>Term Test Paper</option><option>Practical Paper</option><option>Revision Paper</option></select></div>
          {showForm && <form className="ta-form" onSubmit={submitAssignment}><h2>{editingId ? "Update Assignment / Paper" : "New Assignment / Paper"}</h2><div className="ta-form-grid"><Field label="Title"><input required value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} placeholder="e.g. Algebra Practice Paper"/></Field><Field label="Type"><select value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})}><option>Assignment</option><option>Term Test Paper</option><option>Practical Paper</option><option>Revision Paper</option></select></Field><Field label="Class"><select value={form.className} onChange={(e)=>setForm({...form,className:e.target.value})}><option>Grade 10A</option><option>Grade 10B</option><option>Grade 11B</option><option>Grade 12 ICT</option></select></Field><Field label="Subject"><select value={form.subject} onChange={(e)=>setForm({...form,subject:e.target.value})}><option>Mathematics</option><option>Science</option><option>English</option><option>ICT</option><option>History</option></select></Field><Field label="Due Date"><input type="date" value={form.dueDate} onChange={(e)=>setForm({...form,dueDate:e.target.value})}/></Field><Field label="Max Marks"><input type="number" min="1" value={form.maxMarks} onChange={(e)=>setForm({...form,maxMarks:e.target.value})}/></Field><Field label="Status"><select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}><option>Draft</option><option>Published</option></select></Field><Field label="Resource Link" full><input value={form.resourceLink} onChange={(e)=>setForm({...form,resourceLink:e.target.value})} placeholder="Optional Google Drive / PDF / LMS link"/></Field><Field label="Instructions" full><textarea required value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} placeholder="Write clear student instructions"/></Field></div><div className="ta-actions"><button className="ta-primary" type="submit"><FaCheckCircle /> {editingId ? "Update" : "Save"}</button><button type="button" className="ta-secondary" onClick={resetForm}>Cancel</button></div></form>}
          <div className="ta-grid">{filtered.length === 0 ? <div className="ta-empty">No assignments found.</div> : filtered.map((item) => { const state = dueState(item.dueDate); return <article className="ta-card" key={item.id}><div className="ta-card-top"><div><h3 className="ta-title"><FaFileAlt /> {item.title}</h3><p className="ta-meta">{item.className} · {item.subject} · {item.type}</p></div><span className={`ta-pill ${item.status === "Published" ? "ta-pub" : "ta-draft"}`}>{item.status}</span></div><p className="ta-desc">{item.description}</p><p className="ta-meta"><FaCalendarAlt /> Due: {formatDate(item.dueDate)} · Marks: {item.maxMarks}</p><span className={`ta-pill ${state === "Overdue" ? "ta-over" : state === "Due Soon" ? "ta-soon" : "ta-pub"}`}>{state}</span><div className="ta-card-actions"><button className="ta-small ta-edit" onClick={()=>editAssignment(item)}><FaEdit /> Edit</button>{item.status !== "Published" && <button className="ta-small ta-publish" onClick={()=>publishAssignment(item.id)}><FaCheckCircle /> Publish</button>}<button className="ta-small ta-delete" onClick={()=>deleteAssignment(item.id)}><FaTrash /> Delete</button></div>{state === "Due Soon" && <div className="ta-intel"><FaLightbulb /><span>Intelligent reminder: this task is due soon. Consider reminding students in the next live session.</span></div>}</article>})}</div>
        </section>
      </main>
    </>
  );
}
