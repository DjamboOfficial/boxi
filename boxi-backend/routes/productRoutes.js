const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");
const { verifyToken } = require("../authMiddleware");
const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongodb");

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

router.post("/cart/add", verifyToken, async (req, res) => {
  try {
    const { productId } = req.body;
    const validProductId = new mongoose.Types.ObjectId(productId);
    const product = await Product.findById(validProductId);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    // Check if the product is already in the cart
    const cartItemIndex = user.cart.findIndex((item) =>
      item.product.equals(product._id)
    );

    if (cartItemIndex !== -1) {
      // If the product is already in the cart, increment the quantity
      user.cart[cartItemIndex].quantity += 1;
    } else {
      // If the product is not in the cart, add it with quantity 1
      user.cart.push({ product: product._id, quantity: 1 });
    }

    // Save the updated user with the modified cart
    const updatedUser = await user.save();

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

router.get("/cart", verifyToken, async (req, res) => {
  try {
    // Assuming userId is extracted from the token during the verifyToken middleware
    const userId = req.user._id;

    // Fetch the user to get the cart
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract only the ObjectId of products in the cart
    const productIds = user.cart.map((cartItem) => cartItem._id);

    // Fetch product details for each product ID
    const products = [];

    for (const productId of productIds) {
      // Inside this loop, we'll perform the database query for each product ID
      const product = await Product.findById(productId);

      // After fetching the product details, we'll add it to the products array
      products.push(product);
    }

    // Send back the cart items
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
});
module.exports = router;
