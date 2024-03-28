require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const Product = require("./models/Product.js");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

const connectDB = require("./db.js");
const userAuthRoutes = require("./routes/userAuthRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const artisanRoutes = require("./routes/artisanRoutes.js");
const cors = require("cors");

connectDB()
  .then((db) => {
    console.log("Database connected!");
  })
  .catch((error) => {
    console.error("Error: ", error);
  });

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/payment/config", (req, res) => {
  try {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      throw new Error("Stripe publishable key not found");
    }
    res.send({ publishableKey });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Failed to fetch Stripe publishable key" });
  }
});

app.post("/payment/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "eur",
      amount: totalCartPrice * 100,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
});

app.use("/auth", userAuthRoutes);
app.use("/products", productRoutes);
app.use("/artisan", artisanRoutes);

app.get("/", (req, res) => {
  res.send("Ciao Stronzi!");
});

app.listen(port, () => {
  console.log(`Server is listening on ${port} port! Ciao!`);
});
