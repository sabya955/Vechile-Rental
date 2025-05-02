const express = require("express");
const { verifyToken, verifyAdmin } = require("./util");
const router = express.Router();
const productPool = require("./db");

// Create a booking (for logged-in users)
router.post("/", verifyToken, async (req, res) => {
  const { name, email, car_id, start_date, end_date } = req.body;
  if (!name || !email || !car_id || !start_date || !end_date) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const result = await productPool.query(
      `INSERT INTO bookings (
         id, name, email, car_id, start_date, end_date, status, created_at, updated_at
       ) VALUES (
         uuid_generate_v4(), $1, $2, $3, $4, $5, 'Booked', NOW(), NOW()
       ) RETURNING *`,
      [name, email, car_id, start_date, end_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get bookings for logged-in user (user can see their own bookings)
router.get("/user/bookings", verifyToken, async (req, res) => {
  try {
    const email = req.user.email; // get the logged-in user's email
    console.log(email);
    
    const result = await productPool.query(
`SELECT b.*, c.name AS car_name 
       FROM bookings b 
       JOIN cars c ON b.car_id = c.id 
       WHERE b.email = $1 
       ORDER BY b.created_at DESC`,
      [email]
    );
    res.json(result.rows); // Return the user's bookings
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin can get all bookings
router.get("/admin/all-bookings", verifyAdmin, async (req, res) => {
  try {
    const result = await productPool.query( `SELECT b.*, c.name AS car_name 
        FROM bookings b 
        JOIN cars c ON b.car_id = c.id 
        ORDER BY b.created_at DESC`);
    res.json(result.rows); // Return all bookings for admin
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/cancel/:id", verifyToken, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const result = await productPool.query(
      "UPDATE bookings SET status = 'Cancelled', updated_at = NOW() WHERE id = $1 RETURNING *",
      [bookingId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Cancelled", booking: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
