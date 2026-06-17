import { useNavigate } from "react-router-dom";
import { FaLock, FaHome } from "react-icons/fa";

export default function AccessDenied() {
  const navigate = useNavigate();
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f1f5f9", fontFamily: "DM Sans, sans-serif", padding: "1.5rem" }}>
      <section style={{ maxWidth: 520, width: "100%", background: "#fff", borderRadius: 24, padding: "2rem", textAlign: "center", boxShadow: "0 20px 50px rgba(15,23,42,0.12)", border: "1px solid #e2e8f0" }}>
        <div style={{ width: 70, height: 70, margin: "0 auto 1rem", borderRadius: "50%", display: "grid", placeItems: "center", color: "#fff", background: "linear-gradient(135deg,#f59e0b,#ef4444)", fontSize: "1.5rem" }}><FaLock /></div>
        <h1 style={{ margin: 0, fontSize: "1.7rem", color: "#0f172a" }}>Access Denied</h1>
        <p style={{ color: "#64748b", lineHeight: 1.7 }}>You do not have permission to open this page. Please return to your dashboard and use the menu items available for your role.</p>
        <button onClick={() => navigate("/dashboard")} style={{ border: 0, borderRadius: 12, padding: "0.8rem 1.2rem", color: "#fff", fontWeight: 800, cursor: "pointer", background: "linear-gradient(90deg,#f59e0b,#ef4444)", display: "inline-flex", alignItems: "center", gap: 8 }}><FaHome /> Go to Dashboard</button>
      </section>
    </main>
  );
}
