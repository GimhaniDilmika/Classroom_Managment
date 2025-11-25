import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import AddStudent from "./Pages/AddStudent";
import StudentListPage from "./Pages/StudentListPage";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        
         <Route path="/students/add" element={<AddStudent/>} />
        <Route path="/students/list" element={<StudentListPage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
