import Dashboard from "./Dashboard";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";
import { useAuth } from "../contexts/AuthContext";

export default function RoleDashboard() {
  const { userRole } = useAuth();
  if (userRole === "teacher") return <TeacherDashboard />;
  if (userRole === "student") return <StudentDashboard />;
  return <Dashboard />;
}
