const express = require("express");
const router = express.Router();
const Post = require("../../models/post");
const multer = require("multer");
const { count } = require("console");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "Backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

// =========================GET===================================
router.get("", (req, res, next) => {
  console.log(req.query);
  const pageSize = +req.query.pageSize;
  const currentpage = +req.query.page;
  const postquery = Post.find();
  let fetchedPosts;
  if (pageSize && currentpage) {
    // if u want to go to page 3 u need to skip 20 items
    // pagesize = 10 , currentpage = 3 ==> (10*(3-1))==> 10*2 == 20 (items u need to skip
    postquery.skip(pageSize * (currentpage - 1)).limit(pageSize);
  }
  postquery
    .then((documents) => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then((count) => {
      res.status(201).json({
        message: "Post fetched successfully.",
        posts: fetchedPosts,
        maxPosts: count,
      });
    });
});

// =========================GET BY ID===================================
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "Post not found",
      });
    }
  });
});
// ==========================POST==============================
router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
    });
    post.save().then((createdPost) => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id,
        },
      });
    });
  }
);
// ==========================PUT==============================

router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
    });
    console.log(post);
    Post.updateOne({ _id: req.params.id }, post).then((result) => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

// ===============================delete============================

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted successfully!" });
  });
});

module.exports = router;
