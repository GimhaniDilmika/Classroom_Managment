import React, { useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";

const DAYS   = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
const SLOTS  = ["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00"];

const INIT = {
  Monday:    { "8:00":{ subject:"Science",  teacher:"Ms. Perera",    room:"Lab 1",   color:"#f59e0b" }, "10:00":{ subject:"Maths",   teacher:"Mr. Silva",     room:"Room 3", color:"#ef4444" } },
  Tuesday:   { "9:00": { subject:"English",  teacher:"Ms. Fernando",  room:"Room 5",  color:"#8b5cf6" }, "13:00":{ subject:"ICT",     teacher:"Mr. Jayasinghe",room:"Lab 2",  color:"#06b6d4" } },
  Wednesday: { "8:00": { subject:"Maths",    teacher:"Mr. Silva",     room:"Room 3",  color:"#ef4444" }, "11:00":{ subject:"Science", teacher:"Ms. Perera",    room:"Lab 1",  color:"#f59e0b" } },
  Thursday:  { "10:00":{ subject:"ICT",      teacher:"Mr. Jayasinghe",room:"Lab 2",   color:"#06b6d4" } },
  Friday:    { "9:00": { subject:"English",  teacher:"Ms. Fernando",  room:"Room 5",  color:"#8b5cf6" }, "14:00":{ subject:"Maths",   teacher:"Mr. Silva",     room:"Room 3", color:"#ef4444" } },
};

const COLORS = ["#f59e0b","#ef4444","#8b5cf6","#06b6d4","#10b981","#f97316"];

export default function Timetable() {
  const [grid, setGrid]       = useState(INIT);
  const [modal, setModal]     = useState(null); // { day, slot } or null
  const [form, setForm]       = useState({ subject:"", teacher:"", room:"", color:COLORS[0] });

  function openModal(day, slot) {
    const existing = grid[day]?.[slot];
    if (existing) setForm({ ...existing });
    else setForm({ subject:"", teacher:"", room:"", color:COLORS[0] });
    setModal({ day, slot });
  }

  function saveSlot() {
    if (!form.subject) return;
    setGrid(prev => ({
      ...prev,
      [modal.day]: { ...(prev[modal.day]||{}), [modal.slot]: { ...form } }
    }));
    setModal(null);
  }

  function clearSlot() {
    setGrid(prev => {
      const day = { ...(prev[modal.day]||{}) };
      delete day[modal.slot];
      return { ...prev, [modal.day]: day };
    });
    setModal(null);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        [data-theme="dark"] .tt-page   { background:#020617; }
        [data-theme="dark"] .tt-topbar { background:rgba(15,23,42,0.95); border-color:rgba(245,158,11,0.1); }
        [data-theme="dark"] .tt-topbar-title { color:#e2e8f0; }
        [data-theme="dark"] .tt-wrap   { background:#0f172a; border-color:rgba(245,158,11,0.1); }
        [data-theme="dark"] .tt-header { background:#0a0f1e; border-color:rgba(245,158,11,0.1); color:#94a3b8; }
        [data-theme="dark"] .tt-time   { color:#475569; border-color:rgba(245,158,11,0.08); }
        [data-theme="dark"] .tt-cell   { border-color:rgba(255,255,255,0.05); }
        [data-theme="dark"] .tt-empty:hover { background:rgba(245,158,11,0.07); }
        [data-theme="dark"] .tt-modal  { background:#0f172a; border-color:rgba(245,158,11,0.15); }
        [data-theme="dark"] .tt-field input { background:rgba(255,255,255,0.05); border-color:rgba(255,255,255,0.1); color:#e2e8f0; }
        [data-theme="dark"] .tt-title-h { color:#e2e8f0; }

        .tt-page   { min-height:100vh; margin-left:16rem; background:#f1f5f9; font-family:'DM Sans',sans-serif; transition:background 0.4s; }
        .tt-topbar { position:sticky; top:0; z-index:50; background:rgba(255,255,255,0.92); backdrop-filter:blur(12px); border-bottom:1px solid rgba(0,0,0,0.06); padding:0 2rem; height:4rem; display:flex; align-items:center; }
        .tt-topbar-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1.2rem; background:linear-gradient(90deg,#302b63,#f59e0b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .tt-content { padding:1.75rem 2rem; }
        .tt-title-h { font-family:'Syne',sans-serif; font-weight:800; font-size:1.5rem; color:#0f172a; margin:0 0 4px; }
        .tt-sub    { color:#94a3b8; font-size:0.82rem; margin:0 0 1.5rem; }

        .tt-wrap { background:#fff; border:1px solid #e2e8f0; border-radius:1rem; overflow:auto; box-shadow:0 4px 16px rgba(0,0,0,0.06); }
        .tt-table { width:100%; border-collapse:collapse; min-width:700px; }
        .tt-header { background:#f8fafc; font-size:0.78rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748b; padding:10px 14px; border-bottom:1px solid #e2e8f0; text-align:center; }
        .tt-time   { width:72px; padding:10px 14px; font-size:0.75rem; font-weight:600; color:#94a3b8; border-bottom:1px solid #f1f5f9; border-right:1px solid #f1f5f9; text-align:center; vertical-align:top; }
        .tt-cell   { padding:6px; border-bottom:1px solid #f1f5f9; border-right:1px solid #f1f5f9; vertical-align:top; min-width:120px; }
        .tt-empty  { width:100%; height:52px; border-radius:8px; background:transparent; border:1.5px dashed #e2e8f0; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; justify-content:center; color:#cbd5e1; font-size:1.1rem; }
        .tt-empty:hover { background:#f8fafc; border-color:#f59e0b; color:#f59e0b; }
        .tt-slot   { width:100%; border-radius:8px; padding:6px 8px; border:none; cursor:pointer; text-align:left; transition:all 0.2s; }
        .tt-slot:hover { filter:brightness(0.92); }
        .tt-slot-sub  { font-size:0.8rem; font-weight:700; color:#fff; display:block; margin-bottom:2px; }
        .tt-slot-info { font-size:0.68rem; color:rgba(255,255,255,0.75); display:block; }

        /* Modal */
        .tt-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.45); z-index:200; display:flex; align-items:center; justify-content:center; }
        .tt-modal   { background:#fff; border-radius:1rem; padding:1.75rem; width:380px; box-shadow:0 20px 60px rgba(0,0,0,0.3); }
        .tt-modal-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1rem; color:#0f172a; margin:0 0 1.25rem; }
        .tt-field   { margin-bottom:0.85rem; }
        .tt-field label { display:block; font-size:11px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:5px; }
        .tt-field input { width:100%; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:8px 12px; font-size:0.85rem; outline:none; transition:border-color 0.2s; box-sizing:border-box; }
        .tt-field input:focus { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,0.1); }
        .tt-color-row { display:flex; gap:8px; flex-wrap:wrap; margin-top:4px; }
        .tt-color-dot { width:26px; height:26px; border-radius:50%; cursor:pointer; border:3px solid transparent; transition:all 0.15s; }
        .tt-color-dot.sel { border-color:#0f172a; transform:scale(1.15); }
        .tt-modal-btns { display:flex; gap:8px; margin-top:1.25rem; }
        .tt-save-btn { flex:1; background:linear-gradient(90deg,#f59e0b,#ef4444); color:#fff; border:none; padding:9px; border-radius:8px; font-weight:700; cursor:pointer; font-family:'Syne',sans-serif; }
        .tt-clear-btn { background:#fee2e2; color:#ef4444; border:none; padding:9px 14px; border-radius:8px; font-weight:600; cursor:pointer; font-size:0.82rem; }
        .tt-cancel-btn { background:#f1f5f9; color:#64748b; border:none; padding:9px 14px; border-radius:8px; cursor:pointer; }
      `}</style>

      <div className="tt-page">
        <Sidebar />
        <div>
          <header className="tt-topbar">
            <span className="tt-topbar-title">Timetable</span>
          </header>
          <div className="tt-content">
            <h1 className="tt-title-h">Weekly Timetable</h1>
            <p className="tt-sub">Click any empty cell to assign a class, or click an existing slot to edit it.</p>

            <div className="tt-wrap">
              <table className="tt-table">
                <thead>
                  <tr>
                    <th className="tt-header">Time</th>
                    {DAYS.map(d => <th className="tt-header" key={d}>{d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {SLOTS.map(slot => (
                    <tr key={slot}>
                      <td className="tt-time">{slot}</td>
                      {DAYS.map(day => {
                        const entry = grid[day]?.[slot];
                        return (
                          <td className="tt-cell" key={day}>
                            {entry ? (
                              <button className="tt-slot" style={{ background:`linear-gradient(135deg,${entry.color},${entry.color}cc)` }} onClick={() => openModal(day, slot)}>
                                <span className="tt-slot-sub">{entry.subject}</span>
                                <span className="tt-slot-info">{entry.teacher}</span>
                                <span className="tt-slot-info">{entry.room}</span>
                              </button>
                            ) : (
                              <button className="tt-empty" onClick={() => openModal(day, slot)}>+</button>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="tt-overlay" onClick={e => { if(e.target===e.currentTarget) setModal(null); }}>
          <div className="tt-modal">
            <h3 className="tt-modal-title">{modal.day} · {modal.slot}:00 — {grid[modal.day]?.[modal.slot] ? "Edit Slot" : "Add Class"}</h3>
            <div className="tt-field"><label>Subject</label><input required placeholder="e.g. Science" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} /></div>
            <div className="tt-field"><label>Teacher</label><input placeholder="e.g. Ms. Perera" value={form.teacher} onChange={e=>setForm({...form,teacher:e.target.value})} /></div>
            <div className="tt-field"><label>Room</label><input placeholder="e.g. Lab 1" value={form.room} onChange={e=>setForm({...form,room:e.target.value})} /></div>
            <div className="tt-field">
              <label>Colour</label>
              <div className="tt-color-row">
                {COLORS.map(c => (
                  <div key={c} className={`tt-color-dot${form.color===c?" sel":""}`} style={{ background:c }} onClick={()=>setForm({...form,color:c})} />
                ))}
              </div>
            </div>
            <div className="tt-modal-btns">
              <button className="tt-save-btn" onClick={saveSlot}>Save</button>
              {grid[modal.day]?.[modal.slot] && <button className="tt-clear-btn" onClick={clearSlot}>Clear</button>}
              <button className="tt-cancel-btn" onClick={()=>setModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
