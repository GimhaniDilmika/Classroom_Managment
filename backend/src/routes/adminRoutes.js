const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Subject = require("../models/Subject");


// =====================================================
// ADMIN DASHBOARD STATS
// =====================================================

router.get("/stats", async (req, res) => {

  try {

    const students = await User.countDocuments({
      role: "student"
    });

    const teachers = await User.countDocuments({
      role: "teacher"
    });

    const admins = await User.countDocuments({
      role: "admin"
    });

    res.json({
      students,
      teachers,
      admins,
      classes: 0,
      support: 0,
      alerts: 0
    });

  } catch (error) {

    console.log("STATS ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

});


// =====================================================
// GET ALL USERS
// =====================================================

router.get("/users", async (req, res) => {

  try {

    const users = await User.find()
      .select("-password");

    res.json(users);

  } catch (error) {

    console.log("GET USERS ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

});


// =====================================================
// DELETE USER
// =====================================================

router.delete("/users/:id", async (req, res) => {

  try {

    const user =
      await User.findByIdAndDelete(req.params.id);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    res.json({
      message: "User deleted successfully"
    });

  } catch (error) {

    console.log("DELETE USER ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

});


// =====================================================
// STUDENTS
// =====================================================


// GET ALL STUDENTS

router.get("/students", async (req, res) => {

  try {

    const students =
      await User.find({
        role: "student"
      })
      .select("-password");

    res.json(students);

  } catch (error) {

    console.log("GET STUDENTS ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

});


// GET SINGLE STUDENT

router.get("/students/:id", async (req, res) => {

  try {

    const student =
      await User.findById(req.params.id)
        .select("-password");

    if (!student) {

      return res.status(404).json({
        message: "Student not found"
      });

    }

    res.json(student);

  } catch (error) {

    console.log("GET STUDENT ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

});


// UPDATE STUDENT

router.put("/students/:id", async (req, res) => {

  try {

    const {
      name,
      studentId,
      gender,
      className,
      mobile,
      fatherName,
      fatherMobile,
      motherName,
      motherMobile
    } = req.body;


    const student =
      await User.findByIdAndUpdate(

        req.params.id,

        {
          name,
          studentId,
          gender,
          className,
          mobile,
          fatherName,
          fatherMobile,
          motherName,
          motherMobile
        },

        {
          new: true,
          runValidators: true
        }

      ).select("-password");


    if (!student) {

      return res.status(404).json({
        message: "Student not found"
      });

    }


    res.json({

      message: "Student updated successfully",

      student

    });

  } catch (error) {

    console.log("UPDATE STUDENT ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

});


// =====================================================
// TEACHERS
// =====================================================


// GET ALL TEACHERS

router.get("/teachers", async (req, res) => {

  try {

    const teachers =
      await User.find({
        role: "teacher"
      })
      .select("-password");

    res.json(teachers);

  } catch (error) {

    console.log("GET TEACHERS ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

});


// GET SINGLE TEACHER

router.get("/teachers/:id", async (req, res) => {

  try {

    const teacher =
      await User.findById(req.params.id)
        .select("-password");

    if (!teacher) {

      return res.status(404).json({
        message: "Teacher not found"
      });

    }

    res.json(teacher);

  } catch (error) {

    console.log("GET TEACHER ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

});


// UPDATE TEACHER

router.put("/teachers/:id", async (req, res) => {

  try {

    const {
      name,
      email,
      mobile,
      subject,
      classes
    } = req.body;


    // Check duplicate email
    if (email) {

      const existingTeacher =
        await User.findOne({
          email,
          _id: { $ne: req.params.id }
        });

      if (existingTeacher) {

        return res.status(400).json({
          message:
            "Another user already uses this email."
        });

      }

    }


    const teacher =
      await User.findByIdAndUpdate(

        req.params.id,

        {
          name,
          email,
          mobile,
          subject,
          classes
        },

        {
          new: true,
          runValidators: true
        }

      ).select("-password");


    if (!teacher) {

      return res.status(404).json({
        message: "Teacher not found"
      });

    }


    res.json({

      message: "Teacher updated successfully",

      teacher

    });

  } catch (error) {

    console.log(
      "UPDATE TEACHER ERROR:",
      error
    );


    // Duplicate email error

    if (error.code === 11000) {

      return res.status(400).json({

        message:
          "This email is already registered to another user."

      });

    }


    res.status(500).json({

      message: error.message

    });

  }

});


// DELETE TEACHER

router.delete("/teachers/:id", async (req, res) => {

  try {

    const teacher =
      await User.findOneAndDelete({
        _id: req.params.id,
        role: "teacher"
      });


    if (!teacher) {

      return res.status(404).json({
        message: "Teacher not found"
      });

    }


    res.json({

      message: "Teacher deleted successfully"

    });

  } catch (error) {

    console.log(
      "DELETE TEACHER ERROR:",
      error
    );

    res.status(500).json({
      message: error.message
    });

  }

});


// =====================================================
// SUBJECTS
// =====================================================


// GET ALL SUBJECTS

router.get("/subjects", async (req, res) => {

  try {

    const subjects =
      await Subject.find()
        .sort({ createdAt: -1 });


    res.json(subjects);

  } catch (error) {

    console.log(
      "GET SUBJECTS ERROR:",
      error
    );

    res.status(500).json({

      message: error.message

    });

  }

});


// GET SINGLE SUBJECT

router.get("/subjects/:id", async (req, res) => {

  try {

    const subject =
      await Subject.findById(
        req.params.id
      );


    if (!subject) {

      return res.status(404).json({

        message: "Subject not found"

      });

    }


    res.json(subject);

  } catch (error) {

    console.log(
      "GET SUBJECT ERROR:",
      error
    );

    res.status(500).json({

      message: error.message

    });

  }

});


// ADD SUBJECT

router.post("/subjects", async (req, res) => {

  try {

    const {
      name,
      code,
      gradeLevel,
      description
    } = req.body;


    if (!name || !name.trim()) {

      return res.status(400).json({

        message:
          "Subject name is required"

      });

    }


    const subject =
      await Subject.create({

        name: name.trim(),

        code: code
          ? code.trim()
          : "",

        gradeLevel: gradeLevel
          ? gradeLevel.trim()
          : "",

        description: description
          ? description.trim()
          : ""

      });


    res.status(201).json({

      message:
        "Subject created successfully",

      subject

    });

  } catch (error) {

    console.log(
      "ADD SUBJECT ERROR:",
      error
    );

    res.status(500).json({

      message: error.message

    });

  }

});


// UPDATE SUBJECT

router.put("/subjects/:id", async (req, res) => {

  try {

    const {
      name,
      code,
      gradeLevel,
      description
    } = req.body;


    if (!name || !name.trim()) {

      return res.status(400).json({

        message:
          "Subject name is required"

      });

    }


    const subject =
      await Subject.findByIdAndUpdate(

        req.params.id,

        {

          name: name.trim(),

          code: code
            ? code.trim()
            : "",

          gradeLevel: gradeLevel
            ? gradeLevel.trim()
            : "",

          description: description
            ? description.trim()
            : ""

        },

        {
          new: true,
          runValidators: true
        }

      );


    if (!subject) {

      return res.status(404).json({

        message:
          "Subject not found"

      });

    }


    res.json({

      message:
        "Subject updated successfully",

      subject

    });

  } catch (error) {

    console.log(
      "UPDATE SUBJECT ERROR:",
      error
    );

    res.status(500).json({

      message: error.message

    });

  }

});


// DELETE SUBJECT

router.delete("/subjects/:id", async (req, res) => {

  try {

    const subject =
      await Subject.findByIdAndDelete(
        req.params.id
      );


    if (!subject) {

      return res.status(404).json({

        message:
          "Subject not found"

      });

    }


    res.json({

      message:
        "Subject deleted successfully"

    });

  } catch (error) {

    console.log(
      "DELETE SUBJECT ERROR:",
      error
    );

    res.status(500).json({

      message: error.message

    });

  }

});


module.exports = router;