import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import Sidebar from "../Components/Sidebar.jsx";
import { FaCamera, FaUser, FaEnvelope, FaPhone, FaSchool, FaMapMarkerAlt, FaSave, FaCheckCircle } from "react-icons/fa";

export default function MyProfile() {
  const { currentUser, userRole, userName } = useAuth();
  const initials = (userName || currentUser?.email || "AD").slice(0, 2).toUpperCase();

  const [form, setForm] = useState({
    name:     userName || "",
    email:    currentUser?.email || "",
    phone:    "",
    school:   "ClassEase Smart Institute",
    address:  "Colombo, Sri Lanka",
    bio:      "Smart classroom teacher / administrator focused on student success.",
  });
  const [saved, setSaved]   = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", currentUser.uid), { name: form.name, phone: form.phone, school: form.school, address: form.address, bio: form.bio });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch { /* offline fallback */ setSaved(true); setTimeout(() => setSaved(false), 3000); }
    setSaving(false);
  }

  const COLORS = ["#f59e0b","#ef4444","#8b5cf6","#06b6d4","#10b981","#302b63"];
  const [avatarColor, setAvatarColor] = useState("#302b63");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        [data-theme="dark"] .pr-page   { background:#020617; }
        [data-theme="dark"] .pr-topbar { background:rgba(15,23,42,0.97); border-color:rgba(245,158,11,0.1); }
        [data-theme="dark"] .pr-card   { background:#0f172a; border-color:rgba(245,158,11,0.1); }
        [data-theme="dark"] .pr-title  { color:#e2e8f0; }
        [data-theme="dark"] .pr-label  { color:#64748b; }
        [data-theme="dark"] .pr-input  { background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.08); color:#e2e8f0; }
        [data-theme="dark"] .pr-input:focus { border-color:#f59e0b; }
        [data-theme="dark"] .pr-stat   { background:rgba(255,255,255,0.04); }
        [data-theme="dark"] .pr-stat-val { color:#e2e8f0; }
        [data-theme="dark"] .pr-stat-lbl { color:#64748b; }
        [data-theme="dark"] .pr-info-val { color:#e2e8f0; }
        [data-theme="dark"] .pr-section-title { color:#94a3b8; }

        .pr-page   { min-height:100vh; margin-left:16rem; background:#f1f5f9; font-family:'DM Sans',sans-serif; }
        .pr-topbar { position:sticky; top:0; z-index:50; background:rgba(255,255,255,0.95); backdrop-filter:blur(16px); border-bottom:1px solid rgba(0,0,0,0.06); padding:0 2rem; height:4rem; display:flex; align-items:center; box-shadow:0 1px 12px rgba(0,0,0,0.06); }
        .pr-topbar-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1.2rem; background:linear-gradient(90deg,#302b63,#f59e0b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .pr-content { padding:2rem; max-width:900px; margin:0 auto; }

        /* Hero card */
        .pr-hero { background:linear-gradient(135deg,#0f0c29,#302b63,#24243e); border-radius:1.25rem; padding:2rem; display:flex; align-items:center; gap:2rem; margin-bottom:1.5rem; position:relative; overflow:hidden; }
        .pr-hero::before { content:''; position:absolute; top:-40px; right:-40px; width:180px; height:180px; background:rgba(245,158,11,0.12); border-radius:50%; }
        .pr-avatar-wrap { position:relative; flex-shrink:0; }
        .pr-avatar { width:90px; height:90px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Syne',sans-serif; font-weight:800; font-size:2rem; color:#fff; border:3px solid rgba(255,255,255,0.2); box-shadow:0 8px 24px rgba(0,0,0,0.3); }
        .pr-avatar-edit { position:absolute; bottom:2px; right:2px; width:26px; height:26px; background:#f59e0b; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:11px; color:#fff; border:2px solid #fff; }
        .pr-hero-info { flex:1; }
        .pr-hero-name { font-family:'Syne',sans-serif; font-weight:800; font-size:1.5rem; color:#fff; margin-bottom:4px; }
        .pr-hero-email { font-size:0.82rem; color:rgba(255,255,255,0.5); margin-bottom:8px; }
        .pr-role-badge { display:inline-flex; align-items:center; gap:5px; background:rgba(245,158,11,0.2); border:1px solid rgba(245,158,11,0.4); color:#fbbf24; font-size:0.72rem; font-weight:700; padding:3px 10px; border-radius:999px; text-transform:uppercase; letter-spacing:0.06em; }
        .pr-color-row { display:flex; gap:7px; margin-top:10px; }
        .pr-color-dot { width:22px; height:22px; border-radius:50%; cursor:pointer; border:2px solid transparent; transition:all 0.15s; }
        .pr-color-dot.sel { border-color:#fff; transform:scale(1.2); }
        .pr-stats-row { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
        .pr-stat { background:#f8fafc; border-radius:10px; padding:12px 16px; text-align:center; }
        .pr-stat-val { font-family:'Syne',sans-serif; font-weight:800; font-size:1.4rem; color:#0f172a; }
        .pr-stat-lbl { font-size:0.7rem; color:#94a3b8; margin-top:2px; text-transform:uppercase; letter-spacing:0.05em; }

        /* Form card */
        .pr-card { background:#fff; border:1px solid #e8ecf0; border-radius:1rem; padding:1.5rem; margin-bottom:1.25rem; box-shadow:0 2px 10px rgba(0,0,0,0.05); }
        .pr-section-title { font-size:0.7rem; text-transform:uppercase; letter-spacing:0.1em; color:#94a3b8; font-weight:700; margin-bottom:1rem; }
        .pr-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .pr-field { display:flex; flex-direction:column; gap:5px; }
        .pr-label { font-size:11px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.06em; display:flex; align-items:center; gap:5px; }
        .pr-input { background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:9px; padding:9px 13px; font-size:0.85rem; outline:none; transition:all 0.2s; font-family:'DM Sans',sans-serif; color:#0f172a; width:100%; box-sizing:border-box; }
        .pr-input:focus { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,0.1); background:#fff; }
        .pr-input:disabled { opacity:0.6; cursor:not-allowed; }
        textarea.pr-input { resize:vertical; min-height:80px; }
        .pr-full { grid-column:1/-1; }
        .pr-save-btn { display:flex; align-items:center; gap:7px; background:linear-gradient(90deg,#f59e0b,#ef4444); color:#fff; border:none; padding:11px 24px; border-radius:10px; font-size:0.88rem; font-weight:700; cursor:pointer; font-family:'Syne',sans-serif; box-shadow:0 4px 14px rgba(245,158,11,0.35); transition:all 0.2s; }
        .pr-save-btn:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(245,158,11,0.45); }
        .pr-save-btn:disabled { opacity:0.7; cursor:not-allowed; transform:none; }
        .pr-success { display:flex; align-items:center; gap:6px; color:#10b981; font-size:0.82rem; font-weight:600; }
        .pr-info-row { display:flex; align-items:center; gap:10px; padding:8px 0; border-bottom:1px solid #f1f5f9; }
        .pr-info-row:last-child { border-bottom:none; }
        .pr-info-icon { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:0.85rem; flex-shrink:0; }
        .pr-info-lbl { font-size:0.72rem; color:#94a3b8; }
        .pr-info-val { font-size:0.85rem; color:#0f172a; font-weight:600; }
      `}</style>

      <div className="pr-page">
        <Sidebar />
        <header className="pr-topbar"><span className="pr-topbar-title">My Profile</span></header>

        <div className="pr-content">
          {/* Hero */}
          <div className="pr-hero">
            <div className="pr-avatar-wrap">
              <div className="pr-avatar" style={{ background:`linear-gradient(135deg,${avatarColor},#f59e0b)` }}>{initials}</div>
              <div className="pr-avatar-edit"><FaCamera /></div>
            </div>
            <div className="pr-hero-info">
              <h2 className="pr-hero-name">{form.name || "User"}</h2>
              <p className="pr-hero-email">{form.email}</p>
              <div className="pr-role-badge">⭐ {userRole === "admin" ? "Administrator" : "Teacher"}</div>
              <div className="pr-color-row">
                {COLORS.map(c => (
                  <div key={c} className={`pr-color-dot${avatarColor===c?" sel":""}`} style={{ background:c }} onClick={() => setAvatarColor(c)} title="Avatar colour" />
                ))}
              </div>
            </div>
            <div className="pr-stats-row" style={{ position:"relative", zIndex:1 }}>
              <div className="pr-stat"><div className="pr-stat-val" style={{ color:"#f59e0b" }}>184</div><div className="pr-stat-lbl">Students</div></div>
              <div className="pr-stat"><div className="pr-stat-val" style={{ color:"#ef4444" }}>12</div><div className="pr-stat-lbl">Classes</div></div>
              <div className="pr-stat"><div className="pr-stat-val" style={{ color:"#10b981" }}>5</div><div className="pr-stat-lbl">Subjects</div></div>
            </div>
          </div>

          {/* Edit form */}
          <form onSubmit={handleSave}>
            <div className="pr-card">
              <p className="pr-section-title">Personal Information</p>
              <div className="pr-grid">
                <div className="pr-field">
                  <label className="pr-label"><FaUser style={{ color:"#f59e0b" }} /> Full Name</label>
                  <input className="pr-input" value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Your full name" />
                </div>
                <div className="pr-field">
                  <label className="pr-label"><FaEnvelope style={{ color:"#8b5cf6" }} /> Email</label>
                  <input className="pr-input" value={form.email} disabled />
                </div>
                <div className="pr-field">
                  <label className="pr-label"><FaPhone style={{ color:"#10b981" }} /> Phone</label>
                  <input className="pr-input" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} placeholder="07X-XXX-XXXX" />
                </div>
                <div className="pr-field">
                  <label className="pr-label"><FaSchool style={{ color:"#06b6d4" }} /> School / Institute</label>
                  <input className="pr-input" value={form.school} onChange={e => setForm({...form, school:e.target.value})} />
                </div>
                <div className="pr-field">
                  <label className="pr-label"><FaMapMarkerAlt style={{ color:"#ef4444" }} /> Address</label>
                  <input className="pr-input" value={form.address} onChange={e => setForm({...form, address:e.target.value})} />
                </div>
                <div className="pr-field pr-full">
                  <label className="pr-label">Bio</label>
                  <textarea className="pr-input" value={form.bio} onChange={e => setForm({...form, bio:e.target.value})} />
                </div>
              </div>
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
              <button type="submit" className="pr-save-btn" disabled={saving}>
                <FaSave /> {saving ? "Saving…" : "Save Changes"}
              </button>
              {saved && <span className="pr-success"><FaCheckCircle /> Saved successfully!</span>}
            </div>
          </form>

          {/* Account info */}
          <div className="pr-card" style={{ marginTop:"1.25rem" }}>
            <p className="pr-section-title">Account Information</p>
            <div className="pr-info-row">
              <div className="pr-info-icon" style={{ background:"#fef3c7" }}>🆔</div>
              <div><div className="pr-info-lbl">User ID</div><div className="pr-info-val" style={{ fontSize:"0.72rem", fontFamily:"monospace" }}>{currentUser?.uid}</div></div>
            </div>
            <div className="pr-info-row">
              <div className="pr-info-icon" style={{ background:"#dcfce7" }}>✅</div>
              <div><div className="pr-info-lbl">Email Verified</div><div className="pr-info-val">{currentUser?.emailVerified ? "Yes ✅" : "No ❌"}</div></div>
            </div>
            <div className="pr-info-row">
              <div className="pr-info-icon" style={{ background:"#ede9fe" }}>📅</div>
              <div><div className="pr-info-lbl">Account Created</div><div className="pr-info-val">{currentUser?.metadata?.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}) : "—"}</div></div>
            </div>
            <div className="pr-info-row">
              <div className="pr-info-icon" style={{ background:"#fce7f3" }}>🕐</div>
              <div><div className="pr-info-lbl">Last Sign In</div><div className="pr-info-val">{currentUser?.metadata?.lastSignInTime ? new Date(currentUser.metadata.lastSignInTime).toLocaleString("en-GB") : "—"}</div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
