const express = require("express");

const router = express.Router();

const Subject = require("../models/Subject");


// ==========================================
// GET ALL SUBJECTS
// ==========================================

router.get("/", async (req, res) => {

  try {

    const subjects = await Subject.find()
      .sort({ createdAt: -1 });

    res.json(subjects);

  } catch (error) {

    console.error("GET SUBJECTS ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

});


// ==========================================
// GET SINGLE SUBJECT
// ==========================================

router.get("/:id", async (req, res) => {

  try {

    const subject = await Subject.findById(
      req.params.id
    );

    if (!subject) {

      return res.status(404).json({
        message: "Subject not found"
      });

    }

    res.json(subject);

  } catch (error) {

    console.error("GET SUBJECT ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

});


// ==========================================
// CREATE SUBJECT
// ==========================================

router.post("/", async (req, res) => {

  try {

    const {
      name,
      code,
      teacher,
      grade,
      sessions
    } = req.body;


    // Basic validation

    if (!name || !code) {

      return res.status(400).json({
        message: "Subject name and subject code are required"
      });

    }


    // Check duplicate code

    const existingSubject = await Subject.findOne({
      code: code.trim().toUpperCase()
    });


    if (existingSubject) {

      return res.status(400).json({
        message: "Subject code already exists"
      });

    }


    const subject = await Subject.create({

      name: name.trim(),

      code: code.trim().toUpperCase(),

      teacher: teacher || "",

      grade: grade || "",

      sessions: Number(sessions) || 0

    });


    res.status(201).json({

      message: "Subject added successfully",

      subject

    });

  } catch (error) {

    console.error("CREATE SUBJECT ERROR:", error);


    if (error.code === 11000) {

      return res.status(400).json({
        message: "Subject code already exists"
      });

    }


    res.status(500).json({
      message: error.message
    });

  }

});


// ==========================================
// UPDATE SUBJECT
// ==========================================

router.put("/:id", async (req, res) => {

  try {

    const {
      name,
      code,
      teacher,
      grade,
      sessions
    } = req.body;


    if (!name || !code) {

      return res.status(400).json({
        message: "Subject name and subject code are required"
      });

    }


    const cleanCode =
      code.trim().toUpperCase();


    // Check duplicate code
    // excluding current subject

    const existingSubject = await Subject.findOne({

      code: cleanCode,

      _id: {
        $ne: req.params.id
      }

    });


    if (existingSubject) {

      return res.status(400).json({
        message: "Subject code already exists"
      });

    }


    const subject =
      await Subject.findByIdAndUpdate(

        req.params.id,

        {
          name: name.trim(),

          code: cleanCode,

          teacher: teacher || "",

          grade: grade || "",

          sessions: Number(sessions) || 0
        },

        {
          new: true,

          runValidators: true
        }

      );


    if (!subject) {

      return res.status(404).json({
        message: "Subject not found"
      });

    }


    res.json({

      message: "Subject updated successfully",

      subject

    });

  } catch (error) {

    console.error("UPDATE SUBJECT ERROR:", error);


    if (error.code === 11000) {

      return res.status(400).json({
        message: "Subject code already exists"
      });

    }


    res.status(500).json({
      message: error.message
    });

  }

});


// ==========================================
// DELETE SUBJECT
// ==========================================

router.delete("/:id", async (req, res) => {

  try {

    const subject =
      await Subject.findByIdAndDelete(
        req.params.id
      );


    if (!subject) {

      return res.status(404).json({
        message: "Subject not found"
      });

    }


    res.json({

      message: "Subject deleted successfully"

    });

  } catch (error) {

    console.error("DELETE SUBJECT ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

});


module.exports = router;