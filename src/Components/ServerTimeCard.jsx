import React from "react";
import bgImage from "../assets/cl.png";   // <-- this file exists

export default function ServerTimeCard({ formattedTime }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h3
  className="font-semibold mb-4"
  style={{ color: "#020216ff" }}   // change this code
>
  Server Time
</h3>


      <div className="border border-indigo-300 rounded-xl px-8 py-4 text-3xl font-mono text-indigo-700 tracking-[0.2em] mb-6 time-box">
        {formattedTime}
      </div>
      <div className="w-full grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-lg bg-slate-50 px-3 py-2">
          <p className="text-slate-500" >Active Live Sessions</p>
          <p className="font-semibold text-slate-800">1</p>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2">
          <p className="text-slate-500">New Messages</p>
          <p className="font-semibold text-slate-800">8</p>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2">
          <p className="text-slate-500">Submissions Today</p>
          <p className="font-semibold text-slate-800">57</p>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2">
          <p className="text-slate-500">Pending Approvals</p>
          <p className="font-semibold text-slate-800">4</p>
        </div>
      </div>
    </div>
  );
}
