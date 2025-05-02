const express = require("express");
const router = express.Router();
const authRoutes = require("./auther");
const products = require("./product");
const bookings = require("./booking");
router.use("/auth", authRoutes);
router.use("/booking", bookings);
router.use("/product", products);
module.exports = router;
