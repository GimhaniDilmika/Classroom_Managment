import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import {
  FaCalendarCheck,
  FaChartLine,
  FaClipboardCheck,
  FaFileAlt,
  FaLightbulb,
  FaPlus,
  FaTasks,
  FaUsers,
  FaVideo,
} from "react-icons/fa";

const ASSIGNMENT_KEY = "classease_assignments_v2";
const MARKS_KEY = "classease_marks_v2";
const LIVE_KEY = "classease_live_sessions_v1";

const DEFAULT_ASSIGNMENTS = [
  { id: 1, title: "Algebra Practice Paper", type: "Assignment", className: "Grade 10A", subject: "Mathematics", dueDate: "2026-06-22", status: "Published" },
  { id: 2, title: "Science Term Test Paper 01", type: "Term Test Paper", className: "Grade 11B", subject: "Science", dueDate: "2026-06-25", status: "Published" },
  { id: 3, title: "ICT Practical Worksheet", type: "Practical Paper", className: "Grade 12 ICT", subject: "ICT", dueDate: "2026-06-20", status: "Draft" },
];
const DEFAULT_MARKS = [
  { id: 1, student: "Aisha Perera", studentId: "STU-001", className: "Grade 10A", subject: "Mathematics", assessmentType: "Term Test", marks: 86, maxMarks: 100 },
  { id: 2, student: "Kavindu Silva", studentId: "STU-002", className: "Grade 10A", subject: "Mathematics", assessmentType: "Assignment", marks: 32, maxMarks: 50 },
  { id: 3, student: "Nethmi Fernando", studentId: "STU-003", className: "Grade 10A", subject: "Science", assessmentType: "Quiz", marks: 78, maxMarks: 100 },
];
const DEFAULT_SESSIONS = [
  { id: 1, title: "Grade 10 Science Revision", className: "Grade 10A", date: "2026-06-16", time: "09:00", status: "Scheduled", platform: "Zoom" },
  { id: 2, title: "Mathematics Term Test Preparation", className: "Grade 10A", date: "2026-06-18", time: "18:00", status: "Scheduled", platform: "Google Meet" },
];
const todaysClasses = [
  { time: "08:00 - 09:00", className: "Grade 10A", subject: "Mathematics", room: "Room 201", action: "Mark Attendance" },
  { time: "09:00 - 10:00", className: "Grade 11B", subject: "Science", room: "Lab 01", action: "Open Lesson" },
  { time: "11:30 - 12:30", className: "Grade 10A", subject: "Revision", room: "Room 201", action: "Add Marks" },
];

