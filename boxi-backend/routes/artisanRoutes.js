const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Artisan = require("../models/artisan");
const { generateToken } = require("../authMiddleware");
const { verifyToken } = require("../authMiddleware");

router.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check for existing artisan
    const existingArtisan = await Artisan.findOne({
      $or: [{ username }, { email }],
    });
    if (existingArtisan) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new artisan
    const newArtisan = new Artisan({
      username,
      password: hashedPassword,
      email,
      name: "",
      bio: "",
      profilePicture: "",
      description: "",
    });
    await newArtisan.save();

    // Generate authentication token
    const token = generateToken(newArtisan._id);

    // Respond with success message and token
    res
      .status(200)
      .json({ message: "Artisan registered successfully!", token });
  } catch (error) {
    // Handle internal errors
    console.error("Error registering artisan:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const artisan = await Artisan.findOne({ username });
    if (!artisan) {
      return res.status(401).json({ message: "Invalid credentials" }); // Add return statement here
    }
    const passwordMatch = await bcrypt.compare(password, artisan.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" }); // Add return statement here
    }

    const token = generateToken(artisan._id);
    res.status(200).json({ message: "User logged in successfully!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/details", verifyToken, async (req, res) => {
  try {
    const artisanId = req.user._id;
    const artisan = await Artisan.findById(artisanId);

    if (!artisan) {
      return res.status(400).json({ message: "Artisan not found" });
    }
    return res.status(200).json({ artisan });
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
});

router.put("/update-name", verifyToken, async (req, res) => {
  try {
    const artisanId = req.user._id;
    const { name } = req.body;
    const updatedArtisan = await Artisan.findByIdAndUpdate(
      artisanId,
      { name: name },
      { new: true }
    );
    if (!updatedArtisan) {
      return res.status(400).json({ message: "Artisan not found" });
    }
    return res
      .status(200)
      .json({ message: "Artisan name updated", artisan: updatedArtisan });
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
});

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

module.exports = router;
