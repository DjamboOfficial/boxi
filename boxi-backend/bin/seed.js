require("dotenv").config();
const mongoose = require("mongoose");
const Artisan = require("../models/artisan");
const Product = require("../models/product");

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const seedData = async () => {
  // Create artisans
  const artisan1 = await Artisan.create({
    name: "Sofia Rodriguez",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageUrl:
      "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1710180380/boxi/Sofia%20Rodriguez/Sofia_Rodriguez_libx9d.png",
  });

  const artisan2 = await Artisan.create({
    name: "Hiroki Tanaka",
    bio: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl:
      "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1710180414/boxi/Hiroki%20Tanaka/Hiroki_Tanaka_yxcwei.png",
  });

  // Create products
  const product1 = await Product.create({
    name: "Product 1",
    description: "Handcrafted ceramic mug with intricate floral patterns",
    price: 10,
    clickCount: 0,
    imageUrl:
      "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1710180353/boxi/Sofia%20Rodriguez/djambo1990_51954_a_handcrafted_ceramic_mug_with_intricate_Andal_2ea33c57-4772-42e6-a9ff-6ff1264e884a_vbutwj.png",
    category: "Category 1",
    artisan: artisan1._id,
  });

  const product2 = await Product.create({
    name: "Product 2",
    description: "Description of Product 2",
    price: 20,
    clickCount: 0,
    imageUrl:
      "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1710180350/boxi/Hiroki%20Tanaka/djambo1990_51954_Handwoven_bamboo_basket_with_intricate_Japanes_f8ee6eb7-9000-40bc-a45d-e44c601ea3e1_bjgjfh.png",
    category: "Category 2",
    artisan: artisan2._id,
  });

  // Add products to artisans
  artisan1.products.push(product1._id);
  artisan2.products.push(product2._id);
  await artisan1.save();
  await artisan2.save();

  console.log("Seed data populated successfully");
};

seedData().then(() => {
  mongoose.connection.close();
});
