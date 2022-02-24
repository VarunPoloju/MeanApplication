const express = require("express");
const router = express.Router();
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/Usermodel");

router.post("/signup", (req, res, next) => {
  bcryptjs.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(200).json({
          message: "user created",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  // find whether email exists
  User.findOne({
      email: req.body.email,
    })
    .then((user) => {
      if (!user) {
        //if no user found in data base
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      fetchedUser = user;
      return bcryptjs.compare(req.body.password, user.password);
    })
    .then((result) => {
      // maybe true or false depending on password comparison
      if (!result) {
        //false -- didn't match password
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      // true -- password match
      const token = jwt.sign({
          email: fetchedUser.email,
          userId: fetchedUser._id,
        },
        "secret_key_will_be_longer", {
          expiresIn: "1h",
        }
      );
      console.log(token);
      res.status(200).json({
        message: "received token",
        token: token,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({
        message: "Auth failed",
        err: err,
      });
    });
});

module.exports = router;
