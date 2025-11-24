import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import "./AddStudent.css";


export default function AddStudent() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    gender: "",
    dob: "",
    className: "",
    religion: "",
    joiningDate: "",
    mobile: "",
    admissionNumber: "",
    section: "",
    fatherName: "",
    fatherOccupation: "",
    fatherMobile: "",
    fatherEmail: "",
    motherName: "",
    motherOccupation: "",
    motherMobile: "",
    motherEmail: "",
    presentAddress: "",
    permanentAddress: "",
  });

  const [studentImage, setStudentImage] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    setStudentImage(file || null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Add Student form submitted");
    console.log("Form data:", form);
    console.log("Student image:", studentImage);
    // here you can send data to backend later
  }

  return (
    <div className="layout-wrapper">
      <Sidebar />

      <main className="page-main">
        {/* PAGE HEADER */}
        <header className="page-header">
          <div>
            <h1 className="page-title">Add Students</h1>
            <p className="page-breadcrumb">
              Students <span>/ Add Students</span>
            </p>
          </div>

          <div className="page-search">
            <input
              type="text"
              placeholder="Search here"
              className="page-search-input"
            />
            <span className="page-search-icon">🔍</span>
          </div>
        </header>

        {/* CARD CONTAINER */}
        <section className="page-card">
          <form onSubmit={handleSubmit}>
            {/* STUDENT INFORMATION */}
            <h2 className="section-title">Student Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
              </div>

              <div className="form-group">
                <label>Student Id</label>
                <input
                  type="text"
                  name="studentId"
                  value={form.studentId}
                  onChange={handleChange}
                  placeholder="Enter student ID"
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Class</label>
                <input
                  type="text"
                  name="className"
                  value={form.className}
                  onChange={handleChange}
                  placeholder="Enter class"
                />
              </div>

              <div className="form-group">
                <label>Religion</label>
                <input
                  type="text"
                  name="religion"
                  value={form.religion}
                  onChange={handleChange}
                  placeholder="Enter religion"
                />
              </div>

              <div className="form-group">
                <label>Joining Date</label>
                <input
                  type="date"
                  name="joiningDate"
                  value={form.joiningDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                />
              </div>

              <div className="form-group">
                <label>Admission Number</label>
                <input
                  type="text"
                  name="admissionNumber"
                  value={form.admissionNumber}
                  onChange={handleChange}
                  placeholder="Enter admission number"
                />
              </div>

              <div className="form-group">
                <label>Section</label>
                <input
                  type="text"
                  name="section"
                  value={form.section}
                  onChange={handleChange}
                  placeholder="Enter section"
                />
              </div>

              <div className="form-group">
                <label>Student Image</label>
                <input type="file" onChange={handleImageChange} />
              </div>
            </div>

            {/* PARENT INFORMATION */}
            <h2 className="section-title mt-24">Parent Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Father's Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={form.fatherName}
                  onChange={handleChange}
                  placeholder="Enter father's name"
                />
              </div>

              <div className="form-group">
                <label>Father's Occupation</label>
                <input
                  type="text"
                  name="fatherOccupation"
                  value={form.fatherOccupation}
                  onChange={handleChange}
                  placeholder="Enter father's occupation"
                />
              </div>

              <div className="form-group">
                <label>Father's Mobile</label>
                <input
                  type="text"
                  name="fatherMobile"
                  value={form.fatherMobile}
                  onChange={handleChange}
                  placeholder="Enter father's mobile"
                />
              </div>

              <div className="form-group">
                <label>Father's Email</label>
                <input
                  type="email"
                  name="fatherEmail"
                  value={form.fatherEmail}
                  onChange={handleChange}
                  placeholder="Enter father's email"
                />
              </div>

              <div className="form-group">
                <label>Mother's Name</label>
                <input
                  type="text"
                  name="motherName"
                  value={form.motherName}
                  onChange={handleChange}
                  placeholder="Enter mother's name"
                />
              </div>

              <div className="form-group">
                <label>Mother's Occupation</label>
                <input
                  type="text"
                  name="motherOccupation"
                  value={form.motherOccupation}
                  onChange={handleChange}
                  placeholder="Enter mother's occupation"
                />
              </div>

              <div className="form-group">
                <label>Mother's Mobile</label>
                <input
                  type="text"
                  name="motherMobile"
                  value={form.motherMobile}
                  onChange={handleChange}
                  placeholder="Enter mother's mobile"
                />
              </div>

              <div className="form-group">
                <label>Mother's Email</label>
                <input
                  type="email"
                  name="motherEmail"
                  value={form.motherEmail}
                  onChange={handleChange}
                  placeholder="Enter mother's email"
                />
              </div>

              <div className="form-group form-group-full">
                <label>Present Address</label>
                <textarea
                  name="presentAddress"
                  value={form.presentAddress}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Enter present address"
                />
              </div>

              <div className="form-group form-group-full">
                <label>Permanent Address</label>
                <textarea
                  name="permanentAddress"
                  value={form.permanentAddress}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Enter permanent address"
                />
              </div>
            </div>

            <div className="form-submit-wrapper">
              <button type="submit" className="form-submit-btn">
                Submit
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
