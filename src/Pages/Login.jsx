import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 
import logo from "../assets/logo.png";   // ✔ FIXED logo import
import bg from "../assets/p4.jpg";       // ✔ background import

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div 
      className="login-page"
      style={{
        backgroundImage: `url(${bg})`,   // ✔ background added
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="login-card">
        
        {/* Header */}
        <div className="login-header">
          <img src={logo} alt="logo" className="login-logo" />  {/* ✔ logo added */}
          
          <h1>Sign In</h1>
          <p>Online Class Management System</p>
        </div>

        {/* Error */}
        {error && <div className="login-error">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label>Email</label>
            <div className="input-wrapper">
              
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="field-group">
            <label>Password</label>
            <div className="input-wrapper">
              
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="input-icon eye">👁️</span>
            </div>
          </div>

          <div className="options-row">
            <label className="remember">
              <input type="checkbox" />
              Remember Me
            </label>

            <button type="button" className="link-button">
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="login-btn">
            Login →
          </button>
        </form>

        <p className="terms">
          Please do not share your login details with others. 
          <span> Terms of Use</span> and <span> Privacy Policy</span>.
        </p>

       <p className="signup">
  Don’t have an account yet?{" "}
  <span onClick={() => navigate("/register")}>
    Sign Up
  </span>
</p>

      </div>
    </div>
  );
}

export default Login;
