import React from "react";

const classes = [
  { name: "Mathematics",       grade:"Grade 10", room: "Room 3",  platform: "Offline", start: "08:00", end: "09:30", color: "#f59e0b", icon: "📐" },
  { name: "Science",           grade:"Grade 11", room: "Lab 1",   platform: "Offline", start: "09:45", end: "11:15", color: "#ef4444", icon: "🔬" },
  { name: "English Language",  grade:"Grade 10", room: "Room 5",  platform: "Offline", start: "11:30", end: "13:00", color: "#8b5cf6", icon: "📖" },
  { name: "History",           grade:"Grade 9",  room: "Room 2",  platform: "Offline", start: "13:45", end: "15:00", color: "#06b6d4", icon: "🏛️" },
  { name: "ICT",               grade:"Grade 11", room: "Lab 2",   platform: "Offline", start: "15:15", end: "16:30", color: "#10b981", icon: "💻" },
];

export default function UpcomingClasses() {
  const now = new Date();
  const currentMins = now.getHours() * 60 + now.getMinutes();

  function getStatus(start, end) {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const s = sh * 60 + sm, e = eh * 60 + em;
    if (currentMins >= s && currentMins <= e) return "ongoing";
    if (currentMins < s) return "upcoming";
    return "done";
  }

  return (
    <>
      <style>{`
        [data-theme="dark"] .uc-card  { background:#0f172a; border-color:rgba(245,158,11,0.12); }
        [data-theme="dark"] .uc-title { color:#e2e8f0; }
        [data-theme="dark"] .uc-item  { border-color:rgba(255,255,255,0.05); }
        [data-theme="dark"] .uc-name  { color:#e2e8f0; }
        [data-theme="dark"] .uc-meta  { color:#64748b; }
        [data-theme="dark"] .uc-grade { color:#94a3b8; }
        [data-theme="dark"] .uc-done  { opacity:0.4; }

        .uc-card { background:#fff; border:1px solid #e8ecf0; border-radius:1rem; padding:1.25rem; box-shadow:0 2px 10px rgba(0,0,0,.06); font-family:'DM Sans',sans-serif; }
        .uc-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem; }
        .uc-title { font-family:'Syne',sans-serif; font-weight:800; font-size:0.95rem; color:#0f172a; }
        .uc-count { font-size:0.72rem; font-weight:700; background:linear-gradient(90deg,#302b63,#f59e0b); color:#fff; padding:3px 10px; border-radius:999px; }
        .uc-list  { display:flex; flex-direction:column; gap:0; }
        .uc-item  { display:flex; align-items:center; gap:10px; padding:9px 0; border-bottom:1px solid #f1f5f9; }
        .uc-item:last-child { border-bottom:none; padding-bottom:0; }
        .uc-done  { opacity:0.45; }
        .uc-icon-wrap { width:34px; height:34px; border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:1rem; flex-shrink:0; }
        .uc-info  { flex:1; min-width:0; }
        .uc-name  { font-size:0.82rem; font-weight:700; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .uc-grade { font-size:0.7rem; color:#94a3b8; margin-top:1px; }
        .uc-right { display:flex; flex-direction:column; align-items:flex-end; gap:3px; flex-shrink:0; }
        .uc-time  { font-size:0.7rem; font-weight:700; color:#475569; white-space:nowrap; }
        .uc-badge { font-size:0.62rem; font-weight:700; padding:2px 7px; border-radius:999px; }
        .uc-badge-ongoing  { background:#dcfce7; color:#15803d; }
        .uc-badge-upcoming { background:#f1f5f9; color:#64748b; }
        .uc-badge-done     { background:#f1f5f9; color:#94a3b8; }
      `}</style>

      <div className="uc-card">
        <div className="uc-head">
          <p className="uc-title">Today's Classes</p>
          <span className="uc-count">OL · {classes.length} classes</span>
        </div>
        <div className="uc-list">
          {classes.map((cls, i) => {
            const status = getStatus(cls.start, cls.end);
            return (
              <div className={`uc-item${status==="done"?" uc-done":""}`} key={i}>
                <div className="uc-icon-wrap" style={{ background:`${cls.color}18` }}>
                  <span>{cls.icon}</span>
                </div>
                <div className="uc-info">
                  <p className="uc-name">{cls.name}</p>
                  <p className="uc-grade">{cls.grade} · {cls.room}</p>
                </div>
                <div className="uc-right">
                  <span className="uc-time">{cls.start}–{cls.end}</span>
                  <span className={`uc-badge uc-badge-${status}`}>
                    {status === "ongoing" ? "● Live" : status === "upcoming" ? "Soon" : "Done"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
