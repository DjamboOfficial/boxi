const mongoose = require("mongoose");

const artisanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    default: "Berlin", // Set the default location to Berlin
  },
  description: {
    type: String,
    required: true,
  },
  contact: {
    type: String, // You can further specify contact details if needed
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Artisan = mongoose.model("Artisan", artisanSchema);

module.exports = Artisan;
