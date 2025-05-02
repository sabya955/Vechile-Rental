const jwt = require("jsonwebtoken");
require("dotenv").config();
const productPool = require("./db");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Middleware to verify a regular authenticated user
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Make sure your token includes { userId, email }
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

// Middleware to verify only admin access
const verifyAdmin = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const result = await productPool.query(
            "SELECT * FROM customers WHERE id = $1",
            [decoded.userId]
        );

        const user = result.rows[0];
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Admins only" });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token or user" });
    }
};

module.exports = { verifyToken, verifyAdmin };
