import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Components/Sidebar.jsx";
import API from "../api/api";

import "./Subjects.css";

import {
  FaBook,
  FaArrowLeft,
  FaSave
} from "react-icons/fa";


export default function Subjects() {

  const navigate = useNavigate();


  const [form, setForm] = useState({

    name: "",
    code: "",
    gradeLevel: "",
    description: ""

  });


  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setForm(prev => ({

      ...prev,

      [name]: value

    }));

  };


  // =====================================================
  // SAVE SUBJECT
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    setError("");

    setSuccess("");


    if (!form.name.trim()) {

      setError(
        "Subject name is required."
      );

      return;

    }


    try {

      setLoading(true);


      const response =
        await API.post(
          "/admin/subjects",
          {

            name:
              form.name.trim(),

            code:
              form.code.trim(),

            gradeLevel:
              form.gradeLevel.trim(),

            description:
              form.description.trim()

          }
        );


      console.log(
        "SUBJECT CREATED:",
        response.data
      );


      setSuccess(
        "Subject created successfully."
      );


      setForm({

        name: "",
        code: "",
        gradeLevel: "",
        description: ""

      });


    } catch (error) {

      console.log(
        "SAVE SUBJECT ERROR:",
        error.response?.data ||
        error
      );


      setError(

        error.response?.data?.message ||

        "Failed to save subject."

      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // BACK
  // =====================================================

  const handleBack = () => {

    navigate(-1);

  };


  return (

    <div className="subject-page">

      <Sidebar />


      <div className="subject-main">


        {/* TOP BAR */}

        <header className="subject-topbar">

          <div className="subject-top-title">

            <div className="subject-top-icon">

              <FaBook />

            </div>

            <span>
              Subjects
            </span>

          </div>


          <button
            className="subject-back-btn"
            onClick={handleBack}
          >

            <FaArrowLeft />

            Back

          </button>

        </header>


        {/* CONTENT */}

        <main className="subject-content">


          <div className="subject-heading">

            <h1>
              Add Subject
            </h1>

            <p>
              Create a new subject
            </p>

          </div>


          {/* ERROR */}

          {error && (

            <div className="subject-alert error">

              <strong>
                Error
              </strong>

              <span>
                {error}
              </span>

            </div>

          )}


          {/* SUCCESS */}

          {success && (

            <div className="subject-alert success">

              {success}

            </div>

          )}


          {/* FORM CARD */}

          <form
            className="subject-form-card"
            onSubmit={handleSubmit}
          >


            <div className="subject-form-header">


              <div className="subject-form-icon">

                <FaBook />

              </div>


              <div>

                <h2>
                  New Subject
                </h2>

                <p>
                  Enter the subject details below
                </p>

              </div>


            </div>


            <div className="subject-divider"></div>


            {/* SUBJECT NAME */}

            <div className="subject-field full">

              <label>

                Subject Name

                <span>
                  *
                </span>

              </label>


              <input

                type="text"

                name="name"

                value={form.name}

                onChange={handleChange}

                placeholder="e.g. Mathematics"

                required

              />

            </div>


            {/* TWO COLUMNS */}

            <div className="subject-row">


              <div className="subject-field">

                <label>
                  Subject Code
                </label>


                <input

                  type="text"

                  name="code"

                  value={form.code}

                  onChange={handleChange}

                  placeholder="e.g. MATH101"

                />

              </div>


              <div className="subject-field">

                <label>
                  Grade Level
                </label>


                <input

                  type="text"

                  name="gradeLevel"

                  value={form.gradeLevel}

                  onChange={handleChange}

                  placeholder="e.g. Grade 10-12"

                />

              </div>


            </div>


            {/* DESCRIPTION */}

            <div className="subject-field full">

              <label>
                Description
              </label>


              <textarea

                name="description"

                value={form.description}

                onChange={handleChange}

                placeholder="Enter subject description..."

                rows="5"

              />

            </div>


            {/* BUTTONS */}

            <div className="subject-actions">


              <button

                type="button"

                className="subject-cancel"

                onClick={handleBack}

              >

                Cancel

              </button>


              <button

                type="submit"

                className="subject-save"

                disabled={loading}

              >

                <FaSave />

                {loading
                  ? "Saving..."
                  : "Save Subject"
                }

              </button>


            </div>


          </form>


        </main>

      </div>

    </div>

  );

}