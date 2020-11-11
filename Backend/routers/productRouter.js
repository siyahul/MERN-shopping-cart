const express = require("express");
const Products = require("../models/productModel");

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  Products.find()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

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
