const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const productPool = require("./db");
require("dotenv").config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
router.post("/signup", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      driving_licence,
      password,
      confirmPassword,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !driving_licence ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await productPool.query(
      "SELECT * FROM customers WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const result = await productPool.query(
      "INSERT INTO customers (fullname, email, phone, driving_licence, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [fullName, email, phone, driving_licence, hashedPassword, "customer"]
    );

    const token = jwt.sign({ userId: result.rows[0].id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(201)
      .json({ token, message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await productPool.query(
      "SELECT * FROM customers WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        fullName: user.fullname,
        email: user.email,
        phone: user.phone,
        driving_licence: user.driving_licence,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
