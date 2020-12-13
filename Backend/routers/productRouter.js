const express = require("express");
const { isAuth } = require("../../utils");
const Products = require("../models/productModel");

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  console.log(req.ip);
  Products.find()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

productRouter.post(
  "/",
  (req, res, next) => {
    console.log("test");
    next();
  },
  isAuth,
  (req, res) => {
    console.log(req.user);
    if (req.user.isAdmin) {
      console.log(req.body);
      const product = new Products({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        rating: 0,
        numReviews: 0,
        countInStock: req.body.stockCount,
      });
      product
        .save()
        .then((data) => {
          res.status(200).json({
            _id: data._id,
            name: data.name,
            price: data.price,
            description: data.description,
            image: data.image,
            rating: data.rating,
            numReviews: data.numReviews,
            countInStock: data.countInStock,
          });
        })
        .catch((err) => {
          if (err.code === 11000)
            res.status(401).json({ message: "product already exist" });
          else {
            res.status(401).json({ message: "can't create Product" });
          }
        });
    }
  }
);

productRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  Products.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = productRouter;