function read(key, fallback) {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    return saved?.length ? saved : fallback;
  } catch {
    return fallback;
  }
}
function pct(item) {
  return item.maxMarks ? Math.round((Number(item.marks) / Number(item.maxMarks)) * 100) : 0;
}
function dueLabel(date) {
  if (!date) return "No due date";
  const diff = Math.ceil((new Date(date).setHours(0,0,0,0) - new Date().setHours(0,0,0,0)) / 86400000);
  if (diff < 0) return "Overdue";
  if (diff === 0) return "Due today";
  if (diff <= 3) return `Due in ${diff} day${diff > 1 ? "s" : ""}`;
  return new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
function Stat({ icon, label, value, note, onClick }) {
  return <button className="td-stat" onClick={onClick}><span>{icon}</span><div><p>{label}</p><h3>{value}</h3><small>{note}</small></div></button>;
}
function Quick({ icon, label, text, onClick }) {
  return <button className="td-quick" onClick={onClick}><span>{icon}</span><div><strong>{label}</strong><small>{text}</small></div></button>;
}

export default function TeacherDashboard() {
  const { userName } = useAuth();
  const navigate = useNavigate();
  const [assignments] = useState(() => read(ASSIGNMENT_KEY, DEFAULT_ASSIGNMENTS));
  const [marks] = useState(() => read(MARKS_KEY, DEFAULT_MARKS));
  const [sessions] = useState(() => read(LIVE_KEY, DEFAULT_SESSIONS));

  const analytics = useMemo(() => {
    const avg = marks.length ? Math.round(marks.reduce((sum, item) => sum + pct(item), 0) / marks.length) : 0;
    const support = marks.filter((item) => pct(item) < 50).length;
    const published = assignments.filter((item) => item.status === "Published").length;
    const drafts = assignments.filter((item) => item.status === "Draft").length;
    const upcoming = sessions.filter((item) => item.status === "Scheduled" || item.status === "Live").length;
    return { avg, support, published, drafts, upcoming };
  }, [assignments, marks, sessions]);

  const actionQueue = [
    { title: "Publish pending learning resources", detail: `${analytics.drafts} draft paper(s) waiting`, path: "/teacher/assignments", level: analytics.drafts ? "Action" : "Clear" },
    { title: "Follow up weak assessment records", detail: `${analytics.support} learner(s) below 50%`, path: "/teacher/support-notes", level: analytics.support ? "High" : "Stable" },
    { title: "Prepare upcoming live sessions", detail: `${analytics.upcoming} session(s) scheduled`, path: "/live-sessions", level: "Review" },
  ];

  return (
    <>
      <style>{`
        .role-page{min-height:100vh;margin-left:16rem;background:#f1f5f9;font-family:'DM Sans',sans-serif}.role-topbar{height:4rem;background:rgba(255,255,255,.95);border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;position:sticky;top:0;z-index:80}.role-title{font-family:'Syne',sans-serif;font-weight:800;background:linear-gradient(90deg,#302b63,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.role-badge{background:#ecfdf5;color:#047857;padding:.35rem .8rem;border-radius:999px;font-weight:900;font-size:.75rem}.role-content{padding:1.75rem 2rem}.td-hero{background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);color:#fff;border-radius:1.4rem;padding:2rem;margin-bottom:1.2rem;display:grid;grid-template-columns:1fr auto;gap:1.2rem;align-items:center;overflow:hidden}.td-hero h1{font-size:1.85rem;margin:.2rem 0;font-family:'Syne',sans-serif}.td-hero p{color:rgba(255,255,255,.68);max-width:850px}.td-badge{display:inline-flex;align-items:center;gap:.4rem;background:rgba(245,158,11,.18);border:1px solid rgba(245,158,11,.35);color:#fbbf24;border-radius:999px;padding:.4rem .8rem;font-weight:900;font-size:.78rem}.td-hero-actions{display:flex;gap:.6rem;flex-wrap:wrap}.td-primary,.td-secondary{border:0;border-radius:.8rem;padding:.75rem 1rem;font-weight:900;cursor:pointer;display:flex;align-items:center;gap:.45rem}.td-primary{background:linear-gradient(90deg,#f59e0b,#ef4444);color:#fff}.td-secondary{background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.16)}.td-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem;margin-bottom:1rem}.td-stat{background:#fff;border:1px solid #e8ecf0;border-radius:1.1rem;padding:1rem;display:flex;gap:.9rem;align-items:center;text-align:left;box-shadow:0 4px 18px rgba(15,23,42,.06);cursor:pointer;transition:.2s}.td-stat:hover{transform:translateY(-2px);border-color:#f59e0b}.td-stat>span{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(135deg,#f59e0b,#ef4444);color:#fff;font-size:1.1rem}.td-stat p{margin:0;color:#64748b;font-size:.72rem;text-transform:uppercase;font-weight:900}.td-stat h3{margin:.18rem 0;color:#0f172a;font-size:1.45rem}.td-stat small{color:#94a3b8}.td-layout{display:grid;grid-template-columns:1.15fr .85fr;gap:1rem}.td-panel{background:#fff;border:1px solid #e8ecf0;border-radius:1.15rem;padding:1.2rem;box-shadow:0 4px 18px rgba(15,23,42,.06)}.td-panel h2{margin:0 0 1rem;color:#0f172a;font-size:1rem}.td-row{display:grid;grid-template-columns:1fr auto;gap:1rem;align-items:center;padding:.9rem 0;border-bottom:1px solid #f1f5f9}.td-row:last-child{border-bottom:0}.td-strong{font-weight:900;color:#0f172a}.td-muted{color:#64748b;font-size:.84rem}.td-pill{border-radius:999px;padding:.3rem .7rem;font-size:.72rem;font-weight:900;background:#fffbeb;color:#b45309}.td-workflow{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.75rem}.td-quick{border:1px solid #e8ecf0;background:#f8fafc;border-radius:1rem;padding:1rem;display:flex;gap:.75rem;align-items:center;text-align:left;cursor:pointer}.td-quick span{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:#fff;color:#f59e0b}.td-quick strong{display:block;color:#0f172a}.td-quick small{color:#64748b}.td-intel{background:#fff7ed;border:1px solid #fed7aa;color:#9a3412;border-radius:1rem;padding:1rem;margin-top:1rem;display:flex;gap:.7rem;align-items:flex-start}@media(max-width:1100px){.td-stats{grid-template-columns:repeat(2,1fr)}.td-hero{grid-template-columns:1fr}.td-layout{grid-template-columns:1fr}}@media(max-width:900px){.role-page{margin-left:0}.role-topbar{padding-left:4.5rem;padding-right:1rem}.role-content{padding:1rem}.td-stats,.td-workflow{grid-template-columns:1fr}.td-hero{padding:1.4rem}.td-hero h1{font-size:1.45rem}}
      `}</style>
      <Sidebar />
      <main className="role-page">
        <header className="role-topbar"><span className="role-title">Teacher Workspace</span><span className="role-badge">Teaching Access Only</span></header>
        <section className="role-content">
          <div className="td-hero">
            <div>
              <span className="td-badge">Classroom Operations · Teacher Role</span>
              <p>Welcome back, {userName || "Teacher"}</p>
              <h1>Manage teaching work, assessments, and student support</h1>
              <p>This dashboard is built like a real teacher portal: you can manage assignments, papers, term-test marks, live classes, attendance, and support notes for assigned classes only.</p>
            </div>
            <div className="td-hero-actions">
              <button className="td-primary" onClick={() => navigate("/teacher/assignments")}><FaPlus /> Create Assignment</button>
              <button className="td-secondary" onClick={() => navigate("/teacher/marks")}><FaChartLine /> Enter Marks</button>
            </div>
          </div>

          <div className="td-stats">
            <Stat icon={<FaUsers />} label="My Students" value="96" note="Across assigned classes" onClick={() => navigate("/teacher/students")} />
            <Stat icon={<FaTasks />} label="Published Tasks" value={analytics.published} note="Assignments and papers" onClick={() => navigate("/teacher/assignments")} />
            <Stat icon={<FaChartLine />} label="Class Average" value={`${analytics.avg}%`} note="Current markbook" onClick={() => navigate("/teacher/marks")} />
            <Stat icon={<FaClipboardCheck />} label="Support Needed" value={analytics.support} note="Below 50% records" onClick={() => navigate("/teacher/support-notes")} />
          </div>

          <div className="td-layout">
            <div className="td-panel">
              <h2><FaCalendarCheck /> Today&apos;s Teaching Schedule</h2>
              {todaysClasses.map((item) => <div className="td-row" key={`${item.time}-${item.className}`}><div><div className="td-strong">{item.className} · {item.subject}</div><div className="td-muted">{item.time} · {item.room}</div></div><span className="td-pill">{item.action}</span></div>)}
              <div className="td-intel"><FaLightbulb /> <span>Professional rule: attendance, assignments, and marks are teacher-managed. Students only view their own learning records.</span></div>
            </div>
            <div className="td-panel">
              <h2><FaFileAlt /> Assessment Action Queue</h2>
              {actionQueue.map((item) => <button className="td-row" style={{width:"100%",borderLeft:0,borderRight:0,borderTop:0,background:"transparent",cursor:"pointer"}} key={item.title} onClick={() => navigate(item.path)}><div><div className="td-strong">{item.title}</div><div className="td-muted">{item.detail}</div></div><span className="td-pill">{item.level}</span></button>)}
            </div>
          </div>

          <div className="td-panel" style={{marginTop:"1rem"}}>
            <h2>Quick Workflows</h2>
            <div className="td-workflow">
              <Quick icon={<FaTasks />} label="Assignment & Paper Center" text="Create, publish, edit, or remove learning tasks" onClick={() => navigate("/teacher/assignments")} />
              <Quick icon={<FaChartLine />} label="Marks & Term Tests" text="Enter and update marks with support alerts" onClick={() => navigate("/teacher/marks")} />
              <Quick icon={<FaClipboardCheck />} label="Attendance" text="Mark class attendance and identify absence patterns" onClick={() => navigate("/attendance")} />
              <Quick icon={<FaVideo />} label="Live Sessions" text="Schedule and manage online learning sessions" onClick={() => navigate("/live-sessions")} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
