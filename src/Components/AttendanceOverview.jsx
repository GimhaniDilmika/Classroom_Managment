import React from "react";
import bgImage from "../assets/attendance.png"; // <-- meka oya image ekata replace karanna

export default function AttendanceOverview() {
  return (
    <div
      className="rounded-2xl shadow-sm p-5 flex flex-col"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h3 className="font-semibold mb-4">Attendance</h3>

      <div className="flex items-center gap-8">
        {/* === Donut Chart === */}
        <div className="relative" style={{ width: "160px", height: "160px" }}>
          
          <svg width="160" height="160">
            <circle cx="80" cy="80" r="60" stroke="#10b981" strokeWidth="14" fill="transparent"
              strokeDasharray="300 100" strokeLinecap="round" />

            <circle cx="80" cy="80" r="60" stroke="#f59e0b" strokeWidth="14" fill="transparent"
              strokeDasharray="60 340" strokeDashoffset="-300" strokeLinecap="round" />

            <circle cx="80" cy="80" r="60" stroke="#ef4444" strokeWidth="14" fill="transparent"
              strokeDasharray="40 360" strokeDashoffset="-360" strokeLinecap="round" />

            <circle cx="80" cy="80" r="60" stroke="#8b5cf6" strokeWidth="14" fill="transparent"
              strokeDasharray="30 370" strokeDashoffset="-400" strokeLinecap="round" />

            <circle cx="80" cy="80" r="60" stroke="#14b8a6" strokeWidth="14" fill="transparent"
              strokeDasharray="20 380" strokeDashoffset="-430" strokeLinecap="round" />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-semibold mb-4">32/40</span>
            <span className="font-semibold mb-4">Classes</span>
          </div>
        </div>

        {/* === Legend === */}
        <div className="space-y-2 text-sm">

          <div className="flex items-center justify-between" style={{ width: "160px" }}>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: "#10b981" }} />
              <span>Present</span>
            </div>
            <span>21</span>
          </div>

          <div className="flex items-center justify-between" style={{ width: "160px" }}>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
              <span>Late</span>
            </div>
            <span>5</span>
          </div>

          <div className="flex items-center justify-between" style={{ width: "160px" }}>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
              <span>Absent</span>
            </div>
            <span>3</span>
          </div>

          <div className="flex items-center justify-between" style={{ width: "160px" }}>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: "#8b5cf6" }} />
              <span >Fieldtrip</span>
            </div>
            <span>2</span>
          </div>

          <div className="flex items-center justify-between" style={{ width: "160px" }}>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: "#14b8a6" }} />
              <span>Health</span>
            </div>
            <span>1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
