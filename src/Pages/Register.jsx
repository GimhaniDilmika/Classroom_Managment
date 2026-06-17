import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo.png";
import bg from "../assets/p4.jpg";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name:"", email:"", role:"student", password:"", confirmPassword:"" });
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [showPassword, setShowPassword]   = useState(false);
  const [showConfirm, setShowConfirm]     = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) { setError("Please fill in all fields."); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    if (form.password.length < 6) { setError("Password must contain at least 6 characters."); return; }
    try {
      setError(""); setLoading(true);
      await register(form.name, form.email, form.password, form.role);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.code === "auth/email-already-in-use" ? "This email is already registered." :
        err.code === "auth/weak-password"         ? "Please choose a stronger password." :
        "Error: " + err.message
      );
    } finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .reg-page { min-height:100vh; display:flex; align-items:center; justify-content:center; font-family:'DM Sans',sans-serif; background-size:cover; background-position:center; position:relative; }
        .reg-page::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(15,12,41,0.87) 0%,rgba(48,43,99,0.82) 60%,rgba(36,36,62,0.87) 100%); }
        .reg-card { position:relative; z-index:1; width:440px; background:rgba(15,23,42,0.93); padding:2.25rem; border-radius:1.5rem; box-shadow:0 25px 60px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.06); backdrop-filter:blur(20px); color:white; border:1px solid rgba(255,255,255,0.08); }
        .reg-header { text-align:center; margin-bottom:1.5rem; }
        .reg-logo-wrap { width:60px; height:60px; background:linear-gradient(135deg,#f59e0b,#ef4444); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 0.875rem; padding:5px; }
        .reg-logo { width:100%; height:100%; object-fit:contain; border-radius:50%; }
        .reg-header h1 { font-family:'Syne',sans-serif; font-size:1.4rem; font-weight:800; background:linear-gradient(90deg,#f59e0b,#ef4444); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .reg-header p { color:rgba(255,255,255,0.4); font-size:0.78rem; margin-top:4px; }
        .reg-error { background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.4); color:#fca5a5; padding:9px 13px; border-radius:10px; font-size:13px; margin-bottom:1rem; }
        .rfield { margin-bottom:0.875rem; }
        .rfield label { display:block; margin-bottom:5px; font-size:11px; font-weight:600; color:rgba(255,255,255,0.45); text-transform:uppercase; letter-spacing:0.06em; }
        .rinput { display:flex; align-items:center; background:rgba(255,255,255,0.05); border:1.5px solid rgba(255,255,255,0.1); padding:9px 13px; border-radius:10px; transition:all 0.2s; gap:8px; }
        .rinput:focus-within { border-color:#f59e0b; background:rgba(245,158,11,0.06); box-shadow:0 0 0 3px rgba(245,158,11,0.12); }
        .rinput input, .rinput select { flex:1; background:none; border:none; color:white; outline:none; font-size:13.5px; font-family:'DM Sans',sans-serif; }
        .rinput select option { color:#0f172a; background:#fff; }
        .rinput input::placeholder { color:rgba(255,255,255,0.22); }
        .eye2 { cursor:pointer; font-size:13px; color:rgba(255,255,255,0.3); }
        .eye2:hover { color:#f59e0b; }
        .reg-btn { width:100%; background:linear-gradient(90deg,#f59e0b,#ef4444); border:none; padding:12px 0; border-radius:10px; color:white; font-size:14px; font-weight:700; cursor:pointer; margin-top:6px; font-family:'Syne',sans-serif; box-shadow:0 6px 20px rgba(245,158,11,0.35); transition:all 0.2s; display:flex; align-items:center; justify-content:center; gap:8px; }
        .reg-btn:hover { transform:translateY(-2px); }
        .reg-btn:disabled { opacity:0.7; cursor:not-allowed; transform:none; }
        .reg-spinner { width:15px; height:15px; border:2px solid rgba(255,255,255,0.4); border-top-color:white; border-radius:50%; animation:spin 0.6s linear infinite; }
        @keyframes spin { to { transform:rotate(360deg); } }
        .reg-signin { margin-top:0.875rem; font-size:12.5px; text-align:center; color:rgba(255,255,255,0.38); }
        .reg-signin span { color:#f59e0b; cursor:pointer; font-weight:600; }
        .reg-note { margin-top:0.875rem; padding:9px 13px; background:rgba(99,102,241,0.1); border:1px solid rgba(99,102,241,0.2); border-radius:9px; font-size:11px; color:rgba(255,255,255,0.38); text-align:center; line-height:1.6; }
      `}</style>

      <div className="reg-page" style={{ backgroundImage:`url(${bg})` }}>
        <div className="reg-card">
          <div className="reg-header">
            <div className="reg-logo-wrap"><img src={logo} alt="logo" className="reg-logo" /></div>
            <h1>Create Account</h1>
            <p>Smart Classroom Intelligence System</p>
          </div>

          {error && <div className="reg-error">⚠️ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="rfield">
              <label>Full Name</label>
              <div className="rinput"><span>👤</span><input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} /></div>
            </div>
            <div className="rfield">
              <label>Email Address</label>
              <div className="rinput"><span>✉️</span><input type="email" name="email" placeholder="you@school.lk" value={form.email} onChange={handleChange} /></div>
            </div>
            <div className="rfield">
              <label>Account Role</label>
              <div className="rinput">
                <span>🎓</span>
                <select name="role" value={form.role} onChange={handleChange}>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="rfield">
              <label>Password</label>
              <div className="rinput">
                <span>🔒</span>
                <input type={showPassword ? "text" : "password"} name="password" placeholder="At least 6 characters" value={form.password} onChange={handleChange} />
                <span className="eye2" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "🙈" : "👁️"}</span>
              </div>
            </div>
            <div className="rfield">
              <label>Confirm Password</label>
              <div className="rinput">
                <span>🔒</span>
                <input type={showConfirm ? "text" : "password"} name="confirmPassword" placeholder="Repeat password" value={form.confirmPassword} onChange={handleChange} />
                <span className="eye2" onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? "🙈" : "👁️"}</span>
              </div>
            </div>
            <button type="submit" className="reg-btn" disabled={loading}>
              {loading ? <><div className="reg-spinner" /> Creating account...</> : "Create Account →"}
            </button>
          </form>

          <p className="reg-signin">Already have an account? <span onClick={() => navigate("/")}>Sign In</span></p>
          <div className="reg-note">📌 Demo registration supports Admin, Teacher, and Student roles. In production, only an administrator should create privileged accounts.</div>
        </div>
      </div>
    </>
  );
}

export default Register;
