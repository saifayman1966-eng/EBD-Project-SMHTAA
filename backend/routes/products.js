const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Product database is unavailable." });
  }

  try {
    const products = await Product.find({ isActive: true })
      .sort({ name: 1 })
      .lean();

    return res.status(200).json({ products });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return res.status(500).json({ message: "Could not load products." });
  }
});

module.exports = router;