const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // =========================
    // COMMON USER INFORMATION
    // =========================

    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      default: "student"
    },

    // =========================
    // STUDENT INFORMATION
    // =========================

    studentId: {
      type: String,
      default: ""
    },

    gender: {
      type: String,
      default: ""
    },

    className: {
      type: String,
      default: ""
    },

    mobile: {
      type: String,
      default: ""
    },

    fatherName: {
      type: String,
      default: ""
    },

    fatherMobile: {
      type: String,
      default: ""
    },

    motherName: {
      type: String,
      default: ""
    },

    motherMobile: {
      type: String,
      default: ""
    },

    // =========================
    // TEACHER INFORMATION
    // =========================

    subject: {
      type: String,
      default: ""
    },

    classes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);