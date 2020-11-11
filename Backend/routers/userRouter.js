const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const {generateToken} = require("../../utils");
const e = require("express");


const userRouter = express.Router();

userRouter.post("/signin", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((data) => {
      if (bcrypt.compareSync(req.body.password, data.password)) {
        res.status(200).json({
          _id: data._id,
          name: data.name,
          email: data.email,
          isAdmin: data.isAdmin,
          token: generateToken(data),
        });
      } else {
        res.status(401).json({ message: "Password Incorrect" });
      }
    })
    .catch((err) => {
      res.status(401).json({ message: "User Not Found" });
    });
});

userRouter.post("/signup", (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    isAdmin: false,
  });
  user
    .save()
    .then((data) => {
      res.status(200).json({
        _id: data._id,
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
        token: generateToken(data),
      });
    })
    .catch((err) => {
      if (err.code === 11000)
        res.status(401).json({ message: "user already exist" });
      else {
        res.status(401).json({ message: "can't create user" });
      }
    });
});

module.exports = userRouter;
