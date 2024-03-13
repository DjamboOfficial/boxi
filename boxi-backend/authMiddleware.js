require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");

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
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    try {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
};

module.exports = { generateToken, verifyToken };
