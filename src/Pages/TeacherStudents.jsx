import Sidebar from "../Components/Sidebar";

const students = [
  { admNo: "ADM-001", name: "Aisha Perera", className: "Grade 10A", attendance: "92%", note: "Good progress" },
  { admNo: "ADM-002", name: "Kavindu Silva", className: "Grade 11B", attendance: "78%", note: "Needs follow-up" },
  { admNo: "ADM-003", name: "Nethmi Fernando", className: "Grade 10A", attendance: "88%", note: "Active learner" },
];

export default function TeacherStudents() {
  return (
    <><style>{`.tbl-page{min-height:100vh;margin-left:16rem;background:#f1f5f9;font-family:'DM Sans',sans-serif}.tbl-top{height:4rem;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;padding:0 2rem;font-family:'Syne',sans-serif;font-weight:800;color:#0f172a}.tbl-content{padding:1.75rem 2rem}.tbl-card{background:#fff;border:1px solid #e8ecf0;border-radius:1.1rem;overflow:hidden;box-shadow:0 4px 18px rgba(15,23,42,.06)}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:1rem;border-bottom:1px solid #f1f5f9}th{font-size:.75rem;text-transform:uppercase;color:#64748b;background:#f8fafc}.status{font-size:.72rem;font-weight:800;background:#ecfdf5;color:#047857;padding:.3rem .65rem;border-radius:999px}@media(max-width:900px){.tbl-page{margin-left:0}.tbl-top{padding-left:4.5rem}.tbl-content{padding:1rem}.tbl-card{overflow-x:auto}table{min-width:650px}}`}</style><Sidebar /><main className="tbl-page"><header className="tbl-top">My Students</header><section className="tbl-content"><div className="tbl-card"><table><thead><tr><th>Admission No</th><th>Name</th><th>Class</th><th>Attendance</th><th>Teacher Note</th><th>Status</th></tr></thead><tbody>{students.map((s)=><tr key={s.admNo}><td>{s.admNo}</td><td>{s.name}</td><td>{s.className}</td><td>{s.attendance}</td><td>{s.note}</td><td><span className="status">Visible</span></td></tr>)}</tbody></table></div></section></main></>
  );
}
