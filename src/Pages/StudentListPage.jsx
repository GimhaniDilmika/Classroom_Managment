import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

// Sample data
const SAMPLE_STUDENTS = [
  { id: 1, admNo: "ADM-001", name: "Aisha Perera", gender: "Female", class: "Grade 10", section: "A", mobile: "077-111-2233", joining: "2023-01-10" },
  { id: 2, admNo: "ADM-002", name: "Kavindu Silva", gender: "Male", class: "Grade 11", section: "B", mobile: "076-222-3344", joining: "2023-01-15" },
  { id: 3, admNo: "ADM-003", name: "Nethmi Fernando", gender: "Female", class: "Grade 10", section: "A", mobile: "075-333-4455", joining: "2023-02-01" },
  { id: 4, admNo: "ADM-004", name: "Tharindu Mendis", gender: "Male", class: "Grade 12", section: "C", mobile: "071-444-5566", joining: "2022-09-01" },
  { id: 5, admNo: "ADM-005", name: "Dinali Wickrama", gender: "Female", class: "Grade 11", section: "A", mobile: "072-555-6677", joining: "2022-09-05" },
  { id: 6, admNo: "ADM-006", name: "Yasith Bandara", gender: "Male", class: "Grade 10", section: "B", mobile: "077-666-7788", joining: "2023-03-01" },
  { id: 7, admNo: "ADM-007", name: "Sandali Rathnayake", gender: "Female", class: "Grade 12", section: "A", mobile: "076-777-8899", joining: "2022-08-15" },
  { id: 8, admNo: "ADM-008", name: "Chanaka Jayawardena", gender: "Male", class: "Grade 11", section: "C", mobile: "075-888-9900", joining: "2022-10-01" },
  { id: 9, admNo: "ADM-009", name: "Imasha Kumarage", gender: "Female", class: "Grade 10", section: "C", mobile: "071-999-0011", joining: "2023-01-20" },
  { id: 10, admNo: "ADM-010", name: "Dulaj Senanayake", gender: "Male", class: "Grade 12", section: "B", mobile: "072-000-1122", joining: "2022-07-01" },
  { id: 11, admNo: "ADM-011", name: "Hasini Gunawardena", gender: "Female", class: "Grade 11", section: "A", mobile: "077-100-2200", joining: "2022-09-10" },
  { id: 12, admNo: "ADM-012", name: "Randika Dissanayake", gender: "Male", class: "Grade 10", section: "A", mobile: "076-200-3300", joining: "2023-04-01" },
];

const CLASSES = ["All", "Grade 10", "Grade 11", "Grade 12"];
const GENDERS = ["All", "Male", "Female"];

function getInitials(name) {
  return name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
}

const AVATAR_COLORS = [
  "linear-gradient(135deg,#f59e0b,#ef4444)",
  "linear-gradient(135deg,#3b82f6,#8b5cf6)",
  "linear-gradient(135deg,#10b981,#06b6d4)",
  "linear-gradient(135deg,#ec4899,#f43f5e)",
  "linear-gradient(135deg,#8b5cf6,#3b82f6)",
  "linear-gradient(135deg,#f97316,#eab308)",
];

