const express = require("express");
const router = express();
const Artisan = require("../models/artisan");

router.get("/", async (req, res) => {
  try {
    const allArtisans = await Artisan.find();
    res.json(allArtisans); // Qui chiaramente c'è un problema di connessione al database;
  } catch (error) {
    console.error("Error fetching artisans:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
