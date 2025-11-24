export default function RegistrationForm({ form, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="form-wrapper">

      {/* ================= STUDENT INFO ================= */}
      <div className="form-section-title">Student Information</div>

      <div className="form-row">
        <div className="col-6">
          <label className="form-label">First Name</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} className="form-input" />
        </div>

        <div className="col-6">
          <label className="form-label">Last Name</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} className="form-input" />
        </div>
      </div>

      <div className="form-row">
        <div className="col-6">
          <label className="form-label">Date of Birth</label>
          <input type="date" name="dob" value={form.dob} onChange={handleChange} className="form-input" />
        </div>

        <div className="col-6">
          <label className="form-label">Grade Level</label>
          <input name="grade" placeholder="10 / 11 / A/L" value={form.grade} onChange={handleChange} className="form-input" />
        </div>
      </div>

      <div className="form-row">
        <div className="col-6">
          <label className="form-label">School</label>
          <input name="school" value={form.school} onChange={handleChange} className="form-input" />
        </div>

        <div className="col-6">
          <label className="form-label">Subjects</label>
          <input name="subjects" value={form.subjects} onChange={handleChange} className="form-input" />
        </div>
      </div>

      <div className="form-row">
        <div className="col-6">
          <label className="form-label">Student Contact</label>
          <input name="contactNumber" value={form.contactNumber} onChange={handleChange} className="form-input" />
        </div>
      </div>

      {/* ================= PARENT INFO ================= */}
      <div className="form-section-title">Parent / Guardian Information</div>

      <div className="form-row">
        <div className="col-6">
          <label className="form-label">Parent Name</label>
          <input name="parentName" value={form.parentName} onChange={handleChange} className="form-input" />
        </div>

        <div className="col-6">
          <label className="form-label">Parent Contact Number</label>
          <input name="parentContactNumber" value={form.parentContactNumber} onChange={handleChange} className="form-input" />
        </div>
      </div>

      <div className="form-row">
        <div className="col-6">
          <label className="form-label">Siblings</label>
          <input name="siblings" value={form.siblings} onChange={handleChange} className="form-input" />
        </div>

        <div className="col-12">
          <label className="form-label">Address</label>
          <textarea name="address" value={form.address} onChange={handleChange} className="form-input min-h-[80px]" />
        </div>
      </div>

      {/* ================= SUBMIT BUTTON ================= */}
      <div className="flex justify-center mt-4">
        <button type="submit" className="submit-btn">Register Student</button>
      </div>

    </form>
  );
}
