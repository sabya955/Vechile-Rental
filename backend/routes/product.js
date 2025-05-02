const express = require("express");
const router = express.Router();
const productPool = require("./db");
const { verifyToken } = require("./util");
router.get("/", async (req, res) => {
  try {
    const result = await productPool.query("SELECT * FROM cars");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productPool.query("SELECT * FROM cars WHERE id=$1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, brand, model, year, price_per_day, img_url,type } = req.body;
    if (!name || !brand || !model || !year || !price_per_day || !img_url || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const result = await productPool.query(
      `INSERT INTO cars (id, name, brand, model, year, price_per_day, img_url,type, created_by, updated_by, created_at, updated_at) 
       VALUES(uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8,$8, NOW(), NOW()) RETURNING *`,
      [name, brand, model, year, price_per_day, img_url,type, req.user.userId]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {

    
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/type/bike", async (req, res) => {
  try {
    const result = await productPool.query("SELECT * FROM cars WHERE type = 'bike'");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/type/car", async (req, res) => {
  try {
    const result = await productPool.query("SELECT * FROM cars WHERE type = 'car'");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
