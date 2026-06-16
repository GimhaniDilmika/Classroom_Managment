import React, { useMemo, useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import { FaChartPie, FaCheck, FaPlus, FaSearch, FaTrash, FaWallet } from "react-icons/fa";

const STORAGE_KEY = "classease_expenses_v1";
const DEFAULT_EXPENSES = [
  { id: 1, title: "Science lab chemicals", category: "Academic", amount: 18500, date: "2026-06-07", paidBy: "Admin Office", status: "Approved" },
  { id: 2, title: "Classroom projector repair", category: "Maintenance", amount: 12000, date: "2026-06-09", paidBy: "Principal Office", status: "Pending" },
  { id: 3, title: "Printing exam papers", category: "Printing", amount: 7800, date: "2026-06-11", paidBy: "Exam Unit", status: "Approved" },
  { id: 4, title: "Internet backup router", category: "Technology", amount: 22500, date: "2026-06-14", paidBy: "IT Unit", status: "Pending" },
];
const BUDGET = 120000;
function readExpenses(){ try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_EXPENSES; } catch { return DEFAULT_EXPENSES; } }
function money(value){ return `LKR ${Number(value || 0).toLocaleString()}`; }

export default function Expenses(){
  const [expenses,setExpenses] = useState(readExpenses);
  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("All");
  const [showForm,setShowForm] = useState(false);
  const [form,setForm] = useState({ title:"", category:"Academic", amount:"", date:"", paidBy:"", status:"Pending" });

  const categories = ["All", ...Array.from(new Set(expenses.map((item)=>item.category)))];
  const filtered = useMemo(()=>expenses.filter((item)=>{
    const q = search.toLowerCase();
    return `${item.title} ${item.category} ${item.paidBy}`.toLowerCase().includes(q) && (category === "All" || item.category === category);
  }),[expenses,search,category]);
  const totals = useMemo(()=>{
    const total = expenses.reduce((sum,item)=>sum+Number(item.amount||0),0);
    const approved = expenses.filter((item)=>item.status === "Approved").reduce((sum,item)=>sum+Number(item.amount||0),0);
    const pending = expenses.filter((item)=>item.status === "Pending").reduce((sum,item)=>sum+Number(item.amount||0),0);
    return { total, approved, pending, remaining: Math.max(BUDGET-total,0), usage: Math.round((total/BUDGET)*100) };
  },[expenses]);

  function persist(next){ setExpenses(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }
  function addExpense(e){ e.preventDefault(); persist([{ ...form, id:Date.now(), amount:Number(form.amount||0) }, ...expenses]); setForm({ title:"", category:"Academic", amount:"", date:"", paidBy:"", status:"Pending" }); setShowForm(false); }
  function approve(id){ persist(expenses.map((item)=>item.id===id ? { ...item, status:"Approved" } : item)); }
  function remove(id){ if(window.confirm("Delete this expense record?")) persist(expenses.filter((item)=>item.id !== id)); }

  return <>
    <ExpenseStyles />
    <div className="exp-page"><Sidebar /><main className="exp-main">
      <header className="exp-topbar"><span className="exp-topbar-title">Expense Management</span><button className="exp-primary" onClick={()=>setShowForm(!showForm)}><FaPlus /> Add Expense</button></header>
      <section className="exp-content">
        <div className="exp-hero"><div><p className="exp-kicker"><FaWallet /> Operational Finance</p><h1>Expenses Control</h1><p>Record institutional expenses, track approvals, and monitor budget usage in real time.</p></div><div className="exp-meter"><strong>{totals.usage}%</strong><span>Budget used</span></div></div>
        <div className="exp-stats"><Stat label="Total Expenses" value={money(totals.total)} /><Stat label="Approved" value={money(totals.approved)} /><Stat label="Pending" value={money(totals.pending)} /><Stat label="Budget Remaining" value={money(totals.remaining)} /></div>
        <div className="exp-progress"><span style={{width:`${Math.min(totals.usage,100)}%`}} /></div>

        {showForm && <form className="exp-form" onSubmit={addExpense}><h2><FaChartPie /> New Expense</h2><div className="exp-form-grid">
          <Field label="Expense Title"><input required value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} placeholder="Expense description" /></Field>
          <Field label="Category"><select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}><option>Academic</option><option>Maintenance</option><option>Printing</option><option>Technology</option><option>Transport</option><option>Utilities</option></select></Field>
          <Field label="Amount"><input required type="number" min="0" value={form.amount} onChange={(e)=>setForm({...form,amount:e.target.value})} /></Field>
          <Field label="Date"><input required type="date" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})} /></Field>
          <Field label="Paid By"><input required value={form.paidBy} onChange={(e)=>setForm({...form,paidBy:e.target.value})} placeholder="Responsible unit" /></Field>
          <Field label="Status"><select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}><option>Pending</option><option>Approved</option></select></Field>
        </div><div className="exp-form-actions"><button className="exp-primary" type="submit">Save Expense</button><button type="button" className="exp-secondary" onClick={()=>setShowForm(false)}>Cancel</button></div></form>}

        <div className="exp-card"><div className="exp-toolbar"><div className="exp-search"><FaSearch /><input placeholder="Search expenses..." value={search} onChange={(e)=>setSearch(e.target.value)} /></div><select value={category} onChange={(e)=>setCategory(e.target.value)}>{categories.map((item)=><option key={item}>{item}</option>)}</select></div>
          <div className="exp-table-wrap"><table className="exp-table"><thead><tr><th>Expense</th><th>Category</th><th>Amount</th><th>Date</th><th>Paid By</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filtered.map((item)=><tr key={item.id}><td><strong>{item.title}</strong></td><td>{item.category}</td><td>{money(item.amount)}</td><td>{item.date}</td><td>{item.paidBy}</td><td><span className={`exp-badge ${item.status.toLowerCase()}`}>{item.status}</span></td><td><div className="exp-actions">{item.status !== "Approved" && <button title="Approve" onClick={()=>approve(item.id)}><FaCheck /></button>}<button title="Delete" onClick={()=>remove(item.id)}><FaTrash /></button></div></td></tr>)}</tbody></table></div>
          {filtered.length === 0 && <div className="exp-empty">No expense records found.</div>}
        </div>
      </section>
    </main></div>
  </>;
}
function Field({label,children}){return <label className="exp-field"><span>{label}</span>{children}</label>}
function Stat({label,value}){return <div className="exp-stat"><strong>{value}</strong><span>{label}</span></div>}
function ExpenseStyles(){return <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
  [data-theme="dark"] .exp-main{background:#020617;color:#e2e8f0}[data-theme="dark"] .exp-topbar,[data-theme="dark"] .exp-form,[data-theme="dark"] .exp-card,[data-theme="dark"] .exp-stat{background:#0f172a;border-color:rgba(245,158,11,.12)}[data-theme="dark"] .exp-search,[data-theme="dark"] .exp-toolbar select,[data-theme="dark"] .exp-field input,[data-theme="dark"] .exp-field select{background:#111827;border-color:#334155;color:#e2e8f0}[data-theme="dark"] .exp-search input{color:#e2e8f0}[data-theme="dark"] .exp-table th{background:#111827;color:#94a3b8}[data-theme="dark"] .exp-table td{border-color:#1e293b;color:#cbd5e1}
  .exp-main{margin-left:16rem;min-height:100vh;background:#f1f5f9;font-family:'DM Sans',sans-serif;color:#0f172a}.exp-topbar{height:4rem;background:rgba(255,255,255,.95);backdrop-filter:blur(14px);border-bottom:1px solid rgba(15,23,42,.06);display:flex;align-items:center;justify-content:space-between;padding:0 2rem;position:sticky;top:0;z-index:40}.exp-topbar-title{font-family:'Syne';font-weight:800;font-size:1.2rem;background:linear-gradient(90deg,#302b63,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.exp-primary,.exp-secondary{border:none;border-radius:10px;padding:.6rem 1rem;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:8px}.exp-primary{background:linear-gradient(90deg,#f59e0b,#ef4444);color:#fff;box-shadow:0 8px 18px rgba(245,158,11,.25)}.exp-secondary{background:#eef2ff;color:#302b63}.exp-content{padding:2rem}.exp-hero{background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);border-radius:1.25rem;padding:1.7rem 2rem;color:white;display:flex;justify-content:space-between;align-items:center;gap:1.5rem;margin-bottom:1rem}.exp-kicker{color:#fbbf24;font-weight:800;display:flex;gap:8px;align-items:center;margin:0}.exp-hero h1{font-family:'Syne';font-size:2rem;margin:.4rem 0}.exp-hero p{color:#cbd5e1}.exp-meter{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.14);border-radius:1.2rem;padding:1rem 1.5rem;text-align:center}.exp-meter strong{display:block;font-size:2rem}.exp-meter span{color:#cbd5e1}.exp-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1rem}.exp-stat{background:white;border:1px solid #e8ecf0;border-radius:1rem;padding:1rem;box-shadow:0 4px 16px rgba(15,23,42,.05)}.exp-stat strong{display:block;font-family:'Syne';font-size:1.1rem;color:#f59e0b}.exp-stat span{color:#64748b;font-weight:700}.exp-progress{height:10px;background:#e2e8f0;border-radius:999px;margin-bottom:1rem;overflow:hidden}.exp-progress span{display:block;height:100%;background:linear-gradient(90deg,#f59e0b,#ef4444);border-radius:999px}.exp-form,.exp-card{background:white;border:1px solid #e8ecf0;border-radius:1.2rem;padding:1.2rem;box-shadow:0 8px 24px rgba(15,23,42,.06);margin-bottom:1rem}.exp-form h2{font-family:'Syne';font-size:1rem;margin:0 0 1rem;display:flex;gap:8px;align-items:center}.exp-form-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}.exp-field{display:flex;flex-direction:column;gap:5px}.exp-field span{font-size:.68rem;text-transform:uppercase;letter-spacing:.08em;color:#64748b;font-weight:800}.exp-field input,.exp-field select{border:1.5px solid #e2e8f0;border-radius:10px;padding:.65rem .8rem;background:#f8fafc;outline:none}.exp-form-actions{display:flex;gap:.6rem;margin-top:1rem}.exp-toolbar{display:flex;gap:1rem;align-items:center;margin-bottom:1rem}.exp-search{display:flex;align-items:center;gap:8px;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:999px;padding:.65rem .9rem;flex:1}.exp-search input{border:none;outline:none;background:transparent;width:100%}.exp-toolbar select{border:1.5px solid #e2e8f0;border-radius:10px;padding:.65rem .9rem;background:white}.exp-table-wrap{overflow:auto}.exp-table{width:100%;border-collapse:collapse;min-width:860px}.exp-table th{background:#f8fafc;text-align:left;padding:.85rem 1rem;text-transform:uppercase;font-size:.72rem;letter-spacing:.08em;color:#64748b}.exp-table td{padding:.85rem 1rem;border-top:1px solid #f1f5f9;color:#334155}.exp-badge{font-size:.72rem;font-weight:900;padding:.32rem .75rem;border-radius:999px}.exp-badge.approved{background:#dcfce7;color:#15803d}.exp-badge.pending{background:#fef3c7;color:#b45309}.exp-actions{display:flex;gap:.4rem}.exp-actions button{border:none;background:#eef2ff;color:#302b63;border-radius:8px;padding:.48rem;cursor:pointer}.exp-actions button:last-child{background:#fee2e2;color:#ef4444}.exp-empty{text-align:center;color:#94a3b8;padding:2rem}@media(max-width:900px){.exp-main{margin-left:0}.exp-stats,.exp-form-grid{grid-template-columns:1fr}.exp-hero,.exp-toolbar{flex-direction:column;align-items:stretch}}
`}</style>}
