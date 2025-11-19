import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // very simple validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // 👉 later you can call backend API here with axios

    console.log("Logging in with:", { email, password });

    // temporary: after "login", go to dashboard
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ded9e2ff, #ece5f4ff)",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#1f1b2e",
          padding: "2.5rem 2.8rem",
          borderRadius: "1rem",
          width: "100%",
          maxWidth: "380px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          Online Class Management
        </h2>
        <p
          style={{
            textAlign: "center",
            marginBottom: "1.8rem",
            fontSize: "0.9rem",
            color: "#c7b5ff",
          }}
        >
          Login to continue
        </p>

        {error && (
          <div
            style={{
              backgroundColor: "#ff4d4f22",
              border: "1px solid #ff4d4f",
              color: "#ffb3b3",
              padding: "0.6rem 0.8rem",
              borderRadius: "0.5rem",
              marginBottom: "1rem",
              fontSize: "0.85rem",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.2rem" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "0.4rem",
                fontSize: "0.9rem",
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.7rem 0.9rem",
                borderRadius: "0.5rem",
                border: "1px solid #d2d0d8ff",
                backgroundColor: "#a5a1aeff",
                color: "white",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.4rem" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "0.4rem",
                fontSize: "0.9rem",
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "0.7rem 0.9rem",
                borderRadius: "0.5rem",
                border: "1px solid #dfdde7ff",
                backgroundColor: "#e2dfeaff",
                color: "white",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "none",
              background:
                "linear-gradient(135deg, #d5b6edff, #ac95bfff, #dedbe1ff)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              marginBottom: "0.8rem",
            }}
          >
            Login
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.8rem",
            color: "#e3e0edff",
            marginTop: "0.6rem",
          }}
        >
          (Demo) Use any email & password for now.
        </p>
      </div>
    </div>
  );
}

export default Login;
