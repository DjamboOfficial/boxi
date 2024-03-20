require("dotenv").config();
const mongoose = require("mongoose");
const Artisan = require("./models/artisan.js");
const { ObjectId } = mongoose.Types;
const Product = require("./models/Product.js");

async function migrateProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const artisans = await Artisan.find(); // Use find() to query all artisans
    for (const artisan of artisans) {
      for (const product of artisan.products) {
        const boxiProduct = new Product({
          artisan: new ObjectId(artisan._id), // Convert artisan ID to ObjectId
          name: product.productName,
          description: product.description,
          price: product.price,
          image: product.image,
        });
        await boxiProduct.save(); // Save the product to the boxi/products collection
      }
    }
    console.log("Product migration completed successfully.");
  } catch (error) {
    console.error("Error migrating products:", error);
  } finally {
    // Close the connection after migration is done
    mongoose.disconnect();
  }
}

migrateProducts();
