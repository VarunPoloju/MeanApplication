const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Post = require("../models/post");
const mongoose = require("mongoose");

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

// =========================GET===================================
app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) =>
    res.status(201).json({
      message: "Post fetched successfully.",
      posts: documents,
    })
  );
});

// ==========================POST==============================
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  res.status(201).json({
    message: "Post added successfully.",
  });
});

// ===============================delete============================

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted successfully!" });
  });
});

module.exports = app;
