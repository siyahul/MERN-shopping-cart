const express = require("express");
const jwt = require("jsonwebtoken");
const { isAuth } = require("../../utils");
const Order = require("../models/orderModel");
const orderRouter = express.Router();

orderRouter.get("/", (req, res) => {
  Order.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

orderRouter.post("/", isAuth, (req, res) => {
  if (req.body.orderItems.length <= 0) {
    res.status(400).json({ message: "Cart is Empty" });
  } else {
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingAdress: req.body.shippingAdress,
      payementMethod: req.body.payementMethod,
      itemsPrice: req.body.totalAmount,
      shippingPrice: req.body.shipping,
      taxPrice: req.body.tax,
      totalPrice: req.body.netAmount,
      userInfo: req.user._id,
    });
    order
      .save()
      .then((data) => {
        res.status(200).json({ message: "order created", order: data });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "order failed create", error: err });
      });
  }
});

orderRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  Order.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = orderRouter;
