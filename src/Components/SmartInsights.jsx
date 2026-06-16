import React from "react";

const INSIGHTS = [
  {
    icon: "🧭",
    title: "Student Support Watchlist",
    value: "7 students",
    note: "Need attendance or academic follow-up this week",
    level: "warning",
  },
  {
    icon: "📉",
    title: "Attendance Trend Alert",
    value: "Grade 10A",
    note: "Attendance dropped compared with the previous week",
    level: "danger",
  },
  {
    icon: "🗓️",
    title: "Timetable Conflict Check",
    value: "2 conflicts",
    note: "Review teacher and classroom allocations",
    level: "info",
  },
  {
    icon: "📞",
    title: "Parent Follow-ups",
    value: "5 pending",
    note: "Communication logs waiting for update",
    level: "success",
  },
];

export default function SmartInsights() {
  return (
    <>
      <style>{`
        [data-theme="dark"] .si-card { background:#0f172a; border-color:rgba(245,158,11,0.12); }
        [data-theme="dark"] .si-title { color:#e2e8f0; }
        [data-theme="dark"] .si-sub { color:#64748b; }
        [data-theme="dark"] .si-item { background:#111827; border-color:rgba(255,255,255,0.06); }
        [data-theme="dark"] .si-item-title { color:#e2e8f0; }
        [data-theme="dark"] .si-item-note { color:#64748b; }

        .si-card {
          background:#fff;
          border:1px solid #e8ecf0;
          border-radius:1rem;
          padding:1.25rem;
          box-shadow:0 2px 10px rgba(0,0,0,.06);
          font-family:'DM Sans',sans-serif;
        }
        .si-head { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:1rem; }
        .si-title { font-family:'Syne',sans-serif; font-weight:800; font-size:0.95rem; color:#0f172a; margin:0; }
        .si-sub { font-size:0.72rem; color:#94a3b8; margin-top:3px; }
        .si-badge { background:linear-gradient(90deg,#302b63,#f59e0b); color:#fff; font-size:0.66rem; font-weight:800; padding:4px 9px; border-radius:999px; white-space:nowrap; }
        .si-list { display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:10px; }
        .si-item { border:1px solid #f1f5f9; background:#f8fafc; border-radius:0.85rem; padding:0.85rem; display:flex; gap:10px; align-items:flex-start; }
        .si-icon { width:34px; height:34px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:#fffbeb; flex-shrink:0; }
        .si-item-title { font-size:0.72rem; color:#64748b; font-weight:700; margin:0 0 2px; }
        .si-value { font-family:'Syne',sans-serif; font-size:0.95rem; font-weight:800; margin:0 0 3px; }
        .si-warning { color:#d97706; }
        .si-danger { color:#dc2626; }
        .si-info { color:#2563eb; }
        .si-success { color:#059669; }
        .si-item-note { font-size:0.68rem; color:#94a3b8; line-height:1.35; margin:0; }
        @media(max-width:900px){ .si-list { grid-template-columns:1fr; } }
      `}</style>

      <div className="si-card">
        <div className="si-head">
          <div>
            <p className="si-title">Smart Classroom Insights</p>
            <p className="si-sub">Early warnings and follow-up signals for better student support.</p>
          </div>
          <span className="si-badge">Intelligence Layer</span>
        </div>
        <div className="si-list">
          {INSIGHTS.map((item) => (
            <div className="si-item" key={item.title}>
              <div className="si-icon">{item.icon}</div>
              <div>
                <p className="si-item-title">{item.title}</p>
                <p className={`si-value si-${item.level}`}>{item.value}</p>
                <p className="si-item-note">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
