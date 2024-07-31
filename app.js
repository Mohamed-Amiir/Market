const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const mongoose = require("mongoose");
const customerRoute = require("./routes/customerRouter");
const sellerRoute = require("./routes/sellerRouter");
const path = require("path");

app.use(bodyParser.json());
app.use("/customer", customerRoute);
app.use("/seller", sellerRoute);
app.use(express.static(path.join(__dirname, "client")));

mongoose
  .connect("mongodb://localhost:27017/market", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/login.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/signup.html"));
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
