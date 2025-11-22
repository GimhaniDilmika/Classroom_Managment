import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";

export default function StudentsPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    school: "",
    grade: "",
    subjects: "",
    contactNumber: "",
    parentName: "",
    parentContactNumber: "",
    siblings: "",
    dob: "",
    address: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Registration submitted:", form);
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />

      <main className="flex-1 p-6">
        {/* TOP HEADER */}
        <header className="h-16 flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-slate-800">
            Classroom Management System
          </h1>
        </header>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Student Registration
        </h2>

        <div className="max-w-5xl mx-auto">
          {/* TOP THREE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-white text-4xl font-bold">
                {form.firstName ? form.firstName[0].toUpperCase() : "S"}
              </div>
              <h3 className="mt-3 font-semibold text-slate-800">
                {form.firstName || "Student"} {form.lastName}
              </h3>
              <p className="text-xs text-slate-500">New Registration</p>
            </div>

            {/* Support Card */}
            <div className="rounded-2xl shadow p-6 bg-indigo-500 text-white">
              <h4 className="font-semibold text-lg">Contact Support</h4>
              <p className="mt-1 text-sm opacity-90">Chat with us 👋</p>
              <p className="text-xs mt-2 bg-white/20 inline-block px-2 py-1 rounded">
                ✔ Active Support
              </p>
            </div>

            {/* Verification Card */}
            <div className="rounded-2xl shadow p-6 bg-amber-400 text-white">
              <h4 className="font-semibold text-lg">Student Verification</h4>
              <p className="mt-1 text-sm opacity-90">Verification Pending…</p>
              <p className="text-xs mt-2 bg-white/20 inline-block px-2 py-1 rounded">
                ⏳ Pending
              </p>
            </div>
          </div>

          {/* FORM CARD */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <p className="text-center text-sm text-slate-500 mb-6">
              Fill in the student details below.
            </p>

            {/* FORM START */}
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={handleSubmit}
            >
              {/* FIRST NAME */}
              <div>
                <label className="text-sm font-medium">First Name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="mt-1 px-3 py-2 rounded-lg w-full border border-slate-300"
                />
              </div>

              {/* LAST NAME */}
              <div>
                <label className="text-sm font-medium">Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="mt-1 px-3 py-2 rounded-lg w-full border border-slate-300"
                />
              </div>

              {/* SCHOOL */}
              <div>
                <label className="text-sm font-medium">School</label>
                <input
                  name="school"
                  value={form.school}
                  onChange={handleChange}
                  className="mt-1 px-3 py-2 rounded-lg w-full border border-slate-300"
                />
              </div>

              {/* GRADE */}
              <div>
                <label className="text-sm font-medium">Grade</label>
                <input
                  name="grade"
                  value={form.grade}
                  onChange={handleChange}
                  placeholder="10 / 11 / A/L"
                  className="mt-1 px-3 py-2 rounded-lg w-full border border-slate-300"
                />
              </div>

              {/* SUBJECTS */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Subjects</label>
                <input
                  name="subjects"
                  value={form.subjects}
                  onChange={handleChange}
                  placeholder="e.g. Maths, Science, English…"
                  className="mt-1 px-3 py-2 rounded-lg w-full border border-slate-300"
                />
              </div>

              {/* STUDENT CONTACT */}
              <div>
                <label className="text-sm font-medium">Student Contact</label>
                <input
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={handleChange}
                  placeholder="07X XXXXXXX"
                  className="mt-1 px-3 py-2 rounded-lg w-full border border-slate-300"
                />
              </div>

              {/* PARENT CONTACT */}
              <div>
                <label className="text-sm font-medium">Parent Contact</label>
                <input
                  name="parentContactNumber"
                  value={form.parentContactNumber}
                  onChange={handleChange}
                  placeholder="07X XXXXXXX"
                  className="mt-1 px-3 py-2 rounded-lg w-full border border-slate-300"
                />
              </div>

              {/* PARENT NAME */}
              <div>
                <label className="text-sm font-medium">Parent / Guardian</label>
                <input
                  name="parentName"
                  value={form.parentName}
                  onChange={handleChange}
                  className="mt-1 px-3 py-2 rounded-lg w-full border border-slate-300"
                />
              </div>

              {/* SIBLINGS */}
              <div>
                <label className="text-sm font-medium">Siblings</label>
                <input
                  name="siblings"
                  value={form.siblings}
                  onChange={handleChange}
                  placeholder="No. of siblings"
                  className="mt-1 px-3 py-2 rounded-lg w-full border border-slate-300"
                />
              </div>

              {/* DOB */}
              <div>
                <label className="text-sm font-medium">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  className="mt-1 px-3 py-2 rounded-lg w-full border border-slate-300"
                />
              </div>

              {/* ADDRESS */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="mt-1 px-3 py-2 rounded-lg w-full border border-slate-300 min-h-[80px]"
                />
              </div>

              {/* SUBMIT BUTTON */}
             {/* SUBMIT BUTTON */}
<div className="md:col-span-2 flex justify-center mt-4">
  <button
    type="submit"
    className="w-full md:w-1/2 py-3 rounded-xl text-white font-semibold shadow-md hover:opacity-90 transition"
    style={{
      background: "linear-gradient(135deg, #2563eb, #4f46e5)",
      fontSize: "1.05rem",
    }}
  >
    Register Student
  </button>
</div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
