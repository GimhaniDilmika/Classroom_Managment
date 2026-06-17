import { useState } from "react";
import Sidebar from "../Components/Sidebar";

const initialNotes = [
  { id: 1, student: "Kavindu Silva", reason: "Attendance follow-up", action: "Parent call scheduled", status: "Pending" },
  { id: 2, student: "Aisha Perera", reason: "Academic support", action: "Extra worksheet assigned", status: "Completed" },
];

export default function TeacherSupportNotes() {
  const [notes, setNotes] = useState(initialNotes);
  const [form, setForm] = useState({ student: "", reason: "", action: "", status: "Pending" });

  function addNote(e) {
    e.preventDefault();
    if (!form.student || !form.reason || !form.action) return;
    setNotes([{ id: Date.now(), ...form }, ...notes]);
    setForm({ student: "", reason: "", action: "", status: "Pending" });
  }

  return (
    <><style>{`.support-page{min-height:100vh;margin-left:16rem;background:#f1f5f9;font-family:'DM Sans',sans-serif}.support-top{height:4rem;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;padding:0 2rem;font-family:'Syne',sans-serif;font-weight:800;color:#0f172a}.support-content{padding:1.75rem 2rem;display:grid;grid-template-columns:.9fr 1.1fr;gap:1rem}.support-card{background:#fff;border:1px solid #e8ecf0;border-radius:1.1rem;padding:1.2rem;box-shadow:0 4px 18px rgba(15,23,42,.06)}.support-card h2{margin:0 0 1rem;color:#0f172a;font-size:1rem}.support-field{display:flex;flex-direction:column;gap:.35rem;margin-bottom:.75rem}.support-field label{font-size:.72rem;font-weight:800;text-transform:uppercase;color:#64748b}.support-field input,.support-field select{border:1px solid #e2e8f0;border-radius:.7rem;padding:.7rem;font-family:inherit}.support-btn{width:100%;border:0;border-radius:.8rem;padding:.85rem;color:#fff;font-weight:800;background:linear-gradient(90deg,#f59e0b,#ef4444);cursor:pointer}.support-row{padding:1rem 0;border-bottom:1px solid #f1f5f9}.support-row:last-child{border-bottom:0}.strong{font-weight:800;color:#0f172a}.muted{color:#64748b;font-size:.84rem}.pill{display:inline-block;margin-top:.45rem;font-size:.72rem;font-weight:800;background:#fffbeb;color:#b45309;padding:.28rem .65rem;border-radius:999px}@media(max-width:900px){.support-page{margin-left:0}.support-top{padding-left:4.5rem}.support-content{padding:1rem;grid-template-columns:1fr}}`}</style><Sidebar /><main className="support-page"><header className="support-top">Student Support Notes</header><section className="support-content"><form className="support-card" onSubmit={addNote}><h2>Add Follow-up Note</h2><div className="support-field"><label>Student</label><input value={form.student} onChange={e=>setForm({...form,student:e.target.value})} placeholder="Student name" /></div><div className="support-field"><label>Reason</label><input value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} placeholder="Reason for support" /></div><div className="support-field"><label>Action</label><input value={form.action} onChange={e=>setForm({...form,action:e.target.value})} placeholder="Action taken" /></div><div className="support-field"><label>Status</label><select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Pending</option><option>In Progress</option><option>Completed</option></select></div><button className="support-btn">Save Note</button></form><div className="support-card"><h2>Recent Support Actions</h2>{notes.map(n=><div className="support-row" key={n.id}><div className="strong">{n.student}</div><div className="muted">{n.reason}</div><div className="muted">Action: {n.action}</div><span className="pill">{n.status}</span></div>)}</div></section></main></>
  );
}
