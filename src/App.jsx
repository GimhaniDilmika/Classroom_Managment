import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import RoleDashboard from "./Pages/RoleDashboard";
import AddStudent from "./Pages/AddStudent";
import StudentListPage from "./Pages/StudentListPage";
import Classes from "./Pages/Classes";
import Teachers from "./Pages/Teachers";
import Timetable from "./Pages/Timetable";
import Subjects from "./Pages/Subjects";
import Attendance from "./Pages/Attendance";
import LiveSessions from "./Pages/LiveSessions";
import FeesCollection from "./Pages/FeesCollection";
import Expenses from "./Pages/Expenses";
import MyProfile from "./Pages/MyProfile";
import Settings from "./Pages/Settings";
import ChangePassword from "./Pages/ChangePassword";
import StudentView from "./Pages/StudentView";
import AccessDenied from "./Pages/AccessDenied";
import TeacherClasses from "./Pages/TeacherClasses";
import TeacherStudents from "./Pages/TeacherStudents";
import TeacherSupportNotes from "./Pages/TeacherSupportNotes";
import TeacherAssignments from "./Pages/TeacherAssignments";
import TeacherMarks from "./Pages/TeacherMarks";
import StudentAttendance from "./Pages/StudentAttendance";
import StudentFees from "./Pages/StudentFees";
import StudentTimetable from "./Pages/StudentTimetable";
import StudentAssignments from "./Pages/StudentAssignments";
import StudentMarks from "./Pages/StudentMarks";
import StudentLiveSessions from "./Pages/StudentLiveSessions";

function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser, userRole } = useAuth();
  const location = useLocation();

  if (!currentUser) return <Navigate to="/" replace state={{ from: location }} />;
  if (allowedRoles?.length && !allowedRoles.includes(userRole)) return <Navigate to="/access-denied" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  if (currentUser) return <Navigate to="/dashboard" replace />;
  return children;
}

const adminOnly = ["admin"];
const adminTeacher = ["admin", "teacher"];
const allRoles = ["admin", "teacher", "student"];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={allRoles}><RoleDashboard /></ProtectedRoute>} />
        <Route path="/access-denied" element={<ProtectedRoute allowedRoles={allRoles}><AccessDenied /></ProtectedRoute>} />

        {/* Admin-only management */}
        <Route path="/students/add" element={<ProtectedRoute allowedRoles={adminOnly}><AddStudent /></ProtectedRoute>} />
        <Route path="/students/list" element={<ProtectedRoute allowedRoles={adminOnly}><StudentListPage /></ProtectedRoute>} />
        <Route path="/students/view" element={<ProtectedRoute allowedRoles={adminOnly}><StudentView /></ProtectedRoute>} />
        <Route path="/classes" element={<ProtectedRoute allowedRoles={adminOnly}><Classes /></ProtectedRoute>} />
        <Route path="/teachers/list" element={<ProtectedRoute allowedRoles={adminOnly}><Teachers mode="list" /></ProtectedRoute>} />
        <Route path="/teachers/add" element={<ProtectedRoute allowedRoles={adminOnly}><Teachers mode="add" /></ProtectedRoute>} />
        <Route path="/subjects/list" element={<ProtectedRoute allowedRoles={adminOnly}><Subjects mode="list" /></ProtectedRoute>} />
        <Route path="/subjects/add" element={<ProtectedRoute allowedRoles={adminOnly}><Subjects mode="add" /></ProtectedRoute>} />
        <Route path="/fees/collection" element={<ProtectedRoute allowedRoles={adminOnly}><FeesCollection /></ProtectedRoute>} />
        <Route path="/fees/expenses" element={<ProtectedRoute allowedRoles={adminOnly}><Expenses /></ProtectedRoute>} />

        {/* Admin and teacher operations */}
        <Route path="/attendance" element={<ProtectedRoute allowedRoles={adminTeacher}><Attendance /></ProtectedRoute>} />
        <Route path="/timetable" element={<ProtectedRoute allowedRoles={adminTeacher}><Timetable /></ProtectedRoute>} />
        <Route path="/live-sessions" element={<ProtectedRoute allowedRoles={adminTeacher}><LiveSessions /></ProtectedRoute>} />
        <Route path="/teacher/classes" element={<ProtectedRoute allowedRoles={adminTeacher}><TeacherClasses /></ProtectedRoute>} />
        <Route path="/teacher/students" element={<ProtectedRoute allowedRoles={adminTeacher}><TeacherStudents /></ProtectedRoute>} />
        <Route path="/teacher/support-notes" element={<ProtectedRoute allowedRoles={adminTeacher}><TeacherSupportNotes /></ProtectedRoute>} />
        <Route path="/teacher/assignments" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherAssignments /></ProtectedRoute>} />
        <Route path="/teacher/marks" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherMarks /></ProtectedRoute>} />

        {/* Student portal */}
        <Route path="/student/attendance" element={<ProtectedRoute allowedRoles={["student"]}><StudentAttendance /></ProtectedRoute>} />
        <Route path="/student/fees" element={<ProtectedRoute allowedRoles={["student"]}><StudentFees /></ProtectedRoute>} />
        <Route path="/student/timetable" element={<ProtectedRoute allowedRoles={["student"]}><StudentTimetable /></ProtectedRoute>} />
        <Route path="/student/assignments" element={<ProtectedRoute allowedRoles={["student"]}><StudentAssignments /></ProtectedRoute>} />
        <Route path="/student/marks" element={<ProtectedRoute allowedRoles={["student"]}><StudentMarks /></ProtectedRoute>} />
        <Route path="/student/live-sessions" element={<ProtectedRoute allowedRoles={["student"]}><StudentLiveSessions /></ProtectedRoute>} />

        {/* Account pages */}
        <Route path="/profile" element={<ProtectedRoute allowedRoles={allRoles}><MyProfile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute allowedRoles={allRoles}><Settings /></ProtectedRoute>} />
        <Route path="/change-password" element={<ProtectedRoute allowedRoles={allRoles}><ChangePassword /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
