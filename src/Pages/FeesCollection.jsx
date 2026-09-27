import React, { useMemo, useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import { FaCheckCircle, FaMoneyBillWave, FaPlus, FaPrint, FaSearch, FaTrash } from "react-icons/fa";

const STORAGE_KEY = "classease_fee_records_v1";
const DEFAULT_FEES = [
  { id: 1, studentId: "STU-001", student: "Aisha Perera", className: "Grade 10A", feeType: "Monthly Fee", amount: 6500, paid: 6500, dueDate: "2026-06-10", status: "Paid" },
  { id: 2, studentId: "STU-002", student: "Kavindu Silva", className: "Grade 11A", feeType: "Monthly Fee", amount: 7000, paid: 3000, dueDate: "2026-06-10", status: "Partial" },
  { id: 3, studentId: "STU-003", student: "Nethmi Fernando", className: "Grade 10A", feeType: "Exam Fee", amount: 2500, paid: 0, dueDate: "2026-06-18", status: "Pending" },
  { id: 4, studentId: "STU-004", student: "Tharindu Mendis", className: "Grade 12 ICT", feeType: "Lab Fee", amount: 4000, paid: 4000, dueDate: "2026-06-12", status: "Paid" },
];

function readFees() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_FEES; } catch { return DEFAULT_FEES; } }
function money(value) { return `LKR ${Number(value || 0).toLocaleString()}`; }

