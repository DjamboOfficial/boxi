const { MongoClient } = require("mongodb");
require("dotenv").config();

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log("DB.js is fine: we're connected to MongoDB");
    return client.db();
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

module.exports = { connectDB };