export default function StudentListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const [filterGender, setFilterGender] = useState("All");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState(SAMPLE_STUDENTS);

  const filtered = useMemo(() => {
    return students.filter(s => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.admNo.toLowerCase().includes(search.toLowerCase()) ||
        s.mobile.includes(search);
      const matchClass = filterClass === "All" || s.class === filterClass;
      const matchGender = filterGender === "All" || s.gender === filterGender;
      return matchSearch && matchClass && matchGender;
    });
  }, [students, search, filterClass, filterGender]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function handleDelete(id) {
    if (window.confirm("Delete this student?")) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        [data-theme="dark"] .sl-page { background: #020617; }
        [data-theme="dark"] .sl-topbar { background: #0f172a; border-color: rgba(245,158,11,0.1); color: #e2e8f0; }
        [data-theme="dark"] .sl-title { color: #e2e8f0; }
        [data-theme="dark"] .sl-breadcrumb { color: #475569; }
        [data-theme="dark"] .sl-card { background: #0f172a; border-color: rgba(245,158,11,0.08); }
        [data-theme="dark"] .sl-filter-bar { background: #1e293b; border-color: rgba(245,158,11,0.1); }
        [data-theme="dark"] .sl-search { background: #0f172a; border-color: #334155; color: #e2e8f0; }
        [data-theme="dark"] .sl-select { background: #0f172a; border-color: #334155; color: #e2e8f0; }
        [data-theme="dark"] .sl-table thead { background: #1e293b; }
        [data-theme="dark"] .sl-table th { color: #94a3b8; }
        [data-theme="dark"] .sl-table td { color: #cbd5e1; border-color: #1e293b; }
        [data-theme="dark"] .sl-table tbody tr:hover { background: #1e293b; }
        [data-theme="dark"] .sl-footer { color: #475569; }
        [data-theme="dark"] .sl-page-btn { background: #1e293b; border-color: #334155; color: #94a3b8; }
        [data-theme="dark"] .sl-page-btn:hover { border-color: #f59e0b; color: #f59e0b; }
        [data-theme="dark"] .sl-empty { color: #475569; }

        .sl-layout { display: flex; min-height: 100vh; }
        .sl-page { flex: 1; margin-left: 16rem; background: #f1f5f9; padding: 2rem 2.5rem; font-family: 'DM Sans', sans-serif; transition: background 0.4s; }

        .sl-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 12px; }
        .sl-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          background: linear-gradient(90deg, #302b63, #ef4444);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .sl-breadcrumb { font-size: 12px; color: #94a3b8; margin-top: 4px; }
        .sl-breadcrumb span { color: #f59e0b; font-weight: 600; }

        .sl-header-actions { display: flex; gap: 10px; align-items: center; }
        .sl-add-btn {
          padding: 9px 20px;
          background: linear-gradient(90deg, #f59e0b, #ef4444);
          color: white; border: none; border-radius: 8px;
          font-weight: 700; font-size: 13px; cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          box-shadow: 0 4px 12px rgba(245,158,11,0.3);
          transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .sl-add-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(245,158,11,0.4); }

        .sl-card {
          background: white;
          border-radius: 1.25rem;
          box-shadow: 0 4px 24px rgba(15,23,42,0.06);
          border: 1px solid #f1f5f9;
          overflow: hidden;
        }

        .sl-filter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          background: #fafafa;
          border-bottom: 1px solid #f1f5f9;
          flex-wrap: wrap;
          gap: 10px;
        }
        .sl-filter-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .sl-search-wrap {
          display: flex; align-items: center;
          background: white; border: 1.5px solid #e2e8f0;
          border-radius: 8px; padding: 0 10px; gap: 6px;
          transition: border-color 0.2s;
        }
        .sl-search-wrap:focus-within { border-color: #f59e0b; box-shadow: 0 0 0 3px rgba(245,158,11,0.1); }
        .sl-search { border: none; background: transparent; outline: none; font-size: 13px; padding: 7px 0; width: 200px; font-family: 'DM Sans', sans-serif; }
        .sl-search-icon { color: #94a3b8; font-size: 0.8rem; }
        .sl-select {
          padding: 7px 10px; border-radius: 8px;
          border: 1.5px solid #e2e8f0; background: white;
          font-size: 13px; outline: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s;
        }
        .sl-select:focus { border-color: #f59e0b; }
        .sl-filter-right { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #94a3b8; }
        .sl-count-badge {
          padding: 3px 10px; border-radius: 999px;
          background: linear-gradient(90deg, #fef3c7, #fce7f3);
          color: #92400e; font-weight: 700; font-size: 12px;
        }

        /* TABLE */
        .sl-table-wrap { overflow-x: auto; }
        .sl-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .sl-table thead { background: #f8fafc; }
        .sl-table th {
          padding: 10px 14px;
          text-align: left; white-space: nowrap;
          font-size: 11px; font-weight: 700; color: #64748b;
          text-transform: uppercase; letter-spacing: 0.06em;
          border-bottom: 1.5px solid #f1f5f9;
        }
        .sl-table td {
          padding: 11px 14px; white-space: nowrap;
          border-bottom: 1px solid #f8fafc; color: #374151;
          vertical-align: middle;
        }
        .sl-table tbody tr { transition: background 0.15s; }
        .sl-table tbody tr:hover { background: #fffbeb; }

        /* AVATAR CELL */
        .sl-avatar-cell { display: flex; align-items: center; gap: 10px; }
        .sl-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: white;
          flex-shrink: 0; letter-spacing: 0.5px;
        }
        .sl-name { font-weight: 600; color: #0f172a; }
        .sl-adm { font-size: 11px; color: #94a3b8; }

        /* BADGES */
        .sl-badge {
          display: inline-block; padding: 3px 9px;
          border-radius: 999px; font-size: 11px; font-weight: 600;
        }
        .sl-badge-male { background: #dbeafe; color: #1d4ed8; }
        .sl-badge-female { background: #fce7f3; color: #be185d; }
        .sl-badge-class { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }

        /* ACTION BUTTONS */
        .sl-action-btns { display: flex; gap: 6px; }
        .sl-btn-edit, .sl-btn-delete {
          width: 30px; height: 30px; border-radius: 7px;
          border: none; cursor: pointer; font-size: 13px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .sl-btn-edit { background: #dbeafe; color: #2563eb; }
        .sl-btn-edit:hover { transform: scale(1.15); box-shadow: 0 2px 8px rgba(37,99,235,0.3); }
        .sl-btn-delete { background: #fee2e2; color: #dc2626; }
        .sl-btn-delete:hover { transform: scale(1.15); box-shadow: 0 2px 8px rgba(220,38,38,0.3); }

        .sl-empty { text-align: center; padding: 3rem; color: #94a3b8; font-size: 14px; }
        .sl-empty-icon { font-size: 2.5rem; margin-bottom: 10px; }

        /* FOOTER */
        .sl-footer {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.25rem;
          font-size: 12px; color: #64748b;
          border-top: 1px solid #f1f5f9;
          flex-wrap: wrap; gap: 10px;
        }
        .sl-pagination { display: flex; align-items: center; gap: 4px; }
        .sl-page-btn {
          min-width: 30px; height: 30px; padding: 0 8px;
          border-radius: 6px; border: 1.5px solid #e2e8f0;
          background: white; font-size: 12px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s; font-family: 'DM Sans', sans-serif;
          font-weight: 500;
        }
        .sl-page-btn:hover:not(.disabled):not(.active) { border-color: #f59e0b; color: #92400e; }
        .sl-page-btn.active { background: linear-gradient(90deg,#f59e0b,#ef4444); border-color: transparent; color: white; font-weight: 700; }
        .sl-page-btn.disabled { opacity: 0.35; cursor: default; }
        .sl-per-page { display: flex; align-items: center; gap: 6px; font-size: 12px; }

        @media (max-width: 768px) {
          .sl-page { padding: 1rem; }
          .sl-header { flex-direction: column; }
          .sl-filter-bar { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="sl-layout">
        <Sidebar />
        <main className="sl-page">
          {/* HEADER */}
          <div className="sl-header">
            <div>
              <h1 className="sl-title">Student List</h1>
              <p className="sl-breadcrumb">Students <span>/ Student List</span></p>
            </div>
            <div className="sl-header-actions">
              <button className="sl-add-btn" onClick={() => navigate("/students/add")}>
                + Add Student
              </button>
            </div>
          </div>

          {/* CARD */}
          <div className="sl-card">
            {/* FILTER BAR */}
            <div className="sl-filter-bar">
              <div className="sl-filter-left">
                <div className="sl-search-wrap">
                  <span className="sl-search-icon">🔍</span>
                  <input
                    className="sl-search"
                    placeholder="Search by name, ID or mobile..."
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                  />
                </div>
                <select className="sl-select" value={filterClass} onChange={e => { setFilterClass(e.target.value); setPage(1); }}>
                  {CLASSES.map(c => <option key={c}>{c}</option>)}
                </select>
                <select className="sl-select" value={filterGender} onChange={e => { setFilterGender(e.target.value); setPage(1); }}>
                  {GENDERS.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div className="sl-filter-right">
                <span className="sl-count-badge">{filtered.length} students</span>
              </div>
            </div>

            {/* TABLE */}
            <div className="sl-table-wrap">
              <table className="sl-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student</th>
                    <th>Gender</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Mobile</th>
                    <th>Joining Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan="8">
                        <div className="sl-empty">
                          <div className="sl-empty-icon">🔍</div>
                          No students found for your search.
                        </div>
                      </td>
                    </tr>
                  ) : paginated.map((s, idx) => (
                    <tr key={s.id}>
                      <td style={{ color: "#94a3b8", fontWeight: 600 }}>{(currentPage - 1) * pageSize + idx + 1}</td>
                      <td>
                        <div className="sl-avatar-cell">
                          <div className="sl-avatar" style={{ background: AVATAR_COLORS[s.id % AVATAR_COLORS.length] }}>
                            {getInitials(s.name)}
                          </div>
                          <div>
                            <div className="sl-name">{s.name}</div>
                            <div className="sl-adm">{s.admNo}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`sl-badge ${s.gender === "Male" ? "sl-badge-male" : "sl-badge-female"}`}>
                          {s.gender}
                        </span>
                      </td>
                      <td><span className="sl-badge sl-badge-class">{s.class}</span></td>
                      <td>{s.section}</td>
                      <td>{s.mobile}</td>
                      <td>{s.joining}</td>
                      <td>
                        <div className="sl-action-btns">
                          <button className="sl-btn-edit" title="Edit">✏️</button>
                          <button className="sl-btn-delete" title="Delete" onClick={() => handleDelete(s.id)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="sl-footer">
              <div className="sl-per-page">
                Show
                <select className="sl-select" value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}>
                  {[5, 10, 25, 50].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                entries
              </div>
              <span>Showing {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</span>
              <div className="sl-pagination">
                <button className={`sl-page-btn ${currentPage === 1 ? "disabled" : ""}`} onClick={() => setPage(p => Math.max(1, p - 1))}>‹ Prev</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button key={n} className={`sl-page-btn ${n === currentPage ? "active" : ""}`} onClick={() => setPage(n)}>{n}</button>
                ))}
                <button className={`sl-page-btn ${currentPage === totalPages ? "disabled" : ""}`} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next ›</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
