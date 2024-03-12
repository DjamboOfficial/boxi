const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Route to fetch all products
router.get("/", async (req, res) => {
  try {
    // Query the database to find all products
    const products = await Product.find();

    // Check if there are any products
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // If products are found, send them as a response
    res.status(200).json(products);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
