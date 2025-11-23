import React from "react";
import bgImage from "../assets/c8.png";

export default function UpcomingClasses() {
  return (
    <div
      className="rounded-2xl shadow-sm p-5"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* WHITE BOX FOR TEXT */}
      <div className="bg-white/85 backdrop-blur-sm rounded-xl p-5">
        <h3 className="font-semibold text-slate-700 mb-4">
          Upcoming Classes (Today)
        </h3>

        <ul className="space-y-3 text-sm">
          <li className="flex items-center justify-between">
            <div>
              <p className="font-medium">Data Structures</p>
              <p className="text-xs text-slate-500">Room: CS-201 - Zoom</p>
            </div>
            <span className="time-chip">09:00 - 10:30</span>
          </li>

          <li className="flex items-center justify-between">
            <div>
              <p className="font-medium">Database Systems</p>
              <p className="text-xs text-slate-500">
                Room: CS-305 - Google Meet
              </p>
            </div>
            <span className="time-chip">11:00 - 12:30</span>
          </li>

          <li className="flex items-center justify-between">
            <div>
              <p className="font-medium">Software Engineering</p>
              <p className="text-xs text-slate-500">Room: CS-108 - Teams</p>
            </div>
            <span className="time-chip">14:00 - 15:30</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
