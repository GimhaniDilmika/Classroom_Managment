import React from "react";

export default function StatCard({ label, value, sub, icon: Icon, variant }) {
  return (
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
  );
}
