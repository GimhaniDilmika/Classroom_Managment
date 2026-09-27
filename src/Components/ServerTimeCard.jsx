import React from "react";

export default function ServerTimeCard({ formattedTime }) {
  const stats = [
    { label: "Active Live Sessions", value: "1",  color: "#10b981" },
    { label: "New Messages",         value: "8",  color: "#6366f1" },
    { label: "Submissions Today",    value: "57", color: "#f59e0b" },
    { label: "Pending Approvals",    value: "4",  color: "#ef4444" },
  ];

  return (
    <>
      <style>{`
        [data-theme="dark"] .st-card      { background:#0f172a; border-color:rgba(245,158,11,0.12); }
        [data-theme="dark"] .st-title     { color:#e2e8f0; }
        [data-theme="dark"] .st-clock     { background:rgba(99,102,241,0.1); border-color:rgba(99,102,241,0.25); color:#818cf8; }
        [data-theme="dark"] .st-stat-box  { background:rgba(255,255,255,0.04); }
        [data-theme="dark"] .st-stat-label{ color:#64748b; }
        [data-theme="dark"] .st-stat-val  { color:#e2e8f0; }

        .st-card {
          background: #fff;
          border: 1px solid #e8ecf0;
          border-radius: 1rem;
          padding: 1.25rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
          font-family: 'DM Sans', sans-serif;
        }
        .st-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.95rem;
          color: #0f172a;
          margin-bottom: 0.875rem;
        }
        .st-clock {
          text-align: center;
          font-family: 'Courier New', monospace;
          font-size: 1.6rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #4338ca;
          background: #eef2ff;
          border: 1.5px solid #a5b4fc;
          border-radius: 10px;
          padding: 10px 0;
          margin-bottom: 0.875rem;
          box-shadow: 0 0 16px rgba(99,102,241,0.12);
        }
        .st-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .st-stat-box {
          background: #f8fafc;
          border-radius: 8px;
          padding: 8px 10px;
        }
        .st-stat-label {
          font-size: 0.68rem;
          color: #94a3b8;
          margin-bottom: 2px;
        }
        .st-stat-val {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0f172a;
          font-family: 'Syne', sans-serif;
        }
      `}</style>

      <div className="st-card">
        <p className="st-title">Server Time</p>
        <div className="st-clock">{formattedTime}</div>
        <div className="st-grid">
          {stats.map(s => (
            <div className="st-stat-box" key={s.label}>
              <p className="st-stat-label">{s.label}</p>
              <p className="st-stat-val" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
