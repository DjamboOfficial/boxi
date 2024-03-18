require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose"); // Add this line
const User = require("./models/User.js");
const Artisan = require("./models/artisan.js");

const generateToken = (userId) => {
  const payload = {
    userId: userId,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "23h",
  });
  return token;
};
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token:", token);

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.log("Invalid token:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log("Decoded token:", decoded);

    try {
      let user;
      if (decoded.userId) {
        console.log("Searching for User with ID:", decoded.userId);
        user = await User.findById(decoded.userId);
      }

      if (!user) {
        let artisan;
        if (decoded.userId) {
          console.log("Searching for Artisan with ID:", decoded.userId);
          artisan = await Artisan.findById(decoded.userId);
        }

        if (!artisan) {
          console.log("User or Artisan not found");
          return res.status(404).json({ message: "User or Artisan not found" });
        }

        console.log("Artisan found:", artisan);
        req.user = artisan;
        return next();
      }

      console.log("User found:", user);
      req.user = user;
      return next();
    } catch (error) {
      console.error("Internal server error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
};

module.exports = { generateToken, verifyToken };
