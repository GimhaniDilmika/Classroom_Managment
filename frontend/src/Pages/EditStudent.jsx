import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../Components/Sidebar.jsx";
import API from "../api/api";

import "./EditStudent.css";

import {
  FaUserGraduate,
  FaArrowLeft,
  FaSave,
  FaUser,
  FaPhone,
  FaSchool,
  FaVenusMars,
  FaUsers
} from "react-icons/fa";


const GRADES = [
  "grade 07",
  "grade 08",
  "grade 09",
  "grade 10",
  "grade 11",
  "grade 12",
  "grade 13"
];


export default function EditStudent() {

  const { id } = useParams();

  const navigate = useNavigate();


  const [student, setStudent] = useState({

    name: "",
    studentId: "",
    gender: "",
    className: "",
    mobile: "",

    fatherName: "",
    fatherMobile: "",

    motherName: "",
    motherMobile: ""

  });


  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");


  // ==========================================
  // LOAD STUDENT
  // ==========================================

  useEffect(() => {

    loadStudent();

  }, [id]);


  const loadStudent = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await API.get(
        `/admin/students/${id}`
      );


      const data =
        response.data?.student ||
        response.data?.data ||
        response.data;


      setStudent({

        name: data.name || "",

        studentId: data.studentId || "",

        gender: data.gender || "",

        className: data.className || "",

        mobile: data.mobile || "",

        fatherName: data.fatherName || "",

        fatherMobile: data.fatherMobile || "",

        motherName: data.motherName || "",

        motherMobile: data.motherMobile || ""

      });

    }

    catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to load student information."
      );

    }

    finally {

      setLoading(false);

    }

  };


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setStudent((previous) => ({

      ...previous,

      [name]: value

    }));

  };


  // ==========================================
  // UPDATE STUDENT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    setError("");

    setSuccess("");


    if (!student.name.trim()) {

      setError("Student name is required.");

      return;

    }


    if (!student.mobile.trim()) {

      setError("Student mobile number is required.");

      return;

    }


    try {

      setSaving(true);


      await API.put(

        `/admin/students/${id}`,

        student

      );


      setSuccess(
        "Student information updated successfully."
      );


      setTimeout(() => {

        navigate("/students/view");

      }, 1000);

    }

    catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to update student."
      );

    }

    finally {

      setSaving(false);

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="es-page">

        <Sidebar />

        <main className="es-content">

          <div className="es-loading">

            <div className="es-spinner"></div>

            <h3>
              Loading student information...
            </h3>

          </div>

        </main>

      </div>

    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="es-page">

      <Sidebar />


      {/* ======================================
          TOP BAR
      ====================================== */}

      <header className="es-topbar">

        <div className="es-top-title">

          <FaUserGraduate />

          <span>
            Student Management
          </span>

        </div>


        <button

          className="es-back-btn"

          onClick={() =>
            navigate("/students/view")
          }

        >

          <FaArrowLeft />

          Back to Students

        </button>

      </header>


      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <main className="es-content">


        {/* HEADER */}

        <div className="es-header">

          <div>

            <h1>
              Edit Student
            </h1>

            <p>
              Update student academic and personal information
            </p>

          </div>


          <div className="es-student-badge">

            <div className="es-badge-avatar">

              {student.name
                ?.charAt(0)
                ?.toUpperCase() || "?"}

            </div>


            <div>

              <strong>
                {student.name || "Student"}
              </strong>

              <span>
                {student.studentId || "No ID"}
              </span>

            </div>

          </div>

        </div>


        {/* ======================================
            ERROR
        ====================================== */}

        {error && (

          <div className="es-alert es-error">

            <strong>
              Error
            </strong>

            <span>
              {error}
            </span>

          </div>

        )}


        {/* ======================================
            SUCCESS
        ====================================== */}

        {success && (

          <div className="es-alert es-success">

            <strong>
              Success
            </strong>

            <span>
              {success}
            </span>

          </div>

        )}


        {/* ======================================
            FORM
        ====================================== */}

        <form
          className="es-form"
          onSubmit={handleSubmit}
        >


          {/* ==================================
              PERSONAL INFORMATION
          ================================== */}

          <section className="es-section">

            <div className="es-section-title">

              <div className="es-section-icon personal">

                <FaUser />

              </div>

              <div>

                <h2>
                  Personal Information
                </h2>

                <p>
                  Basic information about the student
                </p>

              </div>

            </div>


            <div className="es-grid">


              {/* NAME */}

              <div className="es-field es-full">

                <label>
                  Full Name
                  <span>*</span>
                </label>

                <div className="es-input-wrap">

                  <FaUser />

                  <input

                    type="text"

                    name="name"

                    value={student.name}

                    onChange={handleChange}

                    placeholder="Enter student's full name"

                  />

                </div>

              </div>


              {/* STUDENT ID */}

              <div className="es-field">

                <label>
                  Student ID
                </label>

                <div className="es-input-wrap">

                  <FaUserGraduate />

                  <input

                    type="text"

                    name="studentId"

                    value={student.studentId}

                    onChange={handleChange}

                    placeholder="Example: S002"

                  />

                </div>

              </div>


              {/* GENDER */}

              <div className="es-field">

                <label>
                  Gender
                </label>

                <div className="es-input-wrap">

                  <FaVenusMars />

                  <select

                    name="gender"

                    value={student.gender}

                    onChange={handleChange}

                  >

                    <option value="">
                      Select gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                  </select>

                </div>

              </div>


              {/* MOBILE */}

              <div className="es-field">

                <label>
                  Student Mobile
                  <span>*</span>
                </label>

                <div className="es-input-wrap">

                  <FaPhone />

                  <input

                    type="tel"

                    name="mobile"

                    value={student.mobile}

                    onChange={handleChange}

                    placeholder="0771234567"

                  />

                </div>

              </div>


              {/* CLASS */}

              <div className="es-field">

                <label>
                  Class
                </label>

                <div className="es-input-wrap">

                  <FaSchool />

                  <select

                    name="className"

                    value={student.className}

                    onChange={handleChange}

                  >

                    <option value="">
                      Select class
                    </option>


                    {GRADES.map((grade) => (

                      <option
                        key={grade}
                        value={grade}
                      >

                        {grade}

                      </option>

                    ))}


                  </select>

                </div>

              </div>


            </div>

          </section>


          {/* ==================================
              PARENT INFORMATION
          ================================== */}

          <section className="es-section">

            <div className="es-section-title">

              <div className="es-section-icon parent">

                <FaUsers />

              </div>

              <div>

                <h2>
                  Parent / Guardian Information
                </h2>

                <p>
                  Contact details of the student's parents
                </p>

              </div>

            </div>


            <div className="es-grid">


              {/* FATHER */}

              <div className="es-field">

                <label>
                  Father's Name
                </label>

                <div className="es-input-wrap">

                  <FaUser />

                  <input

                    type="text"

                    name="fatherName"

                    value={student.fatherName}

                    onChange={handleChange}

                    placeholder="Father's name"

                  />

                </div>

              </div>


              {/* FATHER MOBILE */}

              <div className="es-field">

                <label>
                  Father's Mobile
                </label>

                <div className="es-input-wrap">

                  <FaPhone />

                  <input

                    type="tel"

                    name="fatherMobile"

                    value={student.fatherMobile}

                    onChange={handleChange}

                    placeholder="0771234567"

                  />

                </div>

              </div>


              {/* MOTHER */}

              <div className="es-field">

                <label>
                  Mother's Name
                </label>

                <div className="es-input-wrap">

                  <FaUser />

                  <input

                    type="text"

                    name="motherName"

                    value={student.motherName}

                    onChange={handleChange}

                    placeholder="Mother's name"

                  />

                </div>

              </div>


              {/* MOTHER MOBILE */}

              <div className="es-field">

                <label>
                  Mother's Mobile
                </label>

                <div className="es-input-wrap">

                  <FaPhone />

                  <input

                    type="tel"

                    name="motherMobile"

                    value={student.motherMobile}

                    onChange={handleChange}

                    placeholder="0771234567"

                  />

                </div>

              </div>


            </div>

          </section>


          {/* ==================================
              BUTTONS
          ================================== */}

          <div className="es-actions">


            <button

              type="button"

              className="es-cancel"

              onClick={() =>
                navigate("/students/view")
              }

              disabled={saving}

            >

              Cancel

            </button>


            <button

              type="submit"

              className="es-save"

              disabled={saving}

            >

              {saving ? (

                <>
                  <span className="es-small-spinner"></span>
                  Saving...
                </>

              ) : (

                <>
                  <FaSave />
                  Save Changes
                </>

              )}

            </button>


          </div>


        </form>


      </main>

    </div>

  );

}