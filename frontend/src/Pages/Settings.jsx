import React, { useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import { useAuth } from "../contexts/AuthContext";
import { FaBell, FaMoon, FaShieldAlt, FaGlobe, FaToggleOn, FaToggleOff, FaCheckCircle, FaSave } from "react-icons/fa";

export default function Settings() {
  const { userRole } = useAuth();
  const [saved, setSaved] = useState(false);

  const [notif, setNotif] = useState({ email:true, attendance:true, assignments:false, messages:true });
  const [display, setDisplay] = useState({
    darkMode: document.documentElement.getAttribute("data-theme") === "dark",
    language: "English",
    timezone: "Asia/Colombo",
    dateFormat: "DD/MM/YYYY",
  });
  const [privacy, setPrivacy] = useState({ profileVisible:true, showEmail:false, twoFactor:false });

  function toggle(group, key) {
    const map = { notif:[notif,setNotif], display:[display,setDisplay], privacy:[privacy,setPrivacy] };
    const [state, setter] = map[group];
    setter({ ...state, [key]: !state[key] });
    if (group === "display" && key === "darkMode") {
      document.documentElement.setAttribute("data-theme", !state[key] ? "dark" : "light");
      localStorage.setItem("theme", !state[key] ? "dark" : "light");
    }
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const Toggle = ({ on, onClick }) => (
    <button onClick={onClick} style={{ background:"none", border:"none", cursor:"pointer", fontSize:"1.6rem", color: on ? "#f59e0b" : "#cbd5e1", transition:"all 0.2s" }}>
      {on ? <FaToggleOn /> : <FaToggleOff />}
    </button>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        [data-theme="dark"] .st-page  { background:#020617; }
        [data-theme="dark"] .st-topbar{ background:rgba(15,23,42,0.97); border-color:rgba(245,158,11,0.1); }
        [data-theme="dark"] .st-card  { background:#0f172a; border-color:rgba(245,158,11,0.1); }
        [data-theme="dark"] .st-title { color:#e2e8f0; }
        [data-theme="dark"] .st-row   { border-color:rgba(255,255,255,0.05); }
        [data-theme="dark"] .st-row-title { color:#e2e8f0; }
        [data-theme="dark"] .st-row-sub  { color:#64748b; }
        [data-theme="dark"] .st-select   { background:#1e293b; border-color:rgba(255,255,255,0.1); color:#e2e8f0; }
        [data-theme="dark"] .st-section  { color:#475569; }
        [data-theme="dark"] .st-page-title { color:#e2e8f0; }

        .st-page   { min-height:100vh; margin-left:16rem; background:#f1f5f9; font-family:'DM Sans',sans-serif; }
        .st-topbar { position:sticky; top:0; z-index:50; background:rgba(255,255,255,0.95); backdrop-filter:blur(16px); border-bottom:1px solid rgba(0,0,0,0.06); padding:0 2rem; height:4rem; display:flex; align-items:center; box-shadow:0 1px 12px rgba(0,0,0,0.06); }
        .st-topbar-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1.2rem; background:linear-gradient(90deg,#302b63,#f59e0b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .st-content { padding:2rem; max-width:700px; margin:0 auto; }
        .st-page-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1.5rem; color:#0f172a; margin-bottom:0.25rem; }
        .st-page-sub   { color:#94a3b8; font-size:0.82rem; margin-bottom:1.5rem; }
        .st-card  { background:#fff; border:1px solid #e8ecf0; border-radius:1rem; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.05); margin-bottom:1.25rem; }
        .st-section { display:flex; align-items:center; gap:8px; padding:12px 1.25rem; font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#94a3b8; border-bottom:1px solid #f1f5f9; }
        .st-row   { display:flex; align-items:center; justify-content:space-between; padding:14px 1.25rem; border-bottom:1px solid #f1f5f9; gap:12px; }
        .st-row:last-child { border-bottom:none; }
        .st-row-info { flex:1; }
        .st-row-title { font-size:0.875rem; font-weight:600; color:#0f172a; margin-bottom:2px; }
        .st-row-sub   { font-size:0.75rem; color:#94a3b8; }
        .st-select { background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:8px; padding:6px 10px; font-size:0.82rem; outline:none; font-family:'DM Sans',sans-serif; color:#0f172a; cursor:pointer; }
        .st-save-btn { display:flex; align-items:center; gap:7px; background:linear-gradient(90deg,#f59e0b,#ef4444); color:#fff; border:none; padding:11px 24px; border-radius:10px; font-size:0.88rem; font-weight:700; cursor:pointer; font-family:'Syne',sans-serif; box-shadow:0 4px 14px rgba(245,158,11,0.35); transition:all 0.2s; }
        .st-save-btn:hover { transform:translateY(-2px); }
        .st-success { display:flex; align-items:center; gap:6px; color:#10b981; font-size:0.82rem; font-weight:600; }
        .st-danger-zone { background:rgba(239,68,68,0.04); border-color:rgba(239,68,68,0.2); }
        .st-danger-btn { background:#fee2e2; color:#ef4444; border:1px solid rgba(239,68,68,0.3); padding:7px 16px; border-radius:8px; font-size:0.8rem; font-weight:600; cursor:pointer; transition:all 0.2s; }
        .st-danger-btn:hover { background:#fecaca; }
      `}</style>

      <div className="st-page">
        <Sidebar />
        <header className="st-topbar"><span className="st-topbar-title">Settings</span></header>
        <div className="st-content">
          <h1 className="st-page-title">Settings</h1>
          <p className="st-page-sub">Manage your account preferences and workspace settings.</p>

          {/* Notifications */}
          <div className="st-card">
            <div className="st-section"><FaBell style={{ color:"#f59e0b" }} /> Notifications</div>
            {[
              { key:"email",      title:"Email Notifications",   sub:"Receive important alerts by email" },
              { key:"attendance", title:"Attendance Alerts",     sub:"Student absent/late notifications" },
              { key:"assignments",title:"Assignment Reminders",  sub:"Due date reminders" },
              { key:"messages",   title:"Parent Messages",       sub:"Parent portal messages" },
            ].map(item => (
              <div className="st-row" key={item.key}>
                <div className="st-row-info"><p className="st-row-title">{item.title}</p><p className="st-row-sub">{item.sub}</p></div>
                <Toggle on={notif[item.key]} onClick={() => toggle("notif", item.key)} />
              </div>
            ))}
          </div>

          {/* Display */}
          <div className="st-card">
            <div className="st-section"><FaMoon style={{ color:"#8b5cf6" }} /> Display & Language</div>
            <div className="st-row">
              <div className="st-row-info"><p className="st-row-title">Dark Mode</p><p className="st-row-sub">Dark theme enable/disable</p></div>
              <Toggle on={display.darkMode} onClick={() => toggle("display", "darkMode")} />
            </div>
            <div className="st-row">
              <div className="st-row-info"><p className="st-row-title">Language</p><p className="st-row-sub">Interface language</p></div>
              <select className="st-select" value={display.language} onChange={e => setDisplay({...display, language:e.target.value})}>
                <option>English</option><option>Sinhala</option><option>Tamil</option>
              </select>
            </div>
            <div className="st-row">
              <div className="st-row-info"><p className="st-row-title">Timezone</p><p className="st-row-sub">Current: Asia/Colombo (GMT+5:30)</p></div>
              <select className="st-select">
                <option>Asia/Colombo</option><option>UTC</option>
              </select>
            </div>
            <div className="st-row">
              <div className="st-row-info"><p className="st-row-title">Date Format</p><p className="st-row-sub">How dates are displayed</p></div>
              <select className="st-select" value={display.dateFormat} onChange={e => setDisplay({...display, dateFormat:e.target.value})}>
                <option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>

          {/* Privacy */}
          <div className="st-card">
            <div className="st-section"><FaShieldAlt style={{ color:"#10b981" }} /> Privacy & Security</div>
            {[
              { key:"profileVisible", title:"Public Profile",   sub:"Other users can see your profile" },
              { key:"showEmail",      title:"Show Email",       sub:"Display email on profile page" },
              { key:"twoFactor",      title:"Two-Factor Auth",  sub:"Additional verification for safer sign-ins" },
            ].map(item => (
              <div className="st-row" key={item.key}>
                <div className="st-row-info"><p className="st-row-title">{item.title}</p><p className="st-row-sub">{item.sub}</p></div>
                <Toggle on={privacy[item.key]} onClick={() => toggle("privacy", item.key)} />
              </div>
            ))}
          </div>

          {/* Danger zone — admin only */}
          {userRole === "admin" && (
            <div className="st-card st-danger-zone">
              <div className="st-section" style={{ color:"#ef4444" }}>⚠️ Danger Zone</div>
              <div className="st-row">
                <div className="st-row-info"><p className="st-row-title" style={{ color:"#ef4444" }}>Clear All Data</p><p className="st-row-sub">Permanently remove all student and class records</p></div>
                <button className="st-danger-btn" onClick={() => alert("Are you sure? This cannot be undone!")}>Delete All</button>
              </div>
            </div>
          )}

          <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginTop:"0.5rem" }}>
            <button className="st-save-btn" onClick={handleSave}><FaSave /> Save Settings</button>
            {saved && <span className="st-success"><FaCheckCircle /> Settings saved!</span>}
          </div>
        </div>
      </div>
    </>
  );
}
