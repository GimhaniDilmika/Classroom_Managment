import React, { useState, useRef } from "react";
import Sidebar from "../Components/Sidebar";
import "./AddStudent.css";

export default function AddStudent() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", studentId: "", gender: "",
    dob: "", className: "", religion: "", joiningDate: "",
    mobile: "", admissionNumber: "", section: "",
    fatherName: "", fatherOccupation: "", fatherMobile: "", fatherEmail: "",
    motherName: "", motherOccupation: "", motherMobile: "", motherEmail: "",
    presentAddress: "", permanentAddress: "",
  });

  const [studentImage, setStudentImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setStudentImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  function handleRemoveImage() {
    setStudentImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    console.log("Form:", form, "Image:", studentImage);
  }

  const initials = `${form.firstName?.[0] || ""}${form.lastName?.[0] || ""}`.toUpperCase() || "?";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        [data-theme="dark"] .add-page { background: #020617; }
        [data-theme="dark"] .add-card { background: #0f172a; border-color: rgba(245,158,11,0.1); }
        [data-theme="dark"] .add-card .section-title { color: #e2e8f0; }
        [data-theme="dark"] .form-group label { color: #94a3b8; }
        [data-theme="dark"] .form-group input,
        [data-theme="dark"] .form-group select,
        [data-theme="dark"] .form-group textarea { background: #1e293b; border-color: #334155; color: #e2e8f0; }
        [data-theme="dark"] .add-page-title { color: #e2e8f0; }
        [data-theme="dark"] .add-breadcrumb { color: #64748b; }
        [data-theme="dark"] .avatar-placeholder { background: linear-gradient(135deg, #1e293b, #334155); color: #64748b; }
        [data-theme="dark"] .avatar-hint { color: #475569; }
        [data-theme="dark"] .avatar-box { border-color: rgba(245,158,11,0.2); background: #0f172a; }
        [data-theme="dark"] .success-toast { background: #064e3b; border-color: #10b981; color: #6ee7b7; }

        .add-layout { display: flex; min-height: 100vh; background: #f1f5f9; transition: background 0.4s; }
        .add-page { flex: 1; margin-left: 16rem; padding: 2rem 2.5rem; font-family: 'DM Sans', sans-serif; }

        .add-page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .add-page-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: #0f172a;
          background: linear-gradient(90deg, #302b63, #ef4444);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .add-breadcrumb { font-size: 12px; color: #94a3b8; margin-top: 4px; }
        .add-breadcrumb span { color: #f59e0b; font-weight: 600; }

        .add-card {
          background: #fff;
          border-radius: 1.25rem;
          padding: 2rem;
          box-shadow: 0 4px 24px rgba(15,23,42,0.06);
          border: 1px solid #f1f5f9;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-title::before {
          content: '';
          display: inline-block;
          width: 4px; height: 18px;
          background: linear-gradient(180deg, #f59e0b, #ef4444);
          border-radius: 4px;
        }
        .section-divider {
          border: none;
          border-top: 1px solid #f1f5f9;
          margin: 1.75rem 0;
        }

        /* AVATAR BOX */
        .avatar-box {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.25rem;
          background: #fafafa;
          border: 1.5px dashed #e2e8f0;
          border-radius: 1rem;
          margin-bottom: 1.5rem;
          transition: border-color 0.2s;
        }
        .avatar-box:hover { border-color: #f59e0b; }
        .avatar-preview {
          width: 80px; height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #f59e0b;
          box-shadow: 0 4px 12px rgba(245,158,11,0.25);
          flex-shrink: 0;
        }
        .avatar-placeholder {
          width: 80px; height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #94a3b8;
          border: 3px solid #e2e8f0;
          flex-shrink: 0;
          letter-spacing: 1px;
        }
        .avatar-info { flex: 1; }
        .avatar-name {
          font-weight: 700;
          font-size: 1rem;
          color: #0f172a;
          margin-bottom: 2px;
        }
        .avatar-hint { font-size: 0.75rem; color: #94a3b8; margin-bottom: 10px; }
        .avatar-btns { display: flex; gap: 8px; }
        .avatar-upload-btn {
          padding: 6px 14px;
          background: linear-gradient(90deg, #f59e0b, #ef4444);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .avatar-upload-btn:hover { opacity: 0.9; }
        .avatar-remove-btn {
          padding: 6px 14px;
          background: #fee2e2;
          color: #dc2626;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .avatar-remove-btn:hover { background: #fecaca; }
        .avatar-file-input { display: none; }

        /* FORM GRID */
        .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px 20px; }
        .form-group-full { grid-column: 1 / -1; }
        .form-group { display: flex; flex-direction: column; }
        .form-group label { font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.04em; }
        .form-group input,
        .form-group select,
        .form-group textarea {
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          padding: 9px 12px;
          font-size: 13.5px;
          outline: none;
          background: #ffffff;
          color: #0f172a;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245,158,11,0.12);
        }

        .form-submit-wrapper { margin-top: 2rem; display: flex; align-items: center; gap: 12px; }
        .form-submit-btn {
          background: linear-gradient(90deg, #f59e0b, #ef4444);
          color: #fff;
          border: none;
          padding: 10px 32px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
          box-shadow: 0 4px 14px rgba(245,158,11,0.3);
          letter-spacing: 0.02em;
        }
        .form-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(245,158,11,0.4); }
        .form-submit-btn:active { transform: translateY(0); }

        .success-toast {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 16px;
          background: #ecfdf5;
          border: 1.5px solid #10b981;
          color: #065f46;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 900px) {
          .add-page { padding: 1rem; }
          .form-grid { grid-template-columns: 1fr; }
          .add-page-header { flex-direction: column; gap: 12px; }
        }
      `}</style>

      <div className="add-layout">
        <Sidebar />
        <main className="add-page">
          <header className="add-page-header">
            <div>
              <h1 className="add-page-title">Add Student</h1>
              <p className="add-breadcrumb">Students <span>/ Add Students</span></p>
            </div>
          </header>

          <section className="add-card">
            <form onSubmit={handleSubmit}>

              {/* AVATAR PREVIEW */}
              <div className="avatar-box">
                {previewUrl
                  ? <img src={previewUrl} alt="Student" className="avatar-preview" />
                  : <div className="avatar-placeholder">{initials}</div>
                }
                <div className="avatar-info">
                  <p className="avatar-name">
                    {form.firstName || form.lastName
                      ? `${form.firstName} ${form.lastName}`.trim()
                      : "Student Name"}
                  </p>
                  <p className="avatar-hint">JPG, PNG or GIF · Max 2MB</p>
                  <div className="avatar-btns">
                    <button type="button" className="avatar-upload-btn" onClick={() => fileInputRef.current?.click()}>
                      Upload Photo
                    </button>
                    {previewUrl && (
                      <button type="button" className="avatar-remove-btn" onClick={handleRemoveImage}>
                        Remove
                      </button>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="avatar-file-input" onChange={handleImageChange} />
                </div>
              </div>

              {/* STUDENT INFO */}
              <h2 className="section-title">Student Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Enter first name" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Enter last name" />
                </div>
                <div className="form-group">
                  <label>Student ID</label>
                  <input type="text" name="studentId" value={form.studentId} onChange={handleChange} placeholder="e.g. STU-001" />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={form.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input type="date" name="dob" value={form.dob} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Class</label>
                  <input type="text" name="className" value={form.className} onChange={handleChange} placeholder="e.g. Grade 10" />
                </div>
                <div className="form-group">
                  <label>Religion</label>
                  <input type="text" name="religion" value={form.religion} onChange={handleChange} placeholder="Enter religion" />
                </div>
                <div className="form-group">
                  <label>Joining Date</label>
                  <input type="date" name="joiningDate" value={form.joiningDate} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="text" name="mobile" value={form.mobile} onChange={handleChange} placeholder="e.g. 077 123 4567" />
                </div>
                <div className="form-group">
                  <label>Admission Number</label>
                  <input type="text" name="admissionNumber" value={form.admissionNumber} onChange={handleChange} placeholder="Enter admission number" />
                </div>
                <div className="form-group">
                  <label>Section</label>
                  <input type="text" name="section" value={form.section} onChange={handleChange} placeholder="e.g. A" />
                </div>
              </div>

              <hr className="section-divider" />

              {/* PARENT INFO */}
              <h2 className="section-title">Parent Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Father's Name</label>
                  <input type="text" name="fatherName" value={form.fatherName} onChange={handleChange} placeholder="Enter father's name" />
                </div>
                <div className="form-group">
                  <label>Father's Occupation</label>
                  <input type="text" name="fatherOccupation" value={form.fatherOccupation} onChange={handleChange} placeholder="Enter occupation" />
                </div>
                <div className="form-group">
                  <label>Father's Mobile</label>
                  <input type="text" name="fatherMobile" value={form.fatherMobile} onChange={handleChange} placeholder="Enter mobile" />
                </div>
                <div className="form-group">
                  <label>Father's Email</label>
                  <input type="email" name="fatherEmail" value={form.fatherEmail} onChange={handleChange} placeholder="Enter email" />
                </div>
                <div className="form-group">
                  <label>Mother's Name</label>
                  <input type="text" name="motherName" value={form.motherName} onChange={handleChange} placeholder="Enter mother's name" />
                </div>
                <div className="form-group">
                  <label>Mother's Occupation</label>
                  <input type="text" name="motherOccupation" value={form.motherOccupation} onChange={handleChange} placeholder="Enter occupation" />
                </div>
                <div className="form-group">
                  <label>Mother's Mobile</label>
                  <input type="text" name="motherMobile" value={form.motherMobile} onChange={handleChange} placeholder="Enter mobile" />
                </div>
                <div className="form-group">
                  <label>Mother's Email</label>
                  <input type="email" name="motherEmail" value={form.motherEmail} onChange={handleChange} placeholder="Enter email" />
                </div>
                <div className="form-group form-group-full">
                  <label>Present Address</label>
                  <textarea name="presentAddress" value={form.presentAddress} onChange={handleChange} rows={2} placeholder="Enter present address" />
                </div>
                <div className="form-group form-group-full">
                  <label>Permanent Address</label>
                  <textarea name="permanentAddress" value={form.permanentAddress} onChange={handleChange} rows={2} placeholder="Enter permanent address" />
                </div>
              </div>

              <div className="form-submit-wrapper">
                <button type="submit" className="form-submit-btn">Submit Student</button>
                {submitted && (
                  <div className="success-toast">✓ Student added successfully!</div>
                )}
              </div>
            </form>
          </section>
        </main>
      </div>
    </>
  );
}
