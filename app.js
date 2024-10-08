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
  .connect("mongodb://localhost:27017/market", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to local MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to local MongoDB:", error);
  });

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/login.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/signup.html"));
});
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Market API</h1>");
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
        url: "https://market-git-main-mohamed-amirs-projects.vercel.app",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spacs = swaggerJsdoc(options);
app.use('/api-docs', express.static('dist/api-docs'));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spacs));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
