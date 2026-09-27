import React from "react";

const DATA = [
  { label: "Present",   value: 21, color: "#10b981" },
  { label: "Late",      value: 5,  color: "#f59e0b" },
  { label: "Absent",    value: 3,  color: "#ef4444" },
  { label: "Fieldtrip", value: 2,  color: "#8b5cf6" },
  { label: "Health",    value: 1,  color: "#14b8a6" },
];

const TOTAL = DATA.reduce((s, d) => s + d.value, 0);   // 32
const PRESENT = DATA[0].value;
const CIRCUMFERENCE = 2 * Math.PI * 54;  // r=54

// Build strokeDasharray segments from a pie
function buildSegments(data, r) {
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return data.map(d => {
    const len = (d.value / TOTAL) * circ;
    const seg = { ...d, len, offset };
    offset += len;
    return seg;
  });
}

export default function AttendanceOverview() {
  const R = 54;
  const segments = buildSegments(DATA, R);

  return (
    <>
      <style>{`
        [data-theme="dark"] .att-card  { background:#0f172a; border-color:rgba(245,158,11,0.12); }
        [data-theme="dark"] .att-title { color:#e2e8f0; }
        [data-theme="dark"] .att-label { color:#94a3b8; }
        [data-theme="dark"] .att-val   { color:#e2e8f0; }
        [data-theme="dark"] .att-center-sub { color:#94a3b8; }

        .att-card {
          background: #fff;
          border: 1px solid #e8ecf0;
          border-radius: 1rem;
          padding: 1.25rem 1.25rem 1rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
          font-family: 'DM Sans', sans-serif;
        }
        .att-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 0.95rem;
          color: #0f172a;
          margin-bottom: 1rem;
        }
        .att-body {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .att-donut {
          flex-shrink: 0;
          position: relative;
          width: 130px;
          height: 130px;
        }
        .att-donut svg {
          transform: rotate(-90deg);
        }
        .att-center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .att-center-num {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          color: #0f172a;
          line-height: 1;
        }
        .att-center-sub {
          font-size: 0.65rem;
          color: #94a3b8;
          margin-top: 2px;
        }
        .att-legend {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .att-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .att-dot-label {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .att-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .att-label {
          font-size: 0.78rem;
          color: #475569;
        }
        .att-val {
          font-size: 0.78rem;
          font-weight: 700;
          color: #0f172a;
          min-width: 20px;
          text-align: right;
        }
      `}</style>

      <div className="att-card">
        <p className="att-title">Attendance Overview</p>
        <div className="att-body">
          {/* Donut */}
          <div className="att-donut">
            <svg width="130" height="130" viewBox="0 0 130 130">
              {/* track */}
              <circle cx="65" cy="65" r={R} fill="none" stroke="#f1f5f9" strokeWidth="13" />
              {/* segments */}
              {segments.map((seg, i) => (
                <circle
                  key={i}
                  cx="65" cy="65" r={R}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="13"
                  strokeDasharray={`${seg.len} ${2 * Math.PI * R - seg.len}`}
                  strokeDashoffset={-seg.offset}
                  strokeLinecap="butt"
                />
              ))}
            </svg>
            <div className="att-center">
              <span className="att-center-num">{PRESENT}/{TOTAL}</span>
              <span className="att-center-sub">Present</span>
            </div>
          </div>

          {/* Legend */}
          <div className="att-legend">
            {DATA.map(d => (
              <div className="att-row" key={d.label}>
                <div className="att-dot-label">
                  <span className="att-dot" style={{ background: d.color }} />
                  <span className="att-label">{d.label}</span>
                </div>
                <span className="att-val">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