export default function FeesCollection() {
  const [fees, setFees] = useState(readFees);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ studentId:"", student:"", className:"", feeType:"Monthly Fee", amount:"", paid:"", dueDate:"", status:"Pending" });

  const filtered = useMemo(() => fees.filter((fee) => {
    const q = search.toLowerCase();
    const matchSearch = `${fee.student} ${fee.studentId} ${fee.className} ${fee.feeType}`.toLowerCase().includes(q);
    const matchStatus = status === "All" || fee.status === status;
    return matchSearch && matchStatus;
  }), [fees, search, status]);

  const totals = useMemo(() => {
    const expected = fees.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const collected = fees.reduce((sum, item) => sum + Number(item.paid || 0), 0);
    const pending = Math.max(expected - collected, 0);
    return { expected, collected, pending, rate: expected ? Math.round((collected / expected) * 100) : 0 };
  }, [fees]);

  function persist(next) { setFees(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }

  function computeStatus(amount, paid) {
    if (Number(paid) >= Number(amount)) return "Paid";
    if (Number(paid) > 0) return "Partial";
    return "Pending";
  }

  function addFee(e) {
    e.preventDefault();
    const amount = Number(form.amount || 0);
    const paid = Number(form.paid || 0);
    persist([{ ...form, id: Date.now(), amount, paid, status: computeStatus(amount, paid) }, ...fees]);
    setForm({ studentId:"", student:"", className:"", feeType:"Monthly Fee", amount:"", paid:"", dueDate:"", status:"Pending" });
    setShowForm(false);
  }

  function recordFullPayment(id) {
    persist(fees.map((fee) => fee.id === id ? { ...fee, paid: fee.amount, status: "Paid" } : fee));
  }

  function deleteFee(id) {
    if (window.confirm("Delete this fee record?")) persist(fees.filter((fee) => fee.id !== id));
  }

  return (
    <>
      <FeeStyles />
      <div className="fee-page"><Sidebar /><main className="fee-main">
        <header className="fee-topbar"><span className="fee-topbar-title">Fees Collection</span><button className="fee-primary" onClick={()=>setShowForm(!showForm)}><FaPlus /> Add Fee Record</button></header>
        <section className="fee-content">
          <div className="fee-hero"><div><p className="fee-kicker"><FaMoneyBillWave /> Finance Control</p><h1>Fees Collection Center</h1><p>Track student payments, pending balances, and collection progress with clear finance summaries.</p></div><div className="fee-rate"><strong>{totals.rate}%</strong><span>Collection Rate</span></div></div>
          <div className="fee-stats"><Stat label="Expected" value={money(totals.expected)} /><Stat label="Collected" value={money(totals.collected)} /><Stat label="Pending" value={money(totals.pending)} /><Stat label="Records" value={fees.length} /></div>

          {showForm && <form className="fee-form" onSubmit={addFee}>
            <h2>New Fee Record</h2><div className="fee-form-grid">
              <Field label="Student ID"><input required value={form.studentId} onChange={(e)=>setForm({...form,studentId:e.target.value})} placeholder="STU-001" /></Field>
              <Field label="Student Name"><input required value={form.student} onChange={(e)=>setForm({...form,student:e.target.value})} placeholder="Student name" /></Field>
              <Field label="Class"><input required value={form.className} onChange={(e)=>setForm({...form,className:e.target.value})} placeholder="Grade 10A" /></Field>
              <Field label="Fee Type"><select value={form.feeType} onChange={(e)=>setForm({...form,feeType:e.target.value})}><option>Monthly Fee</option><option>Exam Fee</option><option>Lab Fee</option><option>Transport Fee</option><option>Library Fee</option></select></Field>
              <Field label="Amount"><input required type="number" min="0" value={form.amount} onChange={(e)=>setForm({...form,amount:e.target.value})} /></Field>
              <Field label="Paid"><input type="number" min="0" value={form.paid} onChange={(e)=>setForm({...form,paid:e.target.value})} /></Field>
              <Field label="Due Date"><input required type="date" value={form.dueDate} onChange={(e)=>setForm({...form,dueDate:e.target.value})} /></Field>
            </div><div className="fee-form-actions"><button className="fee-primary" type="submit">Save Record</button><button className="fee-secondary" type="button" onClick={()=>setShowForm(false)}>Cancel</button></div>
          </form>}

          <div className="fee-card">
            <div className="fee-toolbar"><div className="fee-search"><FaSearch /><input placeholder="Search by student, class or fee type..." value={search} onChange={(e)=>setSearch(e.target.value)} /></div><select value={status} onChange={(e)=>setStatus(e.target.value)}><option>All</option><option>Paid</option><option>Partial</option><option>Pending</option></select></div>
            <div className="fee-table-wrap"><table className="fee-table"><thead><tr><th>Student</th><th>Class</th><th>Fee Type</th><th>Amount</th><th>Paid</th><th>Balance</th><th>Due Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filtered.map((fee)=><tr key={fee.id}><td><strong>{fee.student}</strong><small>{fee.studentId}</small></td><td>{fee.className}</td><td>{fee.feeType}</td><td>{money(fee.amount)}</td><td>{money(fee.paid)}</td><td>{money(fee.amount-fee.paid)}</td><td>{fee.dueDate}</td><td><span className={`fee-badge ${fee.status.toLowerCase()}`}>{fee.status}</span></td><td><div className="fee-actions"><button title="Mark paid" onClick={()=>recordFullPayment(fee.id)}><FaCheckCircle /></button><button title="Print receipt" onClick={()=>window.print()}><FaPrint /></button><button title="Delete" onClick={()=>deleteFee(fee.id)}><FaTrash /></button></div></td></tr>)}</tbody></table></div>
            {filtered.length === 0 && <div className="fee-empty">No fee records found.</div>}
          </div>
        </section>
      </main></div>
    </>
  );
}

