import React, { useMemo, useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import { useAuth } from "../contexts/AuthContext";
import { FaCheckCircle, FaEdit, FaGraduationCap, FaLightbulb, FaPlus, FaSearch, FaTrash } from "react-icons/fa";

const STORAGE_KEY = "classease_marks_v2";
const DEFAULT_MARKS = [
  { id: 1, studentId: "STU-001", student: "Aisha Perera", className: "Grade 10A", subject: "Mathematics", assessmentType: "Term Test", term: "Term 1", title: "Mathematics Term Test", marks: 86, maxMarks: 100, remarks: "Excellent algebra skills.", managedBy: "Teacher" },
  { id: 2, studentId: "STU-002", student: "Kavindu Silva", className: "Grade 10A", subject: "Mathematics", assessmentType: "Assignment", term: "Term 1", title: "Algebra Practice Paper", marks: 32, maxMarks: 50, remarks: "Needs more practice in factorization.", managedBy: "Teacher" },
  { id: 3, studentId: "STU-003", student: "Nethmi Fernando", className: "Grade 11B", subject: "Science", assessmentType: "Quiz", term: "Term 1", title: "Physics Quiz", marks: 78, maxMarks: 100, remarks: "Good understanding.", managedBy: "Teacher" },
  { id: 4, studentId: "STU-004", student: "Tharindu Mendis", className: "Grade 12 ICT", subject: "ICT", assessmentType: "Practical", term: "Term 1", title: "Database Practical", marks: 35, maxMarks: 40, remarks: "Strong practical performance.", managedBy: "Teacher" },
];
function readMarks() { try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); return saved?.length ? saved : DEFAULT_MARKS; } catch { return DEFAULT_MARKS; } }
function percent(marks, maxMarks) { return maxMarks ? Math.round((Number(marks) / Number(maxMarks)) * 100) : 0; }
function grade(p) { if (p >= 85) return "A"; if (p >= 75) return "B"; if (p >= 65) return "C"; if (p >= 50) return "S"; return "Support"; }
function status(p) { if (p >= 75) return "Excellent"; if (p >= 50) return "On Track"; return "Support Needed"; }
function Stat({ label, value, note }) { return <div className="tm-stat"><p>{label}</p><h3>{value}</h3><span>{note}</span></div>; }
function Field({ label, children, wide }) { return <label className={wide ? "tm-field tm-wide" : "tm-field"}><span>{label}</span>{children}</label>; }

