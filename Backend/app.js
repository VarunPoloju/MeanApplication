const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json()); //-> to parse req.payload
app.use(bodyParser.urlencoded({ extended: false }));

// to resolve CORS issue add this headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    { id: "1", title: "First post", content: "content of first post" },
    { id: "2", title: "second post", content: "content of first post" },
    { id: "3", title: "third post", content: "content of first post" },
  ];
  res.status(200).json({
    message: "Posts fetched successgully",
    posts: posts,
  });
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(`post is ${post}`);
  res.statusCode(201).json({
    message: "Post added successfully.",
  });
});

module.exports = app;
