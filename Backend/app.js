const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const postRoutes = require("../Backend/routes/posts");

mongoose
  .connect(
    "mongodb+srv://varun:gandhinagar112233@cluster0.wr0ge.mongodb.net/Meanapp?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connection to db was successfull");
  })
  .catch("DB connection failed");

app.use(bodyParser.json()); //-> to parse req.payload
app.use(bodyParser.urlencoded({ extended: false }));

// to resolve CORS issue add this headers
app.use(cors({ origin: "http://localhost:4200", credentials: true }));
app.options("*", cors());

// to use all the routes
app.use("/api/posts", postRoutes);

module.exports = app;
