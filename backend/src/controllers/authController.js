const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ==========================================
// REGISTER
// ==========================================

exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,

      // Student fields
      studentId,
      gender,
      className,
      mobile,

      fatherName,
      fatherMobile,
      motherName,
      motherMobile,

      // Teacher fields
      subject,
      classes
    } = req.body;

    // =========================
    // VALIDATION
    // =========================

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    // =========================
    // CHECK EMAIL
    // =========================

    const existingUser = await User.findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // =========================
    // HASH PASSWORD
    // =========================

    const hashedPassword = await bcrypt.hash(password, 10);

    // =========================
    // ROLE
    // =========================

    const userRole = role
      ? role.toLowerCase()
      : "student";

    // =========================
    // CREATE USER
    // =========================

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: userRole,

      // Student information
      studentId,
      gender,
      className,
      mobile,

      fatherName,
      fatherMobile,
      motherName,
      motherMobile,

      // Teacher information
      subject,
      classes: Number(classes) || 0
    });

    // =========================
    // RESPONSE
    // =========================

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
        subject: user.subject,
        classes: user.classes
      }
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
};


// ==========================================
// LOGIN
// ==========================================

exports.login = async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;

    // =========================
    // VALIDATION
    // =========================

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // =========================
    // FIND USER
    // =========================

    const user = await User.findOne({
      email: email.toLowerCase()
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // =========================
    // CHECK PASSWORD
    // =========================

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // =========================
    // RESPONSE
    // =========================

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
};