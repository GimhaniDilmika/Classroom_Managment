import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaChartLine,
  FaClipboardCheck,
  FaFileAlt,
  FaLightbulb,
  FaMoneyBillWave,
  FaUserGraduate,
  FaVideo,
} from "react-icons/fa";

const ASSIGNMENT_KEY = "classease_assignments_v2";
const MARKS_KEY = "classease_marks_v2";
const LIVE_KEY = "classease_live_sessions_v1";
const DEFAULT_ASSIGNMENTS = [
  { id: 1, title: "Algebra Practice Paper", type: "Assignment", className: "Grade 10A", subject: "Mathematics", dueDate: "2026-06-22", status: "Published", maxMarks: 50 },
  { id: 2, title: "Science Worksheet", type: "Worksheet", className: "Grade 10A", subject: "Science", dueDate: "2026-06-24", status: "Published", maxMarks: 40 },
  { id: 3, title: "English Grammar Quiz", type: "Quiz", className: "Grade 10A", subject: "English", dueDate: "2026-06-19", status: "Published", maxMarks: 25 },
];
const DEFAULT_MARKS = [
  { id: 1, studentId: "STU-001", className: "Grade 10A", subject: "Mathematics", marks: 86, maxMarks: 100 },
  { id: 2, studentId: "STU-001", className: "Grade 10A", subject: "Science", marks: 42, maxMarks: 50 },
  { id: 3, studentId: "STU-001", className: "Grade 10A", subject: "English", marks: 36, maxMarks: 50 },
];
const DEFAULT_SESSIONS = [
  { id: 1, title: "Grade 10 Science Revision", className: "Grade 10A", date: "2026-06-16", time: "09:00", status: "Scheduled" },
  { id: 2, title: "Mathematics Term Test Preparation", className: "Grade 10A", date: "2026-06-18", time: "18:00", status: "Scheduled" },
];
const TODAY_PLAN = [
  { time: "08:00", title: "Mathematics", place: "Room 201" },
  { time: "09:30", title: "Science", place: "Lab 01" },
  { time: "11:30", title: "English Language", place: "Room 205" },
];

