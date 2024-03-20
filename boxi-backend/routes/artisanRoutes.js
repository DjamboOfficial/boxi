const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Artisan = require("../models/artisan");
const { generateToken } = require("../authMiddleware");
const { verifyToken } = require("../authMiddleware");
const fileUploader = require("../config/cloudinary.config");
const multer = require("multer");

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
      bio: "",
      profilePicture: "",
      description: "",
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

router.post(
  "/save-profile-picture",
  fileUploader.single("profile-picture"),
  async (req, res) => {
    const artisanId = req.user._id;
    console.log("2 =>", req.file.path);
    await Artisan.findByIdAndUpdate(
      artisanId,
      { $set: { profilePicture: req.file.path } },
      { new: true }
    ).then((update) => {
      console.log(update);

      req.user.profilePicture = req.file.path;
      res.redirect("/");
      alert("OK"); // or use res.render if redirecting is not desired
    });
  }
);

module.exports = router;
