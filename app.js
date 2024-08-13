const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const mongoose = require("mongoose");
const customerRoute = require("./routes/customerRouter");
const sellerRoute = require("./routes/sellerRouter");
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(bodyParser.json());
app.use("/customer", customerRoute);
app.use("/seller", sellerRoute);
app.use(express.static(path.join(__dirname, "client")));

mongoose
  .connect(process.env.MONGO_URI, {
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


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Market API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spacs = swaggerJsdoc(options);
app.use("/", swaggerUi.serve, swaggerUi.setup(spacs));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