export default function TeacherMarks() {
  const { userName } = useAuth();
  const [marks, setMarks] = useState(readMarks);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ studentId: "", student: "", className: "Grade 10A", subject: "Mathematics", assessmentType: "Term Test", term: "Term 1", title: "", marks: "", maxMarks: 100, remarks: "" });

  const filtered = useMemo(() => marks.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch = `${item.student} ${item.studentId} ${item.subject} ${item.title} ${item.assessmentType}`.toLowerCase().includes(q);
    const matchClass = classFilter === "All" || item.className === classFilter;
    return matchSearch && matchClass;
  }), [marks, search, classFilter]);

  const analytics = useMemo(() => {
    const avg = marks.length ? Math.round(marks.reduce((sum, item) => sum + percent(item.marks, item.maxMarks), 0) / marks.length) : 0;
    const support = marks.filter((item) => percent(item.marks, item.maxMarks) < 50).length;
    const excellent = marks.filter((item) => percent(item.marks, item.maxMarks) >= 85).length;
    const termTests = marks.filter((item) => item.assessmentType === "Term Test").length;
    return { avg, support, excellent, total: marks.length, termTests };
  }, [marks]);

  function persist(next) {
    setMarks(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  function resetForm() {
    setForm({ studentId: "", student: "", className: "Grade 10A", subject: "Mathematics", assessmentType: "Term Test", term: "Term 1", title: "", marks: "", maxMarks: 100, remarks: "" });
    setEditingId(null);
    setShowForm(false);
  }
  function submitMark(e) {
    e.preventDefault();
    const payload = { ...form, marks: Number(form.marks || 0), maxMarks: Number(form.maxMarks || 0), managedBy: userName || "Teacher", updatedAt: new Date().toISOString() };
    if (Number(payload.marks) > Number(payload.maxMarks)) {
      alert("Marks cannot be greater than max marks.");
      return;
    }
    if (editingId) persist(marks.map((item) => item.id === editingId ? { ...item, ...payload } : item));
    else persist([{ ...payload, id: Date.now(), createdAt: new Date().toISOString() }, ...marks]);
    resetForm();
  }
  function editMark(item) {
    setEditingId(item.id);
    setForm({ studentId: item.studentId, student: item.student, className: item.className, subject: item.subject, assessmentType: item.assessmentType, term: item.term, title: item.title, marks: item.marks, maxMarks: item.maxMarks, remarks: item.remarks || "" });
    setShowForm(true);
  }
  function deleteMark(id) { if (window.confirm("Delete this mark record?")) persist(marks.filter((item) => item.id !== id)); }

  return (
    <>
      <style>{`
        .tm-page{min-height:100vh;margin-left:16rem;background:#f1f5f9;font-family:'DM Sans',sans-serif}.tm-topbar{height:4rem;background:rgba(255,255,255,.96);border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;position:sticky;top:0;z-index:80}.tm-brand{font-family:'Syne',sans-serif;font-weight:800;background:linear-gradient(90deg,#302b63,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.tm-primary{border:0;border-radius:10px;padding:.65rem 1rem;background:linear-gradient(90deg,#f59e0b,#ef4444);color:#fff;font-weight:900;display:flex;gap:.45rem;align-items:center;cursor:pointer}.tm-content{padding:1.75rem 2rem}.tm-hero{background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);border-radius:1.35rem;color:#fff;padding:1.8rem;margin-bottom:1rem}.tm-hero h1{font-family:'Syne',sans-serif;margin:.3rem 0}.tm-hero p{color:rgba(255,255,255,.68);max-width:850px}.tm-rule{display:inline-flex;background:rgba(245,158,11,.16);border:1px solid rgba(245,158,11,.32);color:#fbbf24;border-radius:999px;padding:.35rem .75rem;font-weight:900;font-size:.75rem}.tm-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem;margin-bottom:1rem}.tm-stat{background:#fff;border:1px solid #e8ecf0;border-radius:1rem;padding:1rem;box-shadow:0 4px 18px rgba(15,23,42,.06)}.tm-stat p{margin:0;color:#64748b;font-size:.72rem;text-transform:uppercase;font-weight:900}.tm-stat h3{margin:.2rem 0;color:#0f172a;font-size:1.45rem}.tm-stat span{color:#94a3b8;font-size:.76rem}.tm-toolbar{display:flex;gap:.75rem;align-items:center;justify-content:space-between;background:#fff;border:1px solid #e8ecf0;border-radius:1rem;padding:1rem;margin-bottom:1rem}.tm-search{display:flex;align-items:center;gap:.5rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:999px;padding:.65rem 1rem;flex:1}.tm-search input,.tm-toolbar select{border:0;background:transparent;outline:0;font-family:inherit}.tm-toolbar select{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:.65rem}.tm-form{background:#fff;border:1px solid #e8ecf0;border-radius:1rem;padding:1.2rem;margin-bottom:1rem;box-shadow:0 4px 18px rgba(15,23,42,.06)}.tm-form h2{font-size:1rem;margin:0 0 1rem;color:#0f172a}.tm-form-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.9rem}.tm-field{display:flex;flex-direction:column;gap:.35rem}.tm-field span{font-size:.72rem;text-transform:uppercase;font-weight:900;color:#64748b}.tm-field input,.tm-field select{border:1px solid #e2e8f0;border-radius:10px;padding:.75rem;font-family:inherit;outline:0}.tm-wide{grid-column:span 2}.tm-actions{display:flex;gap:.65rem;margin-top:1rem}.tm-secondary{border:1px solid #e2e8f0;background:#fff;border-radius:10px;padding:.65rem 1rem;font-weight:900;cursor:pointer}.tm-table-card{background:#fff;border:1px solid #e8ecf0;border-radius:1rem;overflow:hidden;box-shadow:0 4px 18px rgba(15,23,42,.06)}.tm-table-wrap{overflow-x:auto}.tm-table{width:100%;border-collapse:collapse;min-width:920px}.tm-table th{background:#f8fafc;color:#64748b;font-size:.72rem;text-transform:uppercase;text-align:left;padding:.85rem}.tm-table td{padding:.85rem;border-top:1px solid #f1f5f9;color:#334155;font-size:.86rem}.tm-student{font-weight:900;color:#0f172a}.tm-pill{border-radius:999px;padding:.25rem .62rem;font-weight:900;font-size:.72rem;display:inline-block}.tm-good{background:#ecfdf5;color:#047857}.tm-mid{background:#fffbeb;color:#b45309}.tm-low{background:#fee2e2;color:#b91c1c}.tm-btns{display:flex;gap:.4rem}.tm-small{border:0;border-radius:8px;padding:.45rem .65rem;font-weight:900;cursor:pointer}.tm-edit{background:#dbeafe;color:#1d4ed8}.tm-del{background:#fee2e2;color:#dc2626}.tm-intel{background:#fff7ed;border:1px solid #fed7aa;color:#9a3412;border-radius:1rem;padding:1rem;margin-bottom:1rem;display:flex;gap:.7rem;align-items:flex-start}@media(max-width:900px){.tm-page{margin-left:0}.tm-topbar{padding-left:4.5rem;padding-right:1rem}.tm-content{padding:1rem}.tm-stats,.tm-form-grid{grid-template-columns:1fr}.tm-toolbar{flex-direction:column;align-items:stretch}.tm-hero{padding:1.3rem}.tm-primary{width:100%;justify-content:center}.tm-wide{grid-column:auto}}
      `}</style>
      <Sidebar />
      <main className="tm-page">
        <header className="tm-topbar"><span className="tm-brand">Marks & Term Test Management</span><button className="tm-primary" onClick={() => setShowForm(!showForm)}><FaPlus /> {showForm ? "Close" : "Add Marks"}</button></header>
        <section className="tm-content">
          <div className="tm-hero"><span className="tm-rule">Teacher editable · Student view-only</span><h1>Record assignment, practical, quiz, and term-test marks</h1><p>Teachers can create, update, and delete mark records. Students can only view their own marks in the student portal.</p></div>
          <div className="tm-stats"><Stat label="Records" value={analytics.total} note="Mark entries"/><Stat label="Class Average" value={`${analytics.avg}%`} note="Overall performance"/><Stat label="Term Tests" value={analytics.termTests} note="Exam records"/><Stat label="Support Needed" value={analytics.support} note="Below 50%"/></div>
          {analytics.support > 0 && <div className="tm-intel"><FaLightbulb /><div><strong>Intelligent suggestion:</strong> {analytics.support} record(s) are below 50%. Add support notes, assign a revision paper, or schedule a live revision session.</div></div>}
          <div className="tm-toolbar"><div className="tm-search"><FaSearch style={{color:"#94a3b8"}}/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search by student, subject, assessment"/></div><select value={classFilter} onChange={(e)=>setClassFilter(e.target.value)}><option>All</option><option>Grade 10A</option><option>Grade 10B</option><option>Grade 11B</option><option>Grade 12 ICT</option></select></div>
          {showForm && <form className="tm-form" onSubmit={submitMark}><h2>{editingId ? "Update Marks" : "New Mark Record"}</h2><div className="tm-form-grid"><Field label="Student ID"><input required value={form.studentId} onChange={(e)=>setForm({...form,studentId:e.target.value})} placeholder="STU-001"/></Field><Field label="Student Name"><input required value={form.student} onChange={(e)=>setForm({...form,student:e.target.value})} placeholder="Student name"/></Field><Field label="Class"><select value={form.className} onChange={(e)=>setForm({...form,className:e.target.value})}><option>Grade 10A</option><option>Grade 10B</option><option>Grade 11B</option><option>Grade 12 ICT</option></select></Field><Field label="Subject"><select value={form.subject} onChange={(e)=>setForm({...form,subject:e.target.value})}><option>Mathematics</option><option>Science</option><option>English</option><option>ICT</option><option>History</option></select></Field><Field label="Assessment Type"><select value={form.assessmentType} onChange={(e)=>setForm({...form,assessmentType:e.target.value})}><option>Term Test</option><option>Assignment</option><option>Practical</option><option>Quiz</option></select></Field><Field label="Term"><select value={form.term} onChange={(e)=>setForm({...form,term:e.target.value})}><option>Term 1</option><option>Term 2</option><option>Term 3</option></select></Field><Field label="Marks"><input required type="number" min="0" value={form.marks} onChange={(e)=>setForm({...form,marks:e.target.value})}/></Field><Field label="Max Marks"><input required type="number" min="1" value={form.maxMarks} onChange={(e)=>setForm({...form,maxMarks:e.target.value})}/></Field><Field label="Assessment Title" wide><input required value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} placeholder="e.g. Mathematics Term Test"/></Field><Field label="Remarks" wide><input value={form.remarks} onChange={(e)=>setForm({...form,remarks:e.target.value})} placeholder="Short teacher remark"/></Field></div><div className="tm-actions"><button className="tm-primary" type="submit"><FaCheckCircle /> {editingId ? "Update" : "Save Marks"}</button><button type="button" className="tm-secondary" onClick={resetForm}>Cancel</button></div></form>}
          <div className="tm-table-card"><div className="tm-table-wrap"><table className="tm-table"><thead><tr><th>Student</th><th>Class</th><th>Subject</th><th>Assessment</th><th>Term</th><th>Marks</th><th>Grade</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filtered.map((item)=>{ const p=percent(item.marks,item.maxMarks); const st=status(p); return <tr key={item.id}><td><div className="tm-student">{item.student}</div><div>{item.studentId}</div></td><td>{item.className}</td><td>{item.subject}</td><td>{item.title}<br/><span style={{color:"#94a3b8"}}>{item.assessmentType}</span></td><td>{item.term}</td><td><strong>{item.marks}/{item.maxMarks}</strong><br/>{p}%</td><td><span className={`tm-pill ${p>=75?"tm-good":p>=50?"tm-mid":"tm-low"}`}><FaGraduationCap /> {grade(p)}</span></td><td><span className={`tm-pill ${p>=75?"tm-good":p>=50?"tm-mid":"tm-low"}`}>{st}</span></td><td><div className="tm-btns"><button className="tm-small tm-edit" onClick={()=>editMark(item)}><FaEdit /></button><button className="tm-small tm-del" onClick={()=>deleteMark(item.id)}><FaTrash /></button></div></td></tr>})}</tbody></table></div></div>
        </section>
      </main>
    </>
  );
}
