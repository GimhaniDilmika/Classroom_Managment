import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Components/Sidebar.jsx";
import API from "../api/api";

import "./StudentListPage.css";

import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaUserGraduate,
  FaPhone,
  FaSchool
} from "react-icons/fa";


const GRADES = [
  "All",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
  "Grade 13"
];


export default function StudentListPage() {

  const navigate = useNavigate();


  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  const [grade, setGrade] = useState("All");

  const [gender, setGender] = useState("All");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ==========================
  // LOAD STUDENTS
  // ==========================

  useEffect(() => {

    loadStudents();

  }, []);


  const loadStudents = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await API.get(
        "/admin/students"
      );

      setStudents(response.data || []);

    }

    catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to load students."
      );

    }

    finally {

      setLoading(false);

    }

  };


  // ==========================
  // DELETE STUDENT
  // ==========================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );


    if (!confirmed) {
      return;
    }


    try {

      await API.delete(
        `/admin/users/${id}`
      );


      setStudents((previous) =>
        previous.filter(
          (student) => student._id !== id
        )
      );


      alert("Student deleted successfully.");

    }

    catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        "Failed to delete student."
      );

    }

  };


  // ==========================
  // FILTER STUDENTS
  // ==========================

  const filteredStudents = students.filter(
    (student) => {

      const keyword =
        search.trim().toLowerCase();


      const name =
        student.name?.toLowerCase() || "";


      const studentId =
        student.studentId?.toLowerCase() || "";


      const mobile =
        student.mobile || "";


      const matchesSearch =
        name.includes(keyword) ||
        studentId.includes(keyword) ||
        mobile.includes(search.trim());


      const matchesGrade =
        grade === "All" ||
        student.className === grade;


      const matchesGender =
        gender === "All" ||
        student.gender === gender;


      return (
        matchesSearch &&
        matchesGrade &&
        matchesGender
      );

    }
  );


  // ==========================
  // VIEW PROFILE
  // ==========================

  const handleView = (student) => {

    navigate(
      "/students/view",
      {
        state: {
          student
        }
      }
    );

  };


  // ==========================
  // RENDER
  // ==========================

  return (

    <div className="sl-page">

      <Sidebar />


      {/* =========================
          TOP BAR
      ========================= */}

      <header className="sl-topbar">

        <div className="sl-top-title">

          <FaUserGraduate />

          <span>
            Student Management
          </span>

        </div>


        <button
          className="sl-add-btn"
          onClick={() =>
            navigate("/students/add")
          }
        >

          <FaPlus />

          Add Student

        </button>

      </header>



      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="sl-content">


        <div className="sl-header">

          <div>

            <h1>
              Student List
            </h1>

            <p>
              View and manage all registered students
            </p>

          </div>


          <div className="sl-total">

            {filteredStudents.length}

            <span>
              Students
            </span>

          </div>

        </div>



        {/* =========================
            FILTER BAR
        ========================= */}

        <div className="sl-filter-bar">


          <div className="sl-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search name, ID or mobile..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>



          <select
            value={grade}
            onChange={(e) =>
              setGrade(e.target.value)
            }
          >

            {GRADES.map((item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            ))}

          </select>



          <select
            value={gender}
            onChange={(e) =>
              setGender(e.target.value)
            }
          >

            <option value="All">
              All Genders
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

          </select>


        </div>



        {/* =========================
            ERROR
        ========================= */}

        {error && (

          <div className="sl-error">

            {error}

            <button
              onClick={loadStudents}
            >
              Retry
            </button>

          </div>

        )}



        {/* =========================
            LOADING
        ========================= */}

        {loading ? (

          <div className="sl-loading">

            <div className="sl-spinner"></div>

            <p>
              Loading students...
            </p>

          </div>

        ) : (


          /* =========================
             TABLE
          ========================= */

          <div className="sl-table-container">

            {filteredStudents.length === 0 ? (

              <div className="sl-empty">

                <FaUserGraduate />

                <h3>
                  No students found
                </h3>

                <p>
                  Try changing your search or filters.
                </p>

              </div>

            ) : (

              <table className="sl-table">

                <thead>

                  <tr>

                    <th>
                      #
                    </th>

                    <th>
                      Student
                    </th>

                    <th>
                      Student ID
                    </th>

                    <th>
                      Gender
                    </th>

                    <th>
                      Class
                    </th>

                    <th>
                      Mobile
                    </th>

                    <th>
                      Parent
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredStudents.map(
                    (student, index) => (

                    <tr
                      key={student._id}
                    >

                      {/* NUMBER */}

                      <td>

                        <div className="sl-number">

                          {index + 1}

                        </div>

                      </td>


                      {/* STUDENT */}

                      <td>

                        <div className="sl-student">

                          <div className="sl-avatar">

                            {student.name
                              ?.charAt(0)
                              ?.toUpperCase() || "?"}

                          </div>


                          <div>

                            <strong>
                              {student.name || "N/A"}
                            </strong>

                            <span>
                              Student
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* ID */}

                      <td>

                        <span className="sl-id">

                          {student.studentId ||
                            "N/A"}

                        </span>

                      </td>


                      {/* GENDER */}

                      <td>

                        <span
                          className={
                            student.gender === "Male"
                              ? "sl-gender male"
                              : "sl-gender female"
                          }
                        >

                          {student.gender ||
                            "N/A"}

                        </span>

                      </td>


                      {/* CLASS */}

                      <td>

                        <div className="sl-class">

                          <FaSchool />

                          {student.className ||
                            "N/A"}

                        </div>

                      </td>


                      {/* MOBILE */}

                      <td>

                        <div className="sl-phone">

                          <FaPhone />

                          {student.mobile ||
                            "N/A"}

                        </div>

                      </td>


                      {/* PARENT */}

                      <td>

                        <div className="sl-parent">

                          <strong>

                            {student.fatherName ||
                              student.motherName ||
                              "N/A"}

                          </strong>

                          <span>

                            Parent / Guardian

                          </span>

                        </div>

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="sl-actions">


                          <button
                            className="sl-view"
                            title="View Profile"
                            onClick={() =>
                              handleView(student)
                            }
                          >

                            <FaEye />

                          </button>



                          <button
                            className="sl-edit"
                            title="Edit Student"
                            onClick={() =>
                              navigate(
                                `/students/edit/${student._id}`
                              )
                            }
                          >

                            <FaEdit />

                          </button>



                          <button
                            className="sl-delete"
                            title="Delete Student"
                            onClick={() =>
                              handleDelete(
                                student._id
                              )
                            }
                          >

                            <FaTrash />

                          </button>


                        </div>

                      </td>


                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        )}


      </main>

    </div>

  );

}