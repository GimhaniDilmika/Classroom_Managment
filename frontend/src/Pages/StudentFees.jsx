import Sidebar from "../Components/Sidebar";

const fees = [
  { type: "Monthly Fee", amount: 5000, paid: 3000, status: "Partial" },
  { type: "Exam Fee", amount: 1500, paid: 1500, status: "Paid" },
  { type: "Activity Fee", amount: 1000, paid: 0, status: "Pending" },
];

export default function StudentFees() {
  const total = fees.reduce((sum, f) => sum + f.amount, 0);
  const paid = fees.reduce((sum, f) => sum + f.paid, 0);
  return (
    <><style>{`.my-page{min-height:100vh;margin-left:16rem;background:#f1f5f9;font-family:'DM Sans',sans-serif}.my-top{height:4rem;background:#fff;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;padding:0 2rem;font-family:'Syne',sans-serif;font-weight:800;color:#0f172a}.my-content{padding:1.75rem 2rem}.summary{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1rem}.box,.list{background:#fff;border:1px solid #e8ecf0;border-radius:1.1rem;padding:1.2rem;box-shadow:0 4px 18px rgba(15,23,42,.06)}.box p{margin:0;color:#64748b;font-size:.78rem;font-weight:800;text-transform:uppercase}.box h2{margin:.3rem 0 0;color:#0f172a}.row{display:flex;justify-content:space-between;padding:1rem 0;border-bottom:1px solid #f1f5f9}.row:last-child{border-bottom:0}.muted{color:#64748b}.pill{font-size:.72rem;font-weight:800;border-radius:999px;padding:.3rem .7rem;background:#fffbeb;color:#b45309}@media(max-width:900px){.my-page{margin-left:0}.my-top{padding-left:4.5rem}.my-content{padding:1rem}.summary{grid-template-columns:1fr}.row{flex-direction:column;gap:.35rem}}`}</style><Sidebar /><main className="my-page"><header className="my-top">My Fees</header><section className="my-content"><div className="summary"><div className="box"><p>Total Amount</p><h2>Rs. {total.toLocaleString()}</h2></div><div className="box"><p>Paid</p><h2>Rs. {paid.toLocaleString()}</h2></div><div className="box"><p>Balance</p><h2>Rs. {(total-paid).toLocaleString()}</h2></div></div><div className="list">{fees.map(f=><div className="row" key={f.type}><div><strong>{f.type}</strong><div className="muted">Rs. {f.paid.toLocaleString()} paid of Rs. {f.amount.toLocaleString()}</div></div><span className="pill">{f.status}</span></div>)}</div></section></main></>
  );
}
