import React, { useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaShieldAlt } from "react-icons/fa";

export default function ChangePassword() {
  const { currentUser } = useAuth();
  const [form, setForm]       = useState({ current:"", newPass:"", confirm:"" });
  const [show, setShow]       = useState({ current:false, newPass:false, confirm:false });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);

  function strength(p) {
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8)             s++;
    if (/[A-Z]/.test(p))          s++;
    if (/[0-9]/.test(p))          s++;
    if (/[^A-Za-z0-9]/.test(p))   s++;
    return s;
  }

  const str = strength(form.newPass);
  const strLabel = ["", "Weak", "Fair", "Good", "Strong"][str];
  const strColor = ["", "#ef4444", "#f59e0b", "#06b6d4", "#10b981"][str];

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess(false);
    if (!form.current) { setError("Please enter your current password."); return; }
    if (form.newPass.length < 6) { setError("New password must contain at least 6 characters."); return; }
    if (form.newPass !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.newPass === form.current) { setError("New password cannot be the same as the current password."); return; }

    setLoading(true);
    try {
      const cred = EmailAuthProvider.credential(currentUser.email, form.current);
      await reauthenticateWithCredential(currentUser, cred);
      await updatePassword(currentUser, form.newPass);
      setSuccess(true);
      setForm({ current:"", newPass:"", confirm:"" });
    } catch (err) {
      setError(
        err.code === "auth/wrong-password"       ? "Current password is incorrect." :
        err.code === "auth/too-many-requests"    ? "Too many attempts. Please try again later." :
        err.code === "auth/requires-recent-login"? "Please sign in again and try this action." :
        "Error: " + err.message
      );
    }
    setLoading(false);
  }

  const EyeBtn = ({ field }) => (
    <button type="button" onClick={() => setShow({...show, [field]:!show[field]})}
      style={{ background:"none", border:"none", cursor:"pointer", color:"#94a3b8", fontSize:"0.9rem", padding:"0", transition:"color 0.2s" }}>
      {show[field] ? <FaEyeSlash /> : <FaEye />}
    </button>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        [data-theme="dark"] .cp-page  { background:#020617; }
        [data-theme="dark"] .cp-topbar{ background:rgba(15,23,42,0.97); border-color:rgba(245,158,11,0.1); }
        [data-theme="dark"] .cp-card  { background:#0f172a; border-color:rgba(245,158,11,0.1); }
        [data-theme="dark"] .cp-title { color:#e2e8f0; }
        [data-theme="dark"] .cp-label { color:#64748b; }
        [data-theme="dark"] .cp-input-wrap { background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.08); }
        [data-theme="dark"] .cp-input { color:#e2e8f0; }
        [data-theme="dark"] .cp-tip   { color:#64748b; }
        [data-theme="dark"] .cp-rule  { color:#64748b; }

        .cp-page   { min-height:100vh; margin-left:16rem; background:#f1f5f9; font-family:'DM Sans',sans-serif; }
        .cp-topbar { position:sticky; top:0; z-index:50; background:rgba(255,255,255,0.95); backdrop-filter:blur(16px); border-bottom:1px solid rgba(0,0,0,0.06); padding:0 2rem; height:4rem; display:flex; align-items:center; box-shadow:0 1px 12px rgba(0,0,0,0.06); }
        .cp-topbar-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1.2rem; background:linear-gradient(90deg,#302b63,#f59e0b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .cp-content { padding:2rem; max-width:520px; margin:0 auto; }
        .cp-page-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1.5rem; color:#0f172a; margin-bottom:0.25rem; }
        .cp-page-sub   { color:#94a3b8; font-size:0.82rem; margin-bottom:1.5rem; }
        .cp-card  { background:#fff; border:1px solid #e8ecf0; border-radius:1rem; padding:1.75rem; box-shadow:0 2px 10px rgba(0,0,0,0.05); }
        .cp-card-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1rem; color:#0f172a; margin-bottom:1.5rem; display:flex; align-items:center; gap:8px; }
        .cp-field { margin-bottom:1.1rem; }
        .cp-label { display:block; font-size:11px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:6px; }
        .cp-input-wrap { display:flex; align-items:center; gap:8px; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:10px; padding:10px 14px; transition:all 0.2s; }
        .cp-input-wrap:focus-within { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,0.1); background:#fff; }
        .cp-input { flex:1; background:none; border:none; outline:none; font-size:0.88rem; font-family:'DM Sans',sans-serif; color:#0f172a; }
        .cp-input::placeholder { color:#cbd5e1; }

        /* Strength bar */
        .str-bar-wrap { height:4px; background:#f1f5f9; border-radius:999px; margin-top:8px; overflow:hidden; }
        .str-bar { height:100%; border-radius:999px; transition:all 0.3s; }
        .str-label { font-size:0.7rem; font-weight:700; margin-top:4px; }

        /* Alerts */
        .cp-error   { background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.25); color:#dc2626; padding:10px 14px; border-radius:10px; font-size:0.82rem; margin-bottom:1rem; display:flex; align-items:center; gap:6px; }
        .cp-success { background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); color:#059669; padding:10px 14px; border-radius:10px; font-size:0.82rem; margin-bottom:1rem; display:flex; align-items:center; gap:6px; }
        .cp-btn { width:100%; background:linear-gradient(90deg,#f59e0b,#ef4444); color:#fff; border:none; padding:13px 0; border-radius:10px; font-size:0.9rem; font-weight:700; cursor:pointer; font-family:'Syne',sans-serif; box-shadow:0 4px 14px rgba(245,158,11,0.35); transition:all 0.2s; display:flex; align-items:center; justify-content:center; gap:8px; margin-top:0.5rem; }
        .cp-btn:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(245,158,11,0.45); }
        .cp-btn:disabled { opacity:0.7; cursor:not-allowed; transform:none; }
        .cp-spinner { width:15px; height:15px; border:2px solid rgba(255,255,255,0.4); border-top-color:white; border-radius:50%; animation:spin 0.6s linear infinite; }
        @keyframes spin { to { transform:rotate(360deg); } }

        /* Rules card */
        .cp-rules { background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:1rem 1.25rem; margin-bottom:1.25rem; }
        .cp-rules-title { font-size:0.78rem; font-weight:700; color:#64748b; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.06em; }
        .cp-rule { display:flex; align-items:center; gap:7px; font-size:0.78rem; color:#94a3b8; margin-bottom:5px; }
        .cp-rule.ok { color:#10b981; }
        .cp-rule-dot { width:6px; height:6px; border-radius:50%; background:currentColor; flex-shrink:0; }
      `}</style>

      <div className="cp-page">
        <Sidebar />
        <header className="cp-topbar"><span className="cp-topbar-title">Change Password</span></header>
        <div className="cp-content">
          <h1 className="cp-page-title">Change Password</h1>
          <p className="cp-page-sub">Use a strong password to protect your account.</p>

          {/* Rules */}
          <div className="cp-rules">
            <p className="cp-rules-title"><FaShieldAlt style={{ marginRight:4 }} /> Password Rules</p>
            {[
              { text:"At least 8 characters", ok: form.newPass.length >= 8 },
              { text:"At least 1 uppercase letter (A-Z)", ok: /[A-Z]/.test(form.newPass) },
              { text:"At least 1 number (0-9)", ok: /[0-9]/.test(form.newPass) },
              { text:"At least 1 special character (!@#$)", ok: /[^A-Za-z0-9]/.test(form.newPass) },
            ].map((r, i) => (
              <div key={i} className={`cp-rule${r.ok?" ok":""}`}>
                <span className="cp-rule-dot" />{r.ok ? "✅" : "○"} {r.text}
              </div>
            ))}
          </div>

          <div className="cp-card">
            <p className="cp-card-title"><FaLock style={{ color:"#f59e0b" }} /> Update Password</p>

            {error   && <div className="cp-error">⚠️ {error}</div>}
            {success && <div className="cp-success"><FaCheckCircle /> Password successfully updated! ✅</div>}

            <form onSubmit={handleSubmit}>
              {[
                { key:"current", label:"Current Password",  placeholder:"Current password" },
                { key:"newPass", label:"New Password",      placeholder:"New password" },
                { key:"confirm", label:"Confirm Password",  placeholder:"Repeat new password" },
              ].map(f => (
                <div className="cp-field" key={f.key}>
                  <label className="cp-label">{f.label}</label>
                  <div className="cp-input-wrap">
                    <FaLock style={{ color:"#cbd5e1", fontSize:"0.8rem", flexShrink:0 }} />
                    <input className="cp-input" type={show[f.key] ? "text" : "password"} placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({...form, [f.key]:e.target.value})} />
                    <EyeBtn field={f.key} />
                  </div>
                  {f.key === "newPass" && form.newPass && (
                    <>
                      <div className="str-bar-wrap"><div className="str-bar" style={{ width:`${str * 25}%`, background:strColor }} /></div>
                      <p className="str-label" style={{ color:strColor }}>{strLabel}</p>
                    </>
                  )}
                </div>
              ))}

              <button type="submit" className="cp-btn" disabled={loading}>
                {loading ? <><div className="cp-spinner" /> Updating...</> : <><FaLock /> Update Password</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
