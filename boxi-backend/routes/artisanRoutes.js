const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const Artisan = require("../models/artisan");
const { generateToken } = require("../authMiddleware");
const { verifyToken } = require("../authMiddleware");

const upload = multer({ dest: "uploads/" });

router.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingArtisan = await Artisan.findOne({
      $or: [{ username }, { email }],
    });
    if (existingArtisan) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newArtisan = new Artisan({
      username,
      password: hashedPassword,
      email,
      name: "",
    });
    await newArtisan.save();
    const token = generateToken(newArtisan._id);
    res.status(200).json({ message: "Artisan registered!", token });
  } catch (error) {
    res.status(500).json({ message: "Internal error registering artisan" });
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

router.post(
  "/save-profile-picture",
  verifyToken,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const artisanId = req.user._id;
      const profilePicture = req.file.filename;

      // Update artisan document with new profile picture filename
      const updatedArtisan = await Artisan.findByIdAndUpdate(
        artisanId,
        { profilePicture: `${profilePicture}.png` },
        { new: true }
      );

      if (!updatedArtisan) {
        return res.status(404).json({ message: "Artisan not found" });
      }

      return res
        .status(200)
        .json({ message: "Profile picture saved!", artisan: updatedArtisan });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
