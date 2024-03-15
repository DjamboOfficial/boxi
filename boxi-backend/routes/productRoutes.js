const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/trending", async (req, res) => {
  try {
    const products = await Product.find().sort({ clickCount: -1 }).limit(2);
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "I don't know, something, went wrong here" });
  }
});

module.exports = router;
