const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    code: {
      type: String,
      trim: true,
      default: ""
    },

    gradeLevel: {
      type: String,
      trim: true,
      default: ""
    },

    description: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Subject", SubjectSchema);