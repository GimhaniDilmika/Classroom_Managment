import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import AddStudent from "./Pages/AddStudent";
import StudentListPage from "./Pages/StudentListPage";
import Classes from "./Pages/Classes";
import Teachers from "./Pages/Teachers";
import Timetable from "./Pages/Timetable";
import Subjects from "./Pages/Subjects";

function ProtectedRoute({ children, adminOnly = false }) {
  const { currentUser, userRole } = useAuth();
  if (!currentUser) return <Navigate to="/" replace />;
  if (adminOnly && userRole !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  if (currentUser) return <Navigate to="/dashboard" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"         element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Protected — all logged-in users */}
        <Route path="/dashboard"     element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/students/add"  element={<ProtectedRoute><AddStudent /></ProtectedRoute>} />
        <Route path="/students/list" element={<ProtectedRoute><StudentListPage /></ProtectedRoute>} />
        <Route path="/classes"       element={<ProtectedRoute><Classes /></ProtectedRoute>} />
        <Route path="/teachers/list" element={<ProtectedRoute><Teachers mode="list" /></ProtectedRoute>} />
        <Route path="/teachers/add"  element={<ProtectedRoute><Teachers mode="add" /></ProtectedRoute>} />
        <Route path="/timetable"     element={<ProtectedRoute><Timetable /></ProtectedRoute>} />
        <Route path="/subjects/list" element={<ProtectedRoute><Subjects mode="list" /></ProtectedRoute>} />
        <Route path="/subjects/add"  element={<ProtectedRoute><Subjects mode="add" /></ProtectedRoute>} />

        {/* Stub routes */}
        <Route path="/attendance"      element={<ProtectedRoute><Classes stub="Attendance" /></ProtectedRoute>} />
        <Route path="/live-sessions"   element={<ProtectedRoute><Classes stub="Live Sessions" /></ProtectedRoute>} />
        <Route path="/fees/collection" element={<ProtectedRoute><Classes stub="Fees Collection" /></ProtectedRoute>} />
        <Route path="/fees/expenses"   element={<ProtectedRoute><Classes stub="Expenses" /></ProtectedRoute>} />
        <Route path="/students/view"   element={<ProtectedRoute><Classes stub="Student View" /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
