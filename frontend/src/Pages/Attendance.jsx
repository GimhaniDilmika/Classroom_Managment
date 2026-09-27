import React, { useMemo, useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaExclamationTriangle,
  FaSave,
  FaSearch,
  FaTimesCircle,
  FaUserCheck,
} from "react-icons/fa";

const STORAGE_KEY = "classease_attendance_records_v1";

const CLASSES = ["Grade 10A", "Grade 10B", "Grade 11A", "Grade 12 ICT"];
const STUDENTS = [
  { id: "STU-001", name: "Aisha Perera", className: "Grade 10A" },
  { id: "STU-002", name: "Kavindu Silva", className: "Grade 11A" },
  { id: "STU-003", name: "Nethmi Fernando", className: "Grade 10A" },
  { id: "STU-004", name: "Tharindu Mendis", className: "Grade 12 ICT" },
  { id: "STU-005", name: "Dinali Wickrama", className: "Grade 11A" },
  { id: "STU-006", name: "Yasith Bandara", className: "Grade 10B" },
  { id: "STU-007", name: "Imasha Kumarage", className: "Grade 10A" },
  { id: "STU-008", name: "Dulaj Senanayake", className: "Grade 12 ICT" },
];

const STATUS = {
  Present: { icon: <FaCheckCircle />, color: "#10b981" },
  Late: { icon: <FaClock />, color: "#f59e0b" },
  Absent: { icon: <FaTimesCircle />, color: "#ef4444" },
  Excused: { icon: <FaUserCheck />, color: "#6366f1" },
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function readRecords() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState("Grade 10A");
  const [selectedDate, setSelectedDate] = useState(today());
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(false);
  const [records, setRecords] = useState(() => readRecords());

  const key = `${selectedDate}_${selectedClass}`;
  const classStudents = useMemo(() => {
    return STUDENTS.filter((student) => student.className === selectedClass).filter((student) =>
      `${student.name} ${student.id}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [selectedClass, search]);

  const currentRecords = records[key] || {};

  const summary = useMemo(() => {
    const values = classStudents.map((student) => currentRecords[student.id] || "Present");
    const total = values.length || 1;
    const presentLike = values.filter((status) => status === "Present" || status === "Late" || status === "Excused").length;
    return {
      total: values.length,
      present: values.filter((status) => status === "Present").length,
      late: values.filter((status) => status === "Late").length,
      absent: values.filter((status) => status === "Absent").length,
      excused: values.filter((status) => status === "Excused").length,
      percentage: Math.round((presentLike / total) * 100),
    };
  }, [classStudents, currentRecords]);

  function updateStatus(studentId, status) {
    setRecords((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [studentId]: status,
      },
    }));
    setSaved(false);
  }

  function markAll(status) {
    const next = {};
    classStudents.forEach((student) => {
      next[student.id] = status;
    });
    setRecords((prev) => ({ ...prev, [key]: next }));
    setSaved(false);
  }

  function saveAttendance() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function downloadCsv() {
    const rows = [["Student ID", "Name", "Class", "Date", "Status"]];
    classStudents.forEach((student) => {
      rows.push([student.id, student.name, student.className, selectedDate, currentRecords[student.id] || "Present"]);
    });
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `attendance-${selectedClass}-${selectedDate}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <AttendanceStyles />
      <div className="atn-page">
        <Sidebar />
        <main className="atn-main">
          <header className="atn-topbar">
            <span className="atn-topbar-title">Attendance Intelligence</span>
            <button className="atn-export" onClick={downloadCsv}><FaDownload /> Export CSV</button>
          </header>

          <section className="atn-content">
            <div className="atn-hero">
              <div>
                <p className="atn-kicker"><FaCalendarAlt /> Daily Classroom Tracking</p>
                <h1>Attendance Management</h1>
                <p>Mark attendance, detect absence patterns, and prepare quick daily records for each class.</p>
              </div>
              <div className="atn-health">
                <span>{summary.percentage}%</span>
                <small>Class attendance health</small>
              </div>
            </div>

            <div className="atn-stats">
              <Stat label="Total Students" value={summary.total} color="#302b63" />
              <Stat label="Present" value={summary.present} color="#10b981" />
              <Stat label="Late" value={summary.late} color="#f59e0b" />
              <Stat label="Absent" value={summary.absent} color="#ef4444" />
              <Stat label="Excused" value={summary.excused} color="#6366f1" />
            </div>

            {summary.percentage < 80 && (
              <div className="atn-alert"><FaExclamationTriangle /> Attendance is below the recommended level. Review absent students and create a follow-up action if needed.</div>
            )}

            <div className="atn-card">
              <div className="atn-toolbar">
                <div className="atn-field"><label>Class</label><select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>{CLASSES.map((item) => <option key={item}>{item}</option>)}</select></div>
                <div className="atn-field"><label>Date</label><input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} /></div>
                <div className="atn-search"><FaSearch /><input placeholder="Search student..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
                <div className="atn-actions">
                  <button type="button" onClick={() => markAll("Present")}>Mark All Present</button>
                  <button type="button" onClick={() => markAll("Absent")}>Mark All Absent</button>
                </div>
              </div>

              <div className="atn-table-wrap">
                <table className="atn-table">
                  <thead><tr><th>Student</th><th>Student ID</th><th>Class</th><th>Status</th></tr></thead>
                  <tbody>
                    {classStudents.map((student) => {
                      const current = currentRecords[student.id] || "Present";
                      return (
                        <tr key={student.id}>
                          <td><strong>{student.name}</strong></td>
                          <td>{student.id}</td>
                          <td>{student.className}</td>
                          <td>
                            <div className="atn-status-row">
                              {Object.keys(STATUS).map((status) => (
                                <button key={status} className={`atn-status ${current === status ? "active" : ""}`} style={{ "--status": STATUS[status].color }} onClick={() => updateStatus(student.id, status)}>
                                  {STATUS[status].icon} {status}
                                </button>
                              ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="atn-footer">
                <span>{saved ? "Attendance saved successfully." : "Changes are stored after you click Save Attendance."}</span>
                <button className="atn-save" onClick={saveAttendance}><FaSave /> Save Attendance</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

function Stat({ label, value, color }) {
  return <div className="atn-stat" style={{ "--stat": color }}><span>{value}</span><small>{label}</small></div>;
}

function AttendanceStyles() {
  return <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
    [data-theme="dark"] .atn-main{background:#020617;color:#e2e8f0}[data-theme="dark"] .atn-topbar,[data-theme="dark"] .atn-card,[data-theme="dark"] .atn-stat{background:#0f172a;border-color:rgba(245,158,11,.12)}[data-theme="dark"] .atn-table th{background:#111827;color:#94a3b8}[data-theme="dark"] .atn-table td{border-color:#1e293b;color:#cbd5e1}[data-theme="dark"] .atn-field input,[data-theme="dark"] .atn-field select,[data-theme="dark"] .atn-search{background:#111827;border-color:#334155;color:#e2e8f0}[data-theme="dark"] .atn-search input{color:#e2e8f0}
    .atn-page{min-height:100vh}.atn-main{margin-left:16rem;min-height:100vh;background:#f1f5f9;font-family:'DM Sans',sans-serif;color:#0f172a}.atn-topbar{height:4rem;background:rgba(255,255,255,.95);backdrop-filter:blur(14px);border-bottom:1px solid rgba(15,23,42,.06);display:flex;align-items:center;justify-content:space-between;padding:0 2rem;position:sticky;top:0;z-index:40}.atn-topbar-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;background:linear-gradient(90deg,#302b63,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.atn-export,.atn-save,.atn-actions button{border:none;border-radius:10px;padding:.6rem 1rem;font-weight:800;cursor:pointer;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:8px}.atn-export,.atn-save{background:linear-gradient(90deg,#f59e0b,#ef4444);color:white;box-shadow:0 8px 18px rgba(245,158,11,.25)}.atn-content{padding:2rem}.atn-hero{background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);border-radius:1.25rem;padding:1.8rem 2rem;color:white;display:flex;justify-content:space-between;gap:1.5rem;align-items:center;margin-bottom:1.3rem;overflow:hidden;position:relative}.atn-kicker{color:#fbbf24;font-weight:800;display:flex;align-items:center;gap:8px;margin:0 0 .5rem}.atn-hero h1{font-family:'Syne',sans-serif;font-size:2rem;margin:.2rem 0}.atn-hero p{color:#cbd5e1;margin:.25rem 0}.atn-health{width:140px;height:140px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);flex-shrink:0}.atn-health span{font-size:2.2rem;font-weight:900}.atn-health small{text-align:center;color:#cbd5e1}.atn-stats{display:grid;grid-template-columns:repeat(5,minmax(130px,1fr));gap:1rem;margin-bottom:1rem}.atn-stat{background:white;border:1px solid #e8ecf0;border-radius:1rem;padding:1rem;box-shadow:0 4px 16px rgba(15,23,42,.05);border-left:4px solid var(--stat)}.atn-stat span{display:block;font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:900;color:var(--stat)}.atn-stat small{color:#64748b;font-weight:700}.atn-alert{background:#fff7ed;border:1px solid #fed7aa;color:#c2410c;border-radius:1rem;padding:.9rem 1rem;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-weight:700}.atn-card{background:white;border:1px solid #e8ecf0;border-radius:1.2rem;box-shadow:0 8px 24px rgba(15,23,42,.06);overflow:hidden}.atn-toolbar{display:flex;align-items:end;gap:1rem;padding:1.2rem;flex-wrap:wrap;border-bottom:1px solid #f1f5f9}.atn-field{display:flex;flex-direction:column;gap:5px}.atn-field label{font-size:.68rem;text-transform:uppercase;letter-spacing:.08em;color:#64748b;font-weight:800}.atn-field input,.atn-field select{border:1.5px solid #e2e8f0;border-radius:10px;padding:.65rem .8rem;background:#f8fafc;outline:none;font-family:'DM Sans',sans-serif}.atn-search{display:flex;align-items:center;gap:8px;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:999px;padding:.65rem .9rem;min-width:260px}.atn-search svg{color:#94a3b8}.atn-search input{border:none;background:transparent;outline:none;width:100%;font-family:'DM Sans',sans-serif}.atn-actions{display:flex;gap:.5rem;margin-left:auto}.atn-actions button{background:#eef2ff;color:#302b63}.atn-table-wrap{overflow:auto}.atn-table{width:100%;border-collapse:collapse;min-width:860px}.atn-table th{background:#f8fafc;text-align:left;padding:.85rem 1rem;text-transform:uppercase;font-size:.72rem;letter-spacing:.08em;color:#64748b}.atn-table td{padding:.9rem 1rem;border-top:1px solid #f1f5f9;color:#334155}.atn-status-row{display:flex;gap:.45rem;flex-wrap:wrap}.atn-status{border:1px solid #e2e8f0;background:#fff;border-radius:999px;padding:.42rem .75rem;color:#64748b;font-weight:800;cursor:pointer;display:flex;gap:6px;align-items:center}.atn-status.active{background:color-mix(in srgb,var(--status) 12%,white);border-color:var(--status);color:var(--status)}.atn-footer{display:flex;justify-content:space-between;align-items:center;padding:1rem 1.2rem;border-top:1px solid #f1f5f9;color:#64748b;font-weight:700;gap:1rem;flex-wrap:wrap}@media(max-width:900px){.atn-main{margin-left:0}.atn-stats{grid-template-columns:repeat(2,1fr)}.atn-hero{flex-direction:column;align-items:flex-start}.atn-actions{margin-left:0}}
  `}</style>;
}
