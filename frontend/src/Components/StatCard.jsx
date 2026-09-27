import React from "react";

export default function StatCard({ label, value, sub, icon: Icon, variant }) {
  return (
    <>
      <style>{`
        [data-theme="dark"] .stat-card { box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
        [data-theme="dark"] .stat-card-label { color: rgba(255,255,255,0.6); }
        [data-theme="dark"] .stat-card-value { color: #fff; }
        [data-theme="dark"] .stat-card-sub   { color: rgba(255,255,255,0.5); }
      `}</style>

      <div className={`stat-card ${variant}`}>
        <div className="stat-card-top">
          <div className="stat-card-icon">
            <Icon />
          </div>
          <div className="stat-card-text">
            <span className="stat-card-label">{label}</span>
            <span className="stat-card-value">{value}</span>
          </div>
        </div>
        <div className="stat-card-sub">{sub}</div>
        <div className="stat-card-bar" />
      </div>
    </>
  );
}
