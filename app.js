const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const customerRoute = require("./routes/customerRouter");
const sellerRoute = require("./routes/sellerRouter");
const config = require('config');

app.use(bodyParser.json());
app.use("/api/customer", customerRoute);
app.use("//api/seller", sellerRoute);
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
