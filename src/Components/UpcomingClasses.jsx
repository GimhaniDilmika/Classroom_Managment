import React from "react";

const classes = [
  { name: "Data Structures",    room: "CS-201",  platform: "Zoom",        start: "09:00", end: "10:30", color: "#6366f1" },
  { name: "Database Systems",   room: "CS-305",  platform: "Google Meet", start: "11:00", end: "12:30", color: "#f59e0b" },
  { name: "Software Engineering",room: "CS-108", platform: "Teams",       start: "14:00", end: "15:30", color: "#10b981" },
];

const PLATFORM_ICONS = { "Zoom": "💻", "Google Meet": "🎥", "Teams": "👥" };

export default function UpcomingClasses() {
  return (
    <>
      <style>{`
        [data-theme="dark"] .uc-card  { background:#0f172a; border-color:rgba(245,158,11,0.12); }
        [data-theme="dark"] .uc-title { color:#e2e8f0; }
        [data-theme="dark"] .uc-item  { border-color:rgba(255,255,255,0.06); }
        [data-theme="dark"] .uc-name  { color:#e2e8f0; }
        [data-theme="dark"] .uc-room  { color:#64748b; }
        [data-theme="dark"] .uc-chip  { background:rgba(99,102,241,0.15); color:#818cf8; }

        .uc-card {
          background: #fff;
          border: 1px solid #e8ecf0;
          border-radius: 1rem;
          padding: 1.25rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
          font-family: 'DM Sans', sans-serif;
        }
        .uc-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.95rem;
          color: #0f172a;
          margin-bottom: 1rem;
        }
        .uc-list { display: flex; flex-direction: column; gap: 0; }
        .uc-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .uc-item:last-child { border-bottom: none; padding-bottom: 0; }
        .uc-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .uc-info { flex: 1; min-width: 0; }
        .uc-name {
          font-size: 0.82rem;
          font-weight: 600;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .uc-room {
          font-size: 0.72rem;
          color: #94a3b8;
          margin-top: 1px;
        }
        .uc-chip {
          background: #eef2ff;
          color: #4338ca;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 999px;
          white-space: nowrap;
          flex-shrink: 0;
        }
      `}</style>

      <div className="uc-card">
        <p className="uc-title">Upcoming Classes (Today)</p>
        <div className="uc-list">
          {classes.map((cls, i) => (
            <div className="uc-item" key={i}>
              <span className="uc-dot" style={{ background: cls.color }} />
              <div className="uc-info">
                <p className="uc-name">{cls.name}</p>
                <p className="uc-room">{PLATFORM_ICONS[cls.platform]} {cls.room} · {cls.platform}</p>
              </div>
              <span className="uc-chip">{cls.start}–{cls.end}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