function read(key, fallback) {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    return saved?.length ? saved : fallback;
  } catch {
    return fallback;
  }
}
function pct(item) { return item.maxMarks ? Math.round((Number(item.marks) / Number(item.maxMarks)) * 100) : 0; }
function dateLabel(date) {
  if (!date) return "No due date";
  const diff = Math.ceil((new Date(date).setHours(0,0,0,0) - new Date().setHours(0,0,0,0)) / 86400000);
  if (diff < 0) return "Overdue";
  if (diff === 0) return "Due today";
  if (diff <= 3) return `Due in ${diff} day${diff > 1 ? "s" : ""}`;
  return new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
function Card({ icon, label, value, note, onClick }) {
  return <button className="stu-card" onClick={onClick}><div className="stu-icon">{icon}</div><div><p>{label}</p><h3>{value}</h3><span>{note}</span></div></button>;
}

export default function StudentDashboard() {
  const { userName, userProfile } = useAuth();
  const navigate = useNavigate();
  const [assignments] = useState(() => read(ASSIGNMENT_KEY, DEFAULT_ASSIGNMENTS));
  const [marks] = useState(() => read(MARKS_KEY, DEFAULT_MARKS));
  const [sessions] = useState(() => read(LIVE_KEY, DEFAULT_SESSIONS));
  const studentClass = `${userProfile?.className || "Grade 10"}${userProfile?.section || "A"}`;
  const studentId = userProfile?.studentId || "STU-001";
  const visibleMarks = marks.filter((item) => item.studentId === studentId || item.className === studentClass || (!userProfile?.studentId && item.studentId === "STU-001"));
  const visibleAssignments = assignments.filter((item) => item.status === "Published" && (item.className === studentClass || item.className === "Grade 10A"));
  const visibleSessions = sessions.filter((item) => item.className === studentClass || item.className === "Grade 10A");
  const analytics = useMemo(() => {
    const avg = visibleMarks.length ? Math.round(visibleMarks.reduce((sum, item) => sum + pct(item), 0) / visibleMarks.length) : 0;
    const live = visibleSessions.filter((item) => item.status === "Scheduled" || item.status === "Live").length;
    const dueSoon = visibleAssignments.filter((item) => ["Due today", "Due in 1 day", "Due in 2 days", "Due in 3 days"].includes(dateLabel(item.dueDate))).length;
    return { avg, live, dueSoon };
  }, [visibleMarks, visibleAssignments, visibleSessions]);

  const weakSubjects = visibleMarks.filter((item) => pct(item) < 55).map((item) => item.subject);

  return (
    <>
      <style>{`
        .stu-page{min-height:100vh;margin-left:16rem;background:#f1f5f9;font-family:'DM Sans',sans-serif}.stu-topbar{height:4rem;background:rgba(255,255,255,.95);border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;position:sticky;top:0;z-index:80}.stu-title{font-family:'Syne',sans-serif;font-weight:800;background:linear-gradient(90deg,#302b63,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.stu-role{background:#eff6ff;color:#1d4ed8;padding:.35rem .8rem;border-radius:999px;font-weight:900;font-size:.75rem}.stu-content{padding:1.75rem 2rem}.stu-hero{background:linear-gradient(135deg,#1e3a8a,#312e81,#0f172a);color:#fff;border-radius:1.4rem;padding:2rem;margin-bottom:1.2rem;display:grid;grid-template-columns:1fr auto;gap:1.2rem;align-items:center;overflow:hidden}.stu-hero h1{font-size:1.85rem;margin:.2rem 0;font-family:'Syne',sans-serif}.stu-hero p{color:rgba(255,255,255,.68);max-width:850px}.stu-identity{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.15);border-radius:1rem;padding:1rem;min-width:230px}.stu-identity p{margin:.2rem 0}.stu-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem;margin-bottom:1rem}.stu-card{background:#fff;border:1px solid #e8ecf0;border-radius:1.1rem;padding:1.05rem;display:flex;align-items:center;gap:.9rem;box-shadow:0 4px 18px rgba(15,23,42,.06);text-align:left;cursor:pointer;transition:.2s}.stu-card:hover{transform:translateY(-2px);border-color:#3b82f6}.stu-icon{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;font-size:1.1rem}.stu-card p{margin:0;color:#64748b;font-size:.7rem;font-weight:900;text-transform:uppercase}.stu-card h3{margin:.18rem 0;color:#0f172a;font-size:1.35rem}.stu-card span{color:#94a3b8;font-size:.75rem}.stu-panels{display:grid;grid-template-columns:1.1fr .9fr;gap:1rem}.stu-panel{background:#fff;border:1px solid #e8ecf0;border-radius:1.15rem;padding:1.2rem;box-shadow:0 4px 18px rgba(15,23,42,.06)}.stu-panel h2{margin:0 0 1rem;font-size:1rem;color:#0f172a}.stu-row{display:grid;grid-template-columns:1fr auto;gap:1rem;align-items:center;padding:.85rem 0;border-bottom:1px solid #f1f5f9}.stu-row:last-child{border-bottom:0}.muted{color:#64748b;font-size:.82rem}.strong{font-weight:900;color:#0f172a}.pill{border-radius:999px;background:#eff6ff;color:#1d4ed8;padding:.28rem .65rem;font-size:.72rem;font-weight:900}.progress{height:10px;background:#e2e8f0;border-radius:999px;overflow:hidden}.bar{height:100%;background:linear-gradient(90deg,#3b82f6,#8b5cf6)}.intel{background:#eff6ff;border:1px solid #bfdbfe;color:#1d4ed8;border-radius:1rem;padding:1rem;margin-top:1rem;display:flex;gap:.7rem;align-items:flex-start}.student-note{background:#f8fafc;border:1px dashed #cbd5e1;border-radius:1rem;padding:1rem;margin-bottom:1rem;color:#475569;font-size:.86rem}@media(max-width:1100px){.stu-grid{grid-template-columns:repeat(2,1fr)}.stu-hero{grid-template-columns:1fr}.stu-panels{grid-template-columns:1fr}}@media(max-width:900px){.stu-page{margin-left:0}.stu-topbar{padding-left:4.5rem;padding-right:1rem}.stu-content{padding:1rem}.stu-grid{grid-template-columns:1fr}.stu-hero{padding:1.4rem}.stu-hero h1{font-size:1.45rem}}
      `}</style>
      <Sidebar />
      <main className="stu-page">
        <header className="stu-topbar"><span className="stu-title">Student Learning Portal</span><span className="stu-role">View Only Access</span></header>
        <section className="stu-content">
          <div className="stu-hero">
            <div>
              <p>Welcome, {userName || "Student"}</p>
              <h1>Your personal academic dashboard</h1>
              <p>Students can view their timetable, assignments, papers, term-test marks, attendance, live sessions, and fee status. Editing is reserved for teachers and administrators.</p>
            </div>
            <div className="stu-identity"><p><strong>Class:</strong> {studentClass}</p><p><strong>Student ID:</strong> {studentId}</p><p><strong>Role:</strong> Student</p></div>
          </div>

          <div className="student-note"><strong>Access rule:</strong> This portal is view-only. Your teachers publish assignments and enter marks. You can track progress and prepare for upcoming classes.</div>

          <div className="stu-grid">
            <Card icon={<FaUserGraduate />} label="Class" value={studentClass} note="Current class" onClick={() => navigate("/profile")} />
            <Card icon={<FaClipboardCheck />} label="Attendance" value="91%" note="This month" onClick={() => navigate("/student/attendance")} />
            <Card icon={<FaChartLine />} label="Average" value={`${analytics.avg}%`} note="Term progress" onClick={() => navigate("/student/marks")} />
            <Card icon={<FaFileAlt />} label="Due Soon" value={analytics.dueSoon} note="Tasks needing attention" onClick={() => navigate("/student/assignments")} />
            <Card icon={<FaBookOpen />} label="Assignments" value={visibleAssignments.length} note="Published by teachers" onClick={() => navigate("/student/assignments")} />
            <Card icon={<FaVideo />} label="Live Classes" value={analytics.live} note="Upcoming sessions" onClick={() => navigate("/student/live-sessions")} />
            <Card icon={<FaCalendarAlt />} label="Timetable" value="Today" note="Class schedule" onClick={() => navigate("/student/timetable")} />
            <Card icon={<FaMoneyBillWave />} label="Fees" value="Partial" note="Payment status" onClick={() => navigate("/student/fees")} />
          </div>

          <div className="stu-panels">
            <div className="stu-panel"><h2><FaBookOpen /> Upcoming Learning Work</h2>{visibleAssignments.slice(0,4).map((item) => <div className="stu-row" key={item.id}><div><div className="strong">{item.title}</div><div className="muted">{item.subject} · {item.type || "Assignment"} · {item.maxMarks || 0} marks</div></div><span className="pill">{dateLabel(item.dueDate)}</span></div>)}{visibleAssignments.length===0 && <p className="muted">No assignments are published yet.</p>}</div>
            <div className="stu-panel"><h2><FaCalendarAlt /> Today&apos;s Class Plan</h2>{TODAY_PLAN.map((item) => <div className="stu-row" key={item.time}><div><div className="strong">{item.title}</div><div className="muted">{item.place}</div></div><span className="pill">{item.time}</span></div>)}<div className="intel"><FaLightbulb /> <span>{weakSubjects.length ? `Focus suggestion: revise ${[...new Set(weakSubjects)].join(", ")} before the next assessment.` : "Good progress. Keep completing papers before the deadline."}</span></div></div>
          </div>
        </section>
      </main>
    </>
  );
}
