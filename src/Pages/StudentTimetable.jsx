import Sidebar from "../Components/Sidebar";

const timetable = [
  { day: "Monday", time: "08:00 - 09:00", subject: "Mathematics", teacher: "Mr. Perera" },
  { day: "Monday", time: "09:00 - 10:00", subject: "Science", teacher: "Ms. Fernando" },
  { day: "Tuesday", time: "10:30 - 11:30", subject: "English", teacher: "Mrs. Silva" },
  { day: "Wednesday", time: "11:30 - 12:30", subject: "ICT", teacher: "Mr. Bandara" },
];

export default function StudentTimetable() {
  return (
    <><style>{`.my-page{min-height:100vh;margin-left:16rem;background:#f1f5f9;font-family:'DM Sans',sans-serif}.my-top{height:4rem;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;padding:0 2rem;font-family:'Syne',sans-serif;font-weight:800;color:#0f172a}.my-content{padding:1.75rem 2rem}.list{background:#fff;border:1px solid #e8ecf0;border-radius:1.1rem;padding:1.2rem;box-shadow:0 4px 18px rgba(15,23,42,.06)}.row{display:grid;grid-template-columns:1fr 1.2fr 1.5fr 1.2fr;gap:1rem;padding:1rem 0;border-bottom:1px solid #f1f5f9}.row:last-child{border-bottom:0}.head{font-size:.74rem;text-transform:uppercase;font-weight:900;color:#64748b}.muted{color:#64748b}@media(max-width:900px){.my-page{margin-left:0}.my-top{padding-left:4.5rem}.my-content{padding:1rem}.row{grid-template-columns:1fr;gap:.25rem}.head{display:none}}`}</style><Sidebar /><main className="my-page"><header className="my-top">My Timetable</header><section className="my-content"><div className="list"><div className="row head"><div>Day</div><div>Time</div><div>Subject</div><div>Teacher</div></div>{timetable.map(t=><div className="row" key={`${t.day}-${t.subject}`}><div><strong>{t.day}</strong></div><div className="muted">{t.time}</div><div>{t.subject}</div><div className="muted">{t.teacher}</div></div>)}</div></section></main></>
  );
}
