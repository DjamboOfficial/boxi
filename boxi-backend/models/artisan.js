const mongoose = require("mongoose");

const artisanSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profilePicture: {
      type: String,
    },
    name: {
      type: String,
    },
    bio: {
      type: String,
    },
    products: [
      {
        productName: String,
        description: String,
        price: Number,
        image: String,
      },
    ],
  },
  { timestamps: true }
);

const Artisan = mongoose.model("Artisan", artisanSchema);

module.exports = Artisan;
