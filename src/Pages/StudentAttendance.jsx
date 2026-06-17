import Sidebar from "../Components/Sidebar";

const records = [
  { date: "2026-06-10", subject: "Mathematics", status: "Present" },
  { date: "2026-06-11", subject: "Science", status: "Late" },
  { date: "2026-06-12", subject: "English", status: "Present" },
  { date: "2026-06-13", subject: "ICT", status: "Present" },
];

export default function StudentAttendance() {
  return (
    <><style>{`.my-page{min-height:100vh;margin-left:16rem;background:#f1f5f9;font-family:'DM Sans',sans-serif}.my-top{height:4rem;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;padding:0 2rem;font-family:'Syne',sans-serif;font-weight:800;color:#0f172a}.my-content{padding:1.75rem 2rem}.my-card{background:#fff;border:1px solid #e8ecf0;border-radius:1.1rem;padding:1.2rem;box-shadow:0 4px 18px rgba(15,23,42,.06);margin-bottom:1rem}.my-score{font-size:2.4rem;font-weight:900;color:#0f172a;margin:0}.my-muted{color:#64748b}.my-row{display:flex;justify-content:space-between;padding:1rem 0;border-bottom:1px solid #f1f5f9}.my-row:last-child{border-bottom:0}.pill{font-size:.72rem;font-weight:800;border-radius:999px;padding:.3rem .7rem;background:#ecfdf5;color:#047857}@media(max-width:900px){.my-page{margin-left:0}.my-top{padding-left:4.5rem}.my-content{padding:1rem}.my-row{flex-direction:column;gap:.35rem}}`}</style><Sidebar /><main className="my-page"><header className="my-top">My Attendance</header><section className="my-content"><div className="my-card"><p className="my-muted">Current month attendance</p><h1 className="my-score">91%</h1><p className="my-muted">Target achieved. Keep attending classes regularly.</p></div><div className="my-card">{records.map(r=><div className="my-row" key={`${r.date}-${r.subject}`}><div><strong>{r.subject}</strong><div className="my-muted">{r.date}</div></div><span className="pill">{r.status}</span></div>)}</div></section></main></>
  );
}
