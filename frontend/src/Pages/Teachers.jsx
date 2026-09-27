import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import API from "../api/api";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaBookOpen,
  FaEye,
  FaUserTie
} from "react-icons/fa";


const COLORS = [
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f97316"
];


const EMPTY_FORM = {
  name: "",
  subject: "",
  phone: "",
  email: "",
  classes: 0,
  password: ""
};


function initials(name) {
  return (
    (name || "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "?"
  );
}


export default function Teachers({ mode = "list" }) {

  const [teachers, setTeachers] = useState([]);

  const [search, setSearch] = useState("");

  const [view, setView] = useState(mode);

  const [selected, setSelected] = useState(null);

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // ===============================
// AUTO HIDE MESSAGES
// ===============================

useEffect(() => {
  if (!success) return;

  const timer = setTimeout(() => {
    setSuccess("");
  }, 3000);

  return () => clearTimeout(timer);
}, [success]);


useEffect(() => {
  if (!error) return;

  const timer = setTimeout(() => {
    setError("");
  }, 3000);

  return () => clearTimeout(timer);
}, [error]);


  // ===============================
  // LOAD TEACHERS
  // ===============================

  useEffect(() => {

    loadTeachers();

  }, []);


  const loadTeachers = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await API.get("/admin/teachers");

      const data =
        response.data?.teachers ||
        response.data?.data ||
        response.data ||
        [];

      setTeachers(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error("LOAD TEACHERS ERROR:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load teachers."
      );

    } finally {

      setLoading(false);

    }

  };


  // ===============================
  // SEARCH
  // ===============================

  const filtered = teachers.filter((teacher) => {

    const keyword = search.toLowerCase();

    return (

      teacher.name?.toLowerCase().includes(keyword) ||

      teacher.subject?.toLowerCase().includes(keyword) ||

      teacher.email?.toLowerCase().includes(keyword) ||

      teacher.mobile?.toLowerCase().includes(keyword) ||

      teacher.phone?.toLowerCase().includes(keyword)

    );

  });


  // ===============================
  // FORM CHANGE
  // ===============================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));

  };


  // ===============================
  // RESET FORM
  // ===============================

  const resetForm = () => {

    setForm(EMPTY_FORM);

    setEditId(null);

    setSelected(null);

  };


  // ===============================
  // ADD TEACHER
  // ===============================

  const handleAddTeacher = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);
      setError("");
      setSuccess("");

      await API.post("/auth/register", {

        name: form.name,

        email: form.email,

        password: form.password,

        role: "teacher",

        mobile: form.phone,

        subject: form.subject,

        classes: Number(form.classes)

      });


      setSuccess("Teacher added successfully.");

      resetForm();

      setView("list");

      await loadTeachers();

    } catch (error) {

      console.error("ADD TEACHER ERROR:", error);

      setError(
        error.response?.data?.message ||
        "Failed to add teacher."
      );

    } finally {

      setSaving(false);

    }

  };


  // ===============================
  // EDIT TEACHER
  // ===============================

  const startEdit = (teacher) => {

    setError("");
    setSuccess("");

    setEditId(teacher._id);

    setForm({

      name: teacher.name || "",

      subject: teacher.subject || "",

      phone: teacher.mobile || teacher.phone || "",

      email: teacher.email || "",

      classes: teacher.classes || 0,

      password: ""

    });

    setView("add");

  };


  // ===============================
  // UPDATE TEACHER
  // ===============================

  const handleUpdateTeacher = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);
      setError("");
      setSuccess("");

      await API.put(
        `/admin/teachers/${editId}`,
        {

          name: form.name,

          email: form.email,

          mobile: form.phone,

          subject: form.subject,

          classes: Number(form.classes)

        }
      );


      setSuccess("Teacher updated successfully.");

      resetForm();

      setView("list");

      await loadTeachers();

    } catch (error) {

      console.error("UPDATE TEACHER ERROR:", error);

      setError(
        error.response?.data?.message ||
        "Failed to update teacher."
      );

    } finally {

      setSaving(false);

    }

  };


  // ===============================
  // DELETE TEACHER
  // ===============================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmDelete) return;


    try {

      setError("");
      setSuccess("");

      await API.delete(
        `/admin/users/${id}`
      );

      setTeachers((previous) =>
        previous.filter(
          (teacher) => teacher._id !== id
        )
      );

      setSelected(null);

      setSuccess("Teacher deleted successfully.");

    } catch (error) {

      console.error("DELETE TEACHER ERROR:", error);

      setError(
        error.response?.data?.message ||
        "Failed to delete teacher."
      );

    }

  };


  // ===============================
  // CANCEL
  // ===============================

  const handleCancel = () => {

    resetForm();

    setView("list");

    setError("");

  };


  return (

    <div className="teacher-page">

      <Sidebar />


      <main className="teacher-main">


        {/* =========================
            TOP BAR
        ========================= */}

        <header className="teacher-topbar">

          <div className="teacher-top-title">

            <FaUserTie />

            Teachers

          </div>


          <button
            className="teacher-add-top-btn"
            onClick={() => {

              resetForm();

              setView(
                view === "add"
                  ? "list"
                  : "add"
              );

            }}
          >

            {view === "add" ? (
              "← Back"
            ) : (
              <>
                <FaPlus />
                Add Teacher
              </>
            )}

          </button>

        </header>



        <section className="teacher-content">


          {/* =========================
              PAGE HEADER
          ========================= */}

          <div className="teacher-header">

            <div>

              <h1>

                {view === "add"
                  ? editId
                    ? "Edit Teacher"
                    : "Add Teacher"
                  : "Teacher Directory"}

              </h1>


              <p>

                {view === "add"
                  ? "Manage teacher information"
                  : "View and manage all teachers"}

              </p>

            </div>


            {view === "list" && (

              <div className="teacher-count">

                {filtered.length} Teacher
                {filtered.length !== 1 ? "s" : ""}

              </div>

            )}

          </div>



          {/* =========================
              ALERTS
          ========================= */}

          {error && (

            <div className="teacher-alert error">

              {error}

            </div>

          )}


          {success && (

            <div className="teacher-alert success">

              {success}

            </div>

          )}



          {/* =========================
              ADD / EDIT FORM
          ========================= */}

          {view === "add" && (

            <form
              className="teacher-form"
              onSubmit={
                editId
                  ? handleUpdateTeacher
                  : handleAddTeacher
              }
            >

              <div className="form-title">

                {editId
                  ? "Edit Teacher Details"
                  : "New Teacher"}

              </div>


              <div className="teacher-form-grid">


                {/* NAME */}

                <div className="teacher-field">

                  <label>
                    Full Name *
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />

                </div>



                {/* SUBJECT */}

                <div className="teacher-field">

                  <label>
                    Subject *
                  </label>

                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject taught"
                    required
                  />

                </div>



                {/* PHONE */}

                <div className="teacher-field">

                  <label>
                    Phone
                  </label>

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0771234567"
                  />

                </div>



                {/* EMAIL */}

                <div className="teacher-field">

                  <label>
                    Email *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="teacher@school.lk"
                    required
                  />

                </div>



                {/* CLASSES */}

                <div className="teacher-field">

                  <label>
                    No. of Classes
                  </label>

                  <input
                    type="number"
                    name="classes"
                    min="0"
                    value={form.classes}
                    onChange={handleChange}
                  />

                </div>



                {/* PASSWORD ONLY ADD */}

                {!editId && (

                  <div className="teacher-field">

                    <label>
                      Password *
                    </label>

                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Teacher login password"
                      minLength="6"
                      required
                    />

                  </div>

                )}

              </div>


              <div className="teacher-form-actions">


                <button
                  type="submit"
                  className="teacher-save-btn"
                  disabled={saving}
                >

                  {saving
                    ? "Saving..."
                    : editId
                      ? "Update Teacher"
                      : "Save Teacher"}

                </button>


                <button
                  type="button"
                  className="teacher-cancel-btn"
                  onClick={handleCancel}
                >

                  Cancel

                </button>

              </div>

            </form>

          )}



          {/* =========================
              SEARCH
          ========================= */}

          {view === "list" && (

            <div className="teacher-search-box">

              <FaSearch />

              <input
                placeholder="Search teacher name, subject, email or phone..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          )}



          {/* =========================
              LOADING
          ========================= */}

          {view === "list" && loading && (

            <div className="teacher-state">

              Loading teachers...

            </div>

          )}



          {/* =========================
              TEACHER GRID
          ========================= */}

          {view === "list" && !loading && (

            <div className="teacher-grid">


              {filtered.length === 0 ? (

                <div className="teacher-empty">

                  <FaUserTie />

                  <h3>
                    No teachers found
                  </h3>

                  <p>
                    Try another search or add a new teacher.
                  </p>

                </div>

              ) : (

                filtered.map((teacher, index) => (

                  <div
                    className="teacher-card"
                    key={teacher._id}
                  >


                    <div className="teacher-card-top">


                      <div
                        className="teacher-avatar"
                        style={{
                          background:
                            `linear-gradient(
                              135deg,
                              ${COLORS[index % COLORS.length]},
                              ${COLORS[(index + 2) % COLORS.length]}
                            )`
                        }}
                      >

                        {initials(
                          teacher.name
                        )}

                      </div>


                      <div>

                        <h3>
                          {teacher.name}
                        </h3>

                        <p>
                          {teacher.subject || "Subject not assigned"}
                        </p>

                      </div>

                    </div>



                    <div className="teacher-info">


                      <div>

                        <FaEnvelope />

                        <span>
                          {teacher.email || "No email"}
                        </span>

                      </div>


                      <div>

                        <FaPhone />

                        <span>
                          {teacher.mobile ||
                            teacher.phone ||
                            "No phone"}
                        </span>

                      </div>


                      <div>

                        <FaBookOpen />

                        <span>
                          {teacher.classes || 0}
                          {" "}Classes
                        </span>

                      </div>

                    </div>



                    <div className="teacher-actions">


                      <button
                        className="teacher-view-btn"
                        onClick={() =>
                          setSelected(teacher)
                        }
                      >

                        <FaEye />

                        View

                      </button>


                      <button
                        className="teacher-edit-btn"
                        onClick={() =>
                          startEdit(teacher)
                        }
                      >

                        <FaEdit />

                        Edit

                      </button>


                      <button
                        className="teacher-delete-btn"
                        onClick={() =>
                          handleDelete(
                            teacher._id
                          )
                        }
                      >

                        <FaTrash />

                      </button>


                    </div>


                  </div>

                ))

              )}

            </div>

          )}


        </section>


        {/* =========================
            VIEW MODAL
        ========================= */}

        {selected && (

          <div
            className="teacher-modal-overlay"
            onClick={() =>
              setSelected(null)
            }
          >

            <div
              className="teacher-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >


              <div className="teacher-modal-header">


                <div className="teacher-modal-avatar">

                  {initials(
                    selected.name
                  )}

                </div>


                <div>

                  <h2>
                    {selected.name}
                  </h2>

                  <p>
                    {selected.subject ||
                      "Teacher"}
                  </p>

                </div>

              </div>



              <div className="teacher-modal-body">


                <div className="modal-row">

                  <span>
                    Email
                  </span>

                  <strong>
                    {selected.email || "N/A"}
                  </strong>

                </div>


                <div className="modal-row">

                  <span>
                    Phone
                  </span>

                  <strong>
                    {selected.mobile ||
                      selected.phone ||
                      "N/A"}
                  </strong>

                </div>


                <div className="modal-row">

                  <span>
                    Subject
                  </span>

                  <strong>
                    {selected.subject || "N/A"}
                  </strong>

                </div>


                <div className="modal-row">

                  <span>
                    Classes
                  </span>

                  <strong>
                    {selected.classes || 0}
                  </strong>

                </div>


              </div>



              <div className="teacher-modal-actions">


                <button
                  className="teacher-edit-modal"
                  onClick={() => {

                    setSelected(null);

                    startEdit(selected);

                  }}
                >

                  <FaEdit />

                  Edit Teacher

                </button>


                <button
                  className="teacher-delete-modal"
                  onClick={() =>
                    handleDelete(
                      selected._id
                    )
                  }
                >

                  <FaTrash />

                  Delete

                </button>


                <button
                  className="teacher-close-modal"
                  onClick={() =>
                    setSelected(null)
                  }
                >

                  Close

                </button>


              </div>


            </div>

          </div>

        )}


      </main>


      {/* =========================
          STYLES
      ========================= */}

      <style>{`

        .teacher-page {
          min-height: 100vh;
          background: #f4f7fb;
          font-family: Arial, sans-serif;
        }

        .teacher-main {
          margin-left: 295px;
          min-height: 100vh;
        }

        .teacher-topbar {
          height: 70px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          box-shadow: 0 2px 12px rgba(0,0,0,.06);
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .teacher-top-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 27px;
          font-weight: 800;
          color: #172554;
        }

        .teacher-top-title svg {
          color: #f59e0b;
        }

        .teacher-add-top-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          border: none;
          background: linear-gradient(135deg,#f59e0b,#ef4444);
          color: white;
          padding: 12px 22px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .teacher-content {
          padding: 35px;
        }

        .teacher-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
        }

        .teacher-header h1 {
          margin: 0;
          font-size: 38px;
          font-weight: 800;
          background: linear-gradient(90deg,#312e81,#ef4444);
          -webkit-background-clip: text;
          color: transparent;
        }

        .teacher-header p {
          margin: 7px 0 0;
          color: #64748b;
        }

        .teacher-count {
          background: #f59e0b;
          color: white;
          padding: 11px 20px;
          border-radius: 20px;
          font-weight: 700;
        }

        .teacher-alert {
          padding: 14px 18px;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .teacher-alert.error {
          background: #fee2e2;
          color: #b91c1c;
          border: 1px solid #fecaca;
        }

        .teacher-alert.success {
          background: #dcfce7;
          color: #15803d;
          border: 1px solid #bbf7d0;
        }

        .teacher-search-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          border: 1px solid #dbe3ed;
          border-radius: 30px;
          padding: 0 20px;
          height: 48px;
          margin-bottom: 25px;
        }

        .teacher-search-box svg {
          color: #64748b;
        }

        .teacher-search-box input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 15px;
          background: transparent;
        }

        .teacher-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0,1fr));
          gap: 22px;
        }

        .teacher-card {
          background: white;
          border-radius: 20px;
          padding: 22px;
          box-shadow: 0 8px 25px rgba(15,23,42,.07);
          transition: .25s;
        }

        .teacher-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(15,23,42,.12);
        }

        .teacher-card-top {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }

        .teacher-avatar,
        .teacher-modal-avatar {
          width: 55px;
          height: 55px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 20px;
          flex-shrink: 0;
        }

        .teacher-card h3 {
          margin: 0 0 4px;
          color: #0f172a;
          font-size: 18px;
        }

        .teacher-card-top p {
          margin: 0;
          color: #f59e0b;
          font-weight: 700;
        }

        .teacher-info {
          border-top: 1px solid #e2e8f0;
          padding-top: 15px;
        }

        .teacher-info div {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 10px 0;
          color: #64748b;
          font-size: 14px;
          overflow: hidden;
        }

        .teacher-info svg {
          color: #94a3b8;
          flex-shrink: 0;
        }

        .teacher-info span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .teacher-actions {
          display: flex;
          gap: 8px;
          border-top: 1px solid #e2e8f0;
          margin-top: 16px;
          padding-top: 15px;
        }

        .teacher-actions button {
          border: none;
          border-radius: 9px;
          padding: 9px 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-weight: 600;
        }

        .teacher-view-btn {
          flex: 1;
          background: #eff6ff;
          color: #2563eb;
        }

        .teacher-edit-btn {
          flex: 1;
          background: #fef3c7;
          color: #92400e;
        }

        .teacher-delete-btn {
          background: #fee2e2;
          color: #dc2626;
        }

        .teacher-form {
          background: white;
          padding: 28px;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(15,23,42,.07);
          margin-bottom: 25px;
        }

        .form-title {
          font-size: 22px;
          font-weight: 800;
          color: #172554;
          margin-bottom: 22px;
        }

        .teacher-form-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 18px;
        }

        .teacher-field label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #334155;
          margin-bottom: 7px;
        }

        .teacher-field input {
          width: 100%;
          box-sizing: border-box;
          height: 46px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          padding: 0 13px;
          outline: none;
          font-size: 14px;
        }

        .teacher-field input:focus {
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245,158,11,.12);
        }

        .teacher-form-actions {
          display: flex;
          gap: 12px;
          margin-top: 25px;
        }

        .teacher-save-btn {
          border: none;
          background: linear-gradient(135deg,#f59e0b,#ef4444);
          color: white;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
        }

        .teacher-save-btn:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .teacher-cancel-btn {
          border: 1px solid #cbd5e1;
          background: white;
          color: #475569;
          padding: 12px 24px;
          border-radius: 10px;
          cursor: pointer;
        }

        .teacher-state,
        .teacher-empty {
          background: white;
          border-radius: 18px;
          padding: 50px;
          text-align: center;
          color: #64748b;
        }

        .teacher-empty svg {
          font-size: 40px;
          color: #f59e0b;
        }

        .teacher-empty h3 {
          color: #334155;
        }

        .teacher-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15,23,42,.58);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 20px;
        }

        .teacher-modal {
          width: 560px;
          max-width: 100%;
          background: white;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0,0,0,.25);
        }

        .teacher-modal-header {
          background: linear-gradient(135deg,#312e81,#4f46e5);
          color: white;
          padding: 28px;
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .teacher-modal-avatar {
          background: rgba(255,255,255,.2);
          width: 65px;
          height: 65px;
        }

        .teacher-modal-header h2 {
          margin: 0 0 5px;
        }

        .teacher-modal-header p {
          margin: 0;
          opacity: .8;
        }

        .teacher-modal-body {
          padding: 25px;
        }

        .modal-row {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding: 14px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .modal-row span {
          color: #64748b;
        }

        .modal-row strong {
          color: #172554;
          text-align: right;
        }

        .teacher-modal-actions {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
          padding: 20px 25px 25px;
        }

        .teacher-modal-actions button {
          border: none;
          border-radius: 10px;
          padding: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .teacher-edit-modal {
          background: #fef3c7;
          color: #92400e;
        }

        .teacher-delete-modal {
          background: #fee2e2;
          color: #dc2626;
        }

        .teacher-close-modal {
          background: #334155;
          color: white;
        }

        @media(max-width:1100px) {

          .teacher-grid {
            grid-template-columns: repeat(2,1fr);
          }

          .teacher-form-grid {
            grid-template-columns: repeat(2,1fr);
          }

        }

        @media(max-width:800px) {

          .teacher-main {
            margin-left: 0;
          }

          .teacher-content {
            padding: 20px;
          }

          .teacher-grid {
            grid-template-columns: 1fr;
          }

          .teacher-form-grid {
            grid-template-columns: 1fr;
          }

          .teacher-topbar {
            padding: 0 18px;
          }

        }

      `}</style>

    </div>

  );

}