function Field({ label, children }) { return <label className="fee-field"><span>{label}</span>{children}</label>; }
function Stat({ label, value }) { return <div className="fee-stat"><strong>{value}</strong><span>{label}</span></div>; }
function FeeStyles(){return <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
  [data-theme="dark"] .fee-main{background:#020617;color:#e2e8f0}[data-theme="dark"] .fee-topbar,[data-theme="dark"] .fee-form,[data-theme="dark"] .fee-card,[data-theme="dark"] .fee-stat{background:#0f172a;border-color:rgba(245,158,11,.12)}[data-theme="dark"] .fee-search,[data-theme="dark"] .fee-toolbar select,[data-theme="dark"] .fee-field input,[data-theme="dark"] .fee-field select{background:#111827;border-color:#334155;color:#e2e8f0}[data-theme="dark"] .fee-search input{color:#e2e8f0}[data-theme="dark"] .fee-table th{background:#111827;color:#94a3b8}[data-theme="dark"] .fee-table td{border-color:#1e293b;color:#cbd5e1}
  .fee-main{margin-left:16rem;min-height:100vh;background:#f1f5f9;font-family:'DM Sans',sans-serif;color:#0f172a}.fee-topbar{height:4rem;background:rgba(255,255,255,.95);backdrop-filter:blur(14px);border-bottom:1px solid rgba(15,23,42,.06);display:flex;align-items:center;justify-content:space-between;padding:0 2rem;position:sticky;top:0;z-index:40}.fee-topbar-title{font-family:'Syne';font-weight:800;font-size:1.2rem;background:linear-gradient(90deg,#302b63,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.fee-primary,.fee-secondary{border:none;border-radius:10px;padding:.6rem 1rem;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:8px}.fee-primary{background:linear-gradient(90deg,#f59e0b,#ef4444);color:#fff;box-shadow:0 8px 18px rgba(245,158,11,.25)}.fee-secondary{background:#eef2ff;color:#302b63}.fee-content{padding:2rem}.fee-hero{background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);border-radius:1.25rem;padding:1.7rem 2rem;color:white;display:flex;justify-content:space-between;align-items:center;gap:1.5rem;margin-bottom:1rem}.fee-kicker{color:#fbbf24;font-weight:800;display:flex;gap:8px;align-items:center;margin:0}.fee-hero h1{font-family:'Syne';font-size:2rem;margin:.4rem 0}.fee-hero p{color:#cbd5e1}.fee-rate{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.14);border-radius:1.2rem;padding:1rem 1.5rem;text-align:center}.fee-rate strong{display:block;font-size:2rem}.fee-rate span{color:#cbd5e1}.fee-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1rem}.fee-stat{background:white;border:1px solid #e8ecf0;border-radius:1rem;padding:1rem;box-shadow:0 4px 16px rgba(15,23,42,.05)}.fee-stat strong{display:block;font-family:'Syne';font-size:1.15rem;color:#f59e0b}.fee-stat span{color:#64748b;font-weight:700}.fee-form,.fee-card{background:white;border:1px solid #e8ecf0;border-radius:1.2rem;padding:1.2rem;box-shadow:0 8px 24px rgba(15,23,42,.06);margin-bottom:1rem}.fee-form h2{font-family:'Syne';font-size:1rem;margin:0 0 1rem}.fee-form-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}.fee-field{display:flex;flex-direction:column;gap:5px}.fee-field span{font-size:.68rem;text-transform:uppercase;letter-spacing:.08em;color:#64748b;font-weight:800}.fee-field input,.fee-field select{border:1.5px solid #e2e8f0;border-radius:10px;padding:.65rem .8rem;background:#f8fafc;outline:none}.fee-form-actions{display:flex;gap:.6rem;margin-top:1rem}.fee-toolbar{display:flex;gap:1rem;align-items:center;margin-bottom:1rem}.fee-search{display:flex;align-items:center;gap:8px;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:999px;padding:.65rem .9rem;flex:1}.fee-search input{border:none;outline:none;background:transparent;width:100%}.fee-toolbar select{border:1.5px solid #e2e8f0;border-radius:10px;padding:.65rem .9rem;background:white}.fee-table-wrap{overflow:auto}.fee-table{width:100%;border-collapse:collapse;min-width:980px}.fee-table th{background:#f8fafc;text-align:left;padding:.85rem 1rem;text-transform:uppercase;font-size:.72rem;letter-spacing:.08em;color:#64748b}.fee-table td{padding:.85rem 1rem;border-top:1px solid #f1f5f9;color:#334155}.fee-table small{display:block;color:#94a3b8;margin-top:3px}.fee-badge{font-size:.72rem;font-weight:900;padding:.32rem .75rem;border-radius:999px}.fee-badge.paid{background:#dcfce7;color:#15803d}.fee-badge.partial{background:#fef3c7;color:#b45309}.fee-badge.pending{background:#fee2e2;color:#dc2626}.fee-actions{display:flex;gap:.4rem}.fee-actions button{border:none;background:#f1f5f9;color:#302b63;border-radius:8px;padding:.48rem;cursor:pointer}.fee-actions button:last-child{background:#fee2e2;color:#ef4444}.fee-empty{text-align:center;color:#94a3b8;padding:2rem}@media(max-width:900px){.fee-main{margin-left:0}.fee-stats,.fee-form-grid{grid-template-columns:1fr}.fee-hero,.fee-toolbar{flex-direction:column;align-items:stretch}}
`}</style>}
