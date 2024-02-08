const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3002;
const mongoose = require("mongoose");
const customerRoute = require("./routes/customerRouter");
const sellerRoute = require("./routes/sellerRouter");
const config = require("config");
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
  res.sendFile(path.join(__dirname, "./client/signup.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/signup.html"));
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
