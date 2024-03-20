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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const Artisan = mongoose.model("Artisan", artisanSchema);

module.exports = Artisan;
