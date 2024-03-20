const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");
const { verifyToken } = require("../authMiddleware");
const { default: mongoose } = require("mongoose");

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

router.post("/cart/add", verifyToken, async (req, res) => {
  try {
    const { productId } = req.body;
    const validProductId = new mongoose.Types.ObjectId(productId);
    const product = await Product.findById(validProductId);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    const userId = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { cart: product } },
      { new: true }
    );

    // Return success message along with the updated user data
    res
      .status(200)
      .json({ message: "Product added to cart", user: updatedUser });
  } catch (error) {
    // If any error occurs, return an error response
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/*

router.post("/insert-product", verifyToken, async (req, res) => {
  try {
    const artisanId = req.user._id;
    const newProduct = req.body.product;

    // Find artisan by ID and update products array
    const updatedArtisan = await Artisan.findByIdAndUpdate(
      artisanId,
      { $push: { products: newProduct } }, // Using $push to add product to products array
      { new: true } // To return the updated document
    );

    // Check if the artisan was found and updated
    if (!updatedArtisan) {
      return res.status(400).json({ message: "Artisan not found" });
    }

    // Respond with success message and updated artisan object
    return res.status(200).json({
      message: "Artisan's catalogue updated",
      artisan: updatedArtisan,
    });
  } catch (error) {
    // Handle internal errors
    console.error("Error inserting product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
*/

module.exports = router;
