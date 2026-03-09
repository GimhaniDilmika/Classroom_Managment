import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import bg from "../assets/p4.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .login-page::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(15,12,41,0.85) 0%, rgba(48,43,99,0.8) 50%, rgba(36,36,62,0.85) 100%);
        }

        .login-card {
          position: relative;
          z-index: 1;
          width: 420px;
          background: rgba(15,23,42,0.92);
          padding: 2.5rem;
          border-radius: 1.5rem;
          box-shadow: 0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          color: white;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .login-header { text-align: center; margin-bottom: 1.75rem; }
        .login-logo-wrap {
          width: 72px; height: 72px;
          background: linear-gradient(135deg, #f59e0b, #ef4444);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
          box-shadow: 0 8px 24px rgba(245,158,11,0.35);
          padding: 6px;
        }
        .login-logo { width: 100%; height: 100%; object-fit: contain; border-radius: 50%; }
        .login-header h1 {
          font-family: 'Syne', sans-serif;
          font-size: 1.6rem; font-weight: 800;
          background: linear-gradient(90deg, #f59e0b, #ef4444);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin-bottom: 4px;
        }
        .login-header p { color: rgba(255,255,255,0.45); font-size: 0.82rem; }

        .login-error {
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.4);
          color: #fca5a5;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 13px;
          margin-bottom: 1.25rem;
          display: flex; align-items: center; gap: 6px;
        }

        .field-group { margin-bottom: 1rem; }
        .field-group label { display: block; margin-bottom: 6px; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.06em; }
        .input-wrapper {
          display: flex; align-items: center;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.1);
          padding: 10px 14px;
          border-radius: 10px;
          transition: all 0.2s;
          gap: 8px;
        }
        .input-wrapper:focus-within {
          border-color: #f59e0b;
          background: rgba(245,158,11,0.06);
          box-shadow: 0 0 0 3px rgba(245,158,11,0.12);
        }
        .input-wrapper input {
          flex: 1; background: none; border: none;
          color: white; outline: none; font-size: 14px;
          font-family: 'DM Sans', sans-serif;
        }
        .input-wrapper input::placeholder { color: rgba(255,255,255,0.25); }
        .input-icon { font-size: 14px; color: rgba(255,255,255,0.3); flex-shrink: 0; }
        .eye { cursor: pointer; font-size: 14px; color: rgba(255,255,255,0.3); transition: color 0.2s; }
        .eye:hover { color: #f59e0b; }

        .options-row { display: flex; justify-content: space-between; align-items: center; margin: 0.875rem 0; }
        .remember { display: flex; align-items: center; gap: 6px; font-size: 13px; color: rgba(255,255,255,0.5); cursor: pointer; }
        .remember input { accent-color: #f59e0b; cursor: pointer; }
        .link-button { background: none; border: none; color: #f59e0b; cursor: pointer; font-size: 13px; font-family: 'DM Sans', sans-serif; transition: opacity 0.2s; }
        .link-button:hover { opacity: 0.8; }

        .login-btn {
          width: 100%;
          background: linear-gradient(90deg, #f59e0b, #ef4444);
          border: none; padding: 13px 0;
          border-radius: 10px; color: white;
          font-size: 15px; font-weight: 700;
          cursor: pointer; margin-top: 6px;
          font-family: 'Syne', sans-serif;
          letter-spacing: 0.04em;
          box-shadow: 0 6px 20px rgba(245,158,11,0.35);
          transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .login-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(245,158,11,0.45); }
        .login-btn:active { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        .login-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .divider { display: flex; align-items: center; gap: 10px; margin: 1.25rem 0; }
        .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
        .divider-text { font-size: 11px; color: rgba(255,255,255,0.25); white-space: nowrap; }

        .terms { margin-top: 1.25rem; font-size: 11px; color: rgba(255,255,255,0.3); text-align: center; line-height: 1.5; }
        .terms span { color: #f59e0b; cursor: pointer; }
        .signup { margin-top: 1rem; font-size: 13px; text-align: center; color: rgba(255,255,255,0.4); }
        .signup span { color: #f59e0b; cursor: pointer; font-weight: 600; transition: opacity 0.2s; }
        .signup span:hover { opacity: 0.8; }
      `}</style>

      <div className="login-page" style={{ backgroundImage: `url(${bg})` }}>
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo-wrap">
              <img src={logo} alt="logo" className="login-logo" />
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to your ClassEase account</p>
          </div>

          {error && <div className="login-error">⚠️ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input type="email" placeholder="you@school.lk" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="field-group">
              <label>Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                <span className="eye" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "🙈" : "👁️"}</span>
              </div>
            </div>

            <div className="options-row">
              <label className="remember">
                <input type="checkbox" /> Remember Me
              </label>
              <button type="button" className="link-button">Forgot Password?</button>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? <><div className="login-spinner" /> Signing in...</> : "Sign In →"}
            </button>
          </form>

          <p className="terms">
            By signing in you agree to our <span>Terms of Use</span> and <span>Privacy Policy</span>.
          </p>

          <p className="signup">
            Don't have an account? <span onClick={() => navigate("/register")}>Sign Up</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
