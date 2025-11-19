import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";

// Temporary Dashboard Page
function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1f1b2e",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2rem",
        fontWeight: "600",
      }}
    >
      Welcome to Dashboard 🎉
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
