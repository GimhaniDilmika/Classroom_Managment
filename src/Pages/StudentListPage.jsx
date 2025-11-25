// src/Pages/StudentListPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import "./Dashboard.css"; // same file where layout + form css are

const DUMMY_STUDENTS = [
  {
    id: "STU001",
    name: "Nethmi Perera",
    grade: "10 - B",
    dob: "2009-04-12",
    parentName: "Gamini / Lakshika",
    mobile: "0778847841",
    address: "No 66, Samagipura, Minneriya",
  },
  {
    id: "STU002",
    name: "Pasan Fernando",
    grade: "08 - A",
    dob: "2011-01-23",
    parentName: "Sunil / Nadeeka",
    mobile: "0711234567",
    address: "Colombo 10",
  },
];

export default function StudentListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const filteredStudents = DUMMY_STUDENTS.filter((s) => {
    const q = searchTerm.toLowerCase();
    return (
      s.id.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.parentName.toLowerCase().includes(q)
    );
  });

  const visibleStudents = filteredStudents.slice(0, pageSize);

  return (
    <div className="layout-wrapper">
      <Sidebar />

      <main className="page-main">
        {/* TOP HEADER */}
        <header className="page-header">
          <div>
            <h1 className="page-title">Students</h1>
            <p className="page-breadcrumb">
              Dashboard <span>/ Students</span>
            </p>
          </div>

          <div className="studentlist-header-actions">
            <button className="btn-outline-yellow">Download</button>

            {/* change "/students/add" to your real route */}
            <Link to="/students/add" className="btn-solid-yellow">
              + Add Student
            </Link>
          </div>
        </header>

        {/* TABLE CARD */}
        <div className="page-card studentlist-card">
          {/* top controls */}
          <div className="studentlist-controls">
            <div className="studentlist-show">
              <span>Show</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
              <span>entries</span>
            </div>

            <div className="studentlist-search">
              <span>Search:</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Name / ID / Parent"
              />
            </div>
          </div>

          {/* table */}
          <div className="studentlist-table-wrapper">
            <table className="studentlist-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>DOB</th>
                  <th>Parent Name</th>
                  <th>Mobile Number</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {visibleStudents.length === 0 && (
                  <tr>
                    <td colSpan="8" className="studentlist-empty">
                      No students found
                    </td>
                  </tr>
                )}

                {visibleStudents.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.grade}</td>
                    <td>{s.dob}</td>
                    <td>{s.parentName}</td>
                    <td>{s.mobile}</td>
                    <td>{s.address}</td>
                    <td>
                      <div className="studentlist-actions">
                        <button className="action-btn edit">✏️</button>
                        <button className="action-btn delete">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* bottom info + pagination (simple static for now) */}
          <div className="studentlist-footer">
            <span>
              Showing{" "}
              {visibleStudents.length === 0 ? 0 : 1} to {visibleStudents.length}{" "}
              of {filteredStudents.length} entries
            </span>

            <div className="studentlist-pagination">
              <button className="page-btn disabled">Previous</button>
              <button className="page-btn page-btn-active">1</button>
              <button className="page-btn disabled">Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
