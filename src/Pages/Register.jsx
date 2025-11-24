import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import logo from "../assets/logo.png";
import bg from "../assets/p4.jpg";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Later: send data to backend here

    setError("");
    navigate("/");
  };

  return (
    <div
      className="register-page"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="register-card">
        <div className="register-header">
          <img src={logo} alt="logo" className="register-logo" />
          <h1>Create Account</h1>
          <p>Join the Online Class Management System</p>
        </div>

        {error && <div className="register-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="field-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          {/* EMAIL */}
          <div className="field-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* PASSWORD */}
          <div className="field-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <svg
                onClick={() => setShowPassword(!showPassword)}
                xmlns="http://www.w3.org/2000/svg"
                className="eye-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {showPassword ? (
                  // eye-off icon
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C6.48 20 2 15.52 2 10c0-1.73.44-3.36 1.22-4.78M6.06 6.06A10.94 10.94 0 0 1 12 4c5.52 0 10 4.48 10 10a9.98 9.98 0 0 1-1.22 4.78M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88M4 4l16 16" />
                ) : (
                  // eye icon
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zm11 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                )}
              </svg>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="field-group">
            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <svg
                onClick={() => setShowConfirm(!showConfirm)}
                xmlns="http://www.w3.org/2000/svg"
                className="eye-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {showConfirm ? (
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C6.48 20 2 15.52 2 10c0-1.73.44-3.36 1.22-4.78M6.06 6.06A10.94 10.94 0 0 1 12 4c5.52 0 10 4.48 10 10a9.98 9.98 0 0 1-1.22 4.78M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88M4 4l16 16" />
                ) : (
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12zm11 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                )}
              </svg>
            </div>
          </div>

          <button type="submit" className="register-btn">
            Create Account →
          </button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Sign In</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
