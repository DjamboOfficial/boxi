require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./db.js");
const userAuthRoutes = require("./routes/userAuthRoutes.js");

connectDB()
  .then((db) => {
    console.log("Database connected!");
  })
  .catch((error) => {
    console.error("Error: ", error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", userAuthRoutes);

app.get("/", (req, res) => {
  res.send("Ciao Stronzi!");
});

app.listen(port, () => {
  console.log(`Server is listening on ${port} port! Ciao!`);
});
