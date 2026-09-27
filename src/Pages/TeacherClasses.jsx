import Sidebar from "../Components/Sidebar";
import { FaSchool, FaUsers, FaBookOpen } from "react-icons/fa";

const classes = [
  { name: "Grade 10A", subject: "Mathematics", students: 34, room: "Room 201" },
  { name: "Grade 11B", subject: "Science", students: 31, room: "Lab 01" },
  { name: "Grade 10C", subject: "Mathematics", students: 29, room: "Room 205" },
];

export default function TeacherClasses() {
  return (
    <><style>{`.mini-page{min-height:100vh;margin-left:16rem;background:#f1f5f9;font-family:'DM Sans',sans-serif}.mini-top{height:4rem;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;padding:0 2rem;font-family:'Syne',sans-serif;font-weight:800;color:#0f172a}.mini-content{padding:1.75rem 2rem}.mini-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem}.mini-card{background:#fff;border:1px solid #e8ecf0;border-radius:1.1rem;padding:1.2rem;box-shadow:0 4px 18px rgba(15,23,42,.06)}.mini-head{display:flex;align-items:center;gap:.8rem;margin-bottom:.8rem}.mini-icon{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(135deg,#f59e0b,#ef4444);color:#fff}.mini-card h3{margin:0;color:#0f172a}.mini-card p{color:#64748b;margin:.3rem 0}.mini-meta{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1rem}.mini-pill{font-size:.72rem;font-weight:800;background:#fffbeb;color:#b45309;padding:.3rem .65rem;border-radius:999px}@media(max-width:900px){.mini-page{margin-left:0}.mini-top{padding-left:4.5rem}.mini-content{padding:1rem}}`}</style><Sidebar /><main className="mini-page"><header className="mini-top">My Classes</header><section className="mini-content"><div className="mini-grid">{classes.map((c)=><div className="mini-card" key={c.name}><div className="mini-head"><div className="mini-icon"><FaSchool /></div><div><h3>{c.name}</h3><p>{c.room}</p></div></div><p><FaBookOpen /> {c.subject}</p><p><FaUsers /> {c.students} students</p><div className="mini-meta"><span className="mini-pill">Assigned</span><span className="mini-pill">Active</span></div></div>)}</div></section></main></>
  );
}
